import type { IntegrationEntry, CrossLink, FaqItem } from "./types";
import type { I18nText } from "./types";

export const integrationEntries: IntegrationEntry[] = [
  {
    slug: "github-actions",
    tool: { en: "GitHub Actions", zh: "GitHub Actions" },
    tagline: {
      en: "Automate commit validation and release workflows with git-agent and GitHub Actions",
      zh: "结合 git-agent 与 GitHub Actions，自动化提交验证和发布工作流",
    },
    description: {
      en: "GitHub Actions provides CI/CD pipelines that trigger on push, pull request, or custom events. When paired with git-agent's commit conventions, you can validate every commit message, run linting, and trigger automated releases — all from a single workflow file. git-agent's conventional commit output feeds directly into changelog generation, semantic versioning, and release automation steps in your pipeline.",
      zh: "GitHub Actions 提供基于推送、拉取请求或自定义事件触发的 CI/CD 流水线。与 git-agent 的提交规范结合后，你可以从单一工作流文件中验证每次提交信息、运行代码检查和触发自动发布。git-agent 生成的约定式提交输出可直接用于变更日志生成、语义版本管理和发布自动化步骤。",
    },
    benefits: [
      {
        en: "Validate every commit message against Conventional Commits format in CI",
        zh: "在 CI 中验证每次提交信息是否符合约定式提交格式",
      },
      {
        en: "Automatically determine version bumps from commit history using git-agent's structured output",
        zh: "利用 git-agent 的结构化输出，从提交历史自动确定版本升级类型",
      },
      {
        en: "Trigger atomic release workflows when a conventional commit of type feat or fix is pushed",
        zh: "当推送 feat 或 fix 类型的约定式提交时，触发原子发布工作流",
      },
      {
        en: "Enforce consistent commit quality across team contributions without manual review",
        zh: "无需人工审查即可在团队贡献中强制执行一致的提交质量",
      },
    ],
    setupSteps: [
      {
        en: "Install git-agent locally: brew install gitagenthq/tap/git-agent",
        zh: "本地安装 git-agent：brew install gitagenthq/tap/git-agent",
      },
      {
        en: "Create a .github/workflows/commitlint.yml workflow that checks commit messages on pull request",
        zh: "创建 .github/workflows/commitlint.yml 工作流，在拉取请求时检查提交信息",
      },
      {
        en: "Add a conventional-commit validation step using the structured type and scope from agent output",
        zh: "添加基于 git-agent 输出中的类型和范围结构进行约定式提交验证的步骤",
      },
      {
        en: "Configure a release workflow that reads the commit log and triggers semantic-release or release-please on push to main",
        zh: "配置发布工作流，读取提交日志并在推送到主分支时触发 semantic-release 或 release-please",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Git hooks explained", zh: "Git 钩子详解" },
        href: "/glossary/git-hooks",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "git-agent + CircleCI", zh: "git-agent + CircleCI" },
        href: "/integrations/circleci",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent require a GitHub Actions workflow to function?",
          zh: "git-agent 需要 GitHub Actions 工作流才能运行吗？",
        },
        answer: {
          en: "No. git-agent is a local CLI tool that works entirely offline (except for LLM API calls). GitHub Actions integration is optional for CI validation and release automation.",
          zh: "不需要。git-agent 是一个本地 CLI 工具，完全离线运行（LLM API 调用除外）。GitHub Actions 集成是可选的，用于 CI 验证和发布自动化。",
        },
      },
      {
        question: {
          en: "Can I use git-agent with GitHub Actions without a paid plan?",
          zh: "我可以在没有付费计划的情况下将 git-agent 与 GitHub Actions 一起使用吗？",
        },
        answer: {
          en: "Yes. GitHub Actions provides free minutes for public repositories and a generous free tier for private repos. git-agent itself is free through the shared gateway; only the Actions compute minutes are billed by GitHub.",
          zh: "可以。GitHub Actions 为公共仓库提供免费额度，为私有仓库提供慷慨的免费层。git-agent 本身通过共享网关免费使用，只有 GitHub 的 Actions 计算分钟需要计费。",
        },
      },
      {
        question: {
          en: "Does git-agent integrate with GitHub's Dependabot or security alerts?",
          zh: "git-agent 能与 GitHub 的 Dependabot 或安全警报集成吗？",
        },
        answer: {
          en: "Indirectly. git-agent generates conventional commit messages that Dependabot-style automation can read. If you have a workflow that processes Dependabot PRs, the commit format is compatible with standard changelog and release tooling.",
          zh: "间接集成。git-agent 生成约定式提交信息，Dependabot 风格的工具可以读取。如果你有处理 Dependabot PR 的工作流，提交格式与标准变更日志和发布工具兼容。",
        },
      },
    ],
  },
  {
    slug: "gitlab-ci",
    tool: { en: "GitLab CI", zh: "GitLab CI" },
    tagline: {
      en: "Enforce conventional commits and automate releases with git-agent and GitLab CI/CD",
      zh: "结合 git-agent 与 GitLab CI/CD，强制执行约定式提交并自动化发布",
    },
    description: {
      en: "GitLab CI/CD offers a built-in pipeline system with first-class merge request integration. Combined with git-agent's conventional commit output, you can validate commit messages, enforce commit scope naming, and trigger semantic releases directly from .gitlab-ci.yml. GitLab's built-in CI/CD variables and environments make it straightforward to version and deploy based on git-agent's structured commit data.",
      zh: "GitLab CI/CD 提供内置的流水线系统，与合并请求深度集成。结合 git-agent 的约定式提交输出，你可以从 .gitlab-ci.yml 验证提交信息、强制执行提交范围命名，并触发语义化发布。GitLab 内置的 CI/CD 变量和环境使得基于 git-agent 结构化提交数据进行版本管理和部署变得简单直接。",
    },
    benefits: [
      {
        en: "Validate commit message format in merge request pipelines before review",
        zh: "在审查前的合并请求流水线中验证提交信息格式",
      },
      {
        en: "Extract changelog sections automatically from git-agent's structured commit log",
        zh: "从 git-agent 结构化提交日志中自动提取变更日志段落",
      },
      {
        en: "Use GitLab CI environments to stage releases based on commit type (feat, fix)",
        zh: "使用 GitLab CI 环境基于提交类型（feat、fix）分阶段发布",
      },
      {
        en: "Self-hosted runners work with git-agent's CLI for zero-external-dependency pipelines",
        zh: "自托管运行器使用 git-agent CLI，无需外部依赖即可运行流水线",
      },
    ],
    setupSteps: [
      {
        en: "Install git-agent locally: brew install gitagenthq/tap/git-agent",
        zh: "本地安装 git-agent：brew install gitagenthq/tap/git-agent",
      },
      {
        en: "Add a .gitlab-ci.yml job that runs commitlint on merge request events",
        zh: "添加 .gitlab-ci.yml 作业，在合并请求事件时运行 commitlint 检查",
      },
      {
        en: "Configure a release stage that triggers on push to main with a semantic-release job",
        zh: "配置发布阶段，在推送到主分支时触发语义化发布作业",
      },
      {
        en: "Set up GitLab CI variables for the AI gateway URL if using a custom endpoint",
        zh: "如果使用自定义端点，设置 GitLab CI 变量以配置 AI 网关 URL",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "git-agent + GitHub Actions", zh: "git-agent + GitHub Actions" },
        href: "/integrations/github-actions",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent work with GitLab's built-in CI linting?",
          zh: "git-agent 能与 GitLab 内置的 CI 检查集成吗？",
        },
        answer: {
          en: "Yes. You can run git-agent's commit validation as a stage in your .gitlab-ci.yml and it will report failures in the pipeline output, which GitLab surfaces in merge request widgets.",
          zh: "可以。你可以将 git-agent 的提交验证作为 .gitlab-ci.yml 中的一个阶段运行，它将在流水线输出中报告失败信息，GitLab 会在合并请求控件中展示这些信息。",
        },
      },
      {
        question: {
          en: "Can I use GitLab CI with git-agent's free shared gateway?",
          zh: "我可以在 GitLab CI 中使用 git-agent 的免费共享网关吗？",
        },
        answer: {
          en: "Yes. The free shared gateway is the default in git-agent. No API key configuration is needed in your CI pipeline.",
          zh: "可以。免费共享网关是 git-agent 的默认配置。无需在 CI 流水线中配置 API 密钥。",
        },
      },
      {
        question: {
          en: "Does git-agent support GitLab's merge request approval rules?",
          zh: "git-agent 支持 GitLab 的合并请求审批规则吗？",
        },
        answer: {
          en: "Indirectly. git-agent generates consistent commit messages that satisfy approval rules requiring conventional format. The CI pipeline validates the format before review can proceed.",
          zh: "间接支持。git-agent 生成一致的提交信息，可以满足需要约定式格式的审批规则。CI 流水线在审查开始前验证格式。",
        },
      },
    ],
  },
  {
    slug: "husky",
    tool: { en: "Husky", zh: "Husky" },
    tagline: {
      en: "Use git-agent as your commit-msg hook via Husky for zero-config local validation",
      zh: "通过 Husky 将 git-agent 作为 commit-msg 钩子，实现零配置本地验证",
    },
    description: {
      en: "Husky is a popular Node.js tool that makes managing git hooks simple. By integrating git-agent as a Husky-managed commit-msg hook, you get automatic commit message validation before every commit, with a retry loop that lets git-agent regenerate the message if it fails validation. This combination enforces Conventional Commits locally without any CI round-trip, catching formatting issues before they reach the remote.",
      zh: "Husky 是一个流行的 Node.js 工具，可以简化 Git 钩子的管理。将 git-agent 作为 Husky 管理的 commit-msg 钩子集成后，每次提交前都会自动验证提交信息，并带有重试循环——如果验证失败，git-agent 会自动重新生成。这个组合在本地强制执行约定式提交，无需任何 CI 往返，在提交到达远程仓库之前就捕获格式问题。",
    },
    benefits: [
      {
        en: "Fail fast — catch malformed commit messages before they reach the remote repository",
        zh: "快速失败——在提交到达远程仓库前捕获格式错误的提交信息",
      },
      {
        en: "Automatic retry loop: git-agent re-generates the message if the hook rejects it",
        zh: "自动重试循环：如果钩子拒绝提交信息，git-agent 自动重新生成",
      },
      {
        en: "Zero network dependency: hook validation runs entirely offline with no CI round-trip",
        zh: "零网络依赖：钩子验证完全离线运行，无需 CI 往返",
      },
      {
        en: "Works alongside existing Husky hooks (lint-staged, ESLint, Prettier) in a single workflow",
        zh: "与现有 Husky 钩子（lint-staged、ESLint、Prettier）在同一工作流中协同工作",
      },
    ],
    setupSteps: [
      {
        en: "Install Husky: npx husky init, then add git-agent as a commit-msg hook",
        zh: "安装 Husky：npx husky init，然后将 git-agent 添加为 commit-msg 钩子",
      },
      {
        en: "Configure git-agent's hook dispatch to run validation on commit-msg events",
        zh: "配置 git-agent 的钩子分发，在 commit-msg 事件上运行验证",
      },
      {
        en: "Set the hook type to conventional or a custom script path in .git-agent/config.yml",
        zh: "在 .git-agent/config.yml 中将钩子类型设置为 conventional 或自定义脚本路径",
      },
      {
        en: "Test the integration by handing a completed change to git-agent --intent and verifying the hook fires correctly",
        zh: "将完成的变更交给 git-agent --intent，验证 hook 正确触发，以测试集成"
      },
    ],
    relatedLinks: [
      {
        label: { en: "Pre-commit hooks explained", zh: "Pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Git hooks explained", zh: "Git 钩子详解" },
        href: "/glossary/git-hooks",
      },
      {
        label: { en: "git-agent + Lefthook", zh: "git-agent + Lefthook" },
        href: "/integrations/lefthook",
      },
    ],
    faq: [
      {
        question: {
          en: "Does Husky conflict with git-agent's built-in hook installation?",
          zh: "Husky 与 git-agent 内置的钩子安装冲突吗？",
        },
        answer: {
          en: "No. git-agent's init command can install its own hook, or you can point the hook dispatch to a Husky-managed hook script. They are designed to coexist.",
          zh: "不冲突。git-agent 的 init 命令可以安装自己的钩子，你也可以将钩子分发指向 Husky 管理的钩子脚本。它们设计为可以共存。",
        },
      },
      {
        question: {
          en: "Do I need Node.js to use git-agent with Husky?",
          zh: "我需要 Node.js 才能将 git-agent 与 Husky 一起使用吗？",
        },
        answer: {
          en: "Husky requires Node.js, but git-agent itself is a standalone Go binary. If you already use Husky for other hooks, adding git-agent as a commit-msg hook adds no extra runtime dependency.",
          zh: "Husky 需要 Node.js，但 git-agent 本身是独立的 Go 二进制文件。如果你已经使用 Husky 管理其他钩子，将 git-agent 添加为 commit-msg 钩子不会增加额外的运行时依赖。",
        },
      },
      {
        question: {
          en: "Can I use git-agent's retry loop with custom Husky shell scripts?",
          zh: "我可以在自定义 Husky shell 脚本中使用 git-agent 的重试循环吗？",
        },
        answer: {
          en: "Yes. git-agent's hook dispatch supports arbitrary shell scripts. Set the hook path in config.yml to your custom script, and the retry logic still applies.",
          zh: "可以。git-agent 的钩子分发支持任意 shell 脚本。在 config.yml 中将钩子路径设置为自定义脚本，重试逻辑仍然适用。",
        },
      },
    ],
  },
  {
    slug: "pre-commit",
    tool: { en: "pre-commit", zh: "pre-commit" },
    tagline: {
      en: "Add git-agent as a pre-commit hook in your .pre-commit-config.yaml",
      zh: "在 .pre-commit-config.yaml 中将 git-agent 添加为 pre-commit 钩子",
    },
    description: {
      en: "The pre-commit framework is a language-agnostic hook manager that runs configured checks before each commit. By wiring git-agent into your pre-commit configuration, you can validate commit messages, check for conventional commit compliance, and take advantage of git-agent's auto-retry logic — all within the same framework that runs your linters and formatters. The pre-commit framework's multi-language hook system supports Go binaries, making git-agent a natural fit.",
      zh: "pre-commit 框架是一个语言无关的钩子管理器，在每次提交前运行配置的检查。通过将 git-agent 接入你的 pre-commit 配置，你可以验证提交信息、检查约定式提交合规性，并利用 git-agent 的自动重试逻辑——所有这些都在运行代码检查器和格式化工具的同一框架内完成。pre-commit 框架的多语言钩子系统支持 Go 二进制文件，使 git-agent 成为天然的选择。",
    },
    benefits: [
      {
        en: "Manage git-agent alongside existing pre-commit hooks in a single config file",
        zh: "在单个配置文件中与现有 pre-commit 钩子一起管理 git-agent",
      },
      {
        en: "Validate commit messages before they reach CI, reducing pipeline failures",
        zh: "在提交到达 CI 前验证提交信息，减少流水线失败",
      },
      {
        en: "Language-agnostic: git-agent's Go binary works with any pre-commit environment",
        zh: "语言无关：git-agent 的 Go 二进制文件适用于任何 pre-commit 环境",
      },
      {
        en: "Automatic corrective retry when the hook rejects a generated commit message",
        zh: "当钩子拒绝生成的提交信息时自动进行纠正性重试",
      },
    ],
    setupSteps: [
      {
        en: "Create a .pre-commit-config.yaml in your repository root",
        zh: "在仓库根目录创建 .pre-commit-config.yaml",
      },
      {
        en: "Add a repo entry pointing to the git-agent binary or use the local hook system",
        zh: "添加指向 git-agent 二进制文件的仓库条目，或使用本地钩子系统",
      },
      {
        en: "Configure git-agent's hook dispatch to conventional mode in .git-agent/config.yml",
        zh: "在 .git-agent/config.yml 中将 git-agent 的钩子分发配置为 conventional 模式",
      },
      {
        en: "Run pre-commit install to register the hooks, then test with a staged change",
        zh: "运行 pre-commit install 注册钩子，然后用暂存的变更进行测试",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Pre-commit hooks explained", zh: "Pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Git hooks explained", zh: "Git 钩子详解" },
        href: "/glossary/git-hooks",
      },
      {
        label: { en: "git-agent + Husky", zh: "git-agent + Husky" },
        href: "/integrations/husky",
      },
    ],
    faq: [
      {
        question: {
          en: "Can pre-commit run git-agent on Windows, macOS, and Linux?",
          zh: "pre-commit 能在 Windows、macOS 和 Linux 上运行 git-agent 吗？",
        },
        answer: {
          en: "Yes. git-agent is a Go binary distributed via Homebrew and GitHub releases. It is cross-platform and works wherever pre-commit runs.",
          zh: "可以。git-agent 是通过 Homebrew 和 GitHub Releases 分发的 Go 二进制文件，跨平台支持，可以在 pre-commit 运行的任何环境中工作。",
        },
      },
      {
        question: {
          en: "How does git-agent's retry loop interact with pre-commit's hook model?",
          zh: "git-agent 的重试循环如何与 pre-commit 的钩子模型交互？",
        },
        answer: {
          en: "When pre-commit exits non-zero, git-agent's commit flow enters a retry loop: it rewrites the commit message and re-attempts, up to 3 retries and 2 full re-plans before falling back to manual mode.",
          zh: "当 pre-commit 以非零状态退出时，git-agent 的提交流程进入重试循环：它重写提交信息并重新尝试，最多 3 次重试和 2 次完全重新规划，然后回退到手动模式。",
        },
      },
      {
        question: {
          en: "Do I need to install pre-commit if I already use git-agent?",
          zh: "如果我已经使用 git-agent，还需要安装 pre-commit 吗？",
        },
        answer: {
          en: "No. git-agent has its own built-in hook system. The pre-commit integration is for teams that already use the pre-commit framework and want to add git-agent to their existing hook pipeline.",
          zh: "不需要。git-agent 有自己内置的钩子系统。pre-commit 集成适用于已经使用 pre-commit 框架并希望将 git-agent 添加到现有钩子流水线的团队。",
        },
      },
    ],
  },
  {
    slug: "lefthook",
    tool: { en: "Lefthook", zh: "Lefthook" },
    tagline: {
      en: "Supercharge your Lefthook-managed git hooks with git-agent's commit intelligence",
      zh: "用 git-agent 的提交智能增强你的 Lefthook 管理的 Git 钩子",
    },
    description: {
      en: "Lefthook is a fast, Go-based git hooks manager that supports parallel hook execution and per-branch configuration. When paired with git-agent, Lefthook can run commit message validation, atomic commit splitting, and conventional commit formatting as part of your existing hook pipeline. Lefthook's parallel execution model means git-agent validation runs alongside linters and formatters without blocking them, while git-agent's retry loop handles any hook rejections automatically.",
      zh: "Lefthook 是一个基于 Go 的快速 Git 钩子管理器，支持并行钩子执行和按分支配置。与 git-agent 配合使用时，Lefthook 可以将提交信息验证、原子提交拆分和约定式提交格式化作为现有钩子流水线的一部分运行。Lefthook 的并行执行模型意味着 git-agent 验证与代码检查器和格式化工具同时运行而不会阻塞它们，而 git-agent 的重试循环自动处理任何钩子拒绝。",
    },
    benefits: [
      {
        en: "Lefthook's single-binary Go runtime matches git-agent's deployment model with no extra dependencies",
        zh: "Lefthook 的单二进制 Go 运行时与 git-agent 的部署模型一致，无需额外依赖",
      },
      {
        en: "Parallel hook execution: commit validation runs alongside linters without blocking",
        zh: "并行钩子执行：提交验证与代码检查器同时运行，不会阻塞",
      },
      {
        en: "Per-branch hook configuration enables different validation rules for release vs feature branches",
        zh: "按分支的钩子配置支持对发布分支和功能分支使用不同的验证规则",
      },
      {
        en: "Compatible with git-agent's full retry and re-plan loop for validation failures",
        zh: "与 git-agent 的完整重试和重新规划循环兼容，用于验证失败场景",
      },
    ],
    setupSteps: [
      {
        en: "Install Lefthook: pnpm add -D lefthook or brew install lefthook",
        zh: "安装 Lefthook：pnpm add -D lefthook 或 brew install lefthook",
      },
      {
        en: "Create a lefthook.yml with a commit-msg hook that runs git-agent validate",
        zh: "创建 lefthook.yml，添加运行 git-agent validate 的 commit-msg 钩子",
      },
      {
        en: "Configure git-agent's hook dispatch mode in .git-agent/config.yml",
        zh: "在 .git-agent/config.yml 中配置 git-agent 的钩子分发模式",
      },
      {
        en: "Run lefthook install to register hooks and verify with a test commit",
        zh: "运行 lefthook install 注册钩子，然后通过测试提交验证",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Git hooks explained", zh: "Git 钩子详解" },
        href: "/glossary/git-hooks",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "Pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "git-agent + pre-commit", zh: "git-agent + pre-commit" },
        href: "/integrations/pre-commit",
      },
    ],
    faq: [
      {
        question: {
          en: "How does Lefthook compare to Husky for git-agent integration?",
          zh: "对于 git-agent 集成，Lefthook 与 Husky 相比如何？",
        },
        answer: {
          en: "Lefthook is written in Go (same as git-agent), supports parallel execution, and doesn't require Node.js. Husky is Node.js-based and simpler for JavaScript monorepos. Both work equally well with git-agent's hook system.",
          zh: "Lefthook 用 Go 编写（与 git-agent 相同），支持并行执行，且不需要 Node.js。Husky 基于 Node.js，对于 JavaScript 单体仓库更简单。两者都能与 git-agent 的钩子系统完美配合。",
        },
      },
      {
        question: {
          en: "Can Lefthook run git-agent's atomic splitting feature as a hook?",
          zh: "Lefthook 可以将 git-agent 的原子拆分功能作为钩子运行吗？",
        },
        answer: {
          en: "Atomic splitting is a pre-commit operation that git-agent handles during the commit flow. Lefthook can trigger git-agent's commit pipeline, which includes diff analysis and atomic splitting before the commit-msg hook fires.",
          zh: "原子拆分是 git-agent 在提交流程中处理的预提交操作。Lefthook 可以触发 git-agent 的提交流水线，其中包括在 commit-msg 钩子触发之前进行 diff 分析和原子拆分。",
        },
      },
      {
        question: {
          en: "Does Lefthook's parallel mode cause issues with git-agent's sequential commit flow?",
          zh: "Lefthook 的并行模式会导致 git-agent 的顺序提交流程出现问题吗？",
        },
        answer: {
          en: "No. git-agent runs its own commit pipeline (split, stage, message, validate) as a single Lefthook hook. Parallel execution applies to separate hooks, not to the stages within a single hook.",
          zh: "不会。git-agent 运行自己的提交流水线（拆分、暂存、生成信息、验证）作为单个 Lefthook 钩子。并行执行适用于不同的钩子，而不是单个钩子内的阶段。",
        },
      },
    ],
  },
  {
    slug: "semantic-release-integration",
    tool: { en: "semantic-release", zh: "semantic-release" },
    tagline: {
      en: "Feed git-agent's structured conventional commits directly into semantic-release",
      zh: "将 git-agent 的结构化约定式提交直接输入 semantic-release",
    },
    description: {
      en: "semantic-release automates the entire package release workflow: version bumping, changelog generation, git tagging, and npm/GitHub publishing. It relies on the Conventional Commits specification to determine version bumps from commit history. git-agent generates strict, specification-compliant Conventional Commits — including correct type, scope, and BREAKING CHANGE footers — so semantic-release accurately determines the next version. The combination eliminates manual version management and ensures every release has a complete, categorised changelog.",
      zh: "semantic-release 自动化了整个包发布工作流：版本升级、变更日志生成、Git 标签和 npm/GitHub 发布。它依赖约定式提交规范从提交历史确定版本升级。git-agent 生成严格符合规范的约定式提交——包括正确的类型、范围和 BREAKING CHANGE 页脚——使 semantic-release 能准确确定下一个版本。这种组合消除了手动版本管理，并确保每次发布都有完整、分类的变更日志。",
    },
    benefits: [
      {
        en: "Accurate version bumps: git-agent's correct feat/fix/BREAKING CHANGE classification drives precise semantic-release decisions",
        zh: "准确的版本升级：git-agent 正确的 feat/fix/BREAKING CHANGE 分类驱动 semantic-release 做出精确的版本决策",
      },
      {
        en: "Fully categorised changelogs: every commit type (feat, fix, perf, refactor) maps to the right changelog section",
        zh: "完全分类的变更日志：每次提交类型（feat、fix、perf、refactor）映射到正确的变更日志段落",
      },
      {
        en: "Eliminate manual version declarations: no more package.json version bumps or git tag management",
        zh: "消除手动版本声明：不再需要手动修改 package.json 版本或管理 Git 标签",
      },
      {
        en: "CI-ready: git-agent's output format is designed for consumption by release automation tools",
        zh: "CI 就绪：git-agent 的输出格式专为发布自动化工具而设计",
      },
    ],
    setupSteps: [
      {
        en: "Install git-agent locally and configure it to generate Conventional Commits",
        zh: "本地安装 git-agent 并配置其生成约定式提交",
      },
      {
        en: "Install semantic-release and configure the release branches in your release config",
        zh: "安装 semantic-release 并在发布配置中配置发布分支",
      },
      {
        en: "Add a CI pipeline step that runs semantic-release on push to the main branch",
        zh: "添加 CI 流水线步骤，在推送到主分支时运行 semantic-release",
      },
      {
        en: "Verify the integration by making a feat commit and checking that the next push triggers a minor release",
        zh: "通过创建一个 feat 提交并检查下次推送是否触发次要版本来验证集成",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "git-agent + release-please", zh: "git-agent + release-please" },
        href: "/integrations/release-please",
      },
    ],
    faq: [
      {
        question: {
          en: "Does semantic-release work with git-agent's free shared gateway?",
          zh: "semantic-release 能与 git-agent 的免费共享网关一起使用吗？",
        },
        answer: {
          en: "Yes. git-agent generates the commit messages locally; semantic-release reads them from the git log. The shared gateway only affects commit message generation, not how semantic-release parses them.",
          zh: "可以。git-agent 在本地生成提交信息；semantic-release 从 Git 日志中读取它们。共享网关只影响提交信息生成，不影响 semantic-release 解析它们的方式。",
        },
      },
      {
        question: {
          en: "Can I use git-agent with semantic-release in a non-JavaScript project?",
          zh: "我可以在非 JavaScript 项目中使用 git-agent 和 semantic-release 吗？",
        },
        answer: {
          en: "Yes. semantic-release supports any language via plugins, and git-agent is language-agnostic. The Conventional Commits format is the same regardless of the project's language.",
          zh: "可以。semantic-release 通过插件支持任何语言，git-agent 是语言无关的。约定式提交格式与项目语言无关。",
        },
      },
      {
        question: {
          en: "How does git-agent handle BREAKING CHANGE footers for semantic-release?",
          zh: "git-agent 如何处理 semantic-release 所需的 BREAKING CHANGE 页脚？",
        },
        answer: {
          en: "When git-agent detects a breaking change in the diff (e.g., removed public API, changed function signature), it automatically includes the BREAKING CHANGE footer in the generated commit message, which semantic-release uses to trigger a major version bump.",
          zh: "当 git-agent 在 diff 中检测到破坏性变更（例如删除公共 API、更改函数签名）时，它会自动在生成的提交信息中包含 BREAKING CHANGE 页脚，semantic-release 使用它来触发主版本升级。",
        },
      },
    ],
  },
  {
    slug: "release-please",
    tool: { en: "release-please", zh: "release-please" },
    tagline: {
      en: "Auto-generate release PRs from git-agent's conventional commit history",
      zh: "从 git-agent 的约定式提交历史自动生成发布 PR",
    },
    description: {
      en: "release-please automates release management by creating release pull requests that contain a computed changelog, version bump, and updated manifest files. It analyses the Conventional Commits in your git history to determine the next version. git-agent generates rigorous, spec-compliant Conventional Commits, so release-please always sees clean, parseable commit data. The result is a fully automated release PR workflow: commit with git-agent, push, and release-please opens or updates a release PR with zero manual intervention.",
      zh: "release-please 通过创建包含计算出的变更日志、版本升级和更新清单文件的发布拉取请求来自动化发布管理。它分析 Git 历史中的约定式提交来确定下一个版本。git-agent 生成严格符合规范的约定式提交，因此 release-please 始终看到干净、可解析的提交数据。结果是完全自动化的发布 PR 工作流：使用 git-agent 提交、推送，release-please 自动打开或更新发布 PR，无需人工干预。",
    },
    benefits: [
      {
        en: "Fully automated release PRs: commit with git-agent, push, and release-please handles the rest",
        zh: "完全自动化的发布 PR：用 git-agent 提交、推送，release-please 处理其余部分",
      },
      {
        en: "Accurate changelog sections: each commit type is parsed into the correct release notes category",
        zh: "准确的变更日志段落：每个提交类型被解析到正确的发布说明分类",
      },
      {
        en: "Consistent manifest updates: version files are bumped automatically from structured commit data",
        zh: "一致的清单文件更新：版本文件从结构化提交数据自动更新",
      },
      {
        en: "No manual release decisions: release-please determines the version strategy from git-agent's commit classification",
        zh: "无需手动决定发布策略：release-please 从 git-agent 的提交分类确定版本策略",
      },
    ],
    setupSteps: [
      {
        en: "Install git-agent and configure it to generate Conventional Commits for your project",
        zh: "安装 git-agent 并配置其为项目生成约定式提交",
      },
      {
        en: "Add release-please to your GitHub Actions workflow or install the GitHub App",
        zh: "将 release-please 添加到 GitHub Actions 工作流或安装 GitHub App",
      },
      {
        en: "Configure release-please's release-type to match your project language (node, python, go, etc.)",
        zh: "配置 release-please 的 release-type 以匹配项目语言（node、python、go 等）",
      },
      {
        en: "Push a conventional commit generated by git-agent and verify release-please creates a release PR",
        zh: "推送由 git-agent 生成的约定式提交，验证 release-please 是否创建发布 PR",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Conventional changelog", zh: "约定式变更日志" },
        href: "/glossary/conventional-changelog",
      },
      {
        label: { en: "git-agent + semantic-release", zh: "git-agent + semantic-release" },
        href: "/integrations/semantic-release-integration",
      },
    ],
    faq: [
      {
        question: {
          en: "How is release-please different from semantic-release?",
          zh: "release-please 与 semantic-release 有何不同？",
        },
        answer: {
          en: "release-please creates a release PR that you review and merge, giving you a manual approval gate. semantic-release publishes directly on push. Both read Conventional Commits. git-agent is compatible with both, so you can choose the workflow that fits your team.",
          zh: "release-please 创建一个你可以审查和合并的发布 PR，提供手动审批环节。semantic-release 在推送时直接发布。两者都读取约定式提交。git-agent 与两者兼容，你可以选择适合团队的工作流。",
        },
      },
      {
        question: {
          en: "Does release-please require a specific commit format beyond Conventional Commits?",
          zh: "release-please 需要超出约定式提交之外的特定提交格式吗？",
        },
        answer: {
          en: "No. release-please implements the Conventional Commits standard. git-agent's output complies with this standard, so no additional formatting is needed.",
          zh: "不需要。release-please 实现了约定式提交标准。git-agent 的输出符合该标准，因此无需额外格式化。",
        },
      },
      {
        question: {
          en: "Can I preview the release PR before merging when using git-agent?",
          zh: "使用 git-agent 时，我可以在合并前预览发布 PR 吗？",
        },
        answer: {
          en: "Yes. release-please creates a pull request rather than publishing directly. You can review the changelog, version bump, and manifest changes before merging. This is the recommended workflow for projects with manual release gates.",
          zh: "可以。release-please 创建拉取请求而不是直接发布。你可以在合并前审查变更日志、版本升级和清单文件更改。这是推荐给需要手动发布审批环节的项目的工作流。",
        },
      },
    ],
  },
  {
    slug: "circleci",
    tool: { en: "CircleCI", zh: "CircleCI" },
    tagline: {
      en: "Integrate git-agent's commit validation into your CircleCI pipeline",
      zh: "将 git-agent 的提交验证集成到你的 CircleCI 流水线中",
    },
    description: {
      en: "CircleCI is a cloud-native CI/CD platform with fast build times, caching, and fine-grained pipeline control. By adding a git-agent validation step to your CircleCI config, you can enforce Conventional Commits compliance, block non-conforming merges, and trigger semantic releases — all in a single .circleci/config.yml pipeline. CircleCI's orb ecosystem makes it straightforward to create reusable commit validation jobs that run on every push or pull request.",
      zh: "CircleCI 是一个云原生 CI/CD 平台，具有快速构建、缓存和细粒度流水线控制等特点。通过向 CircleCI 配置添加 git-agent 验证步骤，你可以强制执行约定式提交合规性、阻止不合规的合并，并触发语义化发布——所有这些都在单个 .circleci/config.yml 流水线中完成。CircleCI 的 orb 生态系统使得创建可复用的提交验证作业变得简单，这些作业可以在每次推送或拉取请求时运行。",
    },
    benefits: [
      {
        en: "Enforce commit message conventions across all branches and forks in a single pipeline",
        zh: "在单个流水线中对所有分支和 fork 强制执行提交信息约定",
      },
      {
        en: "CircleCI parallelism and caching reduce validation overhead per commit",
        zh: "CircleCI 的并行性和缓存减少了每次提交的验证开销",
      },
      {
        en: "Orb-based configuration makes it easy to share git-agent validation across repos",
        zh: "基于 orb 的配置使得在多个仓库之间共享 git-agent 验证变得简单",
      },
      {
        en: "Block merge on non-conventional commits with status checks in the GitHub/GitLab integration",
        zh: "通过与 GitHub/GitLab 集成的状态检查，阻止不合规提交的合并",
      },
    ],
    setupSteps: [
      {
        en: "Install git-agent locally for local development and testing",
        zh: "本地安装 git-agent 用于本地开发和测试",
      },
      {
        en: "Create a .circleci/config.yml with a validate-commits job that runs on workflow dispatch",
        zh: "创建 .circleci/config.yml，包含在 workflow dispatch 时运行的 validate-commits 作业",
      },
      {
        en: "Use the CircleCI CLI to validate the config locally before pushing",
        zh: "使用 CircleCI CLI 在推送前本地验证配置",
      },
      {
        en: "Set up branch protection rules that require the git-agent validation job to pass before merging",
        zh: "设置分支保护规则，要求 git-agent 验证作业在合并前通过",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "git-agent + GitHub Actions", zh: "git-agent + GitHub Actions" },
        href: "/integrations/github-actions",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I use CircleCI with git-agent's free shared gateway?",
          zh: "我可以在 CircleCI 中使用 git-agent 的免费共享网关吗？",
        },
        answer: {
          en: "Yes. The free shared gateway is the default and requires no configuration. For CI environments, git-agent's CLI can be installed as part of the build step.",
          zh: "可以。免费共享网关是默认配置，无需额外设置。对于 CI 环境，git-agent 的 CLI 可以安装在构建步骤中。",
        },
      },
      {
        question: {
          en: "Does CircleCI support git-agent on all execution environments?",
          zh: "CircleCI 是否在所有执行环境中支持 git-agent？",
        },
        answer: {
          en: "Yes. git-agent's Go binary runs on Linux, macOS, and Windows. CircleCI's Docker, machine, and macOS executors all support it.",
          zh: "可以。git-agent 的 Go 二进制文件可在 Linux、macOS 和 Windows 上运行。CircleCI 的 Docker、machine 和 macOS 执行器都支持它。",
        },
      },
      {
        question: {
          en: "Can I use CircleCI orbs to share git-agent validation across multiple repositories?",
          zh: "我可以使用 CircleCI orbs 在多个仓库之间共享 git-agent 验证吗？",
        },
        answer: {
          en: "Yes. You can create a custom orb that wraps git-agent's validation commands, or use an existing conventional-commit orb. This keeps your CI config DRY across projects.",
          zh: "可以。你可以创建自定义 orb 来封装 git-agent 的验证命令，或使用现有的约定式提交 orb。这使你的 CI 配置在多个项目之间保持简洁。",
        },
      },
    ],
  },
];

export function findIntegration(slug: string): IntegrationEntry | undefined {
  return integrationEntries.find((entry) => entry.slug === slug);
}