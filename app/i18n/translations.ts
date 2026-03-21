export type Language = "en" | "zh";

export interface Translations {
	// Home view
	homeTitle: string;
	homeSubtitle: string;
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
		homeSubtitle: "Git CLI for conventional commits and atomic splits, with LLM-backed drafting.",
		viewDetails: "View details →",

		// Entry cards
		initTitle: ["Initialize", "your repo"],
		initDescription:
			"Derive scopes from commit history, add a pre-commit hook, and generate .gitignore in one command.",
		initFeatures: [
			"Scopes from history and tree",
			"Built-in conventional commits hook",
			".gitignore generation",
			"Merge-safe config updates",
		],
		commitTitle: ["Generate", "conventional commits"],
		commitDescription:
			"Stage tracked changes, split into atomic commits, draft messages, and run your pre-commit hook.",
		commitFeatures: [
			"Atomic commit splitting",
			"Conventional Commits format",
			"Hook validation + auto-retry",
			"Dry-run preview",
			"Amend last commit",
		],

		// Pricing
		pricingTitle: "Why git-agent",
		pricingSubtitle: "cost per 1,000 commits",
		pricingNote:
			"~4,200 input + ~400 output tokens per commit. From measured usage. Source: provider pricing pages, Mar 2026.",

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
			usage: "git-agent init [--scope] [--hook-type <type>] [--hook-script <path>] [--gitignore] [--force] [--max-commits <n>]",
			overview:
				"Set up git-agent in the current repo. With no flags: scope generation, an empty pre-commit hook if none is configured yet, and a new .gitignore in one pass. Each step can also run alone via flags. Existing hook_type in project.yml stays put unless you pass --force.",
			flags: [
				{ name: "--scope", description: "Derive scopes from commit history and project layout (LLM)" },
				{ name: "--hook-type <value>", description: "Built-in template: conventional or empty. Stores hook_type in .git-agent/project.yml only; no hook file.", default: "empty" },
				{ name: "--hook-script <path>", description: "Custom hook path. Copied to .git-agent/hooks/pre-commit; absolute path stored in project.yml." },
				{ name: "--gitignore", description: "Generate a .gitignore based on project context" },
				{ name: "--force", description: "Overwrite existing config, hook, and .gitignore without merging" },
				{ name: "--max-commits <n>", description: "Maximum number of commits to analyze for scope generation", default: "200" },
				{ name: "--api-key <key>", description: "API key for the AI provider (overrides config file)" },
				{ name: "--model <name>", description: "Model to use, e.g. gpt-4o (overrides config)" },
				{ name: "--base-url <url>", description: "Base URL for AI provider (overrides config)" },
				{ name: "-v, --verbose", description: "Enable verbose output" },
			],
			steps: [
				{ title: "Validate environment", description: "Checks that the current directory is a Git repository and that an API key is configured in ~/.config/git-agent/config.yml or via --api-key." },
				{ title: "Analyze commit history", description: "Reads up to --max-commits recent commit subjects, the project's top-level directories, and tracked file list (capped at 300 entries)." },
				{ title: "Generate scopes via LLM", description: "Calls the configured LLM to derive scopes from real directory names only, not from filenames or commit types alone." },
				{ title: "Write project config", description: "Saves generated scopes to .git-agent/project.yml. Merges with existing scopes unless --force is set." },
				{ title: "Install git hook", description: 'Built-in conventional or empty: only hook_type in .git-agent/project.yml (no hook file). conventional runs a Go validator on the message; empty always passes. Custom --hook-script: copy to .git-agent/hooks/pre-commit and store the absolute path in project.yml.' },
				{ title: "Generate .gitignore", description: "LLM writes a .gitignore for the detected layout. Skips if one exists unless --force." },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "Generate commits with LLM assistance",
			usage: "git-agent commit [--dry-run] [--intent <text>] [--amend] [--no-stage] [--co-author <name>] [--trailer <key:value>] [--no-attribution] [--free]",
			overview:
				"Stages tracked changes, groups them into up to five atomic commits per run, drafts conventional messages with an LLM, runs your pre-commit hook, and retries when it fails.",
			flags: [
				{ name: "--dry-run", description: "Print planned commit messages without creating commits" },
				{ name: "--intent <text>", description: "Free-text hint for how to group changes and phrase messages" },
				{ name: "--amend", description: "Regenerate and amend the most recent commit message" },
				{ name: "--no-stage", description: "Skip auto-staging; only commit already-staged changes" },
				{ name: "--co-author <name>", description: 'Add a co-author trailer, e.g. "Name <email@domain>" (repeatable)' },
				{ name: "--trailer <value>", description: 'Add an arbitrary git trailer, format "Key: Value" (repeatable)' },
				{ name: "--no-attribution", description: "Omit the default Git Agent co-author signature" },
				{ name: "--max-diff-lines <n>", description: "Maximum diff lines to send to the model; set to limit token cost", default: "0 (no limit)" },
				{ name: "--free", description: "Ignore git config and build-time defaults; use only CLI flags or config file" },
				{ name: "--api-key <key>", description: "API key for the AI provider (overrides config file)" },
				{ name: "--model <name>", description: "Model to use, e.g. gpt-4o (overrides config)" },
				{ name: "--base-url <url>", description: "Base URL for AI provider (overrides config)" },
				{ name: "-v, --verbose", description: "Enable verbose output including retry details and hook feedback" },
			],
			steps: [
				{ title: "Resolve configuration", description: "Priority: CLI flags, then git config --local, then ~/.config/git-agent/config.yml, then build defaults. --free drops git config and build defaults. A matching built-in credential enables FREE mode without an API key." },
				{ title: "Collect diffs", description: "Unless --no-stage is set, runs git add --all to stage all tracked changes. Then reads both staged and unstaged diffs to understand the full scope of changes." },
				{ title: "Plan commits via LLM", description: "Groups files into up to five atomic commits by concern (feat, fix, refactor, test, docs). --intent steers grouping when set." },
				{ title: "Generate commit messages", description: "Each group gets a Conventional Commits title (≤50 chars), a body with bullets and a short explanation, and an outline." },
				{ title: "Validate with hook", description: "Runs .git-agent/hooks/pre-commit with the diff and message. On failure, feeds the error back to the LLM and retries up to 3 times per group." },
				{ title: "Commit or re-plan", description: "Creates commits when the hook passes. After repeated hook failures, runs up to two full re-plans, then exits with code 2." },
			],
		},
	},
	zh: {
		// Home view
		homeTitle: "git-agent",
		homeSubtitle: "面向 Git 的 CLI：用 LLM 起草 Conventional Commits，并把改动拆成原子提交。",
		viewDetails: "查看详情 →",

		// Entry cards
		initTitle: ["初始化", "你的仓库"],
		initDescription:
			"从提交历史推导作用域，安装 pre-commit hook，并生成 .gitignore，一条命令完成。",
		initFeatures: [
			"从历史与目录推导作用域",
			"内置 Conventional Commits hook",
			".gitignore 生成",
			"合并时安全的配置更新",
		],
		commitTitle: ["生成", "规范提交"],
		commitDescription:
			"暂存已跟踪的改动，拆成原子提交，起草消息，并走你的 pre-commit hook。",
		commitFeatures: [
			"原子提交拆分",
			"Conventional Commits 格式",
			"Hook 验证 + 自动重试",
			"预览模式",
			"修改上次提交",
		],

		// Pricing
		pricingTitle: "为什么选择 git-agent",
		pricingSubtitle: "每 1000 次提交的费用",
		pricingNote:
			"每次提交约 4,200 输入 + 400 输出 token。来自实测用量。来源：各厂商定价页，2026 年 3 月。",

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
			usage: "git-agent init [--scope] [--hook-type <类型>] [--hook-script <路径>] [--gitignore] [--force] [--max-commits <n>]",
			overview:
				"在当前仓库启用 git-agent。无参数时：生成作用域、在尚未配置 hook_type 时装空 pre-commit hook、并生成 .gitignore，一次跑完。各步也可单独用参数触发。project.yml 里已有 hook_type 会保留，除非加 --force。",
			flags: [
				{ name: "--scope", description: "根据提交历史与项目布局推导作用域（LLM）" },
				{ name: "--hook-type <值>", description: "内置模板：conventional 或 empty。只把 hook_type 写入 .git-agent/project.yml，不生成 hook 文件。", default: "empty" },
				{ name: "--hook-script <路径>", description: "自定义 hook 路径。复制到 .git-agent/hooks/pre-commit，并把绝对路径记入 project.yml。" },
				{ name: "--gitignore", description: "根据项目上下文生成 .gitignore" },
				{ name: "--force", description: "覆盖现有配置、hook 和 .gitignore，不进行合并" },
				{ name: "--max-commits <n>", description: "用于作用域生成的最大提交数", default: "200" },
				{ name: "--api-key <密钥>", description: "AI 提供商的 API 密钥（覆盖配置文件）" },
				{ name: "--model <名称>", description: "使用的模型，例如 gpt-4o（覆盖配置）" },
				{ name: "--base-url <地址>", description: "AI 提供商的 base URL（覆盖配置）" },
				{ name: "-v, --verbose", description: "启用详细输出" },
			],
			steps: [
				{ title: "验证环境", description: "检查当前目录是否为 Git 仓库，以及是否在 ~/.config/git-agent/config.yml 中配置了 API 密钥或通过 --api-key 指定。" },
				{ title: "分析提交历史", description: "读取最近 --max-commits 条提交主题、项目顶层目录和跟踪文件列表（最多 300 条）。" },
				{ title: "通过 LLM 生成作用域", description: "用已配置的 LLM，仅从真实目录名推导作用域，不单靠文件名或提交类型。" },
				{ title: "写入项目配置", description: "将生成的作用域保存到 .git-agent/project.yml。除非设置 --force，否则与现有作用域合并。" },
				{ title: "安装 git hook", description: "内置 conventional 或 empty：只写 hook_type 到 .git-agent/project.yml，不落地 hook 文件。conventional 用 Go 校验提交说明；empty 始终通过。自定义 --hook-script：复制到 .git-agent/hooks/pre-commit，并在 project.yml 存绝对路径。" },
				{ title: "生成 .gitignore", description: "由 LLM 按当前目录结构写 .gitignore。已存在则跳过，除非加 --force。" },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "用 LLM 辅助生成提交",
			usage: "git-agent commit [--dry-run] [--intent <文本>] [--amend] [--no-stage] [--co-author <名称>] [--trailer <键:值>] [--no-attribution] [--free]",
			overview:
				"暂存已跟踪的改动，每次运行最多分成五组原子提交，用 LLM 起草规范说明，走 pre-commit hook，失败则重试。",
			flags: [
				{ name: "--dry-run", description: "只打印拟定的提交说明，不创建提交" },
				{ name: "--intent <文本>", description: "自由文本，提示如何分组改动和写说明" },
				{ name: "--amend", description: "重新生成并修正最近的提交消息" },
				{ name: "--no-stage", description: "跳过自动暂存；只提交已暂存的更改" },
				{ name: "--co-author <名称>", description: "添加合著者 trailer，例如 \"Name <email@domain>\"（可重复）" },
				{ name: "--trailer <值>", description: "添加任意 git trailer，格式为 \"Key: Value\"（可重复）" },
				{ name: "--no-attribution", description: "不添加默认的合著者签名（Git Agent）" },
				{ name: "--max-diff-lines <n>", description: "发送给模型的最大 diff 行数；用于限制 token 成本", default: "0（无限制）" },
				{ name: "--free", description: "忽略 git config 和构建时默认值；仅使用 CLI 参数或配置文件" },
				{ name: "--api-key <密钥>", description: "AI 提供商的 API 密钥（覆盖配置文件）" },
				{ name: "--model <名称>", description: "使用的模型，例如 gpt-4o（覆盖配置）" },
				{ name: "--base-url <地址>", description: "AI 提供商的 base URL（覆盖配置）" },
				{ name: "-v, --verbose", description: "启用详细输出，包括重试详情和 hook 反馈" },
			],
			steps: [
				{ title: "解析配置", description: "优先级：CLI 参数、git config --local、~/.config/git-agent/config.yml、构建默认值。--free 会跳过 git config 与构建默认值。密钥与内置凭证匹配时可走 FREE 模式，无需单独配 API key。" },
				{ title: "收集 diffs", description: "除非设置 --no-stage，否则运行 git add --all 暂存所有跟踪的更改。然后读取已暂存和未暂存的 diff，以了解更改的全部范围。" },
				{ title: "通过 LLM 规划提交", description: "按关注点（feat、fix、refactor、test、docs）把文件分成最多五组原子提交。有 --intent 时优先按其提示分组。" },
				{ title: "生成提交消息", description: "每组一条 Conventional Commits 标题（≤50 字）、带项目符号与短说明的正文，以及一段概要。" },
				{ title: "使用 hook 验证", description: "用 diff 与说明跑 .git-agent/hooks/pre-commit。失败则把错误回给 LLM 重试，每组最多 3 次。" },
				{ title: "提交或重新规划", description: "hook 通过则创建提交。若多次仍被 hook 拦住，最多做两轮完整重规划，然后以退出码 2 结束。" },
			],
		},
	},
};
