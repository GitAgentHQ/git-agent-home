export type Language = "en" | "zh";

export interface Translations {
	// Home view
	homeTitle: string;
	homeSubtitle: string;
	homeInstallHint: string;
	homeInstallCopyLine: string;
	copy: string;
	copied: string;
	viewDetails: string;
	graphPitchTitle: string;
	graphPitchBody: string;

	// Entry cards
	initTitle: [string, string];
	initDescription: string;
	initFeatures: string[];
	commitTitle: [string, string];
	commitDescription: string;
	commitFeatures: string[];
	relatedTitle: [string, string];
	relatedDescription: string;
	relatedFeatures: string[];
	statusTitle: [string, string];
	statusDescription: string;
	statusFeatures: string[];
	skillsTitle: [string, string];
	skillsDescription: string;
	skillsFeatures: string[];
	configTitle: [string, string];
	configDescription: string;
	configFeatures: string[];

	// Pricing
	pricingTitle: string;
	pricingSubtitle: string;
	pricingNote: string;

	// Command detail
	back: string;
	overview: string;
	flags: string;
	workflow: string;
	default: string;

	// Command pages
	initData: CommandData;
	commitData: CommandData;
	relatedData: CommandData;
	statusData: CommandData;
	skillsData: CommandData;
	configData: CommandData;

	// Home explore
	exploreTitle: string;
	exploreByLanguageName: string;
	exploreByLanguageDesc: string;
	exploreComparisonsName: string;
	exploreComparisonsDesc: string;
	exploreGlossaryName: string;
	exploreGlossaryDesc: string;
	exploreTemplatesName: string;
	exploreTemplatesDesc: string;

	// Home footer
	homeFooterMadeByPrefix: string;
	homeFooterMadeBySuffix: string;

	// pSEO footer
	pseoFooterCtaHeading: string;
	pseoFooterNavLanguages: string;
	pseoFooterNavComparisons: string;
	pseoFooterNavGlossary: string;
	pseoFooterNavTemplates: string;

	// pSEO comparison table
	pseoComparisonFeature: string;

	// pSEO hub index pages
	pseoForHubTitle: string;
	pseoForHubSubtitle: string;
	pseoVsHubTitle: string;
	pseoVsHubSubtitle: string;
	pseoGlossaryHubTitle: string;
	pseoGlossaryHubSubtitle: string;
	pseoTemplatesHubTitle: string;
	pseoTemplatesHubSubtitle: string;

	// pSEO shared section labels
	pseoSectionDiffExample: string;
	pseoSectionGitAgentOutput: string;
	pseoWhyWorksFor: string;
	pseoSectionInstall: string;
	pseoSectionFeatureComparison: string;
	pseoSectionOutputExample: string;
	pseoSectionExplanation: string;
	pseoSectionExamples: string;
	pseoSectionHowHelps: string;
	pseoSectionFormat: string;
	pseoSectionRealExamples: string;
	pseoSectionWhenToUse: string;
	pseoSectionGitAgentInfers: string;
	pseoRelated: string;
	pseoFaq: string;
	pseoCommitTemplateSuffix: string;
}

export interface Flag {
	name: string;
	description: string;
	default?: string;
}

export interface Step {
	title: string;
	description: string;
}

export interface CommandData {
	cmd: string;
	description: string;
	usage: string;
	overview: string;
	flags: Flag[];
	steps: Step[];
}

