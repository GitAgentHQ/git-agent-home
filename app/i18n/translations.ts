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
				"git-agent init [--scope] [--hook <value>] [--gitignore] [--force] [--local] [--max-commits <n>] [--api-key <key>] [--model <name>] [--base-url <url>]",
			overview:
				"Set up `git-agent` in the current repo. With no flags, runs the full setup wizard: ensures a git repo exists (runs `git init` if needed), generates `.gitignore` via AI, generates commit scopes with descriptions from git history via AI, and writes `.git-agent/config.yml` with scopes and `hook: [conventional]`. Each step can also run alone via flags. Existing `.git-agent/config.yml` stays put unless you pass `--force`. Use `git-agent config set hook <value>` to reconfigure hooks. Prefer `FREE` or `~/.config/git-agent/config.yml` over `init` provider flags.",
			flags: [
				{ name: "--scope", description: "Derive scopes with descriptions from commit history and project layout (`LLM`)" },
				{ name: "--hook <value>", description: "Hook to configure: `conventional`, `empty`, or a file path (repeatable). Stores in `.git-agent/config.yml`." },
				{ name: "--gitignore", description: "Generate a `.gitignore` based on project context" },
				{ name: "--force", description: "Overwrite existing config, hook, and `.gitignore` without merging" },
				{ name: "--local", description: "Write config to `.git-agent/config.local.yml` instead of `config.yml`" },
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
				{ name: "--co-author <name>", description: 'Add a co-author trailer, e.g. "Name <email@domain>" (repeatable)' },
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
				"git-agent init [--scope] [--hook <值>] [--gitignore] [--force] [--local] [--max-commits <n>] [--api-key <密钥>] [--model <名称>] [--base-url <地址>]",
			overview:
				"在当前仓库启用 `git-agent`。无参数时运行完整向导：确保 git 仓库存在（必要时运行 `git init`）、通过 AI 生成 `.gitignore`、从 git 历史通过 AI 生成带描述的提交作用域，并将作用域和 `hook: [conventional]` 写入 `.git-agent/config.yml`。各步也可单独用参数触发。已有 `.git-agent/config.yml` 会保留，除非加 `--force`。用 `git-agent config set hook <值>` 重新配置 hook。优先 `FREE` 或 `~/.config/git-agent/config.yml`，再考虑 `init` 的 `provider` 参数。",
			flags: [
				{ name: "--scope", description: "根据提交历史与项目布局推导带描述的作用域（`LLM`）" },
				{ name: "--hook <值>", description: "要配置的 hook：`conventional`、`empty` 或文件路径（可重复）。存入 `.git-agent/config.yml`。" },
				{ name: "--gitignore", description: "根据项目上下文生成 `.gitignore`" },
				{ name: "--force", description: "覆盖现有配置、hook 和 `.gitignore`，不进行合并" },
				{ name: "--local", description: "将配置写入 `.git-agent/config.local.yml` 而非 `config.yml`" },
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
				{ name: "--co-author <名称>", description: "添加合著者 trailer，例如 \"Name <email@domain>\"（可重复）" },
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
	},
};
