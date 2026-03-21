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
		homeSubtitle: "AI-first Git CLI. Automated conventional commits, powered by LLMs.",
		viewDetails: "View details →",

		// Entry cards
		initTitle: ["Initialize", "your repo"],
		initDescription:
			"Analyze commit history to derive scopes, install a pre-commit hook, and generate a .gitignore — all in one command.",
		initFeatures: [
			"AI-derived commit scopes",
			"Built-in conventional commits hook",
			".gitignore generation",
			"Merge-safe config updates",
		],
		commitTitle: ["Generate", "smart commits"],
		commitDescription:
			"Stage all tracked changes, split into atomic commits, generate conventional messages, and validate with your pre-commit hook.",
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
			"~4,200 input + ~400 output per commit. Based on actual usage data. Source: official provider pricing pages, Mar 2026.",

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
			overview: "Set up git-agent in the current repository. With no flags, runs scope generation, installs an empty pre-commit hook (only if no existing hook_type found), and generates a .gitignore — all in one step. Each behavior can be triggered individually via flags. If project.yml already has hook_type configured, it will be preserved unless --force is used.",
			flags: [
				{ name: "--scope", description: "Generate scopes via AI analysis of commit history and project structure" },
				{ name: "--hook-type <value>", description: "Built-in hook template: conventional or empty — records hook_type in .git-agent/project.yml, no file written", default: "empty" },
				{ name: "--hook-script <path>", description: "Path to custom hook script — copied to .git-agent/hooks/pre-commit; absolute path recorded in project.yml" },
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
				{ title: "Generate scopes via LLM", description: "Calls the configured LLM to derive commit scopes from actual directory names. Scopes are derived strictly from real directories — never invented from filenames or commit types." },
				{ title: "Write project config", description: "Saves generated scopes to .git-agent/project.yml. Merges with existing scopes unless --force is set." },
				{ title: "Install git hook", description: 'For built-in types (conventional, empty): records hook_type in .git-agent/project.yml only — no file written. The "conventional" type validates Conventional Commits format with a Go-native validator; "empty" always passes. For a custom script (--hook-script): copies the file to .git-agent/hooks/pre-commit and records the absolute path in project.yml.' },
				{ title: "Generate .gitignore", description: "Asks the LLM to produce a .gitignore tailored to the detected project structure. Skipped if a .gitignore already exists, unless --force is set." },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "Generate AI-powered commits",
			usage: "git-agent commit [--dry-run] [--intent <text>] [--amend] [--no-stage] [--co-author <name>] [--trailer <key:value>] [--no-attribution] [--free]",
			overview: "Stages all tracked changes, intelligently groups them into atomic commits (up to 5 groups per run), generates conventional commit messages using an LLM, validates against your pre-commit hook, and retries on failure.",
			flags: [
				{ name: "--dry-run", description: "Print planned commit messages without actually committing" },
				{ name: "--intent <text>", description: "Describe the intent of the change — acts as the primary directive for the LLM's grouping and message decisions" },
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
				{ title: "Resolve configuration", description: "Resolves settings with 4-level priority: CLI flags > git config --local > ~/.config/git-agent/config.yml > build-time defaults. If --free is set, ignores git config and build-time defaults. If the active key matches the built-in credential, runs in FREE mode — no API key setup required." },
				{ title: "Collect diffs", description: "Unless --no-stage is set, runs git add --all to stage all tracked changes. Then reads both staged and unstaged diffs to understand the full scope of changes." },
				{ title: "Plan commits via LLM", description: "Groups changed files into logical atomic commits by concern (feat, fix, refactor, test, docs), capped at 5 groups. The --intent flag acts as the primary directive for grouping decisions." },
				{ title: "Generate commit messages", description: "For each group, generates a Conventional Commits title (≤50 chars), body (bullet points + explanation paragraph), and a human-readable outline." },
				{ title: "Validate with hook", description: "Runs .git-agent/hooks/pre-commit with the diff and message. On failure, feeds the error back to the LLM and retries up to 3 times per group." },
				{ title: "Commit or re-plan", description: "Creates the git commit on success. If the hook keeps blocking after retries, triggers a full re-plan (up to 2 re-plans total) before exiting with code 2." },
			],
		},
	},
	zh: {
		// Home view
		homeTitle: "git-agent",
		homeSubtitle: "AI 优先的 Git CLI 工具。自动化 Conventional Commits，由 LLM 驱动。",
		viewDetails: "查看详情 →",

		// Entry cards
		initTitle: ["初始化", "你的仓库"],
		initDescription:
			"分析提交历史以获取作用域，安装 pre-commit hook，并生成 .gitignore — 一步完成。",
		initFeatures: [
			"AI 推导的提交作用域",
			"内置 Conventional Commits hook",
			".gitignore 生成",
			"安全的配置合并",
		],
		commitTitle: ["生成", "智能提交"],
		commitDescription:
			"暂存所有跟踪的更改，拆分为原子提交，生成符合规范的消息，并使用 pre-commit hook 进行验证。",
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
			"每次提交约 4,200 输入 + 400 输出。基于实际使用数据。来源：官方提供商定价页面，2026年3月。",

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
			overview: "在当前仓库中设置 git-agent。不带参数时，运行作用域生成、安装空的 pre-commit hook（仅当没有现有 hook_type 时），并生成 .gitignore — 一步完成。每种行为也可以通过参数单独触发。如果 project.yml 已配置 hook_type，将保留现有值，除非使用 --force。",
			flags: [
				{ name: "--scope", description: "通过 AI 分析提交历史和项目结构生成作用域" },
				{ name: "--hook-type <值>", description: "内置 hook 模板：conventional 或 empty — 在 .git-agent/project.yml 中记录 hook_type，不写入文件", default: "empty" },
				{ name: "--hook-script <路径>", description: "自定义 hook 脚本路径 — 复制到 .git-agent/hooks/pre-commit；在 project.yml 中记录绝对路径" },
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
				{ title: "通过 LLM 生成作用域", description: "调用配置的 LLM 从实际目录名推导提交作用域。作用域严格从真实目录推导，绝不凭空创造。" },
				{ title: "写入项目配置", description: "将生成的作用域保存到 .git-agent/project.yml。除非设置 --force，否则与现有作用域合并。" },
				{ title: "安装 git hook", description: "对于内置类型（conventional、empty）：只在 .git-agent/project.yml 中记录 hook_type，不写入文件。\"conventional\" 类型使用 Go 原生验证器验证 Conventional Commits 格式；\"empty\" 始终通过。对于自定义脚本（--hook-script）：将文件复制到 .git-agent/hooks/pre-commit，并在 project.yml 中记录绝对路径。" },
				{ title: "生成 .gitignore", description: "让 LLM 根据检测到的项目结构生成定制的 .gitignore。如果 .gitignore 已存在则跳过，除非设置 --force。" },
			],
		},
		commitData: {
			cmd: "git-agent commit",
			description: "生成 AI 驱动的提交",
			usage: "git-agent commit [--dry-run] [--intent <文本>] [--amend] [--no-stage] [--co-author <名称>] [--trailer <键:值>] [--no-attribution] [--free]",
			overview: "暂存所有跟踪的更改，智能地将它们分组为原子提交（每次最多 5 组），使用 LLM 生成符合规范的提交消息，根据 pre-commit hook 进行验证，失败时重试。",
			flags: [
				{ name: "--dry-run", description: "打印计划的提交消息，但不实际提交" },
				{ name: "--intent <文本>", description: "描述更改的意图 — 作为 LLM 分组和消息决策的主要指令" },
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
				{ title: "解析配置", description: "按 4 级优先级解析设置：CLI 参数 > git config --local > ~/.config/git-agent/config.yml > 构建时默认值。如果设置 --free，则忽略 git config 和构建时默认值。如果活动密钥匹配内置凭证，则以 FREE 模式运行 — 无需设置 API 密钥。" },
				{ title: "收集 diffs", description: "除非设置 --no-stage，否则运行 git add --all 暂存所有跟踪的更改。然后读取已暂存和未暂存的 diff，以了解更改的全部范围。" },
				{ title: "通过 LLM 规划提交", description: "将更改的文件按关注点（feat、fix、refactor、test、docs）分组为逻辑原子提交，每次最多 5 组。--intent 标志作为分组决策的主要指令。" },
				{ title: "生成提交消息", description: "为每个组生成符合 Conventional Commits 的标题（≤50 字符）、正文（项目符号 + 说明段落）和人类可读的概要。" },
				{ title: "使用 hook 验证", description: "使用 diff 和消息运行 .git-agent/hooks/pre-commit。失败时，将错误反馈给 LLM 并重试，每组最多 3 次。" },
				{ title: "提交或重新规划", description: "成功时创建 git 提交。如果 hook 在重试后仍然阻止，则触发完整重新规划（最多 2 次），然后以代码 2 退出。" },
			],
		},
	},
};
