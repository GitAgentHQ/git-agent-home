# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server with HMR (localhost:5173)
pnpm build        # Production build
pnpm typecheck    # pnpm cf-typegen && tsc -b
pnpm check        # typecheck + build + wrangler deploy --dry-run (full validation)
pnpm deploy       # Deploy to Cloudflare Workers
```

Always run `pnpm check` before deploying; it catches type errors, build failures, and wrangler config issues in one pass.

## Architecture

React Router 7 SSR app on Cloudflare Workers. Routes are server-rendered — no browser-only APIs in route loaders/actions. Worker entry point: `workers/app.ts`.

TailwindCSS v4 is configured via the `@tailwindcss/vite` plugin — no `tailwind.config.ts` needed.

## Environment Variables

Local secrets go in `.dev.vars` (Cloudflare's local env file). Never commit `.dev.vars`.

## Webhook API (GitHub → D1 → desktop app)

The Worker also serves GitHub webhook endpoints under `/api/webhook/*`, routed in `workers/app.ts` via `workers/webhook-handler.ts`:

- `POST /api/webhook` — receives GitHub webhook events (verified with `X-Hub-Signature-256` against `WEBHOOK_SECRET`), stores them in D1 (`webhook_events` table)
- `GET /api/webhook/events?since=<ISO>&limit=<n>` — returns the caller's events, newest first. **Requires `Authorization: Bearer <github-token>`**; events are scoped to repos the caller subscribed to (`webhook_subscriptions` table)
- `POST /api/webhook/register` — subscribes the authenticated user to a repo. Body: `repository_full_name`, `webhook_url`. Creates/reuses the repo-level GitHub webhook; requires `admin:repo_hook` on the token
- `POST /api/webhook/unregister` — removes the caller's subscription; deletes the repo webhook when the last subscriber leaves
- `GET /api/webhook/health` — liveness probe (open)

Multi-tenant model: a repo-level webhook lives in `webhook_registrations` (one row per repo, created by the first subscriber); every user who wants events for that repo gets a row in `webhook_subscriptions`. Events are only readable by subscribed users.

Bindings: `env.DB` (D1 `git-agent-webhook-db`, migrations in `migrations/`), secret `WEBHOOK_SECRET` (in `.dev.vars` locally, `wrangler secret put WEBHOOK_SECRET` in prod). The Worker is reachable at `git-agent.dev` (custom domain) and `git-agent-home.frad.workers.dev`.

The macOS desktop app (`GitAgentDesktop/GitAgentDesktop/GitHubWebhookService.swift`) polls `GET /api/webhook/events` every 30s with the user's GitHub token and refreshes only the data each event invalidates (PR list, detail, or checks). Its receiver URL defaults to `https://git-agent.dev` and can be overridden with the `GIT_AGENT_WEBHOOK_URL` environment variable for self-hosted instances.

## Conventions

- All programmatic SEO routes (`for/`, `vs/`, `glossary/`, `templates/`) must use `pseo-layout.tsx` as their layout wrapper.
- Route transitions use `AnimatePresence` from `motion/react` — maintain this pattern for new routes.
- All user-facing strings must go through `LanguageProvider` context (`app/contexts/language-context.tsx`), not hardcoded — including the skip link, dynamic `<html lang>` (via `HtmlLang` in `root.tsx`), and all a11y labels (`aria-label`, `alt`).
- `verbatimModuleSyntax: true` in tsconfig — use `import type` for type-only imports.

## Accessibility (audited 20/20, 2026-08-07)

The design system is documented in `DESIGN.md` (authoritative) with a machine-readable sidecar in `.impeccable/design.json`. The full a11y audit report is in `AUDIT-2026-08-07.md`. These are enforced by the impeccable design hook — run `/impeccable audit` before finalizing UI changes. Non-negotiable rules:

- Every page's root view must be `<motion.main id="main-content">` (never `<motion.div>`) — `<main>` landmark + skip-link target.
- All interactive elements need a visible `:focus-visible` ring (white on dark surfaces, dark `rgba(0,0,0,0.5)` on cream cards). Do not add new surface types without a corresponding focus-ring rule.
- Never use `display: none` to hide content that carries meaning for screen readers — use the visually-hidden `clip` technique. The comparison table's `<thead>` is collapsed this way at mobile widths, not removed from the DOM.
- Semantic tables: use real `<table>/<thead>/<tbody>/<th scope>` elements, not div grids.
- Decorative elements (barcodes, icons, patterns) get `aria-hidden="true"`.
- Respect `prefers-reduced-motion` (via `useAccessibleMotion()`) and `prefers-contrast: more` (token overrides in `app/app.css`).

## TypeScript

Strict mode + `verbatimModuleSyntax: true`. Path alias `~/*` maps to `./app/*`.

No lint or format tooling is configured — maintain style consistent with surrounding code.
