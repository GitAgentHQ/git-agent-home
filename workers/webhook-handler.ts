// ─── Types ───────────────────────────────────────────────────────────────────

interface WebhookEvent {
	id: string;
	event_type: string;
	action: string | null;
	repository_full_name: string;
	pull_request_number: number | null;
	payload: string;
	received_at: string;
}

interface WebhookRegistration {
	id: string;
	github_user_id: string;
	repository_full_name: string;
	webhook_id: number;
	active: number;
	created_at: string;
}

interface WebhookSubscription {
	id: string;
	github_user_id: string;
	repository_full_name: string;
	created_at: string;
}

interface RegisterWebhookBody {
	github_token: string;
	repository_full_name: string;
	webhook_url: string;
	secret: string;
}

// ─── Event types we care about ───────────────────────────────────────────────

const INTERESTING_EVENTS = [
	"pull_request",
	"pull_request_review",
	"pull_request_review_comment",
	"issue_comment",
	"check_run",
	"check_suite",
	"status",
];

// ─── GitHub webhook signature verification ───────────────────────────────────

async function verifyWebhookSignature(
	body: string,
	signature: string | null,
	secret: string,
): Promise<boolean> {
	if (!signature) return false;
	const expectedPrefix = "sha256=";
	if (!signature.startsWith(expectedPrefix)) return false;
	const sig = signature.slice(expectedPrefix.length);
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
	const computed = [...new Uint8Array(mac)]
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return constantTimeEqual(sig, computed);
}

function constantTimeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let result = 0;
	for (let i = 0; i < a.length; i++) {
		result |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return result === 0;
}

// ─── Auth: resolve the GitHub login for a bearer token ───────────────────────

/**
 * Verifies a GitHub personal access token and returns the owning login.
 * Used to scope events and subscriptions to the authenticated user.
 */
async function authenticateUser(token: string): Promise<string | null> {
	try {
		const response = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"User-Agent": "git-agent-webhook",
			},
		});
		if (!response.ok) return null;
		const data = (await response.json()) as { login?: string };
		return data.login || null;
	} catch {
		return null;
	}
}

function bearerToken(request: Request): string | null {
	const header = request.headers.get("authorization");
	if (!header) return null;
	const match = /^Bearer\s+(.+)$/i.exec(header);
	return match ? match[1] : null;
}

// ─── D1 helpers ──────────────────────────────────────────────────────────────

