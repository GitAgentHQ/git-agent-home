import type { I18nText, CrossLink, FaqItem } from "./types";

export interface ComparisonRow {
  feature: I18nText;
  gitAgent: string;
  competitor: string;
}

export interface ComparisonEntry {
  slug: string;
  name: string;
  tagline: I18nText;
  description: I18nText;
  competitorDescription: I18nText;
  rows: ComparisonRow[];
  installComparison: { gitAgent: string; competitor: string };
  outputExample: { gitAgent: string; competitor: string };
  relatedLinks: CrossLink[];
  faq: FaqItem[];
}

export const comparisonEntries: ComparisonEntry[] = [
  {
    slug: "aicommit",
    name: "aicommit2",
    tagline: {
      en: "git-agent vs aicommit2",
      zh: "git-agent 与 aicommit2 对比",
    },
    description: {
      en: "Compare git-agent and aicommit2: atomic commit splitting, free shared gateway access, pre-commit hook integration, and conventional commit quality.",
      zh: "对比 git-agent 与 aicommit2 在原子提交拆分、免费共享网关、pre-commit 钩子集成和约定式提交质量方面的差异。",
    },
    competitorDescription: {
      en: "aicommit2 is an AI commit message generator that supports multiple LLM providers and suggests messages for your currently staged diff; unlike git-agent, it does not own the full Git handoff.",
      zh: "aicommit2 是一款支持多种 LLM 提供商的 AI 提交信息生成器，为当前暂存的 diff 提供提交信息建议；与 git-agent 不同，它不负责完整的 Git 交接。"
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "no — requires your own API key",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "limited",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g aicommit2",
    },
    outputExample: {
      gitAgent: `feat(auth): add refresh token rotation on silent renew

- generate a new refresh token on every silent renew to limit token reuse window
- invalidate the previous refresh token immediately after issuing the replacement
- store the new token in the same secure HttpOnly cookie

Long-lived refresh tokens were reusable indefinitely; rotation limits the
damage window to a single reuse attempt per token.`,
      competitor: "feat: add token refresh rotation",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "feat commit template", zh: "feat 提交模板" },
        href: "/templates/feat",
      },
    ],
    faq: [
      {
        question: {
          en: "Does aicommit2 split staged changes into multiple commits?",
          zh: "aicommit2 会将暂存变更拆分为多个提交吗？",
        },
        answer: {
          en: "No. aicommit2 generates a single commit message for whatever is staged. git-agent's atomic split planning groups staged hunks into logically separate commits before writing any of them.",
          zh: "不会。aicommit2 为当前暂存的内容生成单一提交信息。git-agent 的原子拆分规划会在写入任何提交之前，将暂存的 hunk 分组为逻辑独立的提交。",
        },
      },
      {
        question: {
          en: "Do I need an API key to use git-agent?",
          zh: "使用 git-agent 需要 API 密钥吗？",
        },
        answer: {
          en: "No. Official release binaries use a free shared gateway with zero config — just hand your work to `git-agent --intent \"...\"`. You can optionally bring your own key and point it at your own OpenAI, Gemini, or Claude endpoint via config.",
          zh: "不需要。官方发布的二进制使用免费共享网关，零配置——直接将工作交给 `git-agent --intent \"...\"` 即可。你也可以自带密钥，通过配置将其指向自己的 OpenAI、Gemini 或 Claude 端点。"
        },
      },
      {
        question: {
          en: "Can git-agent replace aicommit2 with no workflow changes?",
          zh: "git-agent 能无缝替换 aicommit2 而不改变工作流吗？",
        },
        answer: {
          en: "Yes. Run `git-agent --intent \"...\"` after completing the work. The main addition is autonomous atomic splitting: git-agent discovers the working tree, stages logical groups, and commits them independently.",
          zh: "可以。完成工作后运行 `git-agent --intent \"...\"`。主要新增的是自主原子拆分：git-agent 会发现工作区、暂存逻辑分组并独立提交。"
        },
      },
    ],
  },
  {
    slug: "commitizen",
    name: "Commitizen",
    tagline: {
      en: "git-agent vs Commitizen",
      zh: "git-agent 与 Commitizen 对比",
    },
    description: {
      en: "Compare git-agent and Commitizen: interactive prompts vs LLM automation, atomic splitting, and zero-config setup for conventional commits.",
      zh: "对比 git-agent 与 Commitizen 在交互式提示与 LLM 自动化、原子拆分及零配置约定式提交方面的差异。",
    },
    competitorDescription: {
      en: "Commitizen is a CLI tool that guides developers through commit message creation with interactive prompts following the Conventional Commits specification.",
      zh: "Commitizen 是一款通过交互式提示引导开发者按约定式提交规范填写提交信息的 CLI 工具。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no — prompt-based",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "partial — hook install only",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "yes — cz amend",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM, prompt only",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .cz.toml",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "pip install commitizen  # or npm install -g commitizen",
    },
    outputExample: {
      gitAgent: `fix(api): handle missing Content-Type header on multipart uploads

- return 415 Unsupported Media Type when Content-Type is absent instead of 500
- add boundary extraction helper to avoid duplicate parsing logic
- cover the missing-header case with a dedicated test

Clients sending multipart data without an explicit Content-Type caused an
unhandled exception; the explicit check converts that to a client error.`,
      competitor: `fix(api): handle missing Content-Type header

Resolves multipart upload 500 error.`,
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "fix commit template", zh: "fix 提交模板" },
        href: "/templates/fix",
      },
    ],
    faq: [
      {
        question: {
          en: "Is Commitizen better for teams that prefer manual control?",
          zh: "对于偏好手动控制的团队，Commitizen 更合适吗？",
        },
        answer: {
          en: "Commitizen prompts you to fill in each field manually, which gives full control but adds friction per commit. git-agent drafts the message automatically and lets you edit before confirming.",
          zh: "Commitizen 提示你手动填写每个字段，完全可控但每次提交都有额外操作。git-agent 自动起草提交信息，并在确认前允许你编辑。",
        },
      },
      {
        question: {
          en: "Does git-agent require a Python or Node.js runtime like Commitizen?",
          zh: "git-agent 像 Commitizen 一样需要 Python 或 Node.js 运行时吗？",
        },
        answer: {
          en: "No. git-agent is a single Go binary. It has no runtime dependencies beyond git itself.",
          zh: "不需要。git-agent 是一个独立的 Go 二进制文件，除 git 本身外没有任何运行时依赖。",
        },
      },
      {
        question: {
          en: "Can I migrate from Commitizen to git-agent without losing my commit history?",
          zh: "从 Commitizen 迁移到 git-agent 会影响提交历史吗？",
        },
        answer: {
          en: "Migration requires no changes to git history. Run `git-agent init` to generate `.git-agent/config.yml` with your scopes and uninstall the Commitizen hook.",
          zh: "迁移不需要更改 git 历史。运行 `git-agent init` 生成包含范围的 `.git-agent/config.yml`，然后卸载 Commitizen 钩子即可。",
        },
      },
    ],
  },
  {
    slug: "czg",
    name: "czg",
    tagline: {
      en: "git-agent vs czg",
      zh: "git-agent 与 czg 对比",
    },
    description: {
      en: "Compare git-agent and czg: LLM-generated messages vs interactive TUI, atomic splitting, and language support for conventional commits.",
      zh: "对比 git-agent 与 czg 在 LLM 生成提交信息与交互式 TUI、原子拆分及约定式提交语言支持方面的差异。",
    },
    competitorDescription: {
      en: "czg is a Node.js interactive TUI for Conventional Commits that provides a rich prompt experience with emoji support and AI message generation via OpenAI.",
      zh: "czg 是一款用于约定式提交的 Node.js 交互式 TUI 工具，提供丰富的提示体验，支持 emoji 和通过 OpenAI 生成 AI 提交信息。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "yes — OpenAI only",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "yes — TUI preview",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "no — requires OpenAI key for AI mode",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .czrc / package.json",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g czg",
    },
    outputExample: {
      gitAgent: `perf(query): replace N+1 user lookup with single batched query

- collect user IDs from the result set before rendering
- fetch all users in a single WHERE id IN (...) query via UserLoader
- remove per-row db.findUser calls from the template loop

The previous template iterated 50 rows and issued one db query each;
the batched loader drops that to a single round-trip regardless of
result set size.`,
      competitor: "perf(query): optimise user lookup query",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "perf commit template", zh: "perf 提交模板" },
        href: "/templates/perf",
      },
    ],
    faq: [
      {
        question: {
          en: "Does czg support the same LLM providers as git-agent?",
          zh: "czg 支持与 git-agent 相同的 LLM 提供商吗？",
        },
        answer: {
          en: "czg supports OpenAI for AI generation. git-agent supports any OpenAI-compatible endpoint including OpenAI, Gemini, Claude, and self-hosted models.",
          zh: "czg 的 AI 生成功能仅支持 OpenAI。git-agent 支持任何 OpenAI 兼容端点，包括 OpenAI、Gemini、Claude 和自托管模型。",
        },
      },
      {
        question: {
          en: "Is czg's TUI experience better for developers who prefer interactive tools?",
          zh: "对于偏好交互式工具的开发者，czg 的 TUI 体验更好吗？",
        },
        answer: {
          en: "czg's TUI is polished for manual input. git-agent is faster for most commits because it generates the full message without prompting, but you can always edit the draft before it commits.",
          zh: "czg 的 TUI 对手动输入而言很精致。git-agent 对大多数提交更快，因为它无需提示即可生成完整信息，但你始终可以在提交前编辑草稿。",
        },
      },
      {
        question: {
          en: "Does git-agent support emoji in commit messages like czg?",
          zh: "git-agent 像 czg 一样支持提交信息中的 emoji 吗？",
        },
        answer: {
          en: "git-agent focuses on plain-text Conventional Commits without emoji. If your team convention requires Gitmoji prefixes, you can add them via a custom prompt in your config.",
          zh: "git-agent 专注于不含 emoji 的纯文本约定式提交。如果你的团队约定需要 Gitmoji 前缀，可以通过配置中的自定义提示添加。",
        },
      },
    ],
  },
  {
    slug: "gitmoji-cli",
    name: "gitmoji-cli",
    tagline: {
      en: "git-agent vs gitmoji-cli",
      zh: "git-agent 与 gitmoji-cli 对比",
    },
    description: {
      en: "Compare git-agent and gitmoji-cli: conventional commit automation with LLM vs emoji-driven commit message selection.",
      zh: "对比 git-agent 与 gitmoji-cli 在 LLM 驱动的约定式提交自动化与 emoji 驱动的提交信息选择方面的差异。",
    },
    competitorDescription: {
      en: "gitmoji-cli is an interactive commit tool that standardises commit messages using emoji prefixes from the Gitmoji specification.",
      zh: "gitmoji-cli 是一款使用 Gitmoji 规范中 emoji 前缀来标准化提交信息的交互式提交工具。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "partial — Gitmoji format",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no — manual selection",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM",
      },
      {
        feature: { en: "Config-file based setup", zh: "基于配置文件的设置" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "minimal",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g gitmoji-cli",
    },
    outputExample: {
      gitAgent: `docs(api): add OpenAPI 3.1 schema for /orders endpoint

- document all request parameters and their validation constraints
- add 200, 400, 401, and 404 response schemas with example payloads
- note rate limit headers in the response description

The endpoint was undocumented; client teams were inferring the schema
from integration tests rather than a canonical source.`,
      competitor: ":memo: add OpenAPI schema for orders endpoint",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format guide", zh: "提交信息格式指南" },
        href: "/glossary/commit-message-format",
      },
      {
        label: { en: "docs commit template", zh: "docs 提交模板" },
        href: "/templates/docs",
      },
    ],
    faq: [
      {
        question: {
          en: "Is Gitmoji compatible with Conventional Commits tooling?",
          zh: "Gitmoji 与约定式提交工具兼容吗？",
        },
        answer: {
          en: "Gitmoji uses emoji prefixes instead of type keywords. Most changelog generators and semantic release tools expect the Conventional Commits type keyword format and do not parse Gitmoji prefixes.",
          zh: "Gitmoji 使用 emoji 前缀而非类型关键字。大多数变更日志生成器和语义发布工具期望约定式提交的类型关键字格式，无法解析 Gitmoji 前缀。",
        },
      },
      {
        question: {
          en: "Can I use git-agent if my team currently uses gitmoji-cli?",
          zh: "如果我的团队目前使用 gitmoji-cli，能切换到 git-agent 吗？",
        },
        answer: {
          en: "Yes. Run `git-agent init` and update your team's contribution guidelines to use the Conventional Commits type keywords instead of emoji. Existing commit history is unaffected.",
          zh: "可以。运行 `git-agent init` 并更新团队贡献指南，使用约定式提交类型关键字替代 emoji。现有提交历史不受影响。",
        },
      },
      {
        question: {
          en: "Does git-agent work alongside a Gitmoji commit-msg hook?",
          zh: "git-agent 能与 Gitmoji commit-msg 钩子共存吗？",
        },
        answer: {
          en: "git-agent installs its own pre-commit hook for message validation. Using it alongside a Gitmoji hook that enforces a different format would cause hook failures. The two tools are designed for different commit conventions.",
          zh: "git-agent 安装自己的 pre-commit 钩子用于消息验证。与强制执行不同格式的 Gitmoji 钩子共用会导致钩子失败。这两个工具是为不同的提交约定设计的。",
        },
      },
    ],
  },
  {
    slug: "convco",
    name: "convco",
    tagline: {
      en: "git-agent vs convco",
      zh: "git-agent 与 convco 对比",
    },
    description: {
      en: "Compare git-agent and convco: LLM commit authoring vs conventional commit linting and changelog generation.",
      zh: "对比 git-agent 与 convco 在 LLM 提交信息生成与约定式提交校验及变更日志生成方面的差异。",
    },
    competitorDescription: {
      en: "convco is a Rust-based CLI for enforcing Conventional Commits, generating changelogs, and bumping versions — it validates commits but does not generate messages.",
      zh: "convco 是一款基于 Rust 的 CLI，用于强制执行约定式提交、生成变更日志和版本号递增——它验证提交但不生成提交信息。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes — linting focus",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "yes — linting only",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM",
      },
      {
        feature: { en: "Changelog generation", zh: "变更日志生成" },
        gitAgent: "no",
        competitor: "yes",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "brew install convco  # or cargo install convco",
    },
    outputExample: {
      gitAgent: `chore(deps): upgrade OpenTelemetry SDK to 1.25.0

- bump otel-sdk, otel-exporter-otlp, and otel-instrumentation-http in lockstep
- update trace provider initialisation to new BatchSpanProcessor API
- remove deprecated SimpleSpanProcessor usage flagged in 1.24.0 release notes

The 1.24.x deprecation warnings were cluttering test output; 1.25.0
removes the deprecated APIs entirely so this upgrade clears the warnings.`,
      competitor: "N/A — convco lints messages, it does not generate them",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Conventional changelog explained", zh: "约定式变更日志详解" },
        href: "/glossary/conventional-changelog",
      },
      {
        label: { en: "chore commit template", zh: "chore 提交模板" },
        href: "/templates/chore",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I use convco and git-agent together?",
          zh: "能同时使用 convco 和 git-agent 吗？",
        },
        answer: {
          en: "Yes. They serve complementary purposes. Use git-agent to author commits and convco to lint them in CI, generate changelogs, and automate version bumps.",
          zh: "可以。它们服务于不同目的。使用 git-agent 撰写提交，使用 convco 在 CI 中校验提交、生成变更日志和自动化版本递增。",
        },
      },
      {
        question: {
          en: "Does git-agent generate changelogs?",
          zh: "git-agent 能生成变更日志吗？",
        },
        answer: {
          en: "No. git-agent focuses on authoring high-quality conventional commits. Changelog generation is better handled by dedicated tools like convco, semantic-release, or release-please that read your commit history.",
          zh: "不能。git-agent 专注于生成高质量的约定式提交。变更日志生成由专用工具负责，如 convco、semantic-release 或 release-please，它们读取提交历史来生成日志。",
        },
      },
      {
        question: {
          en: "Does convco's hook validate the messages git-agent produces?",
          zh: "convco 的钩子能验证 git-agent 生成的提交信息吗？",
        },
        answer: {
          en: "Yes. Messages produced by git-agent follow the Conventional Commits specification and pass convco's lint rules. git-agent's own pre-commit hook also validates format before each commit.",
          zh: "可以。git-agent 生成的提交信息遵循约定式提交规范，能通过 convco 的校验规则。git-agent 自己的 pre-commit 钩子也会在每次提交前验证格式。",
        },
      },
    ],
  },
  {
    slug: "cz-git",
    name: "cz-git",
    tagline: {
      en: "git-agent vs cz-git",
      zh: "git-agent 与 cz-git 对比",
    },
    description: {
      en: "Compare git-agent and cz-git: fully automated LLM commit authoring vs a highly configurable Commitizen adapter with AI assist.",
      zh: "对比 git-agent 与 cz-git 在全自动 LLM 提交信息生成与高度可配置的 Commitizen 适配器（含 AI 辅助）方面的差异。",
    },
    competitorDescription: {
      en: "cz-git is a highly configurable Commitizen adapter that adds AI-assisted message suggestions, emoji support, and rich TUI customisation on top of the standard interactive flow.",
      zh: "cz-git 是一款高度可配置的 Commitizen 适配器，在标准交互流程之上增加了 AI 辅助信息建议、emoji 支持和丰富的 TUI 自定义能力。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "yes — optional, OpenAI key required",
      },
      {
        feature: { en: "Pre-commit hook integration with retry loop", zh: "带重试循环的 pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "partial — no retry loop",
      },
      {
        feature: { en: "Dry-run preview before committing", zh: "提交前的预演预览" },
        gitAgent: "yes",
        competitor: "yes — TUI review step",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "no — AI mode requires your own key",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .cz-git.js / .czrc",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g cz-git commitizen && echo '{ \"path\": \"cz-git\" }' > ~/.czrc",
    },
    outputExample: {
      gitAgent: `test(checkout): add integration tests for card payment failure paths

- cover declined card (4000 0000 0000 0002) returning 402 with structured error
- cover expired card returning 402 with card_expired code
- assert that no order record is persisted on payment failure

The happy path was covered but failure branches had zero coverage; these
tests caught a bug where declined-card errors were mapped to 500 instead
of 402.`,
      competitor: "test(checkout): add card payment failure integration tests",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "test commit template", zh: "test 提交模板" },
        href: "/templates/test",
      },
    ],
    faq: [
      {
        question: {
          en: "Is cz-git more configurable than git-agent?",
          zh: "cz-git 比 git-agent 更可配置吗？",
        },
        answer: {
          en: "cz-git offers extensive TUI customisation options. git-agent is intentionally minimal in configuration — scope definitions in config.yml are the primary knob. More config reduces the automation value.",
          zh: "cz-git 提供广泛的 TUI 自定义选项。git-agent 在配置上有意保持简洁——config.yml 中的范围定义是主要配置项。过多配置会降低自动化的价值。",
        },
      },
      {
        question: {
          en: "Does cz-git's AI assist split commits automatically?",
          zh: "cz-git 的 AI 辅助功能会自动拆分提交吗？",
        },
        answer: {
          en: "No. cz-git's AI mode generates a message for the current staged diff as a single commit. Only git-agent discovers the working tree, plans, stages, and executes atomic splits across multiple commits.",
          zh: "不会。cz-git 的 AI 模式为当前暂存的 diff 生成单一提交的信息。只有 git-agent 会发现工作区、规划、暂存并执行跨多个提交的原子拆分。"
        },
      },
      {
        question: {
          en: "Do I need Node.js installed to use git-agent?",
          zh: "使用 git-agent 需要安装 Node.js 吗？",
        },
        answer: {
          en: "No. git-agent is a standalone Go binary. cz-git requires Node.js and npm/pnpm to be installed globally.",
          zh: "不需要。git-agent 是一个独立的 Go 二进制文件。cz-git 需要全局安装 Node.js 和 npm/pnpm。",
        },
      },
    ],
  },
  {
    slug: "commitlint",
    name: "commitlint",
    tagline: {
      en: "git-agent vs commitlint",
      zh: "git-agent 与 commitlint 对比",
    },
    description: {
      en: "Compare git-agent and commitlint: LLM-powered commit authoring vs rule-based commit message linting for conventional commits.",
      zh: "对比 git-agent 与 commitlint 在 LLM 驱动的提交信息生成与基于规则的提交信息校验方面的差异。",
    },
    competitorDescription: {
      en: "commitlint is a conventional commit linter that validates commit messages against configurable rules, commonly used in CI pipelines and pre-commit hooks.",
      zh: "commitlint 是一款约定式提交校验工具，通过可配置规则验证提交信息，常用于 CI 流水线和 pre-commit 钩子中。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes — linting focus",
      },
      {
        feature: { en: "Pre-commit hook integration", zh: "Pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "yes — linting only",
      },
      {
        feature: { en: "Dry-run preview", zh: "预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .commitlintrc.js",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g @commitlint/cli @commitlint/config-conventional",
    },
    outputExample: {
      gitAgent: `refactor(store): extract price calculation into a dedicated module

- move discount, tax, and shipping logic from OrderStore into PriceCalculator
- keep public API unchanged — all callers still import from the store module
- add unit tests for PriceCalculator in isolation

The OrderStore had grown to 800 lines with mixed concerns; extracting
pricing makes the store focused on order lifecycle only.`,
      competitor: "N/A — commitlint lints messages, it does not generate them",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format guide", zh: "提交信息格式指南" },
        href: "/glossary/commit-message-format",
      },
      {
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Can commitlint and git-agent be used together?",
          zh: "commitlint 和 git-agent 能一起使用吗？",
        },
        answer: {
          en: "Yes. Use git-agent to author commits and commitlint to validate them in CI. git-agent's own pre-commit hook already validates Conventional Commits format, so commitlint's linting is complementary for CI enforcement.",
          zh: "可以。使用 git-agent 撰写提交，使用 commitlint 在 CI 中验证。git-agent 自身的 pre-commit 钩子已经验证了约定式提交格式，commitlint 的校验可作为 CI 中的补充。",
        },
      },
      {
        question: {
          en: "Does git-agent need a .commitlintrc.js configuration file?",
          zh: "git-agent 需要 .commitlintrc.js 配置文件吗？",
        },
        answer: {
          en: "No. git-agent uses its own .git-agent/config.yml for scope definitions and does not read commitlint config. The messages it generates follow the Conventional Commits spec and pass commitlint's default rules.",
          zh: "不需要。git-agent 使用自己的 .git-agent/config.yml 进行范围定义，不读取 commitlint 配置。它生成的消息遵循约定式提交规范，能通过 commitlint 的默认规则。",
        },
      },
      {
        question: {
          en: "Can git-agent help me write commits that satisfy commitlint rules?",
          zh: "git-agent 能帮助我写出满足 commitlint 规则的提交信息吗？",
        },
        answer: {
          en: "Yes. git-agent generates messages that follow the Conventional Commits specification, which is the foundation of commitlint's default ruleset. Any custom commitlint rules you add will need to be compatible with the spec.",
          zh: "可以。git-agent 生成的消息遵循约定式提交规范，这是 commitlint 默认规则集的基础。你添加的任何自定义 commitlint 规则需要与规范兼容。",
        },
      },
    ],
  },
  {
    slug: "semantic-release-vs",
    name: "semantic-release",
    tagline: {
      en: "git-agent vs semantic-release",
      zh: "git-agent 与 semantic-release 对比",
    },
    description: {
      en: "Compare git-agent and semantic-release: commit authoring with LLM automation vs automated version management, changelog generation, and npm publishing.",
      zh: "对比 git-agent 与 semantic-release 在 LLM 自动化提交信息生成与自动版本管理、变更日志生成及 npm 发布方面的差异。",
    },
    competitorDescription: {
      en: "semantic-release automates version bumps, changelog generation, and package publishing based on conventional commit messages in your git history.",
      zh: "semantic-release 基于 git 历史中的约定式提交信息，自动执行版本递增、变更日志生成和包发布。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes — consumption focus",
      },
      {
        feature: { en: "Pre-commit hook integration", zh: "Pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview", zh: "预演预览" },
        gitAgent: "yes",
        competitor: "yes — --dry-run flag",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .releaserc.js",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "npm install -g semantic-release",
    },
    outputExample: {
      gitAgent: `feat(i18n): add Japanese locale support with CJK font fallback

- add ja.json translation keys for all user-facing strings
- configure CJK font stack in the CSS theme for proper character rendering
- add language detection for ja-JP locale in the LanguageProvider

Japanese users were defaulting to English because no locale was detected
and the fallback font lacked CJK glyph coverage.`,
      competitor: "N/A — semantic-release manages releases, it does not author commits",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Conventional changelog explained", zh: "约定式变更日志详解" },
        href: "/glossary/conventional-changelog",
      },
      {
        label: { en: "feat commit template", zh: "feat 提交模板" },
        href: "/templates/feat",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I use git-agent together with semantic-release?",
          zh: "git-agent 能和 semantic-release 一起使用吗？",
        },
        answer: {
          en: "Yes. They are complementary. git-agent helps you write the conventional commits that semantic-release needs to determine version bumps and generate changelogs. Use git-agent for authoring, semantic-release for publishing.",
          zh: "可以。它们是互补的。git-agent 帮助你撰写语义化发布所需的约定式提交信息。使用 git-agent 撰写提交，使用 semantic-release 进行发布。",
        },
      },
      {
        question: {
          en: "Does git-agent generate changelogs like semantic-release?",
          zh: "git-agent 能像 semantic-release 一样生成变更日志吗？",
        },
        answer: {
          en: "No. git-agent focuses on commit authoring. Changelog generation is better handled by dedicated tools like semantic-release, convco, or release-please that read your commit history.",
          zh: "不能。git-agent 专注于提交信息生成。变更日志生成由专用工具处理，如 semantic-release、convco 或 release-please，它们读取你的提交历史来生成日志。",
        },
      },
      {
        question: {
          en: "Does semantic-release require perfectly formatted commit messages?",
          zh: "semantic-release 要求提交信息格式完美吗？",
        },
        answer: {
          en: "Yes. semantic-release determines version bumps from commit types. git-agent's Conventional Commits output ensures your commits are always correctly formatted for semantic-release consumption.",
          zh: "是的。semantic-release 根据提交类型确定版本递增。git-agent 的约定式提交输出确保你的提交始终正确格式化，供 semantic-release 使用。",
        },
      },
    ],
  },
  {
    slug: "cocogitto",
    name: "cocogitto",
    tagline: {
      en: "git-agent vs cocogitto",
      zh: "git-agent 与 cocogitto 对比",
    },
    description: {
      en: "Compare git-agent and cocogitto: LLM-powered commit authoring vs Rust-based conventional commits toolkit with changelog and version bumping.",
      zh: "对比 git-agent 与 cocogitto 在 LLM 驱动的提交信息生成与基于 Rust 的约定式提交工具集（含变更日志和版本递增）方面的差异。",
    },
    competitorDescription: {
      en: "cocogitto is a Rust-based CLI toolkit for conventional commits that provides commit generation, changelog creation, and automated version bumping.",
      zh: "cocogitto 是一款基于 Rust 的约定式提交 CLI 工具集，提供提交信息生成、变更日志创建和自动版本递增功能。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no — template-based",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes",
      },
      {
        feature: { en: "Pre-commit hook integration", zh: "Pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview", zh: "预演预览" },
        gitAgent: "yes",
        competitor: "yes — cog verify",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM, local only",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — cog.toml",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "brew install cocogitto  # or cargo install cocogitto",
    },
    outputExample: {
      gitAgent: `style(lint): reformat all files with Biome 2.0 defaults

- run biome check --write across the entire codebase
- fix trailing commas, semicolons, and quote style to match Biome defaults
- remove legacy ESLint and Prettier config files

The project was migrating from ESLint/Prettier to Biome; this commit
applies the new formatter rules uniformly.`,
      competitor: "style(lint): reformat with Biome 2.0",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "style commit template", zh: "style 提交模板" },
        href: "/templates/style",
      },
    ],
    faq: [
      {
        question: {
          en: "Is cocogitto's commit generation comparable to git-agent's LLM output?",
          zh: "cocogitto 的提交生成与 git-agent 的 LLM 输出可以相比吗？",
        },
        answer: {
          en: "No. cocogitto generates commit messages from user-provided parameters, not from your diff. git-agent reads the working-tree diff, owns staging, and generates detailed, context-aware messages. cocogitto's messages are shorter and templated.",
          zh: "不能。cocogitto 根据用户提供的参数生成提交信息，而非读取你的 diff。git-agent 读取工作区 diff、负责暂存，并生成详细且有上下文的信息。cocogitto 的信息更短且基于模板。"
        },
      },
      {
        question: {
          en: "Does cocogitto support changelog generation?",
          zh: "cocogitto 支持变更日志生成吗？",
        },
        answer: {
          en: "Yes. cocogitto's cog changelog command generates changelogs from conventional commit history, which git-agent does not do. This makes cocogitto a good complement to git-agent for projects that need both authoring and release tooling.",
          zh: "支持。cocogitto 的 cog changelog 命令从约定式提交历史生成变更日志，这是 git-agent 不具备的功能。这使得 cocogitto 成为 git-agent 在需要同时进行提交撰写和发布管理时的良好补充。",
        },
      },
      {
        question: {
          en: "Are cocogitto and git-agent both standalone binaries?",
          zh: "cocogitto 和 git-agent 都是独立二进制文件吗？",
        },
        answer: {
          en: "Yes. Both are standalone binaries with no runtime dependencies beyond git. cocogitto is written in Rust, git-agent in Go. Neither requires Node.js, Python, or any other runtime.",
          zh: "是的。两者都是独立二进制文件，除 git 外没有运行时依赖。cocogitto 使用 Rust 编写，git-agent 使用 Go 编写。两者都不需要 Node.js、Python 或任何其他运行时。",
        },
      },
    ],
  },
  {
    slug: "gitchangelog",
    name: "gitchangelog",
    tagline: {
      en: "git-agent vs gitchangelog",
      zh: "git-agent 与 gitchangelog 对比",
    },
    description: {
      en: "Compare git-agent and gitchangelog: LLM-powered commit authoring vs a Python-based changelog generator that parses git commit history.",
      zh: "对比 git-agent 与 gitchangelog 在 LLM 驱动的提交信息生成与基于 Python 的变更日志生成器（解析 git 提交历史）方面的差异。",
    },
    competitorDescription: {
      en: "gitchangelog is a Python-based changelog generator that parses your git log and produces changelogs using configurable templates and grouping rules.",
      zh: "gitchangelog 是一款基于 Python 的变更日志生成器，解析你的 git 日志并使用可配置模板和分组规则生成变更日志。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "no — custom format",
      },
      {
        feature: { en: "Pre-commit hook integration", zh: "Pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Dry-run preview", zh: "预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM, local only",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .gitchangelog.rc",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "pip install gitchangelog",
    },
    outputExample: {
      gitAgent: `fix(webhook): validate HMAC signature before processing payload

- verify X-Hub-Signature-256 header against HMAC-SHA256 of request body
- return 401 with signature_mismatch error on invalid signatures
- log failed attempts with client IP for audit trail

The webhook endpoint was accepting unsigned payloads, making it
vulnerable to spoofed events from non-authenticated sources.`,
      competitor: "N/A — gitchangelog generates changelogs, not commit messages",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Conventional changelog explained", zh: "约定式变更日志详解" },
        href: "/glossary/conventional-changelog",
      },
      {
        label: { en: "fix commit template", zh: "fix 提交模板" },
        href: "/templates/fix",
      },
    ],
    faq: [
      {
        question: {
          en: "Is gitchangelog a replacement for git-agent?",
          zh: "gitchangelog 能替代 git-agent 吗？",
        },
        answer: {
          en: "No. They serve different purposes. gitchangelog generates changelogs from existing git history. git-agent authors new commits. They can be used together — use git-agent to write good commits, then gitchangelog to render them into a changelog.",
          zh: "不能。它们有不同的用途。gitchangelog 从现有 git 历史生成变更日志。git-agent 撰写新的提交。它们可以一起使用——用 git-agent 写好提交，再用 gitchangelog 渲染成变更日志。",
        },
      },
      {
        question: {
          en: "Does gitchangelog support Conventional Commits?",
          zh: "gitchangelog 支持约定式提交吗？",
        },
        answer: {
          en: "gitchangelog uses its own section-based commit message format, not the Conventional Commits specification. To use gitchangelog effectively with git-agent, you would need to configure gitchangelog's parsing rules to match Conventional Commits output.",
          zh: "gitchangelog 使用自己的基于章节的提交信息格式，而非约定式提交规范。要有效使用 gitchangelog 与 git-agent，你需要配置 gitchangelog 的解析规则以匹配约定式提交的输出。",
        },
      },
      {
        question: {
          en: "Which tool is better for a team new to structured commits?",
          zh: "对于刚接触结构化提交的团队，哪个工具更好？",
        },
        answer: {
          en: "git-agent lowers the barrier by generating structured commits automatically — no training needed. gitchangelog assumes your team already writes structured commits consistently and just needs a changelog from them.",
          zh: "git-agent 通过自动生成结构化提交来降低门槛——无需培训。gitchangelog 假设你的团队已经一致地编写结构化提交，只需要从中生成变更日志。",
        },
      },
    ],
  },
  {
    slug: "gitlint",
    name: "gitlint",
    tagline: {
      en: "git-agent vs gitlint",
      zh: "git-agent 与 gitlint 对比",
    },
    description: {
      en: "Compare git-agent and gitlint: LLM-powered commit message authoring vs Python-based commit message linting for conventional commit compliance.",
      zh: "对比 git-agent 与 gitlint 在 LLM 驱动的提交信息生成与基于 Python 的提交信息校验方面的差异。",
    },
    competitorDescription: {
      en: "gitlint is a Python-based commit message linter that validates commit messages against configurable rules with a focus on Conventional Commits and general best practices.",
      zh: "gitlint 是一款基于 Python 的提交信息校验工具，通过可配置规则验证提交信息，专注于约定式提交和通用最佳实践。",
    },
    rows: [
      {
        feature: { en: "Atomic commit splitting", zh: "原子提交拆分" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "LLM-backed message drafting", zh: "LLM 驱动的提交信息生成" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Conventional Commits format", zh: "约定式提交格式" },
        gitAgent: "yes",
        competitor: "yes — linting focus",
      },
      {
        feature: { en: "Pre-commit hook integration", zh: "Pre-commit 钩子集成" },
        gitAgent: "yes",
        competitor: "yes — via pre-commit framework",
      },
      {
        feature: { en: "Dry-run preview", zh: "预演预览" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Amend last commit message", zh: "修改最后一次提交信息" },
        gitAgent: "yes",
        competitor: "no",
      },
      {
        feature: { en: "Free shared gateway", zh: "免费共享网关" },
        gitAgent: "yes",
        competitor: "yes — no LLM, local only",
      },
      {
        feature: { en: "Config-file based scope definitions", zh: "基于配置文件的范围定义" },
        gitAgent: "yes — .git-agent/config.yml",
        competitor: "yes — .gitlint",
      },
    ],
    installComparison: {
      gitAgent: "brew install gitagenthq/tap/git-agent",
      competitor: "pip install gitlint",
    },
    outputExample: {
      gitAgent: `build(docker): switch base image from Ubuntu 22.04 to Alpine 3.20

- replace apt-get install with apk add for runtime dependencies
- reduce image size from 420MB to 98MB across all layers
- add multi-stage build for compiled Go binary to keep the runtime layer minimal

The Ubuntu image was 4x larger than needed for a Go application;
Alpine provides the same glibc compatibility with a fraction of the size.`,
      competitor: "N/A — gitlint validates messages, it does not generate them",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "build commit template", zh: "build 提交模板" },
        href: "/templates/build",
      },
    ],
    faq: [
      {
        question: {
          en: "Can gitlint and git-agent be used together?",
          zh: "gitlint 和 git-agent 能一起使用吗？",
        },
        answer: {
          en: "Yes. They are complementary. Use git-agent to author commit messages and gitlint to validate them in CI or as a pre-commit hook. git-agent's messages pass gitlint's default Conventional Commits rules.",
          zh: "可以。它们是互补的。使用 git-agent 撰写提交信息，使用 gitlint 在 CI 或 pre-commit 钩子中验证。git-agent 的提交信息能通过 gitlint 的默认约定式提交规则。",
        },
      },
      {
        question: {
          en: "Does gitlint require Python to be installed?",
          zh: "gitlint 需要安装 Python 吗？",
        },
        answer: {
          en: "Yes. gitlint is a Python package installed via pip. git-agent is a standalone Go binary with no Python or Node.js runtime dependency.",
          zh: "是的。gitlint 是通过 pip 安装的 Python 包。git-agent 是独立的 Go 二进制文件，没有 Python 或 Node.js 运行时依赖。",
        },
      },
      {
        question: {
          en: "Which tool is better for enforcing commit standards in CI?",
          zh: "在 CI 中强制执行提交标准，哪个工具更好？",
        },
        answer: {
          en: "gitlint is purpose-built for CI linting with detailed rule violations and context. git-agent is a commit authoring tool whose pre-commit hook validates format before the commit lands. For CI enforcement, combining both is ideal: git-agent for authoring, gitlint for CI validation.",
          zh: "gitlint 专门为 CI 校验而设计，能提供详细的规则违规信息和上下文。git-agent 是提交信息生成工具，其 pre-commit 钩子在提交前验证格式。对于 CI 强制执行，两者结合最为理想：git-agent 用于撰写，gitlint 用于 CI 验证。",
        },
      },
    ],
  },
];

export function findComparison(slug: string): ComparisonEntry | undefined {
  return comparisonEntries.find((e) => e.slug === slug);
}
