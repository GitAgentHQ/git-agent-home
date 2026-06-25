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

	// Entry cards
	initTitle: [string, string];
	initDescription: string;
	initFeatures: string[];
	commitTitle: [string, string];
	commitDescription: string;
	commitFeatures: string[];
	impactTitle: [string, string];
	impactDescription: string;
	impactFeatures: string[];
	timelineTitle: [string, string];
	timelineDescription: string;
	timelineFeatures: string[];
	diagnoseTitle: [string, string];
	diagnoseDescription: string;
	diagnoseFeatures: string[];
	provenanceTitle: [string, string];
	provenanceDescription: string;
	provenanceFeatures: string[];

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
	impactData: CommandData;
	timelineData: CommandData;
	diagnoseData: CommandData;
	provenanceData: CommandData;

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
			"AI Git assistant that splits changes into atomic commits and writes conventional messages — free to use, no API key needed.",
		homeInstallHint: "Copy the line below and paste it into any coding agent.",
		homeInstallCopyLine: "Install git-agent — follow https://git-agent.dev/install.md",
		copy: "Copy",
		copied: "Copied",
		viewDetails: "View details →",

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
		impactTitle: ["Find related", "code and files"],
		impactDescription:
			"Surface the files and symbols that move with your changes — from co-change history and AST structure. Offline, no API key.",
		impactFeatures: [
			"Co-change impact from git history",
			"Structural impact via AST symbols",
			"Combined mode unions both signals",
			"Offline — no LLM or API key",
			"JSON or text output",
		],
		timelineTitle: ["Review agent", "action history"],
		timelineDescription:
			"See recent agent and human actions grouped into sessions — observed automatically as a Claude Code hook and appended to a tamper-evident, offline event log.",
		timelineFeatures: [
			"Session-grouped action history",
			"Tamper-evident hash-chained log",
			"Secrets redacted before storage",
			"Auto-captured via PostToolUse hook",
			"Offline — no LLM or API key",
		],
		diagnoseTitle: ["Trace a regression", "to its cause"],
		diagnoseDescription:
			"Point at a failing test and get the ranked agent actions that most likely introduced it — deterministic, offline, with the before/after diff for each suspect.",
		diagnoseFeatures: [
			"Suspect window from test outcomes",
			"Ranked by co-change and churn",
			"Before/after diff per suspect",
			"Optional LLM re-rank of the top-N",
			"Refuses a tampered log (exit 4)",
		],
		provenanceTitle: ["Audit every change", "to a file"],
		provenanceDescription:
			"Reconstruct a file's full, rename-aware history from the event log — every agent edit and out-of-band change, attributed and ordered. Offline, read-only.",
		provenanceFeatures: [
			"Rename-aware change history",
			"Out-of-band edits flagged",
			"Per-change before/after blobs",
			"Backed by a verifiable hash chain",
			"Offline — no LLM or API key",
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
			"See how git-agent compares to other AI commit tools across atomic splitting, free tier access, and hook integration.",
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
				"git-agent init [--scope] [--hook <value>] [--gitignore] [--force] [--local] [--user] [--max-commits <n>] [--api-key <key>] [--model <name>] [--base-url <url>]",
			overview:
				"Set up `git-agent` in the current repo. With no flags, runs the full setup wizard: ensures a git repo exists (runs `git init` if needed), generates `.gitignore` via AI, generates commit scopes with descriptions from git history via AI, and writes `.git-agent/config.yml` with scopes and `hook: [conventional]`. Each step can also run alone via flags. Existing `.git-agent/config.yml` stays put unless you pass `--force`. Use `git-agent config set hook <value>` to reconfigure hooks. Prefer `FREE` or `~/.config/git-agent/config.yml` over `init` provider flags.",
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
						"One-off API key override. Prefer `FREE` or `~/.config/git-agent/config.yml`; use only when you need a temporary override.",
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
				{ name: "-v, --verbose", description: "Enable verbose output (global)" },
			],
			steps: [
				{
					title: "Validate environment",
					description:
						"Ensures a git repo exists (runs `git init` if needed) and resolves provider key: prefer official `FREE` (no flags); else `~/.config/git-agent/config.yml` or `git config`; use `init` provider flags only for explicit one-off needs.",
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
			usage: "git-agent commit [--dry-run] [--intent <text>] [--amend] [--no-stage] [--co-author <name>] [--trailer <key:value>] [--no-attribution] [--free]",
			overview:
				"Stages tracked changes, groups them into up to five atomic commits per run, drafts conventional messages with an `LLM`, validates via `hook` from `config.yml` (`empty`, `conventional`, or custom script), and retries or re-plans when validation fails. Prefer running without provider flags (`FREE` or `~/.config/git-agent/config.yml`).",
			flags: [
				{ name: "--dry-run", description: "Print planned commit messages without creating commits" },
				{ name: "--intent <text>", description: "Free-text hint for how to group changes and phrase messages" },
				{ name: "--amend", description: "Regenerate and amend the most recent commit message" },
				{ name: "--no-stage", description: "Skip auto-staging; only commit already-staged changes" },
				{ name: "--co-author <name>", description: 'Add a co-author trailer, e.g. "Name <email@domain>" (repeatable). Required on every invocation when `require_model_co_author` is set in config.' },
				{ name: "--trailer <value>", description: 'Add an arbitrary git trailer, format "Key: Value" (repeatable)' },
				{ name: "--no-attribution", description: "Omit the default Git Agent co-author signature" },
				{ name: "--max-diff-lines <n>", description: "Maximum diff lines to send to the model; set to limit token cost", default: "0 (no limit)" },
				{
					name: "--free",
					description:
						"Use only build-time embedded credentials; ignores `git config`, config file, and build defaults; not combinable with `--api-key`, `--model`, or `--base-url`",
				},
				{
					name: "--api-key <key>",
					description:
						"One-off API key override. Prefer `FREE` or `~/.config/git-agent/config.yml`; use only for explicit temporary overrides.",
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
				{ name: "-v, --verbose", description: "Enable verbose output including retry details and hook feedback" },
			],
			steps: [
				{
					title: "Resolve configuration",
					description:
						"Prefer no provider flags (official `FREE` when available); if missing key and no `~/.config/git-agent/config.yml`, add that file or `git config` before using `--api-key`/`--model`/`--base-url`. When several sources exist, precedence is: CLI flags > `git config --local` > `~/.config/git-agent/config.yml` > build defaults. `--free` uses embedded credentials only.",
				},
				{ title: "Collect diffs", description: "Unless `--no-stage` is set, runs `git add --all` to stage all tracked changes. Then reads both staged and unstaged diffs to understand the full scope of changes." },
				{ title: "Plan commits via LLM", description: "Groups files into up to five atomic commits by concern (`feat`, `fix`, `refactor`, `test`, `docs`). `--intent` steers grouping when set." },
				{ title: "Generate commit messages", description: "Each group gets a Conventional Commits title (≤50 chars), a body with bullets and a short explanation, and an outline." },
				{ title: "Validate with hook", description: "Uses `hook` from `config.yml`: `empty` skips checks; `conventional` runs in-process validation; a script path runs validation then that executable. Failures feed `stderr` back to the `LLM`, up to 3 tries per group." },
				{ title: "Commit or re-plan", description: "Creates commits when the hook passes. After repeated hook failures, runs up to two full re-plans, then exits with code 2." },
			],
		},
		impactData: {
			cmd: "git-agent graph impact",
			description: "Find files and symbols related to your changes",
			usage:
				"git-agent graph impact [path...] [--symbol <name>] [--mode <mode>] [--depth <n>] [--top <n>] [--min-count <n>] [--reindex] [--json|--text]",
			overview:
				"Find the files or symbols related to a set of seeds. Three modes: `cochange` (default) returns files that historically change together; `structural` (with `--symbol`) returns AST symbols that call, are called by, or reference the seed; `combined` unions both. With no arguments, the seeds are your current working-tree changes — \"given what I've edited, what else usually moves?\". The first run auto-indexes git history; every query runs offline with no `LLM` and no API key. Tooling directories (`.git-agent/`, `.claude/`) are never used as seeds.",
			flags: [
				{ name: "--symbol <name>", description: "Query structural impact by symbol name (auto-selects `structural` mode)" },
				{ name: "--mode <mode>", description: "Impact mode: `cochange`, `structural`, or `combined`", default: "cochange (or structural with --symbol)" },
				{ name: "--depth <n>", description: "Transitive co-change depth; entries beyond depth 1 are marked `[indirect, depth N]`", default: "1" },
				{ name: "--top <n>", description: "Maximum number of results", default: "20" },
				{ name: "--min-count <n>", description: "Minimum co-change count to include (index floor is 2)", default: "3" },
				{ name: "--reindex", description: "Force a full re-index of git history before querying" },
				{ name: "--json / --text", description: "Force output format (default: JSON when piped, text on a TTY)" },
			],
			steps: [
				{ title: "Resolve seeds", description: "Takes seed files/directories from the arguments, or — with no arguments — your current working-tree changes. Directories expand to tracked files; tooling paths are excluded." },
				{ title: "Index git history", description: "On the first run (or with `--reindex`), builds a local SQLite graph of co-change and AST data. Subsequent runs reuse it incrementally." },
				{ title: "Query the graph", description: "Co-change mode walks file-coupling history; structural mode walks AST call/reference edges from the seed symbol; combined mode runs both." },
				{ title: "Rank and aggregate", description: "Neighbours are aggregated across seeds, so a file coupled to several seeds ranks above one coupled to a single seed." },
				{ title: "Output results", description: "Prints ranked paths or symbols as text or JSON. No commit is created — `impact` is read-only and offline." },
			],
		},
		timelineData: {
			cmd: "git-agent graph timeline",
			description: "Review recent agent and human action history",
			usage:
				"git-agent graph timeline [--file <path>] [--source <src>] [--since <2h|7d|RFC3339>] [--top <n>] [--json|--text]",
			overview:
				"Show recent agent and human action history grouped into sessions, with the tool and files for each action. The history is populated by `git-agent capture` — a hidden, fast (<200ms) command that observes each action's payload (the tool, files, and command) from the PostToolUse hook, redacts secrets, and appends it to a tamper-evident, append-only event log. `init --agent-hook` installs it as a Claude Code `PostToolUse` hook, so actions are recorded automatically with no `LLM` and without ever blocking the agent. Tooling directories are excluded, and every query runs offline.",
			flags: [
				{ name: "--file <path>", description: "Only show sessions and actions that touched this file" },
				{ name: "--source <src>", description: "Filter by action source (e.g. `claude-code`, `cursor`, `human`)" },
				{ name: "--since <window>", description: "Only show actions newer than a relative window (`2h`, `7d`) or an RFC3339 timestamp" },
				{ name: "--top <n>", description: "Maximum number of sessions to show", default: "50" },
				{ name: "--json / --text", description: "Force output format (default: JSON when piped, text on a TTY)" },
			],
			steps: [
				{ title: "Capture observes actions", description: "`git-agent capture` (installed by `init --agent-hook` as a `PostToolUse` hook) observes each action's payload — the tool, files, and command — redacts secrets, and appends it to a tamper-evident, append-only event log." },
				{ title: "Group into sessions", description: "Actions are grouped into sessions by source and instance, so a run of edits reads as one coherent session." },
				{ title: "Filter", description: "Applies `--file`, `--source`, and `--since` to narrow the history to what you care about." },
				{ title: "Display", description: "Prints sessions newest-first with each action's tool and files, as text or JSON. Read-only and offline." },
			],
		},
		diagnoseData: {
			cmd: "git-agent graph diagnose",
			description: "Trace a regression to its cause",
			usage:
				"git-agent graph diagnose [symptom] [--file <path>] [--llm] [--top <n>] [--force] [--json|--text]",
			overview:
				"Point `git-agent graph diagnose` at a failing symptom — a test name, or nothing to use the most recent failure — and it names the agent action that most likely introduced it. It verifies the Event Log, derives the Suspect Window between the last passing and first failing test Outcome, expands the relevant file set via co-change `impact`, then ranks the suspect actions deterministically. Each Candidate carries the before/after File Blob Refs, so the introducing diff can be reconstructed. Everything runs offline with no `LLM`; `--llm` only re-orders the top-N, never adding candidates. A tampered Event Log exits 4 unless `--force`.",
			flags: [
				{ name: "--file <path>", description: "Seed file(s) to anchor the relevant set (repeatable)" },
				{ name: "--top <n>", description: "Number of top candidates passed to the LLM re-rank", default: "5" },
				{ name: "--llm", description: "Re-rank the top candidates with the configured `LLM` (reorders only)" },
				{ name: "--llm-model <name>", description: "Model for the re-rank (overrides `git-agent.diagnose-model`; default: the main model)" },
				{ name: "--force", description: "Proceed despite an Event Log chain integrity break" },
				{ name: "--json", description: "Emit the diagnosis result as JSON" },
			],
			steps: [
				{ title: "Verify the chain", description: "Walks the hash-chained Event Log and refuses (exit 4) on any integrity break unless `--force`." },
				{ title: "Derive the suspect window", description: "Finds the last green and first red test Outcome Events for the symptom — the window in which the regression entered." },
				{ title: "Expand the relevant set", description: "Seeds (from `--file` or the failing test's files) are expanded by co-change `impact` so coupled files are considered too." },
				{ title: "Rank candidates", description: "Scores each suspect action by recency, impact overlap, churn, and later reverts; `--llm` may reorder the top-N but never adds candidates." },
				{ title: "Output the diagnosis", description: "Prints ranked suspects with their before/after blob refs as text or JSON. Read-only — no commit, no mutation." },
			],
		},
		provenanceData: {
			cmd: "git-agent graph provenance",
			description: "Audit the change history of a file",
			usage: "git-agent graph provenance <file> [--json|--text]",
			overview:
				"Reconstruct a file's full, rename-aware history from the Event Log. `git-agent graph provenance <file>` merges every captured change (from `event_files`) with any out-of-band changes and folds in the file's pre-rename identities, so you see what touched it and when. Out-of-band rows — content no observed action explains (source `unknown`) — are flagged, surfacing blind-spot edits. Backed by the same hash-chained log `graph verify` checks for tampering. Read-only and offline.",
			flags: [
				{ name: "--json", description: "Emit the provenance view as JSON" },
			],
			steps: [
				{ title: "Resolve identities", description: "Follows renames so the file's pre-rename paths are included in its history." },
				{ title: "Merge the event log", description: "Collects every captured change and out-of-band change for those identities from the append-only Event Log." },
				{ title: "Flag out-of-band", description: "Marks rows whose content no observed agent action explains (source `unknown`)." },
				{ title: "Display", description: "Prints the chronological, rename-aware history with per-change blob refs as text or JSON. Read-only and offline." },
			],
		},
	},
	zh: {
		// Home view
		homeTitle: "git-agent",
		homeSubtitle:
			"AI Git 助手，自动将变更拆分为原子提交并生成规范提交消息 — 免费使用，无需配置 API 密钥。",
		homeInstallHint: "复制下方整行，粘贴到任意编程助手即可。",
		homeInstallCopyLine: "安装 git-agent — 请按 https://git-agent.dev/install.md 中的指引操作",
		copy: "复制",
		copied: "已复制",
		viewDetails: "查看详情 →",

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
		impactTitle: ["查找相关", "代码与文件"],
		impactDescription:
			"根据共变历史与 AST 结构，找出会随你的改动一起变化的文件与符号。离线运行，无需 API 密钥。",
		impactFeatures: [
			"基于 git 历史的共变影响",
			"基于 AST 符号的结构影响",
			"combined 模式融合两种信号",
			"离线运行 — 无需 LLM 或 API 密钥",
			"JSON 或文本输出",
		],
		timelineTitle: ["回顾智能体", "操作历史"],
		timelineDescription:
			"按会话分组查看近期智能体与人工的操作 — 作为 Claude Code hook 自动观测，追加到防篡改的离线事件日志。",
		timelineFeatures: [
			"按会话分组的操作历史",
			"防篡改的哈希链事件日志",
			"存储前自动脱敏密钥",
			"通过 PostToolUse hook 自动捕获",
			"离线运行 — 无需 LLM 或 API 密钥",
		],
		diagnoseTitle: ["把回归追溯", "到根因"],
		diagnoseDescription:
			"指向一个失败的测试，即可得到最可能引入它的智能体操作排序 —— 确定性、离线，并附带每个嫌疑操作的前后 diff。",
		diagnoseFeatures: [
			"由测试结果界定嫌疑窗口",
			"按共变与改动量排序",
			"每个嫌疑附前后 diff",
			"可选 LLM 对前 N 名重排",
			"日志被篡改则拒绝（退出码 4）",
		],
		provenanceTitle: ["审计文件的", "每一次改动"],
		provenanceDescription:
			"从事件日志重建文件完整的、识别重命名的历史 —— 每次智能体编辑与带外改动，均有归属并按序排列。离线、只读。",
		provenanceFeatures: [
			"识别重命名的改动历史",
			"带外编辑被标记",
			"每次改动附前后 blob",
			"由可验证的哈希链支撑",
			"离线运行 — 无需 LLM 或 API 密钥",
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
			"了解 git-agent 与其他 AI 提交工具的区别——原子拆分、免费套餐、钩子集成。",
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
				"git-agent init [--scope] [--hook <值>] [--gitignore] [--force] [--local] [--user] [--max-commits <n>] [--api-key <密钥>] [--model <名称>] [--base-url <地址>]",
			overview:
				"在当前仓库启用 `git-agent`。无参数时运行完整向导：确保 git 仓库存在（必要时运行 `git init`）、通过 AI 生成 `.gitignore`、从 git 历史通过 AI 生成带描述的提交作用域，并将作用域和 `hook: [conventional]` 写入 `.git-agent/config.yml`。各步也可单独用参数触发。已有 `.git-agent/config.yml` 会保留，除非加 `--force`。用 `git-agent config set hook <值>` 重新配置 hook。优先 `FREE` 或 `~/.config/git-agent/config.yml`，再考虑 `init` 的 `provider` 参数。",
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
						"临时覆盖 API 密钥。优先 `FREE` 或 `~/.config/git-agent/config.yml`；仅在需要一次性覆盖时使用。",
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
				{ name: "-v, --verbose", description: "启用详细输出（全局）" },
			],
			steps: [
				{
					title: "验证环境",
					description:
						"确保 git 仓库存在（必要时运行 `git init`），解析密钥来源：优先官方 `FREE`（无额外参数）；否则 `~/.config/git-agent/config.yml` 或 `git config`；仅在明确需要时使用 `init` 的 `provider` 参数。",
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
			usage: "git-agent commit [--dry-run] [--intent <文本>] [--amend] [--no-stage] [--co-author <名称>] [--trailer <键:值>] [--no-attribution] [--free]",
			overview:
				"暂存已跟踪的改动，每次运行最多分成五组原子提交，用 `LLM` 起草规范说明，按 `config.yml` 的 `hook` 校验（`empty`、`conventional` 或自定义脚本），失败则重试或重规划。默认优先不带 `provider` 参数（`FREE` 或 `~/.config/git-agent/config.yml`）。",
			flags: [
				{ name: "--dry-run", description: "只打印拟定的提交说明，不创建提交" },
				{ name: "--intent <文本>", description: "自由文本，提示如何分组改动和写说明" },
				{ name: "--amend", description: "重新生成并修正最近的提交消息" },
				{ name: "--no-stage", description: "跳过自动暂存；只提交已暂存的更改" },
				{ name: "--co-author <名称>", description: "添加合著者 trailer，例如 \"Name <email@domain>\"（可重复）。配置中开启 `require_model_co_author` 后，每次调用都必须传。" },
				{ name: "--trailer <值>", description: "添加任意 git trailer，格式为 \"Key: Value\"（可重复）" },
				{ name: "--no-attribution", description: "不添加默认的合著者签名（Git Agent）" },
				{ name: "--max-diff-lines <n>", description: "发送给模型的最大 diff 行数；用于限制 token 成本", default: "0（无限制）" },
				{
					name: "--free",
					description:
						"仅使用构建时嵌入的凭证；忽略 `git config`、配置文件与构建默认值；不可与 `--api-key`、`--model`、`--base-url` 同时使用",
				},
				{
					name: "--api-key <密钥>",
					description:
						"临时覆盖 API 密钥。优先 `FREE` 或 `~/.config/git-agent/config.yml`；仅在需要一次性覆盖时使用。",
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
				{ name: "-v, --verbose", description: "启用详细输出，包括重试详情和 hook 反馈" },
			],
			steps: [
				{
					title: "解析配置",
					description:
						"向用户说明：默认不带 `provider` 参数（官方 `FREE` 可用时）；若缺密钥且无 `~/.config/git-agent/config.yml`，先建议创建该文件或 `git config`，再考虑 `--api-key`/`--model`/`--base-url`。多来源同时存在时：CLI 参数 > `git config --local` > `~/.config/git-agent/config.yml` > 构建默认值。`--free` 仅使用嵌入凭证。",
				},
				{ title: "收集 diffs", description: "除非设置 `--no-stage`，否则运行 `git add --all` 暂存所有跟踪的更改。然后读取已暂存和未暂存的 diff，以了解更改的全部范围。" },
				{ title: "通过 LLM 规划提交", description: "按关注点（`feat`、`fix`、`refactor`、`test`、`docs`）把文件分成最多五组原子提交。有 `--intent` 时优先按其提示分组。" },
				{ title: "生成提交消息", description: "每组一条 Conventional Commits 标题（≤50 字）、带项目符号与短说明的正文，以及一段概要。" },
				{ title: "使用 hook 验证", description: "按 `config.yml` 的 `hook`：`empty` 跳过；`conventional` 进程内校验；脚本路径先校验再执行该文件。失败将 `stderr` 回给 `LLM`，每组最多 3 次。" },
				{ title: "提交或重新规划", description: "hook 通过则创建提交。若多次仍被 hook 拦住，最多做两轮完整重规划，然后以退出码 2 结束。" },
			],
		},
		impactData: {
			cmd: "git-agent graph impact",
			description: "查找与你的改动相关的文件与符号",
			usage:
				"git-agent graph impact [path...] [--symbol <名称>] [--mode <模式>] [--depth <n>] [--top <n>] [--min-count <n>] [--reindex] [--json|--text]",
			overview:
				"找出与一组种子相关的文件或符号。三种模式：`cochange`（默认）返回历史上一起变化的文件；`structural`（配合 `--symbol`）返回调用、被调用或引用该符号的 AST 符号；`combined` 融合两者。不带参数时，种子即为当前工作区的改动 —— “我改了这些，通常还有什么会跟着动？”。首次运行会自动索引 git 历史；之后每次查询都离线运行，无需 `LLM`，无需 API 密钥。工具目录（`.git-agent/`、`.claude/`）永远不作为种子。",
			flags: [
				{ name: "--symbol <名称>", description: "按符号名查询结构影响（自动选择 `structural` 模式）" },
				{ name: "--mode <模式>", description: "影响模式：`cochange`、`structural` 或 `combined`", default: "cochange（带 --symbol 时为 structural）" },
				{ name: "--depth <n>", description: "共变传递深度；深度大于 1 的条目标记为 `[indirect, depth N]`", default: "1" },
				{ name: "--top <n>", description: "最大结果数量", default: "20" },
				{ name: "--min-count <n>", description: "纳入结果的最小共变次数（索引下限为 2）", default: "3" },
				{ name: "--reindex", description: "查询前强制重新索引整个 git 历史" },
				{ name: "--json / --text", description: "强制输出格式（默认：管道时 JSON，TTY 上为文本）" },
			],
			steps: [
				{ title: "解析种子", description: "从参数取种子文件/目录；不带参数时取当前工作区改动。目录展开为跟踪的文件，工具路径被排除。" },
				{ title: "索引 git 历史", description: "首次运行（或带 `--reindex`）时构建本地 SQLite 图，包含共变与 AST 数据；之后增量复用。" },
				{ title: "查询图", description: "cochange 模式遍历文件耦合历史；structural 模式从种子符号遍历 AST 调用/引用边；combined 模式两者都跑。" },
				{ title: "排序与聚合", description: "邻居跨种子聚合，因此与多个种子耦合的文件排在仅与单个种子耦合的文件之前。" },
				{ title: "输出结果", description: "以文本或 JSON 打印排序后的路径或符号。不创建提交 —— `impact` 只读且离线。" },
			],
		},
		timelineData: {
			cmd: "git-agent graph timeline",
			description: "回顾近期智能体与人工的操作历史",
			usage:
				"git-agent graph timeline [--file <路径>] [--source <来源>] [--since <2h|7d|RFC3339>] [--top <n>] [--json|--text]",
			overview:
				"按会话分组展示近期智能体与人工的操作历史，包含每个操作的工具与文件。历史由 `git-agent capture` 写入 —— 一个隐藏、极快（<200ms）的命令，从 PostToolUse hook 观测每个操作的载荷（工具、文件与命令），脱敏密钥后追加到防篡改、仅追加的事件日志。`init --agent-hook` 将其安装为 Claude Code 的 `PostToolUse` hook，因此操作会自动记录，无需 `LLM`，也绝不阻塞智能体。工具目录被排除，每次查询都离线运行。",
			flags: [
				{ name: "--file <路径>", description: "仅显示触及该文件的会话与操作" },
				{ name: "--source <来源>", description: "按操作来源筛选（如 `claude-code`、`cursor`、`human`）" },
				{ name: "--since <时间窗>", description: "仅显示晚于相对时间窗（`2h`、`7d`）或 RFC3339 时间戳的操作" },
				{ name: "--top <n>", description: "最多显示的会话数量", default: "50" },
				{ name: "--json / --text", description: "强制输出格式（默认：管道时 JSON，TTY 上为文本）" },
			],
			steps: [
				{ title: "capture 观测操作", description: "`git-agent capture`（由 `init --agent-hook` 安装为 `PostToolUse` hook）观测每个操作的载荷 —— 工具、文件与命令 —— 脱敏密钥后追加到防篡改、仅追加的事件日志。" },
				{ title: "分组为会话", description: "操作按来源与实例分组为会话，一连串编辑因此读起来是一个连贯会话。" },
				{ title: "筛选", description: "应用 `--file`、`--source` 与 `--since`，把历史收窄到你关心的范围。" },
				{ title: "展示", description: "按时间从新到旧打印会话，附每个操作的工具与文件，支持文本或 JSON。只读且离线。" },
			],
		},
		diagnoseData: {
			cmd: "git-agent graph diagnose",
			description: "把回归追溯到根因",
			usage:
				"git-agent graph diagnose [症状] [--file <路径>] [--llm] [--top <n>] [--force] [--json|--text]",
			overview:
				"把 `git-agent graph diagnose` 指向一个失败的症状 —— 一个测试名，或不带参数以使用最近一次失败 —— 它便给出最可能引入该回归的智能体操作。它会校验事件日志，界定上次通过与首次失败测试结果之间的嫌疑窗口，通过共变 `impact` 扩展相关文件集，再对嫌疑操作做确定性排序。每个候选都带有前后 File Blob Ref，因此可重建引入问题的 diff。全程离线、无需 `LLM`；`--llm` 只对前 N 名重排，绝不新增候选。日志被篡改时退出码为 4，除非加 `--force`。",
			flags: [
				{ name: "--file <路径>", description: "锚定相关文件集的种子文件（可重复）" },
				{ name: "--top <n>", description: "传给 LLM 重排的候选数量", default: "5" },
				{ name: "--llm", description: "用配置的 `LLM` 对前若干候选重排（仅重排序）" },
				{ name: "--llm-model <名称>", description: "重排所用模型（覆盖 `git-agent.diagnose-model`；默认主模型）" },
				{ name: "--force", description: "在事件日志链完整性被破坏时仍继续" },
				{ name: "--json", description: "以 JSON 输出诊断结果" },
			],
			steps: [
				{ title: "校验链", description: "遍历哈希链事件日志，发现任何完整性破坏即拒绝（退出码 4），除非加 `--force`。" },
				{ title: "界定嫌疑窗口", description: "找到该症状上次通过与首次失败的测试结果事件 —— 回归进入的窗口。" },
				{ title: "扩展相关集", description: "种子（来自 `--file` 或失败测试的文件）经共变 `impact` 扩展，连同耦合文件一并考虑。" },
				{ title: "对候选排序", description: "按新近度、影响重叠、改动量与后续回退为每个嫌疑操作打分；`--llm` 可对前 N 名重排，但绝不新增候选。" },
				{ title: "输出诊断", description: "以文本或 JSON 打印带前后 blob ref 的排序嫌疑。只读 —— 不提交、不改动。" },
			],
		},
		provenanceData: {
			cmd: "git-agent graph provenance",
			description: "审计一个文件的改动历史",
			usage: "git-agent graph provenance <文件> [--json|--text]",
			overview:
				"从事件日志重建文件完整的、识别重命名的历史。`git-agent graph provenance <文件>` 将每次捕获的改动（来自 `event_files`）与任何带外改动合并，并纳入文件重命名前的身份，因此你能看到什么在何时触及了它。带外行 —— 没有任何观测操作能解释的内容（来源 `unknown`）—— 会被标记，从而暴露盲区编辑。其背后正是 `graph verify` 用来检测篡改的同一条哈希链。只读且离线。",
			flags: [
				{ name: "--json", description: "以 JSON 输出溯源视图" },
			],
			steps: [
				{ title: "解析身份", description: "跟随重命名，把文件重命名前的路径纳入其历史。" },
				{ title: "合并事件日志", description: "从仅追加的事件日志中，收集这些身份的每次捕获改动与带外改动。" },
				{ title: "标记带外", description: "标记其内容没有任何观测智能体操作可解释的行（来源 `unknown`）。" },
				{ title: "展示", description: "以文本或 JSON 打印按时间排序、识别重命名的历史，附每次改动的 blob ref。只读且离线。" },
			],
		},
	},
};