export const translations: Record<Language, Translations> = {
	en: {
		// Home view
		homeTitle: "git-agent",
		homeSubtitle:
			"AI Git assistant: atomic commits, conventional messages, and a queryable code graph — so agents edit with context, not blind. Free shared gateway, zero config.",
		homeInstallHint: "Copy the line below and paste it into any coding agent.",
		homeInstallCopyLine: "Install git-agent — follow https://git-agent.dev/install.md",
		copy: "Copy",
		copied: "Copied",
		viewDetails: "View details →",
		graphPitchTitle: "An agent that knows your code",
		graphPitchBody:
			"git-agent builds a co-change graph of your code as it commits: the files that habitually change together, drawn from git history. Before an edit, `git-agent related` shows what else moves with it — and why, via the commits that prove the coupling; after a change, `git-agent status` reports index health. It's the temporal complement to grep: it surfaces couplings a symbol search can't see — a test in another package, a changelog, sibling files with no shared import. Offline, no API key, milliseconds per query — so the agent edits with understanding, not blind.",

		// Entry cards
		initTitle: ["Initialize", "your repo"],
		initDescription:
			"Generate scopes from commit history, configure hook validation, and create .gitignore — one command, ready to commit.",
		initFeatures: [
			"Scopes with descriptions from history and tree",
			"Built-in empty or conventional (config.yml only)",
			".gitignore generation",
			"Merge-safe config updates",
		],
		commitTitle: ["Generate", "conventional commits"],
		commitDescription:
			"Stages changes, groups them into atomic commits, drafts conventional messages, and validates through your pre-commit hook.",
		commitFeatures: [
			"Atomic commit splitting",
			"Conventional Commits format",
			"Hook validation + auto-retry",
			"Dry-run preview",
			"Amend last commit",
			"Co-author and trailer support",
		],
		relatedTitle: ["Find files that", "change together"],
		relatedDescription:
			"Mine git history for co-change: given the files you're touching, surface what else habitually moves with them — and the commits that prove why.",
		relatedFeatures: [
			"Co-change from files, a directory, or your working tree",
			"The commits that explain each coupling",
			"--tests: which tests to run after a change",
			"The temporal complement to grep",
			"Language-agnostic, offline, no API key",
		],
		statusTitle: ["Check", "index health"],
		statusDescription:
			"A read-only health check for the co-change index: whether the index is built, the last indexed commit, and row counts — so you know if it's stale before you trust it.",
		statusFeatures: [
			"Index built state and last indexed commit",
			"Row counts: commits, files, authors, pairs",
			"Database size on disk",
			"-o json for scripts and agents",
			"Offline, no LLM, no API key",
		],
		skillsTitle: ["Read docs", "from the CLI"],
		skillsDescription:
			"The full usage guide — triggers, workflows, flags, exit codes — is served by the installed binary itself: `git-agent skills get core` prints it, so instructions never go stale.",
		skillsFeatures: [
			"Usage guide from the installed version",
			"Full command reference: skills get cli",
			"skills list shows every document",
			"Embedded at build time — never stale",
			"Offline, no LLM, no API key",
		],
		configTitle: ["Manage", "provider config"],
		configDescription:
			"Show, set, and inspect provider configuration — api_key, model, base_url, hooks — across user, project, and local scopes.",
		configFeatures: [
			"config show: resolved provider settings",
			"config set / get <key>",
			"User, project, and local scopes",
			"snake_case and kebab-case keys",
			"Hook configuration",
		],

		// Pricing
		pricingTitle: "Why git-agent",
		pricingSubtitle: "cost per 1,000 commits",
		pricingNote:
			"~4,200 input + ~400 output tokens per commit. From measured usage. Source: provider pricing pages, Mar 2026.",

		// Home explore
		exploreTitle: "explore",
		exploreByLanguageName: "by language",
		exploreByLanguageDesc: "Python, Go, Rust...",
		exploreComparisonsName: "comparisons",
		exploreComparisonsDesc: "vs other commit tools",
		exploreGlossaryName: "glossary",
		exploreGlossaryDesc: "Git workflow concepts",
		exploreTemplatesName: "templates",
		exploreTemplatesDesc: "feat, fix, refactor...",

		homeFooterMadeByPrefix: "Made by ",
		homeFooterMadeBySuffix: "",

		// pSEO footer
		pseoFooterCtaHeading: "Get started free",
		pseoFooterNavLanguages: "Languages",
		pseoFooterNavComparisons: "Comparisons",
		pseoFooterNavGlossary: "Glossary",
		pseoFooterNavTemplates: "Templates",

		pseoComparisonFeature: "Feature",

		pseoForHubTitle: "Browse by language or framework",
		pseoForHubSubtitle:
			"git-agent understands each language's project layout and generates accurate conventional commit messages automatically.",
		pseoVsHubTitle: "Comparisons",
		pseoVsHubSubtitle:
			"See how git-agent compares to other AI commit tools across atomic splitting, free shared gateway access, and hook integration.",
		pseoGlossaryHubTitle: "Git workflow glossary",
		pseoGlossaryHubSubtitle:
			"Plain-language explanations of conventional commits, atomic commits, pre-commit hooks, and more Git workflow concepts.",
		pseoTemplatesHubTitle: "Commit type templates",
		pseoTemplatesHubSubtitle: "Format, examples, and best practices for every conventional commit type.",

		pseoSectionDiffExample: "diff example",
		pseoSectionGitAgentOutput: "git-agent output",
		pseoWhyWorksFor: "Why it works for {lang}",
		pseoSectionInstall: "install",
		pseoSectionFeatureComparison: "feature comparison",
		pseoSectionOutputExample: "output example",
		pseoSectionExplanation: "explanation",
		pseoSectionExamples: "examples",
		pseoSectionHowHelps: "how git-agent helps",
		pseoSectionFormat: "format",
		pseoSectionRealExamples: "real examples",
		pseoSectionWhenToUse: "when to use",
		pseoSectionGitAgentInfers:
			"`git-agent` automatically analyzes your changes and infers the correct commit type.",
		pseoRelated: "related",
		pseoFaq: "FAQ",
		pseoCommitTemplateSuffix: "commit template",

		// Command detail
		back: "← back",
		overview: "Overview",
		flags: "Flags",
		workflow: "Workflow",
		default: "default",

		// Command pages
		initData: {
			cmd: "git-agent init",
			description: "Initialize your repository",
			usage:
				"git-agent init [--scope] [--hook <value>] [--gitignore] [--force] [--local] [--user] [--max-commits <n>] [--api-key <key>] [--model <name>] [--base-url <url>] [--free]",
			overview:
				"Set up `git-agent` in the current repo. With no flags, runs the full setup wizard: ensures a git repo exists (runs `git init` if needed), generates `.gitignore` via AI, generates commit scopes with descriptions from git history via AI, and writes `.git-agent/config.yml` with scopes and `hook: [conventional]`. Each step can also run alone via flags. Existing `.git-agent/config.yml` stays put unless you pass `--force`. Use `git-agent config set hook <value>` to reconfigure hooks. Official release binaries use the free shared gateway with zero config; bring your own key via `~/.config/git-agent/config.yml` when you need it.",
			flags: [
				{ name: "--scope", description: "Derive scopes with descriptions from commit history and project layout (`LLM`)" },
				{ name: "--hook <value>", description: "Hook to configure: `conventional`, `empty`, or a file path (repeatable). Stores in `.git-agent/config.yml`." },
				{ name: "--gitignore", description: "Generate a `.gitignore` based on project context" },
				{ name: "--force", description: "Overwrite existing config, hook, and `.gitignore` without merging" },
				{ name: "--local", description: "Write config to `.git-agent/config.local.yml` instead of `config.yml`" },
				{ name: "--user", description: "Write hook config to `~/.config/git-agent/config.yml` (requires `--hook`; cannot be combined with `--scope` or `--gitignore`)" },
				{ name: "--max-commits <n>", description: "Maximum number of commits to analyze for scope generation", default: "200" },
				{
					name: "--api-key <key>",
					description:
						"One-off API key override. Official release binaries use the free shared gateway by default; set a key here only for a temporary bring-your-own-key override.",
				},
				{
					name: "--model <name>",
					description:
						"One-off model override. Prefer `YAML` or `git config` for persistence.",
				},
				{
					name: "--base-url <url>",
					description:
						"One-off base URL override. Prefer `YAML` or `git config` for persistence.",
				},
				{
					name: "--free",
					description:
						"Force routing through the free shared gateway, overriding any `api_key` / `base_url` / `model` from flags, `git config`, or the config file. On official release binaries the embedded gateway URL is used; the Worker pins the model and holds the credential server-side.",
				},
				{ name: "-v, --verbose", description: "Enable verbose output (global)" },
			],
			steps: [
				{
					title: "Validate environment",
					description:
						"Ensures a git repo exists (runs `git init` if needed) and resolves provider key: official release binaries use the free shared gateway (zero config); else `~/.config/git-agent/config.yml` or `git config`; use `init` provider flags only for explicit one-off needs. Pass `--free` to force the free shared gateway and ignore all bring-your-own-key sources.",
				},
				{ title: "Generate .gitignore", description: "`LLM` writes a `.gitignore` for the detected layout. Skips if one exists unless `--force`." },
				{ title: "Analyze commit history", description: "Reads up to `--max-commits` recent commit subjects, the project's top-level directories, and tracked file list (capped at 300 entries)." },
				{ title: "Generate scopes via LLM", description: "Calls the configured `LLM` to derive scopes with descriptions from real directory names. Each scope includes a short description to help AI understand its purpose during commit message generation." },
				{ title: "Write project config", description: "Saves generated scopes and `hook: [conventional]` to `.git-agent/config.yml`. Merges with existing scopes unless `--force` is set." },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "Generate commits with LLM assistance",
			usage: "git-agent commit [-o <fmt>] [--dry-run] [--intent <text>] [--amend] [--no-stage] [--co-author <name>] [--trailer <key:value>] [--no-attribution] [--free]",
			overview:
				"Stages tracked changes, groups them into up to five atomic commits per run, drafts conventional messages with an `LLM`, validates via `hook` from `config.yml` (`empty`, `conventional`, or custom script), and retries or re-plans when validation fails. Detected file renames are kept atomic: both paths of a move are forced into the same commit group after planning, so git records a rename rather than splitting it into a delete and an add across commits. A preflight guard refuses prompts that exceed the endpoint's input ceiling before the LLM is called — default 1M tokens, raise it with the `max_input_tokens` config key. Official release binaries run against the free shared gateway with no provider flags; bring your own key via `~/.config/git-agent/config.yml` when needed. Pass `-o json` for a structured result — `{dry_run, commits:[{title, message, files, sha, hook_outcome}], committed_count, final_sha}` — instead of human-readable text, so an agent can consume the plan and resulting SHAs.",
			flags: [
				{ name: "-o, --output <fmt>", description: "Output format: `text` (default) or `json`. `-o json` emits `{dry_run, commits:[{title, message, files, sha, hook_outcome}], committed_count, final_sha}` for agents to consume." },
				{ name: "--dry-run", description: "Print planned commit messages without creating commits" },
				{ name: "--intent <text>", description: "Free-text hint for how to group changes and phrase messages" },
				{ name: "--amend", description: "Regenerate and amend the most recent commit message" },
				{ name: "--no-stage", description: "Skip auto-staging; only commit already-staged changes" },
				{ name: "--co-author <name>", description: 'Add a co-author trailer, e.g. "Name <email@domain>" (repeatable). Required on every invocation when `require_model_co_author` is set in config.' },
				{ name: "--trailer <value>", description: 'Add an arbitrary git trailer, format "Key: Value" (repeatable)' },
				{ name: "--no-attribution", description: "Omit the default Git Agent co-author signature" },
				{ name: "--max-diff-bytes <n>", description: "Maximum diff bytes to send to the model; a byte cap always applies", default: "0 (built-in ~384 KiB)" },
				{ name: "--max-diff-lines <n>", description: "Maximum diff lines to send to the model; set to limit token cost (a byte cap always applies on top)", default: "0 (no line limit)" },
				{ name: "--max-plan-files <n>", description: "Maximum file paths listed individually in the planner prompt before collapsing to directory summaries", default: "0 (built-in default 150)" },
				{
					name: "--api-key <key>",
					description:
						"One-off API key override. Official release binaries use the free shared gateway by default; set a key here only for a temporary bring-your-own-key override.",
				},
				{
					name: "--model <name>",
					description:
						"One-off model override. Prefer `YAML` or `git config` for persistence.",
				},
				{
					name: "--base-url <url>",
					description:
						"One-off base URL override. Prefer `YAML` or `git config` for persistence.",
				},
				{
					name: "--free",
					description:
						"Force routing through the free shared gateway, overriding any `api_key` / `base_url` / `model` from flags, `git config`, or the config file. On official release binaries the embedded gateway URL is used; the Worker pins the model and holds the credential server-side.",
				},
				{ name: "-v, --verbose", description: "Enable verbose output including retry details and hook feedback" },
			],
			steps: [
				{
					title: "Resolve configuration",
					description:
						"Official release binaries use the free shared gateway with no provider flags; to bring your own key, add `~/.config/git-agent/config.yml` or use `git config`. When several sources exist, precedence is: CLI flags > `git config --local` > `~/.config/git-agent/config.yml` > free shared gateway default. Pass `--free` to force the free shared gateway and ignore all bring-your-own-key sources.",
				},
				{ title: "Collect diffs", description: "Unless `--no-stage` is set, runs `git add --all` to stage all tracked changes. Then reads both staged and unstaged diffs to understand the full scope of changes." },
				{ title: "Plan commits via LLM", description: "Groups files into up to five atomic commits by concern (`feat`, `fix`, `refactor`, `test`, `docs`). `--intent` steers grouping when set." },
				{ title: "Generate commit messages", description: "Each group gets a Conventional Commits title (≤50 chars), a body with bullets and a short explanation, and an outline." },
				{ title: "Validate with hook", description: "Uses `hook` from `config.yml`: `empty` skips checks; `conventional` runs in-process validation; a script path runs validation then that executable. Failures feed `stderr` back to the `LLM`, up to 3 tries per group." },
				{ title: "Commit or re-plan", description: "Creates commits when the hook passes. After repeated hook failures, runs up to two full re-plans, then exits with code 2." },
			],
		},
		relatedData: {
			cmd: "git-agent related",
			description: "Find the files that change together",
			usage: "git-agent related [path...] [--tests] [--depth <n>] [--top <n>] [--min-count <n>] [--reindex] [-o <fmt>]",
			overview:
				"Mine git history for co-change: which files habitually change in the same commits as the ones you give it, and the commits that prove the coupling (subject + sha + date). Seeds are file paths, a directory, or — with no arguments — your current working-tree changes (\"given what I've edited, what else usually changes, and why?\"). Files coupled to several seeds rank highest. It's the temporal complement to grep: it surfaces couplings a symbol search can't see — a test in another package, a changelog, sibling files with no shared import. Language-agnostic (git history, not parsing), offline, no API key, auto-indexed on first run. Read-only. In `-o json` each result carries a `commits` array as the evidence for why the files are coupled.",
			flags: [
				{ name: "--tests", description: "Keep only related test files — a fast \"which tests should I run after this change?\"" },
				{ name: "--depth <n>", description: "Transitive co-change depth; values >1 surface indirect couplings, flagged as such in the output", default: "1" },
				{ name: "--top <n>", description: "Maximum number of results", default: "20" },
				{ name: "--min-count <n>", description: "Minimum co-change count to include — filters out weak, incidental couplings", default: "2" },
				{ name: "--reindex", description: "Force a full re-index of git history before querying", default: "false" },
				{ name: "-o, --output <fmt>", description: "Output format: `auto`, `json`, or `text`. `auto` emits JSON when piped, text on a TTY; JSON adds the `commits` array per result." },
				{ name: "-v, --verbose", description: "Enable verbose output (global)" },
			],
			steps: [
				{ title: "Resolve seeds", description: "Takes the given file paths or directory; with no arguments, uses your current working-tree changes as the seeds." },
				{ title: "Auto-index git history", description: "On first run (or with `--reindex`), scans commit history to build the co-change graph — language-agnostic, offline, no API key. Later runs reuse the index and auto-sync." },
				{ title: "Aggregate co-change", description: "For each seed, finds files that changed in the same commits and aggregates across seeds, so files coupled to several seeds rank highest. `--min-count` and `--depth` shape the result set." },
				{ title: "Rank and attach evidence", description: "Ranks by coupling strength and attaches, per result, the commits that link it to the seeds (subject + sha + date) — the \"why are these related?\" evidence." },
				{ title: "Emit results", description: "Prints the ranked files (text on a TTY, JSON when piped). `--tests` narrows to related test files; `--top` caps the count." },
			],
		},
		statusData: {
			cmd: "git-agent status",
			description: "Check co-change index health",
			usage: "git-agent status [-o <fmt>]",
			overview:
				"Prints a snapshot of the co-change index: whether the index is built, the last indexed commit, row counts for commits, files, authors, and co-change pairs, and the database file size in human-readable units (KiB/MiB/GiB/TiB). A repo with nothing indexed yet reports `Graph: not indexed` with a build hint instead of pretending the index is fresh. Read-only — it never indexes anything itself; indexing happens automatically via `commit` or any `related` read (`--reindex` forces a full rebuild). Prints human-readable text on a TTY; pass `-o json` for a structured `{exists, last_indexed_commit, commit_count, file_count, author_count, co_changed_count, db_size_bytes}` result an agent or script can parse. Fully offline: no `LLM`, no API key.",
			flags: [
				{ name: "-o, --output <fmt>", description: "Output format: `auto`, `json`, or `text`. `auto` emits JSON when piped, text on a TTY." },
				{ name: "-v, --verbose", description: "Enable verbose output (global)" },
			],
			steps: [
				{ title: "Locate the index", description: "Opens the repo's co-change database (created on first run) and reports whether anything is indexed yet — a never-built index shows `Graph: not indexed` with a build hint." },
				{ title: "Read index metadata", description: "Reads the last indexed commit, so you can tell how stale the index is." },
				{ title: "Count rows", description: "Counts commits, files, authors, and co-change pairs, plus the database file size on disk." },
				{ title: "Emit report", description: "Prints a human-readable summary on a TTY, or JSON when piped or with `-o json`, for a script or agent to consume." },
			],
		},
		skillsData: {
			cmd: "git-agent skills",
			description: "Read usage docs from the CLI",
			usage: "git-agent skills get <name> | git-agent skills list",
			overview:
				"Print git-agent's own usage documentation from the installed binary, so the content always matches the version you're running. `skills get core` serves the main usage guide — triggers, workflows, flags, exit codes; `skills get cli` serves the complete command reference (all flags, subcommands, config scopes, hook types); `skills list` shows every available document. The repository's skill stub (`skills/using-git-agent/SKILL.md`) is a discovery stub that delegates here, so instructions never go stale.",
			flags: [],
			steps: [
				{ title: "Pick a document", description: "`git-agent skills list` shows what's available: `core` is the main usage guide, `cli` the complete command reference." },
				{ title: "Print the document", description: "`git-agent skills get core` (or `cli`) prints the markdown guide to stdout — the same content, at the version you installed." },
			],
		},
		configData: {
			cmd: "git-agent config",
			description: "Manage provider configuration",
			usage: "git-agent config show | config set <key> <value> [--user|--project|--local] | config get <key>",
			overview:
				"Manage git-agent configuration across three scopes: `--user` (`~/.config/git-agent/config.yml`), `--project` (`.git-agent/config.yml`, checked into git), and `--local` (`.git-agent/config.local.yml`, gitignored). `config show` prints the resolved provider settings (api_key masked, model, base_url). `config set <key> <value>` writes a value — provider keys default to `--user`, everything else to `--project`; keys accept both snake_case and kebab-case. `config get <key>` shows the resolved value and its source scope (resolution: local > project > user; provider keys resolve from user only).",
			flags: [
				{ name: "--user", description: "Write to `~/.config/git-agent/config.yml` (provider keys: api_key, base_url, model)" },
				{ name: "--project", description: "Write to `.git-agent/config.yml` — shared, checked into git" },
				{ name: "--local", description: "Write to `.git-agent/config.local.yml` — personal override, gitignored" },
			],
			steps: [
				{ title: "Show resolved config", description: "`git-agent config show` prints the effective provider settings — api_key masked, model, base_url — after applying flags, `git config`, the user config file, and build defaults." },
				{ title: "Set a value", description: "`git-agent config set <key> <value>` writes to the chosen scope (provider keys default to `--user`, others to `--project`). Keys accept snake_case or kebab-case." },
				{ title: "Inspect a value", description: "`git-agent config get <key>` shows the resolved value and where it came from — local overrides project overrides user; provider keys resolve from user scope only." },
			],
		},
	},
	zh: {
		// Home view
		homeTitle: "git-agent",
		homeSubtitle:
			"AI Git 助手：原子提交、规范消息，外加可查询的代码图谱——让智能体带上下文编辑，而非盲目改码。免费共享网关，零配置。",
		homeInstallHint: "复制下方整行，粘贴到任意编程助手即可。",
		homeInstallCopyLine: "安装 git-agent — 请按 https://git-agent.dev/install.md 中的指引操作",
		copy: "复制",
		copied: "已复制",
		viewDetails: "查看详情 →",
		graphPitchTitle: "一个了解你代码的智能体",
		graphPitchBody:
			"git-agent 在提交时为你构建共变图谱：来自 git 历史、习惯性一起改动的文件。改动前，`git-agent related` 告诉你还有什么会一起动——并附上证明这层耦合的提交；改动后，`git-agent status` 报告索引健康度。它是 grep 的时间维补充：能发现符号搜索看不见的耦合——位于另一个包的测试、changelog、没有共享 import 的关联文件。离线、无需 API 密钥、毫秒级响应——让智能体带着理解去编辑，而非盲目改码。",

		// Entry cards
		initTitle: ["初始化", "你的仓库"],
		initDescription:
			"从提交历史生成作用域，配置 hook 验证，创建 .gitignore — 一条命令，即刻开始提交。",
		initFeatures: [
			"从历史与目录推导带描述的作用域",
			"内置 empty 或 conventional（仅写 config.yml）",
			".gitignore 生成",
			"合并时安全的配置更新",
		],
		commitTitle: ["生成", "规范提交"],
		commitDescription:
			"暂存变更，拆分为原子提交，生成规范提交消息，并通过 pre-commit hook 验证。",
		commitFeatures: [
			"原子提交拆分",
			"Conventional Commits 格式",
			"Hook 验证 + 自动重试",
			"预览模式",
			"修改上次提交",
			"合著者与 trailer 支持",
		],
		relatedTitle: ["找出会", "一起改动的文件"],
		relatedDescription:
			"挖掘 git 历史中的共变：给定你正在改的文件，找出还有哪些习惯性一起动——并附上证明这层耦合的提交。",
		relatedFeatures: [
			"以文件、目录或工作区改动为种子查共变",
			"附带解释每层耦合的提交",
			"--tests：改完该跑哪些测试",
			"grep 的时间维补充",
			"语言无关、离线、无需 API 密钥",
		],
		statusTitle: ["检查", "索引健康度"],
		statusDescription:
			"共变索引的只读体检：索引是否已构建、最近索引到的提交、各类行数——让你在信任它之前先看清是否过期。",
		statusFeatures: [
			"索引是否已构建、最近索引到的提交",
			"行数统计：提交、文件、作者、共变对",
			"数据库文件大小",
			"-o json 供脚本与智能体使用",
			"离线运行，无需 LLM、无需 API 密钥",
		],
		skillsTitle: ["从 CLI", "读取文档"],
		skillsDescription:
			"完整使用指南——触发时机、工作流、参数、退出码——由已安装的二进制直接提供：`git-agent skills get core` 即可打印，说明永不过时。",
		skillsFeatures: [
			"来自已安装版本的使用指南",
			"完整命令参考：skills get cli",
			"skills list 列出全部文档",
			"构建时嵌入——永不陈旧",
			"离线运行，无需 LLM、无需 API 密钥",
		],
		configTitle: ["管理", "provider 配置"],
		configDescription:
			"查看、设置与检查 provider 配置——api_key、model、base_url、hooks——覆盖 user、project、local 三种作用域。",
		configFeatures: [
			"config show：解析后的 provider 配置",
			"config set / get <key>",
			"user、project、local 三种作用域",
			"支持 snake_case 与 kebab-case 键名",
			"hook 配置",
		],

		// Pricing
		pricingTitle: "为什么选择 git-agent",
		pricingSubtitle: "每 1000 次提交的费用",
		pricingNote:
			"每次提交约 4,200 输入 + 400 输出 token。来自实测用量。来源：各厂商定价页，2026 年 3 月。",

		// Home explore
		exploreTitle: "探索",
		exploreByLanguageName: "按语言",
		exploreByLanguageDesc: "Python、Go、Rust...",
		exploreComparisonsName: "工具对比",
		exploreComparisonsDesc: "与其他工具的对比",
		exploreGlossaryName: "术语表",
		exploreGlossaryDesc: "Git 工作流概念",
		exploreTemplatesName: "提交模板",
		exploreTemplatesDesc: "feat、fix、refactor...",

		homeFooterMadeByPrefix: "由 ",
		homeFooterMadeBySuffix: " 制作",

		// pSEO footer
		pseoFooterCtaHeading: "免费开始",
		pseoFooterNavLanguages: "语言",
		pseoFooterNavComparisons: "对比",
		pseoFooterNavGlossary: "术语表",
		pseoFooterNavTemplates: "模板",

		pseoComparisonFeature: "功能",

		pseoForHubTitle: "按语言或框架浏览",
		pseoForHubSubtitle:
			"git-agent 理解每种语言的项目结构，自动生成准确的规范化提交信息。",
		pseoVsHubTitle: "与其他工具对比",
		pseoVsHubSubtitle:
			"了解 git-agent 与其他 AI 提交工具的区别——原子拆分、免费共享网关、钩子集成。",
		pseoGlossaryHubTitle: "Git 工作流术语",
		pseoGlossaryHubSubtitle:
			"规范化提交、原子提交、pre-commit 钩子及更多 Git 概念的解释。",
		pseoTemplatesHubTitle: "提交类型模板",
		pseoTemplatesHubSubtitle: "每种规范化提交类型的格式、示例及最佳实践。",

		pseoSectionDiffExample: "差异示例",
		pseoSectionGitAgentOutput: "git-agent 生成的提交",
		pseoWhyWorksFor: "为何适合 {lang}",
		pseoSectionInstall: "安装",
		pseoSectionFeatureComparison: "功能对比",
		pseoSectionOutputExample: "输出示例",
		pseoSectionExplanation: "详细说明",
		pseoSectionExamples: "示例",
		pseoSectionHowHelps: "git-agent 如何帮助",
		pseoSectionFormat: "格式",
		pseoSectionRealExamples: "真实示例",
		pseoSectionWhenToUse: "使用时机",
		pseoSectionGitAgentInfers: "`git-agent` 会自动分析你的变更并推断正确的提交类型。",
		pseoRelated: "相关",
		pseoFaq: "常见问题",
		pseoCommitTemplateSuffix: "提交模板",

		// Command detail
		back: "← 返回",
		overview: "概述",
		flags: "参数",
		workflow: "工作流程",
		default: "默认",

		// Command pages
		initData: {
			cmd: "git-agent init",
			description: "初始化你的仓库",
			usage:
				"git-agent init [--scope] [--hook <值>] [--gitignore] [--force] [--local] [--user] [--max-commits <n>] [--api-key <密钥>] [--model <名称>] [--base-url <地址>] [--free]",
			overview:
				"在当前仓库启用 `git-agent`。无参数时运行完整向导：确保 git 仓库存在（必要时运行 `git init`）、通过 AI 生成 `.gitignore`、从 git 历史通过 AI 生成带描述的提交作用域，并将作用域和 `hook: [conventional]` 写入 `.git-agent/config.yml`。各步也可单独用参数触发。已有 `.git-agent/config.yml` 会保留，除非加 `--force`。用 `git-agent config set hook <值>` 重新配置 hook。官方发布的二进制默认使用免费共享网关（零配置）；需要时可通过 `~/.config/git-agent/config.yml` 自带密钥。",
			flags: [
				{ name: "--scope", description: "根据提交历史与项目布局推导带描述的作用域（`LLM`）" },
				{ name: "--hook <值>", description: "要配置的 hook：`conventional`、`empty` 或文件路径（可重复）。存入 `.git-agent/config.yml`。" },
				{ name: "--gitignore", description: "根据项目上下文生成 `.gitignore`" },
				{ name: "--force", description: "覆盖现有配置、hook 和 `.gitignore`，不进行合并" },
				{ name: "--local", description: "将配置写入 `.git-agent/config.local.yml` 而非 `config.yml`" },
				{ name: "--user", description: "将 hook 配置写入 `~/.config/git-agent/config.yml`（需配合 `--hook` 使用；不可与 `--scope` 或 `--gitignore` 同时使用）" },
				{ name: "--max-commits <n>", description: "用于作用域生成的最大提交数", default: "200" },
				{
					name: "--api-key <密钥>",
					description:
						"临时覆盖 API 密钥。官方发布的二进制默认使用免费共享网关；仅在需要临时自带密钥覆盖时在此设置。",
				},
				{
					name: "--model <名称>",
					description:
						"临时指定模型。长期配置建议用 `YAML` 或 `git config`。",
				},
				{
					name: "--base-url <地址>",
					description:
						"临时指定 base URL。长期配置建议用 `YAML` 或 `git config`。",
				},
				{
					name: "--free",
					description:
						"强制走免费共享网关，覆盖来自参数、`git config` 或配置文件的任何 `api_key` / `base_url` / `model`。官方发布二进制使用内置的网关地址；模型由 Worker 固定，凭据保存在服务端。",
				},
				{ name: "-v, --verbose", description: "启用详细输出（全局）" },
			],
			steps: [
				{
					title: "验证环境",
					description:
						"确保 git 仓库存在（必要时运行 `git init`），解析密钥来源：官方发布的二进制使用免费共享网关（零配置）；否则 `~/.config/git-agent/config.yml` 或 `git config`；仅在明确需要时使用 `init` 的 `provider` 参数。",
				},
				{ title: "生成 .gitignore", description: "由 `LLM` 按当前目录结构写 `.gitignore`。已存在则跳过，除非加 `--force`。" },
				{ title: "分析提交历史", description: "读取最近 `--max-commits` 条提交主题、项目顶层目录和跟踪文件列表（最多 300 条）。" },
				{ title: "通过 LLM 生成作用域", description: "用已配置的 `LLM`，从真实目录名推导带描述的作用域。每个作用域包含简短描述，帮助 AI 在生成提交信息时理解其用途。" },
				{ title: "写入项目配置", description: "将生成的作用域和 `hook: [conventional]` 保存到 `.git-agent/config.yml`。除非设置 `--force`，否则与现有作用域合并。" },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "用 LLM 辅助生成提交",
			usage: "git-agent commit [-o <格式>] [--dry-run] [--intent <文本>] [--amend] [--no-stage] [--co-author <名称>] [--trailer <键:值>] [--no-attribution] [--free]",
			overview:
				"暂存已跟踪的改动，每次运行最多分成五组原子提交，用 `LLM` 起草规范说明，按 `config.yml` 的 `hook` 校验（`empty`、`conventional` 或自定义脚本），失败则重试或重规划。检测到的文件重命名保持原子：规划后移动的两个路径会被强制分到同一提交组，确保 git 记录为重命名，而不是拆成跨提交的删除与新增。调用 LLM 前有预检护栏：总输入会对照端点上限校验（默认 100 万 token，可用 `max_input_tokens` 配置键调高），超限提示词会被拒绝。官方发布的二进制默认不带 `provider` 参数、直连免费共享网关；需要时可通过 `~/.config/git-agent/config.yml` 自带密钥。传入 `-o json` 可得到结构化结果——`{dry_run, commits:[{title, message, files, sha, hook_outcome}], committed_count, final_sha}`——而非人类可读文本，便于智能体消费提交计划与生成的 SHA。",
			flags: [
				{ name: "-o, --output <格式>", description: "输出格式：`text`（默认）或 `json`。`-o json` 输出 `{dry_run, commits:[{title, message, files, sha, hook_outcome}], committed_count, final_sha}`，便于智能体消费。" },
				{ name: "--dry-run", description: "只打印拟定的提交说明，不创建提交" },
				{ name: "--intent <文本>", description: "自由文本，提示如何分组改动和写说明" },
				{ name: "--amend", description: "重新生成并修正最近的提交消息" },
				{ name: "--no-stage", description: "跳过自动暂存；只提交已暂存的更改" },
				{ name: "--co-author <名称>", description: "添加合著者 trailer，例如 \"Name <email@domain>\"（可重复）。配置中开启 `require_model_co_author` 后，每次调用都必须传。" },
				{ name: "--trailer <值>", description: "添加任意 git trailer，格式为 \"Key: Value\"（可重复）" },
				{ name: "--no-attribution", description: "不添加默认的合著者签名（Git Agent）" },
				{ name: "--max-diff-bytes <n>", description: "发送给模型的最大 diff 字节数；字节上限始终生效", default: "0（内置 ~384 KiB）" },
				{ name: "--max-diff-lines <n>", description: "发送给模型的最大 diff 行数；用于限制 token 成本（其上仍叠加字节上限）", default: "0（无行数限制）" },
				{ name: "--max-plan-files <n>", description: "规划提示中单独列出的最大文件路径数，超出后按目录折叠", default: "0（内置默认 150）" },
				{
					name: "--api-key <密钥>",
					description:
						"临时覆盖 API 密钥。官方发布的二进制默认使用免费共享网关；仅在需要临时自带密钥覆盖时在此设置。",
				},
				{
					name: "--model <名称>",
					description:
						"临时指定模型。长期配置建议用 `YAML` 或 `git config`。",
				},
				{
					name: "--base-url <地址>",
					description:
						"临时指定 base URL。长期配置建议用 `YAML` 或 `git config`。",
				},
				{
					name: "--free",
					description:
						"强制走免费共享网关，覆盖来自参数、`git config` 或配置文件的任何 `api_key` / `base_url` / `model`。官方发布二进制使用内置的网关地址；模型由 Worker 固定，凭据保存在服务端。",
				},
				{ name: "-v, --verbose", description: "启用详细输出，包括重试详情和 hook 反馈" },
			],
			steps: [
				{
					title: "解析配置",
					description:
						"向用户说明：官方发布的二进制默认不带 `provider` 参数、直连免费共享网关；要自带密钥，先创建 `~/.config/git-agent/config.yml` 或使用 `git config`。多来源同时存在时：CLI 参数 > `git config --local` > `~/.config/git-agent/config.yml` > 免费共享网关默认值。传入 `--free` 可强制走免费共享网关，忽略所有自带密钥来源。",
				},
				{ title: "收集 diffs", description: "除非设置 `--no-stage`，否则运行 `git add --all` 暂存所有跟踪的更改。然后读取已暂存和未暂存的 diff，以了解更改的全部范围。" },
				{ title: "通过 LLM 规划提交", description: "按关注点（`feat`、`fix`、`refactor`、`test`、`docs`）把文件分成最多五组原子提交。有 `--intent` 时优先按其提示分组。" },
				{ title: "生成提交消息", description: "每组一条 Conventional Commits 标题（≤50 字）、带项目符号与短说明的正文，以及一段概要。" },
				{ title: "使用 hook 验证", description: "按 `config.yml` 的 `hook`：`empty` 跳过；`conventional` 进程内校验；脚本路径先校验再执行该文件。失败将 `stderr` 回给 `LLM`，每组最多 3 次。" },
				{ title: "提交或重新规划", description: "hook 通过则创建提交。若多次仍被 hook 拦住，最多做两轮完整重规划，然后以退出码 2 结束。" },
			],
		},
		relatedData: {
			cmd: "git-agent related",
			description: "找出会一起改动的文件",
			usage: "git-agent related [路径...] [--tests] [--depth <n>] [--top <n>] [--min-count <n>] [--reindex] [-o <格式>]",
			overview:
				"挖掘 git 历史中的共变：哪些文件习惯性地与你给定的文件在同一批提交中改动，以及证明这层耦合的提交（主题 + sha + 日期）。种子可以是文件路径、目录，或——无参数时——你当前的工作区改动（\"我改的这些，还有什么通常一起改、为什么？\"）。与多个种子都耦合的文件排名最高。它是 grep 的时间维补充：能发现符号搜索看不见的耦合——位于另一个包的测试、changelog、没有共享 import 的关联文件。语言无关（基于 git 历史而非解析）、离线、无需 API 密钥，首次运行自动建索引。只读。在 `-o json` 下，每条结果都带一个 `commits` 数组，作为这些文件为何耦合的证据。",
			flags: [
				{ name: "--tests", description: "只保留相关的测试文件——快速回答\"改完这处该跑哪些测试？\"" },
				{ name: "--depth <n>", description: "传递性共变深度；大于 1 会显现间接耦合，并在输出中标注", default: "1" },
				{ name: "--top <n>", description: "最大结果数", default: "20" },
				{ name: "--min-count <n>", description: "纳入结果的最小共变次数——过滤掉偶发的弱耦合", default: "2" },
				{ name: "--reindex", description: "查询前强制完整重建 git 历史索引", default: "false" },
				{ name: "-o, --output <格式>", description: "输出格式：`auto`、`json` 或 `text`。`auto` 在管道时输出 JSON，TTY 时输出文本；JSON 会为每条结果附上 `commits` 数组。" },
				{ name: "-v, --verbose", description: "启用详细输出（全局）" },
			],
			steps: [
				{ title: "确定种子", description: "取给定的文件路径或目录；无参数时，以当前工作区改动作为种子。" },
				{ title: "自动建索引", description: "首次运行（或加 `--reindex`）时扫描提交历史构建共变图谱——语言无关、离线、无需 API 密钥。后续运行复用索引并自动同步。" },
				{ title: "聚合共变", description: "对每个种子，找出在同一批提交中改动的文件并跨种子聚合，使与多个种子都耦合的文件排名最高。`--min-count` 与 `--depth` 调整结果集。" },
				{ title: "排序并附证据", description: "按耦合强度排序，并为每条结果附上将其与种子相连的提交（主题 + sha + 日期）——即\"它们为何相关？\"的证据。" },
				{ title: "输出结果", description: "打印排序后的文件（TTY 输出文本，管道输出 JSON）。`--tests` 收窄为相关测试文件；`--top` 限制数量。" },
			],
		},
		statusData: {
			cmd: "git-agent status",
			description: "查看共变索引的健康状态",
			usage: "git-agent status [-o <格式>]",
			overview:
				"打印共变索引的快照：索引是否已构建、最近一次索引到的提交、提交/文件/作者/共变对的行数，以及数据库文件大小（自动换算 KiB/MiB/GiB/TiB）。尚未索引任何提交的仓库会报告 `Graph: not indexed` 并附构建提示。只读——它自身不做任何索引写入，索引由 `commit` 或任意一次 `related` 查询自动建好（`--reindex` 强制完整重建）。TTY 下输出可读文本；传入 `-o json` 可得到结构化的 `{exists, last_indexed_commit, commit_count, file_count, author_count, co_changed_count, db_size_bytes}` 结果，供智能体或脚本消费。完全离线：无需 `LLM`，无需 API 密钥。",
			flags: [
				{ name: "-o, --output <格式>", description: "输出格式：`auto`、`json` 或 `text`。`auto` 在管道时输出 JSON，TTY 时输出文本。" },
				{ name: "-v, --verbose", description: "启用详细输出（全局）" },
			],
			steps: [
				{ title: "定位索引", description: "打开仓库的共变数据库（首次运行即创建），报告是否已索引任何提交——从未建过索引的仓库会显示 `Graph: not indexed` 并附构建提示。" },
				{ title: "读取索引元数据", description: "读取最近一次索引到的提交，帮你判断索引有多新鲜。" },
				{ title: "统计行数", description: "统计提交、文件、作者与共变对的数量，以及数据库文件在磁盘上的大小。" },
				{ title: "输出报告", description: "TTY 下打印可读摘要；管道场景或加 `-o json` 时输出 JSON，供脚本或智能体消费。" },
			],
		},
		skillsData: {
			cmd: "git-agent skills",
			description: "从 CLI 读取使用文档",
			usage: "git-agent skills get <名称> | git-agent skills list",
			overview:
				"从已安装的二进制打印 git-agent 自身的使用文档，保证内容永远与你运行的版本一致。`skills get core` 输出主使用指南——触发时机、工作流、参数、退出码；`skills get cli` 输出完整命令参考（全部参数、子命令、配置作用域、hook 类型）；`skills list` 列出所有可用文档。仓库中的技能 stub（`skills/using-git-agent/SKILL.md`）是指向这里的发现层，因此说明永不过时。",
			flags: [],
			steps: [
				{ title: "选择文档", description: "`git-agent skills list` 列出可用文档：`core` 是主使用指南，`cli` 是完整命令参考。" },
				{ title: "打印文档", description: "`git-agent skills get core`（或 `cli`）把 markdown 指南打印到 stdout——与你安装的版本完全一致的内容。" },
			],
		},
		configData: {
			cmd: "git-agent config",
			description: "管理 provider 配置",
			usage: "git-agent config show | config set <键> <值> [--user|--project|--local] | config get <键>",
			overview:
				"在三种作用域中管理 git-agent 配置：`--user`（`~/.config/git-agent/config.yml`）、`--project`（`.git-agent/config.yml`，纳入版本库）、`--local`（`.git-agent/config.local.yml`，被 gitignore）。`config show` 打印解析后的 provider 配置（api_key 打码、model、base_url）。`config set <键> <值>` 写入配置——provider 键默认写入 `--user`，其余默认写入 `--project`；键名同时接受 snake_case 与 kebab-case。`config get <键>` 显示解析后的值及其来源作用域（解析顺序：local > project > user；provider 键只从 user 作用域解析）。",
			flags: [
				{ name: "--user", description: "写入 `~/.config/git-agent/config.yml`（provider 键：api_key、base_url、model）" },
				{ name: "--project", description: "写入 `.git-agent/config.yml`——共享配置，纳入版本库" },
				{ name: "--local", description: "写入 `.git-agent/config.local.yml`——个人覆盖，被 gitignore" },
			],
			steps: [
				{ title: "查看解析后的配置", description: "`git-agent config show` 打印生效的 provider 配置——api_key 打码、model、base_url——综合参数、`git config`、用户配置文件与构建默认值后的结果。" },
				{ title: "设置值", description: "`git-agent config set <键> <值>` 写入所选作用域（provider 键默认 `--user`，其余默认 `--project`）。键名支持 snake_case 或 kebab-case。" },
				{ title: "检查值", description: "`git-agent config get <键>` 显示解析后的值与来源——local 覆盖 project，project 覆盖 user；provider 键只从 user 作用域解析。" },
			],
		},
	},
};