async function insertEvent(db: D1Database, event: WebhookEvent): Promise<void> {
	await db
		.prepare(
			`INSERT INTO webhook_events (id, event_type, action, repository_full_name, pull_request_number, payload, received_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
		)
		.bind(
			event.id,
			event.event_type,
			event.action,
			event.repository_full_name,
			event.pull_request_number,
			event.payload,
			event.received_at,
		)
		.run();
}

/**
 * Events are only visible to users who subscribed to the repo. The repo-level
 * webhook delivers to the Worker regardless; the subscriptions table decides
 * who may read them back.
 */
async function getEventsForUser(
	db: D1Database,
	login: string,
	since: string,
	limit: number = 50,
): Promise<WebhookEvent[]> {
	const { results } = await db
		.prepare(
			`SELECT * FROM webhook_events
       WHERE received_at > ?
         AND repository_full_name IN (
           SELECT repository_full_name FROM webhook_subscriptions WHERE github_user_id = ?
         )
       ORDER BY received_at DESC
       LIMIT ?`,
		)
		.bind(since, login, limit)
		.all<WebhookEvent>();
	return results;
}

async function getRegistration(
	db: D1Database,
	repo: string,
): Promise<WebhookRegistration | null> {
	const result = await db
		.prepare("SELECT * FROM webhook_registrations WHERE repository_full_name = ?")
		.bind(repo)
		.first<WebhookRegistration>();
	return result || null;
}

async function upsertRegistration(
	db: D1Database,
	reg: WebhookRegistration,
): Promise<void> {
	await db
		.prepare(
			`INSERT INTO webhook_registrations (id, github_user_id, repository_full_name, webhook_id, active, created_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(repository_full_name) DO UPDATE SET
         webhook_id = excluded.webhook_id,
         active = excluded.active,
         github_user_id = excluded.github_user_id`,
		)
		.bind(
			reg.id,
			reg.github_user_id,
			reg.repository_full_name,
			reg.webhook_id,
			reg.active,
			reg.created_at,
		)
		.run();
}

async function addSubscription(
	db: D1Database,
	login: string,
	repo: string,
): Promise<void> {
	await db
		.prepare(
			`INSERT INTO webhook_subscriptions (id, github_user_id, repository_full_name, created_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(repository_full_name, github_user_id) DO NOTHING`,
		)
		.bind(login, login, repo, new Date().toISOString())
		.run();
}

async function removeSubscription(
	db: D1Database,
	login: string,
	repo: string,
): Promise<void> {
	await db
		.prepare(
			"DELETE FROM webhook_subscriptions WHERE github_user_id = ? AND repository_full_name = ?",
		)
		.bind(login, repo)
		.run();
}

async function subscriptionCount(db: D1Database, repo: string): Promise<number> {
	const row = await db
		.prepare(
			"SELECT COUNT(*) AS count FROM webhook_subscriptions WHERE repository_full_name = ?",
		)
		.bind(repo)
		.first<{ count: number }>();
	return row?.count ?? 0;
}

// ─── GitHub API helpers ──────────────────────────────────────────────────────

async function registerGitHubWebhook(
	token: string,
	repo: string,
	webhookUrl: string,
	secret: string,
): Promise<{ webhook_id: number }> {
	const response = await fetch(
		`https://api.github.com/repos/${repo}/hooks`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
				"User-Agent": "git-agent-webhook",
			},
			body: JSON.stringify({
				name: "web",
				active: true,
				events: INTERESTING_EVENTS,
				config: {
					url: webhookUrl,
					content_type: "json",
					secret,
					insecure_ssl: "0",
				},
			}),
		},
	);

	if (!response.ok) {
		const err = await response.text();
		throw new Error(`Failed to register webhook: ${err}`);
	}

	const data = (await response.json()) as { id: number };
	return { webhook_id: data.id };
}

