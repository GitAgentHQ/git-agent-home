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
          en: "git-agent uses file paths and the scope definitions in .git-agent/project.yml. During `git-agent init`, it reads package.json workspaces, go.work, or Cargo.toml workspace members to populate scope definitions automatically.",
          zh: "git-agent 使用文件路径和 .git-agent/project.yml 中的范围定义。在 `git-agent init` 期间，它读取 package.json 工作区、go.work 或 Cargo.toml 工作区成员以自动填充范围定义。",
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
];

export function findGlossaryTerm(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((e) => e.slug === slug);
}
