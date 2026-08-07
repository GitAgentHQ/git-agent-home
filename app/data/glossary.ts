import type { I18nText, CrossLink, FaqItem } from "./types";

export interface GlossaryEntry {
  slug: string;
  term: I18nText;
  definition: I18nText;
  longDescription: I18nText;
  examples: string[];
  howGitAgentHelps: I18nText;
  relatedLinks: CrossLink[];
  faq: FaqItem[];
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "conventional-commits",
    term: { en: "Conventional Commits", zh: "约定式提交" },
    definition: {
      en: "A lightweight specification for commit message formatting that encodes change type, scope, and description in a structured, machine-readable way.",
      zh: "一种轻量级的提交信息格式规范，以结构化、机器可读的方式编码变更类型、范围和描述。",
    },
    longDescription: {
      en: `The Conventional Commits specification defines a standard commit message structure: a required type, an optional scope in parentheses, and a mandatory subject line, optionally followed by a blank line and a longer body. Common types include feat (new functionality), fix (bug corrections), docs (documentation only), refactor (code restructuring without behaviour change), test, chore, perf, style, and ci.

The specification enables changelog generation tools to automatically categorise changes, and semantic versioning tools to determine the next version number from commit history. A feat commit implies a minor version bump; a fix implies a patch; and a commit with a BREAKING CHANGE footer implies a major bump.

Teams adopting Conventional Commits benefit from a shared vocabulary for change intent, reviewable history, and automated release workflows. The specification is maintained at conventionalcommits.org and widely supported by tools such as semantic-release, release-please, and conventional-changelog.`,
      zh: `约定式提交规范定义了标准的提交信息结构：必填的类型、括号中的可选范围和必填的主题行，可选地在后面添加空行和更长的正文。常见类型包括 feat（新功能）、fix（错误修复）、docs（仅文档）、refactor（不改变行为的代码重构）、test、chore、perf、style 和 ci。

该规范使变更日志生成工具能够自动分类变更，并使语义版本工具能够从提交历史中确定下一个版本号。feat 提交意味着次要版本升级；fix 意味着补丁升级；包含 BREAKING CHANGE 页脚的提交意味着主要版本升级。

采用约定式提交的团队可以受益于共享的变更意图词汇、可审查的历史记录和自动化的发布工作流。该规范由 conventionalcommits.org 维护，并被 semantic-release、release-please 和 conventional-changelog 等工具广泛支持。`,
    },
    examples: [
      "feat(auth): add OAuth2 PKCE flow for public clients",
      "fix(api): return 404 instead of 500 when user record is missing",
      "refactor(cache): replace in-memory store with Redis adapter",
      "docs(readme): add installation instructions for Linux",
      "chore(deps): upgrade express from 4.18.2 to 4.19.2",
    ],
    howGitAgentHelps: {
      en: "git-agent generates fully-formed Conventional Commits messages automatically from your staged diff. It selects the appropriate type and scope, writes the subject line, and drafts a bullet-point body explaining what changed and a closing paragraph explaining why.",
      zh: "git-agent 从暂存的 diff 自动生成完整的约定式提交信息。它自动选择适当的类型和范围，撰写主题行，并起草解释变更内容的项目符号正文和解释原因的结尾段落。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
      {
        label: { en: "Conventional changelog", zh: "约定式变更日志" },
        href: "/glossary/conventional-changelog",
      },
    ],
    faq: [
      {
        question: {
          en: "Is the Conventional Commits specification the same as Angular commit guidelines?",
          zh: "约定式提交规范与 Angular 提交指南相同吗？",
        },
        answer: {
          en: "Conventional Commits is inspired by Angular's commit message conventions but is an independent, community-maintained specification. It generalises the Angular format for use in any project.",
          zh: "约定式提交规范受 Angular 提交信息约定的启发，但它是一个独立的、由社区维护的规范，将 Angular 格式推广至任何项目使用。",
        },
      },
      {
        question: {
          en: "Do I need to use all the commit types?",
          zh: "我需要使用所有的提交类型吗？",
        },
        answer: {
          en: "No. The specification only mandates feat and fix. Other types (docs, chore, perf, etc.) are conventional but not required. Use the types that reflect your team's workflow.",
          zh: "不需要。规范只强制要求 feat 和 fix。其他类型（docs、chore、perf 等）是约定俗成的，但不是必须的。使用反映团队工作流的类型即可。",
        },
      },
      {
        question: {
          en: "Can I use Conventional Commits without automated tooling?",
          zh: "没有自动化工具也能使用约定式提交吗？",
        },
        answer: {
          en: "Yes. The specification is just a text format. You can follow it manually. Tooling like git-agent makes it faster and consistent, but the convention works without it.",
          zh: "可以。该规范只是一种文本格式，可以手动遵循。git-agent 等工具让它更快速、一致，但约定本身不依赖工具。",
        },
      },
    ],
  },
  {
    slug: "atomic-commits",
    term: { en: "Atomic Commits", zh: "原子提交" },
    definition: {
      en: "A commit that encapsulates exactly one logical change, making it independently understandable, revertable, and reviewable without affecting unrelated parts of the codebase.",
      zh: "一个只包含一个逻辑变更的提交，使其能够独立理解、回滚和审查，而不影响代码库的其他部分。",
    },
    longDescription: {
      en: `An atomic commit follows the single-responsibility principle applied to version control. Each commit should represent one complete, coherent idea: adding a feature, fixing a bug, or updating a dependency. A commit is atomic when reverting it with git revert does not break unrelated functionality and when reading its diff in isolation tells a complete story.

Atomic commits improve code review quality because reviewers can evaluate each change in isolation. They make bisecting regressions faster because git bisect can pinpoint a single commit as the source of a bug. They also enable cleaner cherry-picking when backporting fixes to release branches.

Common violations include "big-bang" commits that mix feature additions, refactors, and bug fixes, and "WIP" commits that checkpoint work in progress without logical boundaries. Tools like git add -p help manually create atomic commits from a large working tree; git-agent automates this process.`,
      zh: `原子提交将单一职责原则应用于版本控制。每个提交应代表一个完整、连贯的想法：添加功能、修复错误或更新依赖。当 git revert 一个提交不会破坏不相关功能，且单独阅读其 diff 能讲述一个完整故事时，该提交就是原子的。

原子提交提高了代码审查质量，因为审查者可以独立评估每个变更。它们使回归定位更快，因为 git bisect 可以精确到单个提交作为错误来源。在将修复反向移植到发布分支时，它们也支持更干净的 cherry-pick。

常见的违规包括混合功能添加、重构和错误修复的"大爆炸"提交，以及没有逻辑边界的"WIP"检查点提交。git add -p 等工具帮助从大型工作树手动创建原子提交；git-agent 自动化了这一过程。`,
    },
    examples: [
      "feat(auth): add JWT verification middleware",
      "fix(db): close connection pool on process SIGTERM",
      "refactor(logger): extract formatLogLine into separate module",
      "test(cart): add unit tests for discount calculation edge cases",
      "chore(deps): pin lodash to 4.17.21 to resolve CVE-2021-23337",
    ],
    howGitAgentHelps: {
      en: "git-agent's core feature is atomic commit splitting. When you stage multiple unrelated changes, git-agent analyses the diff, plans logically separate commit groups, then stages and commits each group independently — without any manual git add -p sessions.",
      zh: "git-agent 的核心功能是原子提交拆分。当你暂存了多个不相关的变更时，git-agent 分析 diff，规划逻辑上独立的提交组，然后独立暂存并提交每个组——无需手动执行 git add -p。",
    },
    relatedLinks: [
      {
        label: { en: "Commit splitting", zh: "提交拆分" },
        href: "/glossary/commit-splitting",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Squash commits", zh: "压缩提交" },
        href: "/glossary/squash-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "How small should an atomic commit be?",
          zh: "原子提交应该有多小？",
        },
        answer: {
          en: "An atomic commit should be as small as the single logical change it represents, which may be one line or one hundred lines. Size is less important than logical cohesion — all changes in a commit should be necessary and sufficient for the change's stated purpose.",
          zh: "原子提交应该与它所代表的单一逻辑变更一样小，可能是一行或一百行。大小不如逻辑内聚性重要——提交中的所有变更应该对于所述目的来说既必要又充分。",
        },
      },
      {
        question: {
          en: "Is it bad practice to have a large number of commits in a pull request?",
          zh: "在拉取请求中有大量提交是不好的做法吗？",
        },
        answer: {
          en: "No, provided each commit is atomic. Many small, focused commits make review easier than a few large mixed commits. Some teams squash on merge for a clean main branch while preserving atomic commits during review.",
          zh: "不是，只要每个提交都是原子的。许多小而专注的提交比几个大的混合提交更容易审查。一些团队在合并时压缩以保持主分支整洁，同时在审查期间保留原子提交。",
        },
      },
      {
        question: {
          en: "Can I create atomic commits after the fact using git rebase?",
          zh: "我可以在事后使用 git rebase 创建原子提交吗？",
        },
        answer: {
          en: "Yes. Interactive rebase (git rebase -i) lets you split, reorder, and squash commits. git-agent avoids the need for this by splitting atomically at commit time.",
          zh: "可以。交互式变基（git rebase -i）允许拆分、重排序和压缩提交。git-agent 通过在提交时进行原子拆分来避免这种需求。",
        },
      },
    ],
  },
  {
    slug: "commit-splitting",
    term: { en: "Commit Splitting", zh: "提交拆分" },
    definition: {
      en: "The practice of dividing a set of staged changes into multiple discrete commits, each containing one logical unit of work.",
      zh: "将一组暂存变更划分为多个离散提交的做法，每个提交包含一个逻辑工作单元。",
    },
    longDescription: {
      en: `Commit splitting is required when a developer has made several independent changes to their working tree and wants to record them as separate, atomic history entries rather than one large commit. The process involves identifying logical groupings in the diff, selectively staging each group, writing a focused commit message, and repeating until all changes are committed.

Manual commit splitting uses git add -p (patch mode) to stage individual hunks, or git add <specific-files> to stage by file. This approach works well for small diffs but becomes tedious with large changes spanning many files. It also requires the developer to mentally plan the grouping before staging.

Automated commit splitting tools analyse the entire diff first to plan groups, then execute the staging and committing sequence. Planning before executing is important: it avoids a situation where later groups cannot be described accurately because earlier commits captured too much or too little context.`,
      zh: `当开发者对工作树做了多个独立变更，并希望将其记录为独立的原子历史条目而非一个大提交时，需要进行提交拆分。该过程涉及识别 diff 中的逻辑分组、选择性暂存每个组、撰写专注的提交信息，然后重复直到所有变更都已提交。

手动提交拆分使用 git add -p（补丁模式）暂存单个 hunk，或 git add <specific-files> 按文件暂存。这种方法对小 diff 效果很好，但对跨越多个文件的大变更来说很繁琐。它还要求开发者在暂存前在脑海中规划分组。

自动化提交拆分工具首先分析整个 diff 来规划分组，然后执行暂存和提交序列。先规划后执行很重要：它避免了因早期提交捕获了太多或太少上下文而导致后续组无法准确描述的情况。`,
    },
    examples: [
      "git add -p  # interactive hunk-by-hunk staging",
      "git add src/auth/  && git commit -m 'feat(auth): ...'",
      "git add src/api/ && git commit -m 'fix(api): ...'",
      "git-agent commit  # plans and executes all splits automatically",
    ],
    howGitAgentHelps: {
      en: "git-agent automates commit splitting end-to-end. It sends the full staged diff to the LLM to plan atomic groups, then unstages everything, re-stages each group's files and hunks, generates a conventional commit message for that group, validates it against the pre-commit hook, and moves to the next group.",
      zh: "git-agent 端到端地自动化提交拆分。它将完整的暂存 diff 发送给 LLM 以规划原子组，然后取消暂存所有内容，重新暂存每个组的文件和 hunk，为该组生成约定式提交信息，验证 pre-commit 钩子，然后移至下一组。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "What happens if git-agent splits my changes incorrectly?",
          zh: "如果 git-agent 错误地拆分了我的变更会怎样？",
        },
        answer: {
          en: "git-agent shows you the planned groups before executing. You can abort at the confirmation prompt, adjust your staged files manually, and re-run. The LLM re-plans on each invocation.",
          zh: "git-agent 在执行之前会向你展示计划的分组。你可以在确认提示时中止，手动调整暂存文件，然后重新运行。LLM 在每次调用时都会重新规划。",
        },
      },
      {
        question: {
          en: "Does commit splitting work on partial file stages (git add -p hunks)?",
          zh: "提交拆分支持部分文件暂存（git add -p hunk）吗？",
        },
        answer: {
          en: "Yes. git-agent reads the staged diff which reflects whatever was staged — whole files or individual hunks. Hunk-level splits are supported in the planner.",
          zh: "支持。git-agent 读取暂存的 diff，反映任何已暂存的内容——无论是整个文件还是单个 hunk。规划器支持 hunk 级别的拆分。",
        },
      },
      {
        question: {
          en: "Is commit splitting useful for solo developers, or only for teams?",
          zh: "提交拆分对独立开发者有用吗，还是只对团队有用？",
        },
        answer: {
          en: "It is valuable for everyone. Solo developers benefit from clean history for their own debugging, for open-source contribution guidelines, and for future maintainers who read the log.",
          zh: "对每个人都有价值。独立开发者受益于干净的历史记录，方便自己调试、遵循开源贡献指南，以及供未来维护者阅读日志。",
        },
      },
    ],
  },
  {
    slug: "pre-commit-hooks",
    term: { en: "Pre-commit Hooks", zh: "pre-commit 钩子" },
    definition: {
      en: "Git hooks that run automatically before a commit is recorded, allowing teams to enforce code quality checks, linting, or message format validation without manual steps.",
      zh: "在提交被记录之前自动运行的 Git 钩子，允许团队在不需要手动步骤的情况下强制执行代码质量检查、代码风格检查或提交信息格式验证。",
    },
    longDescription: {
      en: `Git hooks are shell scripts stored in the .git/hooks directory that Git executes at defined lifecycle points. The pre-commit hook runs after git commit is invoked but before the commit object is written. If the hook exits with a non-zero status, the commit is aborted and the developer must fix the reported issue before trying again.

Pre-commit hooks are commonly used to run linters (ESLint, Ruff, golangci-lint), formatters (Prettier, Black, gofmt), type checkers, and test suites on staged files. They can also validate commit message format, check for secrets, or enforce file size limits. Popular frameworks for managing hook installation include pre-commit (Python), Husky (Node.js), and lefthook (Go).

One challenge with hooks and AI-generated commit messages is that the hook may reject a message that does not fully conform to the project's specific conventional commit format. A retry loop that regenerates the message with the hook's error output as context can resolve this automatically.`,
      zh: `Git 钩子是存储在 .git/hooks 目录中的 shell 脚本，Git 在定义的生命周期点执行这些脚本。pre-commit 钩子在调用 git commit 之后、提交对象被写入之前运行。如果钩子以非零状态退出，提交将被中止，开发者必须在再次尝试之前修复报告的问题。

pre-commit 钩子通常用于对已暂存文件运行代码检查器（ESLint、Ruff、golangci-lint）、格式化器（Prettier、Black、gofmt）、类型检查器和测试套件。它们还可以验证提交信息格式、检查密钥或强制执行文件大小限制。用于管理钩子安装的流行框架包括 pre-commit（Python）、Husky（Node.js）和 lefthook（Go）。

钩子与 AI 生成的提交信息的一个挑战是，钩子可能会拒绝不完全符合项目特定约定式提交格式的信息。一个以钩子错误输出为上下文重新生成信息的重试循环可以自动解决这个问题。`,
    },
    examples: [
      "#!/bin/sh\nnpx eslint --max-warnings=0 $(git diff --cached --name-only -- '*.js')",
      "#!/bin/sh\ngofmt -l $(git diff --cached --name-only -- '*.go') | grep . && exit 1 || exit 0",
      "#!/bin/sh\npython -m pytest tests/unit/ -q --no-header",
      "# commit-msg hook\nif ! grep -qE '^(feat|fix|chore|docs|refactor|test|perf|style|ci)(\\(.+\\))?: .{1,72}$' \"$1\"; then exit 1; fi",
    ],
    howGitAgentHelps: {
      en: "git-agent installs a pre-commit hook via `git-agent init` that validates each generated message. When a hook rejects a message, git-agent automatically retries message generation up to 3 times, passing the hook's error output back to the LLM as context to produce a conforming message.",
      zh: "git-agent 通过 `git-agent init` 安装 pre-commit 钩子来验证每条生成的信息。当钩子拒绝一条信息时，git-agent 会自动重试信息生成最多 3 次，将钩子的错误输出作为上下文传回给 LLM，以生成符合规范的信息。",
    },
    relatedLinks: [
      {
        label: { en: "Git hooks", zh: "Git 钩子" },
        href: "/glossary/git-hooks",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent bypass my existing pre-commit hooks?",
          zh: "git-agent 会绕过我现有的 pre-commit 钩子吗？",
        },
        answer: {
          en: "No. git-agent runs git commit normally, which triggers all installed hooks. It does not use --no-verify. If a hook fails, git-agent retries with updated message content.",
          zh: "不会。git-agent 正常运行 git commit，这会触发所有已安装的钩子。它不使用 --no-verify。如果钩子失败，git-agent 会用更新的信息内容重试。",
        },
      },
      {
        question: {
          en: "How many retry attempts does git-agent make when a hook rejects the message?",
          zh: "当钩子拒绝提交信息时，git-agent 会重试多少次？",
        },
        answer: {
          en: "git-agent retries message generation up to 3 times per commit. After 3 failed attempts it re-plans the commit groups (up to 2 re-plan cycles) and tries again from the planning stage.",
          zh: "git-agent 每次提交最多重试信息生成 3 次。3 次失败后，它会重新规划提交组（最多 2 次重新规划周期）并从规划阶段重新开始。",
        },
      },
      {
        question: {
          en: "Can I use git-agent with Husky or pre-commit framework?",
          zh: "我可以将 git-agent 与 Husky 或 pre-commit 框架一起使用吗？",
        },
        answer: {
          en: "Yes. git-agent is compatible with any hook management system that writes standard Git hooks to .git/hooks. Its retry loop works regardless of how the hook was installed.",
          zh: "可以。git-agent 与任何将标准 Git 钩子写入 .git/hooks 的钩子管理系统兼容。无论钩子如何安装，其重试循环都能正常工作。",
        },
      },
    ],
  },
  {
    slug: "semantic-versioning",
    term: { en: "Semantic Versioning", zh: "语义化版本" },
    definition: {
      en: "A versioning scheme using a MAJOR.MINOR.PATCH number format where each component increments according to the nature of the changes: breaking changes, new features, and bug fixes respectively.",
      zh: "一种使用 MAJOR.MINOR.PATCH 数字格式的版本控制方案，其中每个组成部分根据变更性质递增：分别对应破坏性变更、新功能和错误修复。",
    },
    longDescription: {
      en: `Semantic Versioning (SemVer), defined at semver.org, specifies that a version number takes the form MAJOR.MINOR.PATCH. MAJOR is incremented for incompatible API changes, MINOR for new backwards-compatible functionality, and PATCH for backwards-compatible bug fixes. Pre-release labels (1.0.0-alpha.1) and build metadata (1.0.0+build.1) are also supported.

The direct connection between Conventional Commits and SemVer is one of the key motivations for the specification. Automated release tools like semantic-release and release-please read the commit history, identify the highest-impact change type (breaking change > feat > fix), and compute the next SemVer accordingly. This removes the manual decision of which version number to use next.

For library authors, SemVer communicates contract stability to downstream consumers. A MAJOR bump signals that consumers must make changes; a MINOR bump adds capability without breaking anything; a PATCH bump is safe to apply without testing changes in consuming code.`,
      zh: `语义化版本（SemVer），定义于 semver.org，规定版本号采用 MAJOR.MINOR.PATCH 形式。MAJOR 因不兼容的 API 变更而递增，MINOR 因向后兼容的新功能而递增，PATCH 因向后兼容的错误修复而递增。还支持预发布标签（1.0.0-alpha.1）和构建元数据（1.0.0+build.1）。

约定式提交与 SemVer 之间的直接联系是该规范的主要动机之一。semantic-release 和 release-please 等自动化发布工具读取提交历史，识别影响最大的变更类型（破坏性变更 > feat > fix），并相应地计算下一个 SemVer。这消除了手动决定下一个版本号的需要。

对于库作者来说，SemVer 向下游消费者传达了契约稳定性。MAJOR 升级表示消费者必须进行更改；MINOR 升级在不破坏任何内容的情况下增加能力；PATCH 升级可以安全应用，无需测试消费代码中的变更。`,
    },
    examples: [
      "feat!: remove deprecated v1 API endpoints  # triggers MAJOR bump",
      "feat(payment): add Apple Pay integration  # triggers MINOR bump",
      "fix(checkout): correct tax rounding on fractional cents  # triggers PATCH bump",
      "chore(deps): upgrade dev dependencies  # no version bump",
    ],
    howGitAgentHelps: {
      en: "git-agent ensures your commit history speaks SemVer accurately. By generating correctly typed conventional commits, it gives semantic-release and release-please the signal they need to compute the right version bump automatically.",
      zh: "git-agent 确保你的提交历史准确地反映 SemVer 语义。通过生成正确类型的约定式提交，它为 semantic-release 和 release-please 提供了自动计算正确版本升级所需的信号。",
    },
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
        label: { en: "Breaking change template", zh: "breaking change 提交模板" },
        href: "/templates/breaking-change",
      },
    ],
    faq: [
      {
        question: {
          en: "How does git-agent signal a breaking change?",
          zh: "git-agent 如何标识破坏性变更？",
        },
        answer: {
          en: "When the LLM detects an incompatible API change in the diff, git-agent adds a BREAKING CHANGE: footer to the commit body and uses a ! immediately before the colon (after optional scope), e.g. feat(api)!: remove /v1 endpoints.",
          zh: "当 LLM 在 diff 中检测到不兼容的 API 变更时，git-agent 会在提交正文中添加 BREAKING CHANGE: 页脚，并在可选 scope 之后、冒号之前使用 !，例如 feat(api)!: remove /v1 endpoints。",
        },
      },
      {
        question: {
          en: "Does git-agent integrate with semantic-release or release-please?",
          zh: "git-agent 与 semantic-release 或 release-please 集成吗？",
        },
        answer: {
          en: "git-agent is not directly integrated with those tools, but the commits it produces are fully compatible with both. They parse standard Conventional Commits format which git-agent outputs.",
          zh: "git-agent 没有直接与这些工具集成，但它生成的提交与两者完全兼容。它们解析标准的约定式提交格式，而 git-agent 正是输出这种格式。",
        },
      },
      {
        question: {
          en: "Should every commit type affect the version number?",
          zh: "每种提交类型都应该影响版本号吗？",
        },
        answer: {
          en: "No. Only feat, fix, and commits with BREAKING CHANGE footers affect version numbers in the standard semantic-release configuration. Types like chore, docs, style, and test do not trigger version bumps.",
          zh: "不。在标准的 semantic-release 配置中，只有 feat、fix 和包含 BREAKING CHANGE 页脚的提交会影响版本号。chore、docs、style 和 test 等类型不会触发版本升级。",
        },
      },
    ],
  },
  {
    slug: "git-hooks",
    term: { en: "Git Hooks", zh: "Git 钩子" },
    definition: {
      en: "Shell scripts placed in a repository's .git/hooks directory that Git executes automatically at specific points in the version control workflow.",
      zh: "放置在仓库 .git/hooks 目录中的 shell 脚本，Git 在版本控制工作流的特定点自动执行这些脚本。",
    },
    longDescription: {
      en: `Git provides over twenty hook points across the commit, merge, rebase, push, and receive workflows. Each hook is a script file named after the hook event (pre-commit, commit-msg, post-commit, pre-push, etc.) placed in .git/hooks and made executable. When Git reaches the corresponding lifecycle point, it runs the script; a non-zero exit code aborts the operation.

Client-side hooks (pre-commit, commit-msg, post-commit, pre-push) run on the developer's machine and are not version-controlled in .git/hooks — each contributor must install them locally. This is why hook managers like Husky, lefthook, and pre-commit exist: they store hook definitions in the repository root and install them into .git/hooks on npm install or a setup command.

Server-side hooks (pre-receive, update, post-receive) run on the Git server and enforce policy for pushes. They cannot be bypassed by individual developers. For commit message validation on the server side, tools like Gitea, GitHub, and GitLab also support status checks and branch protection rules that complement local hooks.`,
      zh: `Git 在提交、合并、变基、推送和接收工作流中提供了二十多个钩子点。每个钩子是一个以钩子事件命名的脚本文件（pre-commit、commit-msg、post-commit、pre-push 等），放置在 .git/hooks 中并设为可执行。当 Git 到达相应的生命周期点时，它运行该脚本；非零退出码会中止操作。

客户端钩子（pre-commit、commit-msg、post-commit、pre-push）在开发者的机器上运行，不在 .git/hooks 中进行版本控制——每个贡献者必须在本地安装它们。这就是为什么存在 Husky、lefthook 和 pre-commit 等钩子管理器的原因：它们将钩子定义存储在仓库根目录，并在 npm install 或设置命令时将其安装到 .git/hooks 中。

服务器端钩子（pre-receive、update、post-receive）在 Git 服务器上运行，强制执行推送策略。它们不能被个别开发者绕过。对于服务器端的提交信息验证，Gitea、GitHub 和 GitLab 等工具还支持状态检查和分支保护规则，以补充本地钩子。`,
    },
    examples: [
      "# pre-commit: run tests on staged files",
      "# commit-msg: validate message format against regex",
      "# post-commit: send webhook notification on commit",
      "# pre-push: run full test suite before push",
      "# prepare-commit-msg: pre-populate message template",
    ],
    howGitAgentHelps: {
      en: "`git-agent init` installs a commit-msg hook that validates the generated message against your project's conventional commit format. The hook integrates with git-agent's retry loop so rejected messages are automatically corrected without developer intervention.",
      zh: "`git-agent init` 安装一个 commit-msg 钩子，根据项目的约定式提交格式验证生成的信息。该钩子与 git-agent 的重试循环集成，因此被拒绝的信息会自动更正，无需开发者干预。",
    },
    relatedLinks: [
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Why are Git hooks not committed to the repository by default?",
          zh: "为什么 Git 钩子默认不提交到仓库？",
        },
        answer: {
          en: "The .git directory is never tracked by Git. Hooks live inside .git/hooks and must be installed separately by each contributor. Hook managers solve this by keeping hook source in the repo root (e.g. .husky/) and symlinking on setup.",
          zh: ".git 目录从不被 Git 跟踪。钩子存放在 .git/hooks 中，必须由每个贡献者单独安装。钩子管理器通过将钩子源代码保存在仓库根目录（如 .husky/）并在设置时创建符号链接来解决这个问题。",
        },
      },
      {
        question: {
          en: "Can git-agent work without its installed hook?",
          zh: "git-agent 没有安装钩子也能工作吗？",
        },
        answer: {
          en: "Yes. The hook is optional. Without it, git-agent still generates and commits messages; it just won't validate format against your project's specific rules or retry on rejection.",
          zh: "可以。钩子是可选的。没有它，git-agent 仍然生成并提交信息；只是不会根据项目的特定规则验证格式，也不会在拒绝时重试。",
        },
      },
      {
        question: {
          en: "What language must Git hooks be written in?",
          zh: "Git 钩子必须用什么语言编写？",
        },
        answer: {
          en: "Any language whose interpreter is available on the system. The hook file just needs a valid shebang line (#!/bin/sh, #!/usr/bin/env python3, #!/usr/bin/env node) and execute permission.",
          zh: "任何系统中可用的解释器语言都可以。钩子文件只需要一个有效的 shebang 行（#!/bin/sh、#!/usr/bin/env python3、#!/usr/bin/env node）和执行权限。",
        },
      },
    ],
  },
  {
    slug: "conventional-changelog",
    term: { en: "Conventional Changelog", zh: "约定式变更日志" },
    definition: {
      en: "An automatically generated changelog derived from Conventional Commits history, categorising changes into sections like Features, Bug Fixes, and Breaking Changes per release.",
      zh: "从约定式提交历史自动生成的变更日志，将变更按每次发布分类为功能、错误修复和破坏性变更等章节。",
    },
    longDescription: {
      en: `Conventional Changelog is both a concept and a family of tooling (the conventional-changelog npm packages) that reads a git log, parses Conventional Commits messages, and produces a formatted CHANGELOG.md. Tools like semantic-release, release-please, and changesets use the same approach under the hood.

The generated changelog groups commits by type and scope under each release tag. feat commits appear under a "Features" heading, fix commits under "Bug Fixes", and breaking changes under "BREAKING CHANGES". Commit types like chore, docs, and style are typically omitted from public changelogs unless configured otherwise.

The quality of a generated changelog is directly proportional to the quality of commit messages. Vague messages like "fix stuff" produce useless changelog entries; precise Conventional Commits messages like fix(auth): prevent session fixation on login produce entries that communicate meaningful information to release consumers.`,
      zh: `约定式变更日志既是一个概念，也是一组工具（conventional-changelog npm 包），它读取 git 日志，解析约定式提交信息，并生成格式化的 CHANGELOG.md。semantic-release、release-please 和 changesets 等工具在底层使用相同的方法。

生成的变更日志在每个发布标签下按类型和范围对提交进行分组。feat 提交出现在"功能"标题下，fix 提交在"错误修复"下，破坏性变更在"BREAKING CHANGES"下。chore、docs 和 style 等提交类型通常从公开变更日志中省略，除非另有配置。

生成的变更日志质量与提交信息质量直接成正比。"fix stuff"等模糊信息产生无用的变更日志条目；"fix(auth): prevent session fixation on login"等精确的约定式提交信息产生向发布消费者传达有意义信息的条目。`,
    },
    examples: [
      "feat(api): add cursor-based pagination to /users endpoint",
      "fix(notifications): de-duplicate email sends on retry",
      "feat!: migrate authentication to OAuth2; drop legacy session API",
      "perf(search): replace full-text scan with indexed trigram search",
    ],
    howGitAgentHelps: {
      en: "git-agent produces detailed, specific commit messages with accurate types and scopes. When changelog tools process your history, every entry reflects genuine information about what changed and why, rather than placeholder or vague descriptions.",
      zh: "git-agent 生成详细、具体的提交信息，包含准确的类型和范围。当变更日志工具处理你的历史记录时，每个条目都反映了关于变更内容和原因的真实信息，而非占位符或模糊描述。",
    },
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
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent generate the CHANGELOG.md file?",
          zh: "git-agent 会生成 CHANGELOG.md 文件吗？",
        },
        answer: {
          en: "No. git-agent focuses on authoring commits. Changelog generation is handled by downstream tools (semantic-release, release-please, conventional-changelog CLI) that read the commit history git-agent produces.",
          zh: "不会。git-agent 专注于撰写提交。变更日志生成由下游工具（semantic-release、release-please、conventional-changelog CLI）处理，它们读取 git-agent 生成的提交历史。",
        },
      },
      {
        question: {
          en: "Which commit types appear in a generated changelog?",
          zh: "哪些提交类型会出现在生成的变更日志中？",
        },
        answer: {
          en: "By default, conventional-changelog and semantic-release include feat and fix (and breaking changes from any type). Types like chore, style, test, and docs are excluded unless you customise the preset.",
          zh: "默认情况下，conventional-changelog 和 semantic-release 包含 feat 和 fix（以及任何类型的破坏性变更）。chore、style、test 和 docs 等类型被排除，除非你自定义预设。",
        },
      },
      {
        question: {
          en: "Can I use conventional changelog tooling without semantic-release?",
          zh: "不使用 semantic-release 也能用约定式变更日志工具吗？",
        },
        answer: {
          en: "Yes. The conventional-changelog-cli package generates a CHANGELOG.md independently. You can also use git-cliff, which is a fast Rust-based changelog generator that supports Conventional Commits.",
          zh: "可以。conventional-changelog-cli 包独立生成 CHANGELOG.md。你也可以使用 git-cliff，这是一个快速的基于 Rust 的变更日志生成器，支持约定式提交。",
        },
      },
    ],
  },
  {
    slug: "monorepo-commits",
    term: { en: "Monorepo Commits", zh: "Monorepo 提交" },
    definition: {
      en: "Commit practices adapted for repositories containing multiple packages or services, using scope to indicate which package or service a change belongs to.",
      zh: "适用于包含多个包或服务的仓库的提交实践，使用范围来指示变更属于哪个包或服务。",
    },
    longDescription: {
      en: `In a monorepo, a single git repository hosts multiple independently-releasable packages, services, or applications. Conventional Commits in this context rely heavily on the scope field to route changes to the right package changelog and trigger the correct version bump for that package only.

Common monorepo tooling includes Nx, Turborepo, Lerna, and Rush. These tools integrate with conventional-changelog or semantic-release to generate per-package changelogs and release versions based on which scopes appear in commits since the last release tag for that package.

A discipline challenge in monorepos is keeping commits scoped to the package they touch. A single commit that spans multiple packages (e.g., fixes a shared library and updates two consuming services) makes changelog attribution ambiguous. The preferred approach is one commit per package change, even when changes are coordinated. git-agent's atomic splitting handles this automatically by grouping changes by their package scope.`,
      zh: `在 monorepo 中，单个 git 仓库托管多个可独立发布的包、服务或应用程序。在此背景下，约定式提交严重依赖范围字段将变更路由到正确的包变更日志，并仅触发该包的正确版本升级。

常见的 monorepo 工具包括 Nx、Turborepo、Lerna 和 Rush。这些工具与 conventional-changelog 或 semantic-release 集成，根据自上次为该包发布标签以来提交中出现的范围，生成每个包的变更日志和发布版本。

monorepo 中的一个纪律挑战是将提交范围限定在它们所触及的包。跨越多个包的单个提交（例如，修复共享库并更新两个消费服务）使变更日志归属变得模糊。首选方法是每个包的变更一个提交，即使变更是协调的。git-agent 的原子拆分通过按包范围对变更进行分组来自动处理这个问题。`,
    },
    examples: [
      "feat(ui): add DateRangePicker component to design system",
      "fix(api-gateway): increase timeout for upstream health checks",
      "chore(shared): upgrade typescript to 5.4.0 across all packages",
      "feat(billing): add prorated credit calculation for mid-cycle upgrades",
      "test(auth-service): add refresh token expiry integration tests",
    ],
    howGitAgentHelps: {
      en: "git-agent reads your monorepo's directory structure during `git-agent init` to suggest per-package scopes. When you commit cross-package changes, the atomic splitter groups them by package scope into separate commits, keeping each package's changelog clean.",
      zh: "git-agent 在 `git-agent init` 期间读取 monorepo 的目录结构，以建议每个包的范围。当你提交跨包变更时，原子拆分器按包范围将它们分组为独立的提交，保持每个包的变更日志整洁。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting", zh: "提交拆分" },
        href: "/glossary/commit-splitting",
      },
      {
        label: { en: "Conventional changelog", zh: "约定式变更日志" },
        href: "/glossary/conventional-changelog",
      },
    ],
    faq: [
      {
        question: {
          en: "Should shared utility changes be committed separately from the packages that use them?",
          zh: "共享工具变更应该与使用它们的包分开提交吗？",
        },
        answer: {
          en: "Yes. Changes to a shared library and corresponding updates in consuming packages should be separate commits scoped to each package. This allows each package's changelog and version to reflect the actual scope of its change.",
          zh: "是的。共享库的变更和消费包中对应的更新应该是分开的提交，范围限定在每个包。这允许每个包的变更日志和版本反映其变更的实际范围。",
        },
      },
      {
        question: {
          en: "How does git-agent know which package a changed file belongs to?",
          zh: "git-agent 如何知道变更的文件属于哪个包？",
        },
        answer: {
          en: "git-agent uses file paths and the scope definitions in .git-agent/config.yml. During `git-agent init`, it reads package.json workspaces, go.work, or Cargo.toml workspace members to populate scope definitions automatically.",
          zh: "git-agent 使用文件路径和 .git-agent/config.yml 中的范围定义。在 `git-agent init` 期间，它读取 package.json 工作区、go.work 或 Cargo.toml 工作区成员以自动填充范围定义。",
        },
      },
      {
        question: {
          en: "Can git-agent handle Nx or Turborepo affected project detection?",
          zh: "git-agent 能处理 Nx 或 Turborepo 的受影响项目检测吗？",
        },
        answer: {
          en: "git-agent works at the git diff level and does not integrate directly with Nx or Turborepo affected algorithms. The atomic split groups changes by the file paths and scopes you defined, which naturally aligns with affected project boundaries.",
          zh: "git-agent 在 git diff 层面工作，不直接与 Nx 或 Turborepo 的受影响算法集成。原子拆分按你定义的文件路径和范围对变更进行分组，这自然地与受影响的项目边界对齐。",
        },
      },
    ],
  },
  {
    slug: "commit-message-format",
    term: { en: "Commit Message Format", zh: "提交信息格式" },
    definition: {
      en: "The structural rules that define how a git commit message should be organised, including its subject line, optional body, and optional footer sections.",
      zh: "定义 git 提交信息如何组织的结构规则，包括主题行、可选正文和可选页脚部分。",
    },
    longDescription: {
      en: `A well-formatted commit message consists of three parts separated by blank lines. The subject line (first line) summarises the change in 50 characters or fewer using the imperative mood ("add feature" not "added feature" or "adds feature"). The body (optional) provides additional context, the reasoning, or implementation details, with lines wrapped at 72 characters. The footer (optional) contains structured metadata like issue references, co-author attributions, or breaking change notices.

The Conventional Commits specification adds type and scope structure to the subject line: type(scope): subject. This makes the message both human-readable and machine-parseable. The 50-character limit for the subject is a git convention — git log --oneline truncates at this length, and GitHub and GitLab collapse long subject lines in their UIs.

Common formatting mistakes include mixing past and present tense, using periods at the end of subject lines, writing vague subjects ("update stuff"), not wrapping body lines, and combining unrelated changes in a single message. A good subject line answers "if applied, this commit will [subject]".`,
      zh: `格式良好的提交信息由三个部分组成，用空行分隔。主题行（第一行）以祈使语气用 50 个字符或更少总结变更（"add feature"而非"added feature"或"adds feature"）。正文（可选）提供额外上下文、推理或实现细节，行宽不超过 72 个字符。页脚（可选）包含结构化元数据，如问题引用、共同作者归属或破坏性变更通知。

约定式提交规范为主题行添加了类型和范围结构：type(scope): subject。这使信息既人类可读又机器可解析。主题行 50 个字符的限制是 git 约定——git log --oneline 在此长度截断，GitHub 和 GitLab 在其 UI 中折叠长主题行。

常见的格式错误包括混合过去式和现在式、在主题行末尾使用句点、编写模糊的主题（"update stuff"）、不换行正文行以及在单个信息中组合不相关的变更。一个好的主题行回答了"如果应用，此提交将[主题]"。`,
    },
    examples: [
      "feat(search): add full-text search with PostgreSQL tsvector",
      "fix(session): clear cookie on explicit logout even without active session",
      "refactor(logger): extract severity mapping to standalone function\n\n- move mapping table out of the hot path log() function\n- add unit tests for each severity level mapping\n\nThe inline table was recalculated on every log call; extracting it reduces\nper-call work and makes the mapping independently testable.",
      "chore(ci): pin Node.js to 20.14.0 LTS in all workflow files",
    ],
    howGitAgentHelps: {
      en: "git-agent generates messages that follow the correct format automatically: a conventional subject line within 72 characters, a blank line separator, a bullet-point body explaining what changed, and a closing paragraph explaining why.",
      zh: "git-agent 自动生成遵循正确格式的信息：72 个字符以内的约定式主题行、空行分隔符、解释变更内容的项目符号正文，以及解释原因的结尾段落。",
    },
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "feat commit template", zh: "feat 提交模板" },
        href: "/templates/feat",
      },
    ],
    faq: [
      {
        question: {
          en: "Why is the 50-character subject line limit important?",
          zh: "为什么主题行 50 个字符的限制很重要？",
        },
        answer: {
          en: "git log --oneline and many Git UIs (GitHub, GitLab, Sourcetree) truncate or wrap at 72 characters. Keeping subjects under 50 characters ensures they are fully visible in the one-line log format across all contexts.",
          zh: "git log --oneline 和许多 Git UI（GitHub、GitLab、Sourcetree）在 72 个字符处截断或换行。将主题保持在 50 个字符以内可确保它们在所有上下文的单行日志格式中完全可见。",
        },
      },
      {
        question: {
          en: "Is the commit body mandatory?",
          zh: "提交正文是必须的吗？",
        },
        answer: {
          en: "No, but it is recommended for non-trivial changes. A subject line says what changed; the body explains why the change was necessary and any context that is not obvious from the diff alone.",
          zh: "不是必须的，但建议用于非简单变更。主题行说明了变更的内容；正文解释了为什么变更是必要的，以及仅从 diff 本身不明显的任何上下文。",
        },
      },
      {
        question: {
          en: "Should commit messages be written in English?",
          zh: "提交信息应该用英语写吗？",
        },
        answer: {
          en: "There is no universal rule. The convention is to match the language used in the codebase and existing history. For open-source projects intended for international contributors, English is the common choice.",
          zh: "没有通用规则。约定是与代码库和现有历史中使用的语言保持一致。对于面向国际贡献者的开源项目，英语是常见选择。",
        },
      },
    ],
  },
  {
    slug: "squash-commits",
    term: { en: "Squash Commits", zh: "压缩提交" },
    definition: {
      en: "The git operation of combining multiple commits into a single commit, typically used to clean up work-in-progress history before merging a feature branch.",
      zh: "将多个提交合并为单个提交的 git 操作，通常用于在合并功能分支之前清理进行中的工作历史。",
        },
    longDescription: {
      en: `Squashing collapses a series of commits into one, replacing their individual messages with a single combined message. It is performed via git rebase -i (interactive rebase) by marking commits as "squash" or "fixup", or automatically during a pull request merge with the "Squash and merge" option in GitHub and GitLab.

Squashing is often used to clean up noisy WIP history (commits like "fix typo", "try again", "actually fix it") before the commits become part of the permanent main branch history. The resulting single commit is easier to revert if the feature needs to be removed.

The tension between squashing and atomic commits is important to understand. Squashing multiple atomic commits into one loses the granularity that makes atomic commits valuable for bisecting and blame. A balanced approach is to maintain atomic commits during development and review, then squash only WIP noise before merge — preserving logical units while eliminating checkpoint clutter.`,
      zh: `压缩将一系列提交折叠为一个，用单个组合信息替换它们各自的信息。它通过 git rebase -i（交互式变基）执行，将提交标记为"squash"或"fixup"，或者在 GitHub 和 GitLab 中通过拉取请求合并时的"Squash and merge"选项自动执行。

压缩通常用于在提交成为永久主分支历史的一部分之前，清理嘈杂的 WIP 历史（如"fix typo"、"try again"、"actually fix it"等提交）。如果需要删除功能，生成的单个提交更容易回滚。

理解压缩与原子提交之间的张力很重要。将多个原子提交压缩为一个会失去使原子提交对二分查找和责任归属有价值的粒度。一种平衡的方法是在开发和审查期间维护原子提交，然后在合并前只压缩 WIP 噪音——保留逻辑单元同时消除检查点杂乱。`,
    },
    examples: [
      "# Before squash: 5 WIP commits on feature branch",
      "wip: start login flow",
      "fix: forgot to import component",
      "fix: handle edge case",
      "# After squash merge: one clean commit on main",
      "feat(auth): add OAuth2 login flow with PKCE",
    ],
    howGitAgentHelps: {
      en: "git-agent creates clean, atomic commits from the start, reducing the need to squash. When you use git-agent commit, each logical change is already committed separately with a meaningful message, so the history is ready for review and merge without cleanup.",
      zh: "git-agent 从一开始就创建干净的原子提交，减少了压缩的需求。当你使用 git-agent commit 时，每个逻辑变更已经单独提交并附有有意义的信息，因此历史记录无需清理即可用于审查和合并。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting", zh: "提交拆分" },
        href: "/glossary/commit-splitting",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Should I squash commits before merging a pull request?",
          zh: "在合并拉取请求之前应该压缩提交吗？",
        },
        answer: {
          en: "It depends on commit quality. If each commit in the PR is already a clean atomic commit with a conventional message (as git-agent produces), preserving them individually gives better history. Squash WIP checkpoints, not meaningful atomic commits.",
          zh: "这取决于提交质量。如果 PR 中的每个提交已经是一个带有约定式信息的干净原子提交（如 git-agent 生成的），单独保留它们可以提供更好的历史记录。压缩 WIP 检查点，而非有意义的原子提交。",
        },
      },
      {
        question: {
          en: "Does squashing break git bisect?",
          zh: "压缩会破坏 git bisect 吗？",
        },
        answer: {
          en: "Squashing reduces bisect granularity. If ten atomic commits are squashed into one, bisect can only identify that one commit as the source of a regression — not which of the ten original changes introduced it.",
          zh: "压缩会降低 bisect 的粒度。如果十个原子提交被压缩为一个，bisect 只能识别该提交是回归的来源——而无法确定十个原始变更中的哪一个引入了它。",
        },
      },
      {
        question: {
          en: "Is 'Squash and merge' in GitHub the same as git rebase squash?",
          zh: "GitHub 中的'Squash and merge'与 git rebase squash 相同吗？",
        },
        answer: {
          en: "They produce the same result (one commit) but differ in how the commit is created. GitHub's squash merge creates a new merge commit with all changes; interactive rebase squash modifies the local branch history before merge.",
          zh: "它们产生相同的结果（一个提交），但提交的创建方式不同。GitHub 的压缩合并创建一个包含所有变更的新合并提交；交互式变基压缩在合并前修改本地分支历史。",
        },
      },
    ],
  },
  {
    slug: "git-rebase",
    term: { en: "Git Rebase", zh: "Git 变基" },
    definition: {
      en: "A git operation that rewrites commit history by applying commits from one branch onto the tip of another, creating a linear history without merge commits.",
      zh: "一种 Git 操作，通过将一个分支的提交应用到另一个分支的顶端来重写提交历史，创建没有合并提交的线性历史。",
    },
    longDescription: {
      en: `Rebasing is one of two primary ways to integrate changes from one branch into another (the other being merging). When you rebase, git takes the commits from your current branch, temporarily sets them aside, fast-forwards to the target branch's tip, then reapplies each commit on top. The result is a linear history that reads as if each change was authored sequentially against the latest code.

Interactive rebase (git rebase -i) is the more powerful form. It opens an editor where you can reorder, drop, squash, fixup, edit, or split commits. This is the primary tool for cleaning up a feature branch's history before merging — turning a series of WIP checkpoints into a coherent set of atomic commits.

A critical rule of rebasing: never rebase commits that have been pushed to a shared branch. Rebasing creates new commit hashes, so anyone who has pulled the old version will experience duplicate commits and merge conflicts. The safe workflow is to rebase local work before pushing, and use merge or rebase + force-push only on branches you own exclusively.`,
      zh: `变基是将变更从一个分支集成到另一个分支的两种主要方式之一（另一种是合并）。当你变基时，git 会获取当前分支的提交，暂时将它们放在一边，快进到目标分支的顶端，然后逐个重新应用每个提交。结果是一个线性历史，看起来就像每个变更都是针对最新代码顺序编写的。

交互式变基（git rebase -i）是更强大的形式。它会打开一个编辑器，你可以在其中重新排序、删除、压缩、修复、编辑或拆分提交。这是在合并前清理功能分支历史的主要工具——将一系列 WIP 检查点转变为连贯的原子提交集。

变基的关键规则：永远不要变基已推送到共享分支的提交。变基会创建新的提交哈希，因此任何拉取了旧版本的人都会遇到重复提交和合并冲突。安全的工作流是在推送前变基本地工作，并且只在你独占的分支上使用变基加强制推送。`,
    },
    examples: [
      "git rebase main  # rebase current branch onto main",
      "git rebase -i HEAD~5  # interactively rebase last 5 commits",
      "git rebase --abort  # abort the rebase in progress",
      "git rebase --continue  # continue after resolving conflicts",
      "git rebase --onto main feature-branch  # rebase from feature-branch onto main",
    ],
    howGitAgentHelps: {
      en: "git-agent produces clean, atomic commits from the start, so interactive rebasing for cleanup is rarely needed. When you do need to rebase, the conventional commit messages git-agent generates make the rebase todo list self-explanatory — each commit's purpose is clear at a glance.",
      zh: "git-agent 从一开始就生成干净的原子提交，因此很少需要交互式变基来清理。当你确实需要变基时，git-agent 生成的约定式提交信息使变基待办列表一目了然——每个提交的目的清晰可见。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Squash commits", zh: "压缩提交" },
        href: "/glossary/squash-commits",
      },
      {
        label: { en: "Git merge conflict", zh: "Git 合并冲突" },
        href: "/glossary/git-merge-conflict",
      },
    ],
    faq: [
      {
        question: {
          en: "What is the difference between rebase and merge?",
          zh: "变基和合并有什么区别？",
        },
        answer: {
          en: "Merge creates a new merge commit that ties together two branch histories, preserving the exact timeline of when each commit was made. Rebase rewrites history by applying commits linearly on top of the target branch, creating a cleaner log but losing the original chronological context.",
          zh: "合并创建一个新的合并提交，将两个分支历史连接在一起，保留每个提交的确切时间线。变基通过将提交线性应用到目标分支顶端来重写历史，创建更清晰的日志但丢失了原始的时间顺序上下文。",
        },
      },
      {
        question: {
          en: "Why should I not rebase a shared branch?",
          zh: "为什么不应该变基共享分支？",
        },
        answer: {
          en: "Rebasing changes commit hashes. If others have based work on the old commits, they will have duplicate commits and merge conflicts when they pull. The golden rule is: only rebase commits that exist locally on your own branch.",
          zh: "变基会更改提交哈希。如果其他人基于旧提交进行了工作，他们在拉取时会出现重复提交和合并冲突。黄金法则是：只变基本地存在且属于你自己的分支上的提交。",
        },
      },
      {
        question: {
          en: "Does git-agent use rebase internally?",
          zh: "git-agent 内部使用变基吗？",
        },
        answer: {
          en: "No. git-agent works at commit time, not after the fact. It splits staged changes into atomic commits using git's staging mechanism rather than rewriting history with rebase.",
          zh: "不。git-agent 在提交时工作，而不是事后。它使用 git 的暂存机制将暂存变更拆分为原子提交，而不是使用变基重写历史。",
        },
      },
    ],
  },
  {
    slug: "git-cherry-pick",
    term: { en: "Git Cherry-pick", zh: "Git Cherry-pick" },
    definition: {
      en: "A git command that applies the changes introduced by one or more existing commits from any branch onto the current HEAD, creating a new commit with the same changes but a different hash.",
      zh: "一种 Git 命令，将一个或多个现有提交（来自任何分支）引入的变更应用到当前 HEAD，创建一个具有相同变更但不同哈希的新提交。",
    },
    longDescription: {
      en: `Cherry-picking is the surgical alternative to merging or rebasing entire branches. Instead of bringing every commit from a branch, exactly one commit is selected and its changes are applied to the current position. This is invaluable for hotfix backporting, where a fix committed on the main branch needs to be applied to a release branch without bringing the intervening feature commits.

The command takes a commit hash and replays the diff of that commit against the current HEAD. If the diff applies cleanly, a new commit with the same author and message (by default) is created. If conflicts arise, they are resolved the same way as merge conflicts.

Cherry-picking copies changes rather than moving them. The original commit remains in its source branch. This means cherry-picking the same commit to multiple branches creates multiple copies of the change, each with a different hash. For tracking purposes, git cherry-pick automatically appends the original commit hash to the cherry-picked message.`,
      zh: `Cherry-pick 是合并或变基整个分支的手术刀替代方案。它不是从分支中引入每个提交，而是精确选择一个提交，将其变更应用到当前位置。这对于热修复反向移植非常宝贵——主分支上提交的修复需要应用到发布分支，而不引入中间的功能提交。

该命令接受一个提交哈希，并将该提交的 diff 重新应用到当前 HEAD。如果 diff 干净地应用，则会创建一个具有相同作者和消息（默认情况下）的新提交。如果出现冲突，则与合并冲突相同的方式解决。

Cherry-pick 复制变更而不是移动它们。原始提交仍然保留在其源分支中。这意味着将同一提交 cherry-pick 到多个分支会创建该变更的多个副本，每个副本具有不同的哈希。为了追踪目的，git cherry-pick 会自动将原始提交哈希附加到 cherry-pick 的消息中。`,
    },
    examples: [
      "git cherry-pick abc1234  # apply commit abc1234 to current HEAD",
      "git cherry-pick abc1234..def5678  # apply a range of commits",
      "git cherry-pick -n abc1234  # apply changes without committing (--no-commit)",
      "git cherry-pick --continue  # continue after resolving conflicts",
      "git cherry-pick --abort  # abort the cherry-pick in progress",
    ],
    howGitAgentHelps: {
      en: "git-agent's consistent commit format makes cherry-pick source selection easier: each commit's subject line clearly states what it does, so you can identify the right commit to cherry-pick without reading the full diff. The structured messages also help downstream tools track cherry-picked commits across release branches.",
      zh: "git-agent 一致的提交格式使 cherry-pick 源选择更容易：每个提交的主题行清楚地说明了其作用，因此无需阅读完整 diff 就能识别要 cherry-pick 的正确提交。结构化的消息还有助于下游工具跨发布分支追踪 cherry-pick 的提交。",
    },
    relatedLinks: [
      {
        label: { en: "Git rebase", zh: "Git 变基" },
        href: "/glossary/git-rebase",
      },
      {
        label: { en: "Git merge conflict", zh: "Git 合并冲突" },
        href: "/glossary/git-merge-conflict",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Can cherry-picking introduce merge conflicts?",
          zh: "Cherry-pick 会引入合并冲突吗？",
        },
        answer: {
          en: "Yes. If the context around the cherry-picked changes differs between the source and target branches, conflicts can arise. They are resolved identically to merge conflict resolution.",
          zh: "会的。如果 cherry-pick 的变更周围的上下文在源分支和目标分支之间不同，就会出现冲突。它们的解决方式与合并冲突解决完全相同。",
        },
      },
      {
        question: {
          en: "Does git-agent support cherry-picking?",
          zh: "git-agent 支持 cherry-pick 吗？",
        },
        answer: {
          en: "git-agent focuses on commit authoring, not cherry-pick execution. However, the well-structured commits it produces make cherry-pick selection easier because each commit's scope and purpose are immediately clear from its message.",
          zh: "git-agent 专注于提交撰写，而不是 cherry-pick 执行。然而，它生成的结构良好的提交使 cherry-pick 选择更容易，因为每个提交的范围和目的从其消息中立即清晰可见。",
        },
      },
      {
        question: {
          en: "What is the difference between cherry-pick and rebase --onto?",
          zh: "Cherry-pick 和 rebase --onto 有什么区别？",
        },
        answer: {
          en: "rebase --onto replays a range of commits onto a different base, used for transplanting entire sequences. cherry-pick is for individual commits. Rebase also preserves the original commit order, while cherry-pick applies commits in the order you specify them.",
          zh: "rebase --onto 将一系列提交重放到不同的基础上，用于移植整个序列。Cherry-pick 用于单个提交。变基还保留原始提交顺序，而 cherry-pick 按你指定的顺序应用提交。",
        },
      },
    ],
  },
  {
    slug: "git-merge-conflict",
    term: { en: "Git Merge Conflict", zh: "Git 合并冲突" },
    definition: {
      en: "A situation where git cannot automatically reconcile two divergent changes to the same part of a file, requiring manual resolution by the developer.",
      zh: "当 Git 无法自动协调同一文件相同部分的两个不同变更时出现的情况，需要开发者手动解决。",
    },
    longDescription: {
      en: `Merge conflicts occur when two branches modify the same line of a file differently, or when one branch deletes a file while the other modifies it. Git marks the conflicting region in the file with conflict markers (<<<<<<<, =======, >>>>>>>) showing both versions, and the developer must edit the file to produce the correct final state before staging and committing the resolution.

Conflict resolution is a manual, context-sensitive process. The developer examines both versions, considers the intent of each change, and produces a merged result that satisfies both purposes. This may involve choosing one side, combining elements from both, or writing entirely new code. Tools like mergetool (vimdiff, meld, Beyond Compare) provide three-way merge views showing the base, local, and remote versions.

The frequency of merge conflicts is a measure of team coordination and code architecture. Well-modularised codebases where teams work on distinct files experience fewer conflicts. Frequent conflicts in the same files often indicate poor separation of concerns or insufficient communication about ongoing work.`,
      zh: `当两个分支以不同方式修改文件的同一行，或者一个分支删除文件而另一个分支修改它时，就会发生合并冲突。Git 用冲突标记（<<<<<<<、=======、>>>>>>>）在文件中标记冲突区域，显示两个版本，开发者必须编辑文件以产生正确的最终状态，然后暂存并提交解决方案。

冲突解决是一个手动的、上下文敏感的过程。开发者检查两个版本，考虑每个变更的意图，并产生满足两者目的的合并结果。这可能涉及选择一方、组合两者的元素或编写全新的代码。像 mergetool（vimdiff、meld、Beyond Compare）这样的工具提供三向合并视图，显示基础版本、本地版本和远程版本。

合并冲突的频率是团队协调和代码架构的衡量标准。模块化良好的代码库中，团队在各自不同的文件上工作，冲突较少。同一文件中的频繁冲突通常表明关注点分离不足或对正在进行的工作沟通不够。`,
    },
    examples: [
      "# Conflict markers in a file",
      "<<<<<<< HEAD",
      "const TIMEOUT = 5000;",
      "=======",
      "const TIMEOUT = 30000;",
      ">>>>>>> feature/timeout-config",
      "git merge --abort  # abort the merge and return to pre-merge state",
      "git diff --name-only --diff-filter=U  # list unmerged files",
      "git mergetool  # launch the configured merge tool",
    ],
    howGitAgentHelps: {
      en: "git-agent reduces merge conflicts by producing atomic commits that are scoped to specific files and logical changes. Smaller, focused commits are less likely to touch the same lines as other work, and when conflicts do occur, the clear commit messages help you understand the intent of each side's change.",
      zh: "git-agent 通过生成范围限定在特定文件和逻辑变更的原子提交来减少合并冲突。更小、更专注的提交不太可能触及与其他工作相同的行，而当冲突确实发生时，清晰的提交消息帮助你理解每一方变更的意图。",
    },
    relatedLinks: [
      {
        label: { en: "Git rebase", zh: "Git 变基" },
        href: "/glossary/git-rebase",
      },
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Git cherry-pick", zh: "Git cherry-pick" },
        href: "/glossary/git-cherry-pick",
      },
    ],
    faq: [
      {
        question: {
          en: "Can git-agent resolve merge conflicts automatically?",
          zh: "git-agent 能自动解决合并冲突吗？",
        },
        answer: {
          en: "No. git-agent is a commit authoring tool, not a merge conflict resolver. Merge conflicts require human judgment about the intent of each change. However, git-agent's detailed commit messages provide valuable context for making those decisions.",
          zh: "不能。git-agent 是一个提交撰写工具，而不是合并冲突解决工具。合并冲突需要人对每个变更的意图进行判断。不过，git-agent 详细的提交信息为做出这些决策提供了有价值的上下文。",
        },
      },
      {
        question: {
          en: "What is the best strategy to avoid merge conflicts?",
          zh: "避免合并冲突的最佳策略是什么？",
        },
        answer: {
          en: "Frequent integration with the target branch, small focused commits, modular code architecture, and clear team communication. Rebasing feature branches on main before opening PRs also reduces conflicts at merge time.",
          zh: "频繁与目标分支集成、小而专注的提交、模块化代码架构以及清晰的团队沟通。在打开 PR 前将功能分支变基到 main 也能减少合并时的冲突。",
        },
      },
      {
        question: {
          en: "What is the difference between a merge conflict and a rebase conflict?",
          zh: "合并冲突和变基冲突有什么区别？",
        },
        answer: {
          en: "The conflict resolution process is the same (edit the markers, stage, continue). The difference is that a merge conflict happens once at the merge commit, while a rebase conflict can happen multiple times as each commit is reapplied individually.",
          zh: "冲突解决过程相同（编辑标记、暂存、继续）。区别在于合并冲突在合并提交时发生一次，而变基冲突可能在每个提交被重新应用时多次发生。",
        },
      },
    ],
  },
  {
    slug: "git-stash",
    term: { en: "Git Stash", zh: "Git 暂存" },
    definition: {
      en: "A git feature that temporarily shelves uncommitted changes (both staged and unstaged) so you can work on something else, then reapply them later.",
      zh: "一种 Git 功能，临时搁置未提交的变更（包括暂存和未暂存的），以便处理其他工作，然后再重新应用它们。",
    },
    longDescription: {
      en: `Git stash records the current state of the working directory and index in a stack-like data structure, then reverts them to the clean HEAD state. This is useful when you need to switch branches urgently (e.g., to fix a production bug) but have uncommitted work in progress that is not ready to commit.

Changes are saved to a stash stack. You can have multiple stashes, each identified by a reference like stash@{0}, stash@{1}, etc. Each stash entry optionally includes a message (git stash push -m "message") for identification. The most recent stash is always stash@{0}.

Common operations include git stash push (save changes), git stash pop (apply and remove the top stash), git stash apply (apply without removing), git stash list (view all stashes), and git stash drop (remove a specific stash). Stashing only tracks tracked files by default; untracked files require the --include-untracked flag, and ignored files require --all.`,
      zh: `Git stash 将工作目录和索引的当前状态记录在类似栈的数据结构中，然后将它们恢复到干净的 HEAD 状态。这在需要紧急切换分支（例如修复生产错误）但正在进行的工作尚未准备好提交时非常有用。

变更保存到 stash 栈中。你可以有多个 stash，每个由 stash@{0}、stash@{1} 等引用标识。每个 stash 条目可选地包含一条消息（git stash push -m "message"）用于识别。最新的 stash 总是 stash@{0}。

常见操作包括 git stash push（保存变更）、git stash pop（应用并移除顶部 stash）、git stash apply（应用但不移除）、git stash list（查看所有 stash）和 git stash drop（移除特定 stash）。默认情况下，stash 只跟踪已跟踪的文件；未跟踪的文件需要 --include-untracked 标志，忽略的文件需要 --all。`,
    },
    examples: [
      "git stash push -m 'WIP: refactoring auth middleware'",
      "git stash pop  # apply and remove the latest stash",
      "git stash list  # list all stashes",
      "git stash show stash@{1}  # show diff of a specific stash",
      "git stash branch new-feature stash@{0}  # create a branch from a stash",
    ],
    howGitAgentHelps: {
      en: "git-agent encourages committing early and often by making commit creation fast and low-effort. Instead of stashing work-in-progress to switch context, you can let git-agent create a meaningful atomic commit from your current changes, reducing the need for stashes and the risk of forgetting about them.",
      zh: "git-agent 通过使提交创建快速且低努力来鼓励尽早和频繁提交。你可以让 git-agent 从当前变更创建一个有意义的原子提交，而不是 stash 进行中的工作以切换上下文，从而减少 stash 的需求以及忘记 stash 的风险。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting", zh: "提交拆分" },
        href: "/glossary/commit-splitting",
      },
      {
        label: { en: "Git worktree", zh: "Git worktree" },
        href: "/glossary/git-worktree",
      },
    ],
    faq: [
      {
        question: {
          en: "What is the difference between git stash pop and git stash apply?",
          zh: "git stash pop 和 git stash apply 有什么区别？",
        },
        answer: {
          en: "pop applies the stash and removes it from the stack. apply applies the stash but keeps it in the stack, allowing you to apply the same stashed changes to multiple branches.",
          zh: "pop 应用 stash 并将其从栈中移除。apply 应用 stash 但将其保留在栈中，允许你将相同的 stash 变更应用到多个分支。",
        },
      },
      {
        question: {
          en: "Can I recover a dropped stash?",
          zh: "可以恢复已删除的 stash 吗？",
        },
        answer: {
          en: "A dropped stash can be recovered if you know its commit hash. Each stash is a commit object in git. Use git fsck --lost-found or git reflog to find the orphaned commit, then git cherry-pick or git stash apply with the commit hash.",
          zh: "如果你知道其提交哈希，可以恢复已删除的 stash。每个 stash 是 git 中的一个提交对象。使用 git fsck --lost-found 或 git reflog 找到孤立的提交，然后使用 git cherry-pick 或 git stash apply 加上提交哈希。",
        },
      },
      {
        question: {
          en: "Does git-agent stash changes before splitting?",
          zh: "git-agent 在拆分前会 stash 变更吗？",
        },
        answer: {
          en: "No. git-agent works directly with the staged diff. It does not stash anything. The commit splitting process operates on whatever changes are currently staged, leaving unstaged work untouched.",
          zh: "不会。git-agent 直接处理暂存的 diff。它不会 stash 任何内容。提交拆分过程对当前暂存的任何变更进行操作，不触及未暂存的工作。",
        },
      },
    ],
  },
  {
    slug: "git-bisect",
    term: { en: "Git Bisect", zh: "Git 二分查找" },
    definition: {
      en: "A git command that uses binary search to find the specific commit that introduced a bug, by repeatedly halving the range of suspect commits.",
      zh: "一种 Git 命令，使用二分搜索来查找引入错误的特定提交，通过反复缩小可疑提交的范围。",
    },
    longDescription: {
      en: `Git bisect is one of the most powerful debugging tools in version control. You mark a known-good commit and a known-bad commit, and git uses binary search to narrow down the commit that first introduced the bug. In each step, git checks out a commit in the middle of the range, and you mark it as good or bad after testing. With N commits in the range, bisect finds the culprit in log2(N) steps — finding a bug among 1000 commits takes about 10 steps.

The process can be automated with git bisect run, which takes a script or command that exits with 0 (good) or non-zero (bad). This is especially powerful with a comprehensive test suite: git bisect run npm test will automatically find the commit that broke the build.

The effectiveness of bisect depends directly on commit quality. A series of atomic commits with clear, single-purpose changes makes bisect precise: the bad commit will cleanly isolate the change that introduced the bug. A large "mega-commit" that mixed multiple changes will be identified as the culprit even if only one of its changes caused the bug, forcing you to debug within the commit.`,
      zh: `Git bisect 是版本控制中最强大的调试工具之一。你标记一个已知好的提交和一个已知坏的提交，git 使用二分搜索来缩小首次引入错误的提交范围。在每一步中，git 检出一个中间范围的提交，你测试后将其标记为好或坏。对于 N 个提交的范围，bisect 在 log2(N) 步内找到罪魁祸首——在 1000 个提交中查找一个错误大约需要 10 步。

该过程可以通过 git bisect run 自动化，它接受一个脚本或命令，以 0（好）或非零（坏）退出。这对于拥有全面测试套件的项目尤为强大：git bisect run npm test 将自动找到破坏构建的提交。

Bisect 的有效性直接取决于提交质量。一系列具有清晰、单一目的变更的原子提交使 bisect 精确：坏的提交将干净地隔离引入错误的变更。而混合了多个变更的大型"大提交"将被识别为罪魁祸首，即使只有其中一个变更导致了错误，迫使你在提交内部进行调试。`,
    },
    examples: [
      "git bisect start  # begin a bisect session",
      "git bisect good abc1234  # mark a known-good commit",
      "git bisect bad HEAD  # mark the current commit as bad",
      "git bisect bad  # mark the current checkout as containing the bug",
      "git bisect run npm test  # automate bisect with a test script",
    ],
    howGitAgentHelps: {
      en: "git-agent's atomic commits dramatically improve bisect precision. Because each commit contains exactly one logical change, when bisect identifies a commit as the bug-introducer, you know the exact change responsible. No more digging through mega-commits to find which change broke things.",
      zh: "git-agent 的原子提交极大地提高了 bisect 的精度。因为每个提交只包含一个逻辑变更，当 bisect 识别出一个提交是引入错误者时，你就知道确切负责的变更。不再需要在大提交中挖掘以找出哪个变更破坏了东西。",
    },
    relatedLinks: [
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Git reflog", zh: "Git reflog" },
        href: "/glossary/git-reflog",
      },
      {
        label: { en: "Git rebase", zh: "Git 变基" },
        href: "/glossary/git-rebase",
      },
    ],
    faq: [
      {
        question: {
          en: "Can bisect find a bug across merge commits?",
          zh: "Bisect 能跨合并提交找到错误吗？",
        },
        answer: {
          en: "Yes, though merges can complicate the search. git bisect can skip merge commits that are not easily testable. Use git bisect skip to skip a commit that cannot be tested (e.g., due to build failures unrelated to the bug).",
          zh: "可以，尽管合并可能使搜索复杂化。git bisect 可以跳过不容易测试的合并提交。使用 git bisect skip 跳过无法测试的提交（例如，由于与错误无关的构建失败）。",
        },
      },
      {
        question: {
          en: "How many steps does bisect take for 5000 commits?",
          zh: "对于 5000 个提交，bisect 需要多少步？",
        },
        answer: {
          en: "Approximately 13 steps. Bisect halves the range each time, so it takes ceil(log2(N)) steps. For 5000 commits, log2(5000) ≈ 12.3, so 13 steps at most.",
          zh: "大约 13 步。Bisect 每次将范围减半，因此需要 ceil(log2(N)) 步。对于 5000 个提交，log2(5000) ≈ 12.3，所以最多 13 步。",
        },
      },
      {
        question: {
          en: "Does git-agent integrate with git bisect?",
          zh: "git-agent 与 git bisect 集成吗？",
        },
        answer: {
          en: "git-agent is a commit authoring tool, not a bisect tool. It produces the kind of high-quality atomic commits that make bisect most effective. The actual bisect workflow is done with standard git bisect commands.",
          zh: "git-agent 是一个提交撰写工具，而不是 bisect 工具。它生成使 bisect 最有效的高质量原子提交。实际的 bisect 工作流使用标准 git bisect 命令完成。",
        },
      },
    ],
  },
  {
    slug: "git-reflog",
    term: { en: "Git Reflog", zh: "Git Reflog" },
    definition: {
      en: "A reference log that records every movement of HEAD in the local repository, providing a safety net to recover lost commits and undo history-altering operations.",
      zh: "一个引用日志，记录本地仓库中 HEAD 的每次移动，为恢复丢失的提交和撤销历史修改操作提供安全网。",
    },
    longDescription: {
      en: `The reflog (reference log) is git's safety net. Every time HEAD changes — commits, checkouts, rebases, merges, resets, cherry-picks, stashes — an entry is written to the reflog. This means that even if you "lose" a commit (e.g., by doing a hard reset or rebase that discarded commits), you can find it in the reflog and recover it.

The reflog is local-only. It is never pushed to remotes and is not shared with other developers. Entries expire by default after 90 days for reachable commits and 30 days for unreachable ones. You can view the reflog with git reflog, which shows each entry's position (HEAD@{N}), the commit hash, and the action that created it.

Common recovery scenarios made possible by reflog include: recovering after a hard reset (git reset --hard HEAD@{1}), undoing a rebase that went wrong (git reset --hard ORIG_HEAD or finding the pre-rebase commit in reflog), and restoring a dropped stash. The reflog is the first place to check when something went missing in git.`,
      zh: `Reflog（引用日志）是 git 的安全网。每次 HEAD 发生变化——提交、检出新分支、变基、合并、重置、cherry-pick、stash——都会在 reflog 中写入一条记录。这意味着即使你"丢失"了一个提交（例如通过硬重置或丢弃提交的变基），你也可以在 reflog 中找到它并恢复。

Reflog 是本地唯一的。它永远不会推送到远程，也不会与其他开发者共享。默认情况下，可达提交的条目在 90 天后过期，不可达提交的条目在 30 天后过期。你可以使用 git reflog 查看 reflog，它显示每个条目的位置（HEAD@{N}）、提交哈希以及创建它的操作。

Reflog 支持的常见恢复场景包括：硬重置后恢复（git reset --hard HEAD@{1}）、撤销出错的变基（git reset --hard ORIG_HEAD 或在 reflog 中找到变基前的提交），以及恢复已删除的 stash。当你发现 git 中的东西丢失时，reflog 是第一个要检查的地方。`,
    },
    examples: [
      "git reflog  # show the full reflog for HEAD",
      "git reflog show main  # show reflog for a specific branch",
      "git reset --hard HEAD@{2}  # reset to the state from 2 moves ago",
      "git reflog expire --expire=now --all  # manually expire old entries",
      "git checkout HEAD@{5}  # check out the state from 5 moves ago",
    ],
    howGitAgentHelps: {
      en: "git-agent's conventional commit messages make reflog entries self-documenting. When you scan git reflog, each entry shows the commit message, so you can immediately identify which state you need to recover even without cross-referencing hashes against the main log.",
      zh: "git-agent 的约定式提交信息使 reflog 条目具有自文档性。当你扫描 git reflog 时，每个条目都显示提交信息，因此即使不将哈希与主日志交叉引用，也能立即识别需要恢复的状态。",
    },
    relatedLinks: [
      {
        label: { en: "Git bisect", zh: "Git 二分查找" },
        href: "/glossary/git-bisect",
      },
      {
        label: { en: "Git rebase", zh: "Git 变基" },
        href: "/glossary/git-rebase",
      },
      {
        label: { en: "Git stash", zh: "Git 暂存" },
        href: "/glossary/git-stash",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I recover a commit I made yesterday that I accidentally hard-reset?",
          zh: "我可以恢复昨天不小心硬重置的提交吗？",
        },
        answer: {
          en: "Almost certainly yes. Run git reflog and look for the commit message or the state before the reset. The commit will have an entry like HEAD@{N} that you can reset or cherry-pick from.",
          zh: "几乎肯定可以。运行 git reflog 并查找重置前的提交信息或状态。该提交会有一个类似 HEAD@{N} 的条目，你可以从中重置或 cherry-pick。",
        },
      },
      {
        question: {
          en: "Is the reflog shared with remote repositories?",
          zh: "Reflog 会与远程仓库共享吗？",
        },
        answer: {
          en: "No. The reflog is strictly local to your repository and is never pushed or fetched. Each developer has their own reflog tracking only their local operations.",
          zh: "不会。Reflog 严格限于本地仓库，永不推送或获取。每个开发者都有自己的 reflog，只跟踪他们的本地操作。",
        },
      },
      {
        question: {
          en: "How long do reflog entries last?",
          zh: "Reflog 条目可以保留多久？",
        },
        answer: {
          en: "Default expiry is 90 days for commits reachable from a branch or tag, and 30 days for unreachable commits. These values are configurable via gc.reflogExpire and gc.reflogExpireUnreachable.",
          zh: "默认情况下，从分支或标签可达的提交为 90 天，不可达的提交为 30 天。这些值可通过 gc.reflogExpire 和 gc.reflogExpireUnreachable 配置。",
        },
      },
    ],
  },
  {
    slug: "git-worktree",
    term: { en: "Git Worktree", zh: "Git Worktree" },
    definition: {
      en: "A git feature that allows multiple working directories, each checked out to a different branch, from a single repository, enabling parallel work without stashing or cloning.",
      zh: "一种 Git 功能，允许从单个仓库创建多个工作目录，每个目录检出到不同的分支，实现无需 stash 或克隆的并行工作。",
    },
    longDescription: {
      en: `Git worktrees solve the problem of needing to work on two branches simultaneously. Instead of stashing changes, cloning the repository again, or using throwaway merges, you add a worktree: a new working directory linked to the same repository, checked out to a different branch. Each worktree has its own working directory and index, but shares the repository's object store and refs.

The main benefit is context switching without overhead. You can have a main worktree on the main branch, a feature branch worktree for active development, and a hotfix worktree for urgent fixes — all side by side, all building independently, without any stashing or commit discarding. Each worktree is just a directory like ../project-hotfix.

Worktrees are managed with git worktree add <path> <branch>. Each worktree is recorded in the repository's .git/worktrees directory. When a worktree is no longer needed, git worktree remove <path> cleans it up. A common workflow is to use worktrees for code review: git worktree add ../project-review <pr-branch> creates a side-by-side directory to review a PR branch without disturbing your current work.`,
      zh: `Git worktree 解决了需要同时在两个分支上工作的问题。你无需 stash 变更、再次克隆仓库或使用临时合并，而是添加一个 worktree：一个链接到同一仓库的新工作目录，检出到不同的分支。每个 worktree 有自己的工作目录和索引，但共享仓库的对象存储和引用。

主要好处是无开销的上下文切换。你可以有一个 main 分支的主 worktree、一个用于活跃开发的功能分支 worktree，以及一个用于紧急修复的 hotfix worktree——全部并排存在，独立构建，无需任何 stash 或丢弃提交。每个 worktree 只是一个像 ../project-hotfix 这样的目录。

Worktree 使用 git worktree add <path> <branch> 管理。每个 worktree 记录在仓库的 .git/worktrees 目录中。当不再需要 worktree 时，git worktree remove <path> 将其清理。一个常见的工作流是使用 worktree 进行代码审查：git worktree add ../project-review <pr-branch> 创建一个并排目录来审查 PR 分支，而不干扰你当前的工作。`,
    },
    examples: [
      "git worktree add ../hotfix fix/urgent-login-crash",
      "git worktree add -b new-feature ../feature  # create with new branch",
      "git worktree list  # list all linked worktrees",
      "git worktree remove ../hotfix  # remove a worktree",
      "git worktree prune  # clean up stale worktree references",
    ],
    howGitAgentHelps: {
      en: "git-agent's fast commit workflow complements worktrees nicely. When you finish work in a worktree, git-agent creates atomic commits with conventional messages, keeping each worktree's branch history clean. The consistent commit format also makes it easy to track which worktree produced which commits.",
      zh: "git-agent 的快速提交工作流与 worktree 很好地互补。当你在 worktree 中完成工作时，git-agent 创建带有约定式信息的原子提交，保持每个 worktree 的分支历史干净。一致的提交格式也使得追踪哪个 worktree 产生了哪些提交变得容易。",
    },
    relatedLinks: [
      {
        label: { en: "Git stash", zh: "Git 暂存" },
        href: "/glossary/git-stash",
      },
      {
        label: { en: "Git rebase", zh: "Git 变基" },
        href: "/glossary/git-rebase",
      },
      {
        label: { en: "Git merge conflict", zh: "Git 合并冲突" },
        href: "/glossary/git-merge-conflict",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I have worktrees on the same branch?",
          zh: "可以在同一个分支上有多个 worktree 吗？",
        },
        answer: {
          en: "No, each worktree must be on a different branch. Git enforces this to prevent conflicts. If you need parallel work on the same branch, use git stash or create a temporary branch from the current state.",
          zh: "不能，每个 worktree 必须在不同的分支上。Git 强制执行此规则以防止冲突。如果你需要在同一分支上进行并行工作，请使用 git stash 或从当前状态创建临时分支。",
        },
      },
      {
        question: {
          en: "Do worktrees use additional disk space?",
          zh: "Worktree 会使用额外的磁盘空间吗？",
        },
        answer: {
          en: "Each worktree has its own working directory and git index, but they share the repository's object store. This means the actual commit data is not duplicated — only the checked-out files are stored separately, which is the same as having a separate clone.",
          zh: "每个 worktree 有自己的工作目录和 git 索引，但它们共享仓库的对象存储。这意味着实际的提交数据不会重复——只有检出的文件被单独存储，这与拥有单独的克隆相同。",
        },
      },
      {
        question: {
          en: "Can I run git-agent in a worktree?",
          zh: "我可以在 worktree 中运行 git-agent 吗？",
        },
        answer: {
          en: "Yes. Each worktree is a full working directory with its own staged state. git-agent works identically in any worktree — it reads the staged diff, plans commits, and executes them within the worktree's branch context.",
          zh: "可以。每个 worktree 是一个完整的工作目录，有自己的暂存状态。git-agent 在任何 worktree 中都同样工作——它读取暂存的 diff，规划提交，并在 worktree 的分支上下文中执行它们。",
        },
      },
    ],
  },
  {
    slug: "git-flow",
    term: { en: "Git Flow", zh: "Git Flow" },
    definition: {
      en: "A branching model that defines a strict set of branch types (main, develop, feature, release, hotfix) and rules for how and when branches are created, merged, and deleted.",
      zh: "一种分支模型，定义了一组严格的分支类型（main、develop、feature、release、hotfix）以及分支创建、合并和删除的规则。",
    },
    longDescription: {
      en: `Git Flow, popularised by Vincent Driessen in 2010, is a prescriptive branching strategy. The model defines two long-lived branches — main (production-ready code) and develop (integration branch for features) — and three supporting branch types: feature branches (branched from develop, merged back to develop), release branches (branched from develop for release preparation, merged to both main and develop), and hotfix branches (branched from main for emergency fixes, merged to both main and develop).

The model enforces strict rules about which branch merges where. Feature branches are never merged directly to main. Release branches are created when develop reaches a release-ready state, allowing last-minute bug fixes without blocking new feature development. Hotfix branches allow critical production fixes to bypass the release pipeline entirely.

Git Flow was widely adopted in the 2010s and remains popular in projects with scheduled releases and formal release cycles. However, it has been criticised for its complexity compared to simpler models like trunk-based development, especially for teams practicing continuous delivery. The overhead of maintaining multiple long-lived branches and the discipline required for correct merges leads many modern teams to prefer simpler strategies.`,
      zh: `Git Flow 由 Vincent Driessen 于 2010 年推广，是一种规定性的分支策略。该模型定义了两种长期分支——main（生产就绪代码）和 develop（功能集成分支）——以及三种辅助分支类型：feature 分支（从 develop 分支，合并回 develop）、release 分支（从 develop 分支进行发布准备，合并到 main 和 develop）和 hotfix 分支（从 main 分支进行紧急修复，合并到 main 和 develop）。

该模型强制执行关于哪个分支合并到哪里的严格规则。Feature 分支从不直接合并到 main。当 develop 达到发布就绪状态时创建 release 分支，允许最后一刻的错误修复而不阻塞新功能开发。Hotfix 分支允许关键的生产修复完全绕过发布管道。

Git Flow 在 2010 年代被广泛采用，在具有计划发布和正式发布周期的项目中仍然流行。然而，与更简单的模型（如主干开发）相比，它因其复杂性而受到批评，特别是对于实践持续交付的团队。维护多个长期分支的开销以及正确合并所需的纪律使许多现代团队倾向于更简单的策略。`,
    },
    examples: [
      "git flow feature start user-profile  # start a new feature branch",
      "git flow feature finish user-profile  # merge feature back to develop",
      "git flow release start v1.2.0  # start a release branch",
      "git flow hotfix start 1.2.1  # start a hotfix from main",
      "git flow hotfix finish 1.2.1  # merge hotfix to main and develop",
    ],
    howGitAgentHelps: {
      en: "git-agent works with any branching model, including Git Flow. Its atomic commits and conventional messages ensure that regardless of the branch topology, each commit carries a clear intent. When release and hotfix merges happen, the commit history remains readable and useful for changelog generation.",
      zh: "git-agent 适用于任何分支模型，包括 Git Flow。其原子提交和约定式信息确保无论分支拓扑如何，每个提交都带有明确的意图。当 release 和 hotfix 合并发生时，提交历史保持可读且对变更日志生成有用。",
    },
    relatedLinks: [
      {
        label: { en: "Trunk-based development", zh: "主干开发" },
        href: "/glossary/trunk-based-development",
      },
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Is Git Flow still recommended for modern projects?",
          zh: "现代项目还推荐使用 Git Flow 吗？",
        },
        answer: {
          en: "It depends on the release model. For projects with scheduled releases and formal QA cycles, Git Flow's structure is beneficial. For continuous delivery teams deploying multiple times per day, trunk-based development or GitHub Flow is simpler and more efficient.",
          zh: "取决于发布模型。对于有计划发布和正式 QA 周期的项目，Git Flow 的结构是有益的。对于每天部署多次的持续交付团队，主干开发或 GitHub Flow 更简单高效。",
        },
      },
      {
        question: {
          en: "What is the difference between Git Flow and GitHub Flow?",
          zh: "Git Flow 和 GitHub Flow 有什么区别？",
        },
        answer: {
          en: "GitHub Flow is simpler: it uses only a main branch and feature branches. Feature branches are merged to main via pull requests and deployed immediately. There is no develop or release branch. GitHub Flow is designed for continuous deployment.",
          zh: "GitHub Flow 更简单：它只使用 main 分支和 feature 分支。Feature 分支通过拉取请求合并到 main 并立即部署。没有 develop 或 release 分支。GitHub Flow 专为持续部署设计。",
        },
      },
      {
        question: {
          en: "Can git-agent automatically determine the correct branch type?",
          zh: "git-agent 能自动确定正确的分支类型吗？",
        },
        answer: {
          en: "git-agent does not manage branches. It operates on whatever branch you are currently on. The commit message type (feat, fix, etc.) reflects the change content, not the branch name, though git-agent can optionally reference the branch name in the commit scope.",
          zh: "git-agent 不管理分支。它在你当前所在的分支上操作。提交消息类型（feat、fix 等）反映变更内容，而不是分支名称，不过 git-agent 可以选择在提交范围中引用分支名称。",
        },
      },
    ],
  },
  {
    slug: "trunk-based-development",
    term: { en: "Trunk-Based Development", zh: "主干开发" },
    definition: {
      en: "A version control branching model where developers integrate small, frequent changes directly into a single shared main branch (trunk), with short-lived feature branches and minimal branching complexity.",
      zh: "一种版本控制分支模型，开发者将小而频繁的变更直接集成到单个共享主分支（主干）中，使用短期存在的功能分支，具有最小的分支复杂性。",
    },
    longDescription: {
      en: `Trunk-based development (TBD) is a branching strategy that prioritises continuous integration over branch isolation. Developers work on short-lived feature branches (typically lasting less than a day) or commit directly to the main branch (the trunk). The core principle is that no branch should live long enough to diverge significantly from the trunk, keeping merge conflicts small and rare.

The model is strongly associated with continuous integration and continuous delivery (CI/CD). Teams practicing TBD typically integrate their changes to the trunk multiple times per day, with automated builds and tests running on each integration. This catches integration issues early, when they are cheapest to fix. The recommended practice is to keep unpushed work under 2 hours of development time.

TBD contrasts with Git Flow, where feature branches can live for weeks and integration happens in batches. Research (by DORA/Accelerate) shows that TBD practices correlate with higher delivery performance — lower lead times, higher deployment frequency, and lower change failure rates. The key requirement is strong CI/CD automation and a culture of small, incremental changes.`,
      zh: `主干开发（TBD）是一种优先考虑持续集成而非分支隔离的分支策略。开发者在短期存在的功能分支上工作（通常持续不到一天），或直接提交到主分支（主干）。核心原则是任何分支都不应留存足够长的时间以与主干显著偏离，保持合并冲突小而罕见。

该模型与持续集成和持续交付（CI/CD）密切相关。实践 TBD 的团队通常每天多次将变更集成到主干，每次集成都运行自动化构建和测试。这能在问题最易修复时尽早发现集成问题。建议做法是保持未推送的工作不超过 2 小时的开发时间。

TBD 与 Git Flow 形成对比，后者的功能分支可以持续数周，集成以批处理方式进行。研究（DORA/Accelerate）表明，TBD 实践与更高的交付性能相关——更短的交付周期、更高的部署频率和更低的变更失败率。关键要求是强大的 CI/CD 自动化和小型增量变更的文化。`,
    },
    examples: [
      "# Commit directly to main after a short local test",
      "git commit -m 'fix(button): correct hover state color contrast'",
      "# Short-lived feature branch, merged within hours",
      "git checkout -b fix/input-validation",
      "git commit -m 'fix(form): add email format validation on blur'",
      "git checkout main && git merge fix/input-validation",
      "git push",
    ],
    howGitAgentHelps: {
      en: "git-agent is an ideal companion for trunk-based development. Its ability to quickly create atomic commits with meaningful messages encourages the small, frequent commits that TBD requires. The automated commit splitting also reduces the friction of preparing clean history for direct-to-main integration.",
      zh: "git-agent 是主干开发的理想伴侣。它快速创建带有有意义信息的原子提交的能力鼓励了 TBD 所需的小型、频繁提交。自动化的提交拆分也减少了为直接集成到 main 准备干净历史的摩擦。",
    },
    relatedLinks: [
      {
        label: { en: "Git Flow", zh: "Git Flow" },
        href: "/glossary/git-flow",
      },
      {
        label: { en: "Atomic commits", zh: "原子提交" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting", zh: "提交拆分" },
        href: "/glossary/commit-splitting",
      },
    ],
    faq: [
      {
        question: {
          en: "Does trunk-based development mean I cannot use feature branches?",
          zh: "主干开发意味着我不能使用功能分支吗？",
        },
        answer: {
          en: "No, short-lived feature branches are part of TBD. The key is that branches should be short (hours, not days or weeks) and integrate frequently. Even a few hours of work on a branch is fine as long as you merge back to trunk the same day.",
          zh: "不是，短期存在的功能分支是 TBD 的一部分。关键是分支应该是短期的（几小时，不是几天或几周）并频繁集成。即使在分支上工作几小时也没问题，只要当天合并回主干即可。",
        },
      },
      {
        question: {
          en: "How does trunk-based development work with code review?",
          zh: "主干开发如何与代码审查配合？",
        },
        answer: {
          en: "Code review works the same — through pull requests on short-lived branches. The difference is that the branches are smaller and more frequent, making reviews easier because each PR contains fewer changes. Reviewers can give feedback on a 50-line PR much faster than a 500-line one.",
          zh: "代码审查工作方式相同——通过短期存在分支上的拉取请求。区别在于分支更小、更频繁，使审查更容易，因为每个 PR 包含更少的变更。审查者在一个 50 行的 PR 上给出反馈比 500 行的快得多。",
        },
      },
      {
        question: {
          en: "Is trunk-based development suitable for all projects?",
          zh: "主干开发适用于所有项目吗？",
        },
        answer: {
          en: "TBD works best for teams with strong CI/CD automation, comprehensive test coverage, and a culture of incremental development. Projects with regulatory requirements, formal release gates, or large distributed teams may benefit from the more structured Git Flow approach.",
          zh: "TBD 最适合拥有强大 CI/CD 自动化、全面测试覆盖和增量开发文化的团队。具有监管要求、正式发布门禁或大型分布式团队的项目可能受益于更结构化的 Git Flow 方法。",
        },
      },
    ],
  },
  {
    slug: "gpg-signing",
    term: { en: "GPG Signing", zh: "GPG 签名" },
    definition: {
      en: "A cryptographic method to sign git commits and tags with a GPG key, verifying the identity of the author and ensuring the commit content has not been tampered with.",
      zh: "一种使用 GPG 密钥对 git 提交和标签进行签名的加密方法，验证作者身份并确保提交内容未被篡改。",
    },
    longDescription: {
      en: `GPG (GNU Privacy Guard) signing gives git commits a cryptographic seal of authenticity. When you sign a commit, git creates a digital signature using your private GPG key and attaches it to the commit object. Others can verify the signature using your public key, confirming that the commit was made by you and has not been altered since signing.

Git supports two signing mechanisms: GPG (the default) and SSH (via git config gpg.format ssh, available since Git 2.34). Both serve the same purpose. GPG is the more established option, while SSH signing uses the same keys you already use for SSH authentication, simplifying key management.

To sign commits, you need a GPG key pair, and you must configure git with your signing key (git config --global user.signingkey <key-id>). Then git commit -S signs the commit, or git config --global commit.gpgsign true makes signing automatic. On GitHub, verified commits display a "Verified" badge next to the commit, and repository settings can require signed commits for protected branches.`,
      zh: `GPG（GNU Privacy Guard）签名给 git 提交提供了加密的真实性证明。当你签署提交时，git 使用你的私钥创建数字签名并将其附加到提交对象上。其他人可以使用你的公钥验证签名，确认提交是由你创建且签署后未被修改。

Git 支持两种签名机制：GPG（默认）和 SSH（通过 git config gpg.format ssh，自 Git 2.34 起可用）。两者目的相同。GPG 是更成熟的选择，而 SSH 签名使用你已经用于 SSH 认证的相同密钥，简化了密钥管理。

要签署提交，你需要一个 GPG 密钥对，并且必须配置 git 使用你的签名密钥（git config --global user.signingkey <key-id>）。然后 git commit -S 签署提交，或者 git config --global commit.gpgsign true 使签名自动生效。在 GitHub 上，已验证的提交在提交旁边显示"Verified"徽章，并且仓库设置可以为受保护分支要求已签名的提交。`,
    },
    examples: [
      "git commit -S -m 'feat(auth): add OAuth2 PKCE flow'  # sign a single commit",
      "git config --global commit.gpgsign true  # auto-sign all commits",
      "git config --global user.signingkey ABCDEF1234567890  # set signing key",
      "git tag -s v1.0.0 -m 'v1.0.0 stable release'  # sign a tag",
      "git log --show-signature  # verify signatures in commit log",
    ],
    howGitAgentHelps: {
      en: "git-agent respects your git configuration. If you have commit.gpgsign set to true, every commit git-agent creates is automatically signed. The generated commit messages contain the context you need for meaningful signed commits, making your signed history informative and verifiable.",
      zh: "git-agent 尊重你的 git 配置。如果你已将 commit.gpgsign 设置为 true，git-agent 创建的每个提交都会自动签名。生成的提交信息包含了你进行有意义签名提交所需的上下文，使你的签名历史既有信息量又可验证。",
    },
    relatedLinks: [
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
    ],
    faq: [
      {
        question: {
          en: "Do I need a GPG key to sign commits?",
          zh: "签署提交需要 GPG 密钥吗？",
        },
        answer: {
          en: "Yes. You need a GPG key pair (or an SSH key if using SSH signing). Generate one with gpg --full-generate-key, then add the public key to your GitHub/GitLab account and configure git with your signing key.",
          zh: "是的。你需要一个 GPG 密钥对（如果使用 SSH 签名则需要 SSH 密钥）。使用 gpg --full-generate-key 生成一个，然后将公钥添加到你的 GitHub/GitLab 帐户并配置 git 使用你的签名密钥。",
        },
      },
      {
        question: {
          en: "Does git-agent create signed commits automatically?",
          zh: "git-agent 会自动创建签名提交吗？",
        },
        answer: {
          en: "git-agent runs git commit internally. If you have commit.gpgsign = true in your git config, the commit will be signed automatically. git-agent does not add or remove signing — it respects your existing git configuration.",
          zh: "git-agent 在内部运行 git commit。如果你的 git 配置中有 commit.gpgsign = true，提交将自动签名。git-agent 不会添加或移除签名——它尊重你现有的 git 配置。",
        },
      },
      {
        question: {
          en: "What is the difference between GPG signing and SSH signing?",
          zh: "GPG 签名和 SSH 签名有什么区别？",
        },
        answer: {
          en: "Both produce verified commits. GPG is the traditional approach with its own key infrastructure. SSH signing uses the same keys you already use for SSH — no separate key management. SSH signing is simpler but requires Git 2.34+ and is less universally supported by older tools.",
          zh: "两者都产生已验证的提交。GPG 是传统方法，有自己的密钥基础设施。SSH 签名使用你已经用于 SSH 的相同密钥——无需单独的密钥管理。SSH 签名更简单，但需要 Git 2.34+ 并且对旧工具的支持较不普遍。",
        },
      },
    ],
  },
];

export function findGlossaryTerm(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