async function deleteGitHubWebhook(
	token: string,
	repo: string,
	webhookId: number,
): Promise<void> {
	const response = await fetch(
		`https://api.github.com/repos/${repo}/hooks/${webhookId}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"User-Agent": "git-agent-webhook",
			},
		},
	);

	if (!response.ok && response.status !== 404) {
		const err = await response.text();
		throw new Error(`Failed to delete webhook: ${err}`);
	}
}

// ─── Request parsing ─────────────────────────────────────────────────────────

function parseEventPayload(
	eventType: string,
	payload: Record<string, unknown>,
): { action: string | null; pull_request_number: number | null } {
	let action: string | null = null;
	let pullRequestNumber: number | null = null;

	if (typeof payload.action === "string") {
		action = payload.action;
	}

	const pr = payload.pull_request as Record<string, unknown> | undefined;
	if (pr && typeof pr.number === "number") {
		pullRequestNumber = pr.number;
	}

	// check_run and check_suite don't have pull_request directly
	if (
		!pullRequestNumber &&
		(eventType === "check_run" || eventType === "check_suite")
	) {
		const checkRun = payload.check_run as
			| { pull_requests?: Array<{ number: number }> }
			| undefined;
		const checkPrs = checkRun?.pull_requests;
		if (checkPrs && checkPrs.length > 0) {
			pullRequestNumber = checkPrs[0].number;
		}
	}

	// issue_comment payloads carry the number under `issue`; the nested
	// `issue.pull_request` marker is present when the issue is a pull request.
	if (!pullRequestNumber && eventType === "issue_comment") {
		const issue = payload.issue as
			| { number?: number; pull_request?: unknown }
			| undefined;
		if (issue?.number && issue.pull_request) {
			pullRequestNumber = issue.number;
		}
	}

	return { action, pull_request_number: pullRequestNumber };
}

// ─── Route handlers ──────────────────────────────────────────────────────────

async function handleWebhookPost(
	request: Request,
	env: Env,
): Promise<Response> {
	const webhookSecret = env.WEBHOOK_SECRET;
	if (!webhookSecret) {
		return new Response("Webhook secret not configured", { status: 500 });
	}

	const signature = request.headers.get("x-hub-signature-256");
	const eventType = request.headers.get("x-github-event") || "unknown";
	const deliveryId = request.headers.get("x-github-delivery") || crypto.randomUUID();

	const body = await request.text();

	const isValid = await verifyWebhookSignature(body, signature, webhookSecret);
	if (!isValid) {
		console.warn(`Invalid webhook signature for event ${eventType}`);
		return new Response("Invalid signature", { status: 401 });
	}

	let payload: Record<string, unknown>;
	try {
		payload = JSON.parse(body);
	} catch {
		return new Response("Invalid JSON", { status: 400 });
	}

	const repo = payload.repository as Record<string, unknown> | undefined;
	const repoFullName = (repo?.full_name as string) || "unknown";

	const { action, pull_request_number } = parseEventPayload(eventType, payload);

	const event: WebhookEvent = {
		id: deliveryId,
		event_type: eventType,
		action,
		repository_full_name: repoFullName,
		pull_request_number,
		payload: body,
		received_at: new Date().toISOString(),
	};

	await insertEvent(env.DB, event);

	console.log(
		`Webhook processed: ${eventType}${action ? `.${action}` : ""} on ${repoFullName}`,
	);

	return new Response("OK", { status: 200 });
}

/**
 * GET /api/webhook/events — authenticated, scoped to the caller's subscriptions.
 * 401 without a valid GitHub token; an unsubscribed repo is invisible.
 */
async function handleGetEvents(request: Request, env: Env): Promise<Response> {
	const token = bearerToken(request);
	if (!token) {
		return Response.json({ error: "Missing Authorization header" }, { status: 401 });
	}

	const login = await authenticateUser(token);
	if (!login) {
		return Response.json({ error: "Invalid GitHub token" }, { status: 401 });
	}

	const url = new URL(request.url);
	const since = url.searchParams.get("since") || new Date(0).toISOString();
	const repo = url.searchParams.get("repo");
	const limit = Math.min(Number(url.searchParams.get("limit")) || 50, 200);

	const events = await getEventsForUser(env.DB, login, since, limit);

	// An optional repo filter must still respect the user's subscriptions.
	if (repo) {
		return Response.json({
			events: events.filter((e) => e.repository_full_name === repo),
			count: events.filter((e) => e.repository_full_name === repo).length,
		});
	}

	return Response.json({ events, count: events.length });
}

/**
 * POST /api/webhook/register — subscribes the authenticated user to a repo.
 * Creates the repo-level GitHub webhook once (reuses it on repeat calls) and
 * records a per-user subscription. Requires a token with admin:repo_hook.
 */
async function handleRegisterWebhook(
	request: Request,
	env: Env,
): Promise<Response> {
	const token = bearerToken(request);
	if (!token) {
		return Response.json({ error: "Missing Authorization header" }, { status: 401 });
	}

	const login = await authenticateUser(token);
	if (!login) {
		return Response.json({ error: "Invalid GitHub token" }, { status: 401 });
	}

	const body = (await request.json()) as Partial<RegisterWebhookBody>;
	if (!body.repository_full_name || !body.webhook_url) {
		return Response.json(
			{ error: "Missing required fields: repository_full_name, webhook_url" },
			{ status: 400 },
		);
	}

	const webhookSecret = env.WEBHOOK_SECRET;
	if (!webhookSecret) {
		return new Response("Webhook secret not configured", { status: 500 });
	}

	// Reuse the repo-level webhook if one already exists.
	let webhookId: number;
	const existing = await getRegistration(env.DB, body.repository_full_name);
	if (existing && existing.active) {
		webhookId = existing.webhook_id;
	} else {
		try {
			const result = await registerGitHubWebhook(
				token,
				body.repository_full_name,
				body.webhook_url,
				webhookSecret,
			);
			webhookId = result.webhook_id;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			return Response.json(
				{ error: `Failed to register webhook with GitHub: ${message}` },
				{ status: 502 },
			);
		}
		await upsertRegistration(env.DB, {
			id: crypto.randomUUID(),
			github_user_id: login,
			repository_full_name: body.repository_full_name,
			webhook_id: webhookId,
			active: 1,
			created_at: new Date().toISOString(),
		});
	}

	await addSubscription(env.DB, login, body.repository_full_name);

	return Response.json({
		message: "Webhook subscribed",
		webhook_id: webhookId,
		repository_full_name: body.repository_full_name,
	});
}

/**
 * POST /api/webhook/unregister — removes the caller's subscription. When the
 * last subscriber leaves, the repo-level GitHub webhook is deleted.
 */
async function handleUnregisterWebhook(
	request: Request,
	env: Env,
): Promise<Response> {
	const token = bearerToken(request);
	if (!token) {
		return Response.json({ error: "Missing Authorization header" }, { status: 401 });
	}

	const login = await authenticateUser(token);
	if (!login) {
		return Response.json({ error: "Invalid GitHub token" }, { status: 401 });
	}

	const body = (await request.json()) as { repository_full_name: string };
	if (!body.repository_full_name) {
		return Response.json(
			{ error: "Missing required field: repository_full_name" },
			{ status: 400 },
		);
	}

	await removeSubscription(env.DB, login, body.repository_full_name);

	// Clean up the repo-level webhook only when nobody subscribes anymore.
	const remaining = await subscriptionCount(env.DB, body.repository_full_name);
	if (remaining === 0) {
		const existing = await getRegistration(env.DB, body.repository_full_name);
		if (existing && existing.active) {
			await deleteGitHubWebhook(token, body.repository_full_name, existing.webhook_id);
			await env.DB
				.prepare(
					"UPDATE webhook_registrations SET active = 0 WHERE repository_full_name = ?",
				)
				.bind(body.repository_full_name)
				.run();
		}
	}

	return Response.json({
		message: "Webhook unsubscribed",
		repository_full_name: body.repository_full_name,
	});
}

// ─── Main router ─────────────────────────────────────────────────────────────

export async function handleWebhookAPI(
	request: Request,
	env: Env,
): Promise<Response | null> {
	const url = new URL(request.url);
	const path = url.pathname;

	// POST /api/webhook - Receive GitHub webhook events (HMAC-authenticated)
	if (path === "/api/webhook" && request.method === "POST") {
		return handleWebhookPost(request, env);
	}

	// GET /api/webhook/events - Query the caller's events (bearer-authenticated)
	if (path === "/api/webhook/events" && request.method === "GET") {
		return handleGetEvents(request, env);
	}

	// POST /api/webhook/register - Subscribe to a repo (bearer-authenticated)
	if (path === "/api/webhook/register" && request.method === "POST") {
		return handleRegisterWebhook(request, env);
	}

	// POST /api/webhook/unregister - Unsubscribe from a repo (bearer-authenticated)
	if (path === "/api/webhook/unregister" && request.method === "POST") {
		return handleUnregisterWebhook(request, env);
	}

	// GET /api/webhook/health - Liveness probe (open)
	if (path === "/api/webhook/health") {
		return Response.json({ status: "ok", timestamp: new Date().toISOString() });
	}

	return null; // Not a webhook route
}