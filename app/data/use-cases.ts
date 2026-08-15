import type { I18nText, CrossLink, FaqItem } from "./types";

export interface UseCaseEntry {
  slug: string;
  title: I18nText;
  tagline: I18nText;
  description: I18nText;
  challenge: I18nText;
  solution: I18nText;
  steps: I18nText[];
  relatedLinks: CrossLink[];
  faq: FaqItem[];
}

export const useCaseEntries: UseCaseEntry[] = [
  {
    slug: "monorepo",
    title: {
      en: "Monorepo Commit Management",
      zh: "Monorepo 提交管理",
    },
    tagline: {
      en: "Keep each package's history clean with per-package atomic commits",
      zh: "通过按包拆分的原子提交，保持每个包的提交历史整洁",
    },
    description: {
      en: "Monorepos present a unique challenge: a single git diff may span multiple packages, services, and shared libraries. git-agent reads your workspace structure, splits changes by package scope, and commits each independently — so every package's changelog and version history stays accurate.",
      zh: "Monorepo 面临一个独特挑战：一个 git diff 可能跨越多个包、服务和共享库。git-agent 读取你的工作区结构，按包范围拆分变更，并独立提交每个包——确保每个包的变更日志和版本历史保持准确。",
    },
    challenge: {
      en: "When you work across packages in a monorepo, a single `git commit` mixes changes from different packages into one commit. This breaks per-package changelogs, confuses version-bump tools like semantic-release, and makes it hard to cherry-pick fixes across release branches. Manually splitting with `git add -p` every time you commit is tedious and error-prone.",
      zh: "在 monorepo 中跨包工作时，一个 `git commit` 会将不同包的变更混入同一个提交。这会破坏每个包的变更日志，混淆 semantic-release 等版本升级工具，并使得跨发布分支 cherry-pick 修复变得困难。每次提交都手动使用 `git add -p` 拆分既繁琐又容易出错。",
    },
    solution: {
      en: "git-agent analyses the full working-tree diff and automatically groups changes by package scope — using your workspace tooling (pnpm workspaces, Nx, Turborepo, Cargo workspace, go.work) to determine boundaries. Give it the work intent; it discovers, stages, and commits each group independently with a conventional message scoped to its package, keeping your monorepo history clean and tooling-friendly.",
      zh: "git-agent 分析完整的工作区 diff，并自动按包范围分组变更——利用你的工作区工具（pnpm workspaces、Nx、Turborepo、Cargo workspace、go.work）确定边界。把工作的意图交给它；它会自己发现、暂存并独立提交每个组，并附上以该包为范围的约定式信息，保持 monorepo 历史整洁且对工具友好。"
    },
    steps: [
      {
        en: "Run `git-agent init` in your monorepo root. git-agent scans your workspace configuration and generates per-package scopes automatically.",
        zh: "在 monorepo 根目录运行 `git-agent init`。git-agent 扫描你的工作区配置并自动生成按包划分的范围。",
      },
      {
        en: "Finish the work across packages and pass its intent to `git-agent --intent`. Cross-package changes are okay — git-agent discovers the working tree and handles the splitting.",
        zh: "完成跨包工作后，将意图传给 `git-agent --intent`。跨包变更没有问题——git-agent 会发现工作区并负责拆分。"
      },
      {
        en: "Run `git-agent --intent \"...\"`. The tool analyses the full diff, plans atomic commit groups by package scope, then stages and commits each group independently.",
        zh: "运行 `git-agent --intent \"...\"`。该工具分析完整的 diff，按包范围规划原子提交组，然后独立暂存并提交每个组。"
      },
      {
        en: "Review the result: each package has its own commit with a conventional message, ready for changelog generation, version bumping, and cherry-picking.",
        zh: "查看结果：每个包都有独立的提交和约定式信息，可直接用于变更日志生成、版本升级和 cherry-pick。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Monorepo commits explained", zh: "Monorepo 提交详解" },
        href: "/glossary/monorepo-commits",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting explained", zh: "提交拆分详解" },
        href: "/glossary/commit-splitting",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent support pnpm workspaces, Nx, and Turborepo?",
          zh: "git-agent 支持 pnpm workspaces、Nx 和 Turborepo 吗？",
        },
        answer: {
          en: "Yes. git-agent reads package.json workspaces fields, Nx project.json files, and Turborepo pipeline configurations to infer package boundaries. It works with any monorepo tooling that produces a standard directory structure.",
          zh: "支持。git-agent 读取 package.json workspaces 字段、Nx project.json 文件和 Turborepo pipeline 配置来推断包边界。它适用于任何产生标准目录结构的 monorepo 工具。",
        },
      },
      {
        question: {
          en: "What happens when a change touches a shared library and its consumers?",
          zh: "当变更同时涉及共享库及其消费者时会发生什么？",
        },
        answer: {
          en: "git-agent creates separate commits for the library change and each consumer change. This keeps each package's changelog accurate and avoids ambiguous version bumps across packages.",
          zh: "git-agent 为共享库变更和每个消费者变更创建独立的提交。这保持了每个包变更日志的准确性，避免了跨包的版本升级歧义。",
        },
      },
      {
        question: {
          en: "Can git-agent handle a monorepo with mixed languages (Go, TypeScript, Rust)?",
          zh: "git-agent 能处理混合语言（Go、TypeScript、Rust）的 monorepo 吗？",
        },
        answer: {
          en: "Yes. git-agent is language-agnostic. It groups changes by directory scope, not by file extension. Each package's commit message is generated from the diff content, which the LLM understands regardless of language.",
          zh: "可以。git-agent 与语言无关。它按目录范围而非文件扩展名对变更进行分组。每个包的提交信息从 diff 内容生成，LLM 能理解任何语言的内容。",
        },
      },
    ],
  },
  {
    slug: "ci-cd",
    title: {
      en: "CI/CD Pipeline Integration",
      zh: "CI/CD 流水线集成",
    },
    tagline: {
      en: "Generate conventional commits that feed automated release and changelog workflows",
      zh: "生成约定式提交，为自动化发布和变更日志工作流提供信号",
    },
    description: {
      en: "Modern CI/CD pipelines rely on commit message conventions to determine version bumps, generate changelogs, and trigger releases. git-agent produces correctly formatted conventional commits that integrate seamlessly with semantic-release, release-please, and conventional-changelog — so your pipeline always has the right signals.",
      zh: "现代 CI/CD 流水线依赖提交信息约定来确定版本升级、生成变更日志和触发发布。git-agent 生成格式正确的约定式提交，与 semantic-release、release-please 和 conventional-changelog 无缝集成——让你的流水线始终拥有正确的信号。",
    },
    challenge: {
      en: "CI/CD tools like semantic-release parse commit messages to decide whether to bump MAJOR, MINOR, or PATCH. If developers write vague or inconsistent commit messages, the pipeline either bumps the wrong version or skips a release entirely. Manual enforcement of commit standards across a team is unreliable and slows down developers.",
      zh: "semantic-release 等 CI/CD 工具解析提交信息来决定是否升级 MAJOR、MINOR 或 PATCH。如果开发者编写模糊或不一致的提交信息，流水线要么升级错误版本，要么完全跳过发布。在团队中手动强制执行提交标准既不可靠，也拖慢开发速度。",
    },
    solution: {
      en: "git-agent generates conventional commits with accurate types, scopes, and optional BREAKING CHANGE footers — all the signals your CI/CD pipeline needs. When integrated into your workflow, every commit that reaches the pipeline is correctly formatted, ensuring reliable version bumps, changelogs, and release triggers every time.",
      zh: "git-agent 生成具有准确类型、范围和可选 BREAKING CHANGE 页脚的约定式提交——你的 CI/CD 流水线所需的所有信号。当集成到工作流中时，每个到达流水线的提交都格式正确，确保每次都能可靠地升级版本、生成变更日志和触发发布。",
    },
    steps: [
      {
        en: "Configure your CI/CD pipeline (e.g., semantic-release, release-please) to read commits from your default branch as usual.",
        zh: "像往常一样配置你的 CI/CD 流水线（如 semantic-release、release-please），读取默认分支的提交。",
      },
      {
        en: "Have your team hand completed work to `git-agent --intent \"...\"` instead of running `git add` and `git commit`. The agent generates conventional messages and owns the Git workflow automatically.",
        zh: "让团队将完成的工作交给 `git-agent --intent \"...\"`，而不是手动运行 `git add` 和 `git commit`。git-agent 会自动生成约定式信息并接管 Git 工作流。"
      },
      {
        en: "Run `git-agent init` per project to set up scopes and a validation hook, ensuring consistent message quality across the team.",
        zh: "在每个项目中运行 `git-agent init` 以设置提交范围和验证钩子，确保团队提交信息质量一致。",
      },
      {
        en: "Trigger your pipeline on push. The pipeline reads the conventional messages and computes the correct version bump, generates changelog entries, and publishes releases automatically.",
        zh: "在推送时触发流水线。流水线读取约定式信息，计算正确的版本升级，生成变更日志条目，并自动发布版本。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits explained", zh: "约定式提交详解" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Semantic versioning explained", zh: "语义化版本详解" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "Commit message format explained", zh: "提交信息格式详解" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent integrate directly with semantic-release or release-please?",
          zh: "git-agent 直接与 semantic-release 或 release-please 集成吗？",
        },
        answer: {
          en: "git-agent does not call these tools directly. It produces the conventional commit messages they consume. The commits it generates are fully compatible with any tool that parses the Conventional Commits specification.",
          zh: "git-agent 不直接调用这些工具。它生成它们所需的约定式提交信息。其生成的提交与任何解析约定式提交规范的工具完全兼容。",
        },
      },
      {
        question: {
          en: "How does git-agent handle BREAKING CHANGE detection for version bumps?",
          zh: "git-agent 如何处理版本升级的 BREAKING CHANGE 检测？",
        },
        answer: {
          en: "When the LLM detects an incompatible API change — such as removed parameters, renamed exports, or changed function signatures — it adds a BREAKING CHANGE footer and a `!` before the colon, triggering a MAJOR version bump in your CI/CD pipeline.",
          zh: "当 LLM 检测到不兼容的 API 变更时——如删除的参数、重命名的导出或更改的函数签名——它会添加 BREAKING CHANGE 页脚和冒号前的 `!`，在你的 CI/CD 流水线中触发 MAJOR 版本升级。",
        },
      },
      {
        question: {
          en: "Can I use git-agent in a CI environment (e.g., GitHub Actions)?",
          zh: "我能在 CI 环境（如 GitHub Actions）中使用 git-agent 吗？",
        },
        answer: {
          en: "git-agent is designed for interactive handoff from a completed working tree. For CI environments, use it where the job has a writable checkout and pass the change intent explicitly; otherwise let developers hand off their local work before it reaches the pipeline.",
          zh: "git-agent 设计用于将完成的工作区交给它处理。对于 CI 环境，应在作业拥有可写检出目录时显式传入变更意图；否则让开发者在本地把工作交给 git-agent，再进入流水线。"
        },
      },
    ],
  },
  {
    slug: "open-source",
    title: {
      en: "Open Source Contribution Standards",
      zh: "开源贡献规范",
    },
    tagline: {
      en: "Meet maintainer expectations with clean, conventional commits out of the box",
      zh: "以开箱即用的整洁约定式提交，满足维护者的期望",
    },
    description: {
      en: "Many open-source projects require Conventional Commits or have strict commit message guidelines. git-agent helps contributors produce the right format automatically — reducing the back-and-forth with maintainers, making PRs easier to review, and increasing the chance of a smooth merge.",
      zh: "许多开源项目要求约定式提交或有严格的提交信息指南。git-agent 帮助贡献者自动生成正确的格式——减少与维护者的来回沟通，使 PR 更容易审查，并提高顺利合并的机会。",
    },
    challenge: {
      en: "Contributing to a new open-source project means learning its commit conventions, scope naming, and changelog expectations. A rejected commit message often means a CI check fails, a maintainer asks for a rewrite, or your PR gets labelled with 'needs-fix'. For first-time contributors, this friction can be discouraging and slows down the review process.",
      zh: "向新的开源项目贡献意味着需要学习其提交约定、范围命名和变更日志期望。被拒绝的提交信息通常意味着 CI 检查失败、维护者要求重写，或者 PR 被标记为 'needs-fix'。对于首次贡献者来说，这种摩擦可能令人沮丧，并拖慢审查流程。",
    },
    solution: {
      en: "git-agent analyses the working-tree diff and generates a conventional commit message that matches the project's expected format. It discovers and stages the work itself, handles type selection, scope inference, and body writing automatically, then validates the message before it reaches the remote.",
      zh: "git-agent 分析工作区 diff，并生成符合项目预期格式的约定式提交信息。它会自己发现并暂存改动，自动处理类型选择、范围推断和正文撰写，然后在提交到远程之前验证信息。"
    },
    steps: [
      {
        en: "Clone the repository and run `git-agent init`. git-agent scans the project structure and suggests scopes aligned with the project's conventions.",
        zh: "克隆仓库并运行 `git-agent init`。git-agent 扫描项目结构并建议与项目约定一致的范围。",
      },
      {
        en: "Make your changes, run the relevant checks, and keep the work in the working tree.",
        zh: "修改代码并运行相关检查，将完成的工作保留在工作区即可。"
      },
      {
        en: "Run `git-agent --intent \"...\"`. It discovers the diff, stages the work, and generates a conventional commit with the correct type, scope, and description for your contribution.",
        zh: "运行 `git-agent --intent \"...\"`。它会发现 diff、暂存改动，并为你的贡献生成具有正确类型、范围和描述的约定式提交信息。"
      },
      {
        en: "Push and open your PR. The commit history is clean, CI passes the message format check, and maintainers can review the changes without format-related back-and-forth.",
        zh: "推送并提交 PR。提交历史整洁，CI 通过信息格式检查，维护者无需在格式问题上来回沟通即可审查变更。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits explained", zh: "约定式提交详解" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format explained", zh: "提交信息格式详解" },
        href: "/glossary/commit-message-format",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
    ],
    faq: [
      {
        question: {
          en: "Will git-agent work correctly for a project that uses a custom commit format?",
          zh: "git-agent 能正确处理使用自定义提交格式的项目吗？",
        },
        answer: {
          en: "git-agent generates Conventional Commits format by default. If a project uses a custom format, you can configure the commit-msg hook in `.git-agent/config.yml` to validate against the project's specific rules, and the retry loop will adapt the generated messages.",
          zh: "git-agent 默认生成约定式提交格式。如果项目使用自定义格式，你可以在 `.git-agent/config.yml` 中配置 commit-msg 钩子以验证项目特定规则，重试循环会调整生成的信息。",
        },
      },
      {
        question: {
          en: "Does git-agent help with the DCO (Developer Certificate of Origin) sign-off?",
          zh: "git-agent 能帮助处理 DCO（开发者原创声明）签名吗？",
        },
        answer: {
          en: "git-agent generates the commit message body. You can add a Signed-off-by footer manually after the commit is generated, or configure your global git template to include it automatically.",
          zh: "git-agent 生成提交信息正文。你可以在提交生成后手动添加 Signed-off-by 页脚，或配置全局 git 模板自动包含它。",
        },
      },
      {
        question: {
          en: "Can I use git-agent for projects that don't use Conventional Commits?",
          zh: "我能在不使用约定式提交的项目中使用 git-agent 吗？",
        },
        answer: {
          en: "Yes. git-agent still generates well-structured commit messages even without the full specification. You can disable the strict format validation if the project expects plain commit messages.",
          zh: "可以。即使没有完整规范，git-agent 仍然能生成结构良好的提交信息。如果项目期望普通的提交信息，你可以禁用严格格式验证。",
        },
      },
    ],
  },
  {
    slug: "code-review",
    title: {
      en: "Code Review Readiness",
      zh: "代码审查就绪",
    },
    tagline: {
      en: "Make every PR reviewable with focused, well-described atomic commits",
      zh: "通过专注且有良好描述的原子提交，让每个 PR 都易于审查",
    },
    description: {
      en: "Code review quality depends on how easy it is to understand each change. git-agent splits your work into focused atomic commits with clear descriptions, so reviewers can evaluate each logical change independently — without context-switching between unrelated modifications in the same diff.",
      zh: "代码审查的质量取决于理解每个变更的难易程度。git-agent 将你的工作拆分为专注的原子提交并附上清晰描述，使审查者能够独立评估每个逻辑变更——无需在同一 diff 中无关的修改之间切换上下文。",
    },
    challenge: {
      en: "A PR containing multiple unrelated changes in one commit forces reviewers to mentally untangle what belongs together. It is harder to approve individual changes, harder to reject specific parts, and harder to understand the reasoning behind each change. Reviewers end up re-reading the same diff multiple times, and bugs slip through because the cognitive load is too high.",
      zh: "一个包含多个不相关变更的 PR 迫使审查者在脑海中理清哪些变更属于一起。这使得批准个别变更、拒绝特定部分以及理解每个变更背后的推理都变得更加困难。审查者最终需要多次重读同一个 diff，而由于认知负荷过高，漏洞可能被忽略。",
    },
    solution: {
      en: "git-agent splits the working-tree changes into atomic commits before writing any commit. Each commit addresses one logical concern with a descriptive conventional message explaining what changed and why. Reviewers see a clean, focused commit history where each entry is independently reviewable, reversible, and cherry-pickable.",
      zh: "git-agent 在写入任何提交之前将工作区变更拆分为原子提交。每个提交处理一个逻辑关注点，并附有解释变更内容和原因的约定式信息。审查者看到的是一个干净、专注的提交历史，其中每个条目都可以独立审查、回滚和 cherry-pick。"
    },
    steps: [
      {
        en: "Work on your branch normally, run the relevant checks, and keep the completed changes in the working tree.",
        zh: "正常在你的分支上工作，运行相关检查，并将完成的改动保留在工作区。"
      },
      {
        en: "Run `git-agent --intent \"...\"`. The tool analyses the diff and plans atomic commit groups before executing the Git operations itself.",
        zh: "运行 `git-agent --intent \"...\"`。该工具分析 diff，在执行 Git 操作前规划原子提交组。"
      },
      {
        en: "Review the plan and confirm. git-agent stages each group, generates a conventional message, commits it, and moves to the next group.",
        zh: "审查规划方案并确认。git-agent 暂存每个组，生成约定式信息，提交，然后移至下一个组。",
      },
      {
        en: "Push your branch. The PR shows a clean commit-by-commit history. Each commit has a focused diff and a message that explains the change, making review faster and more thorough.",
        zh: "推送你的分支。PR 展示一个干净的逐提交历史。每个提交都有专注的 diff 和解释变更的信息，使审查更快、更彻底。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Commit splitting explained", zh: "提交拆分详解" },
        href: "/glossary/commit-splitting",
      },
      {
        label: { en: "Conventional Commits explained", zh: "约定式提交详解" },
        href: "/glossary/conventional-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Should I squash my atomic commits before merging the PR?",
          zh: "我应该在合并 PR 前压缩原子提交吗？",
        },
        answer: {
          en: "Not necessarily. Atomic commits with good messages are valuable to preserve in the main branch. If your team prefers a clean main branch, use a squash merge — but the atomic commits still improve review quality during the PR phase.",
          zh: "不一定。带有良好信息的原子提交值得保留在主分支中。如果你的团队偏好整洁的主分支，可以使用压缩合并——但原子提交在 PR 阶段仍然能提高审查质量。",
        },
      },
      {
        question: {
          en: "How does git-agent handle partial file changes during review?",
          zh: "git-agent 在审查期间如何处理部分文件变更？",
        },
        answer: {
          en: "git-agent can split individual hunks within a file into different commits. This means a single file with two unrelated changes (e.g., a bug fix and a refactor) can be split into separate commits, each with its own focused diff for review.",
          zh: "git-agent 可以将文件内的单个 hunk 拆分到不同的提交中。这意味着一个包含两个不相关变更（如错误修复和重构）的文件可以被拆分为独立的提交，每个提交都有自己专注的 diff 供审查。",
        },
      },
      {
        question: {
          en: "Does git-agent work with GitHub PR review workflows?",
          zh: "git-agent 与 GitHub PR 审查工作流兼容吗？",
        },
        answer: {
          en: "Yes. GitHub's PR interface shows each commit with its diff, exactly as git-agent creates them. Reviewers can comment on individual commits using GitHub's standard commit-by-commit review feature.",
          zh: "兼容。GitHub 的 PR 界面会显示每个提交及其 diff，这正是 git-agent 创建的方式。审查者可以使用 GitHub 的逐提交审查功能对每个提交进行评论。",
        },
      },
    ],
  },
  {
    slug: "team-standards",
    title: {
      en: "Team Commit Standards",
      zh: "团队提交规范",
    },
    tagline: {
      en: "Enforce consistent commit conventions across your entire team automatically",
      zh: "在整个团队中自动执行一致的提交约定",
    },
    description: {
      en: "Consistent commit messages are a team discipline, not just an individual habit. git-agent helps every team member produce conventional, atomic commits regardless of their experience level — reducing review friction, improving changelog quality, and making the git history a reliable source of truth for the whole team.",
      zh: "一致的提交信息是团队纪律，而非个人习惯。git-agent 帮助每个团队成员生成约定式、原子化的提交，无论其经验水平如何——减少审查摩擦，提高变更日志质量，使 git 历史成为整个团队的可靠信息来源。",
    },
    challenge: {
      en: "Without enforcement, commit message quality varies across a team. Some members write detailed messages, others write one-liners, and some skip the message entirely. This inconsistency makes changelogs unreliable, breaks CI/CD release automation, and frustrates reviewers who have to ask for message rewrites. Manual code review for commit format is wasteful and inconsistent.",
      zh: "没有强制执行，团队中的提交信息质量参差不齐。有些成员写详细的信息，有些写一行，还有些完全跳过。这种不一致使变更日志不可靠，破坏 CI/CD 发布自动化，并让审查者感到沮丧，因为他们不得不要求重写信息。手动审查提交格式既浪费又不一致。",
    },
    solution: {
      en: "git-agent standardises Git execution across the team. Every member hands completed work to `git-agent --intent \"...\"`, which discovers the changes and produces the same high-quality conventional format regardless of who writes the code. The validation hook catches format issues before they reach the remote, and the retry loop automatically fixes minor deviations.",
      zh: "git-agent 标准化了团队中的 Git 执行过程。每个成员都将完成的工作交给 `git-agent --intent \"...\"`，它会发现改动，并无论谁编写代码都生成相同的高质量约定式格式。验证 hook 在格式问题到达远程之前捕获它们，重试循环自动修复小的偏差。"
    },
    steps: [
      {
        en: "Add `git-agent init` to your project's onboarding checklist. Every developer runs it once when they clone the repository.",
        zh: "将 `git-agent init` 添加到项目的入职检查清单中。每个开发者在克隆仓库时运行一次。",
      },
      {
        en: "Configure the project's scopes and validation rules in `.git-agent/config.yml` and commit this file to the repository.",
        zh: "在 `.git-agent/config.yml` 中配置项目的提交范围和验证规则，并将此文件提交到仓库。",
      },
      {
        en: "Establish a team convention: hand completed work to `git-agent --intent \"...\"` instead of running `git add` and `git commit`. The tool handles discovery, staging, format, scope, and message quality automatically.",
        zh: "建立团队约定：将完成的工作交给 `git-agent --intent \"...\"`，而不是运行 `git add` 和 `git commit`。该工具自动处理发现改动、暂存、格式、范围和信息质量。"
      },
      {
        en: "Review PRs as usual. The commit history is consistently formatted, changelogs are accurate, and CI/CD pipelines receive the right signals without manual intervention.",
        zh: "像往常一样审查 PR。提交历史格式一致，变更日志准确，CI/CD 流水线无需手动干预即可接收到正确的信号。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Conventional Commits explained", zh: "约定式提交详解" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks explained", zh: "pre-commit 钩子详解" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Commit message format explained", zh: "提交信息格式详解" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Can I enforce specific scopes for my team's projects?",
          zh: "我能为团队项目强制执行特定的提交范围吗？",
        },
        answer: {
          en: "Yes. After running `git-agent init`, edit `.git-agent/config.yml` to define the exact scopes your team uses. The LLM will use only these scopes when generating commit messages, ensuring consistency across all team members.",
          zh: "可以。运行 `git-agent init` 后，编辑 `.git-agent/config.yml` 定义团队使用的确切范围。LLM 在生成提交信息时只会使用这些范围，确保所有团队成员的一致性。",
        },
      },
      {
        question: {
          en: "How do new team members get started with git-agent?",
          zh: "新团队成员如何开始使用 git-agent？",
        },
        answer: {
          en: "Installation is a single Homebrew command: `brew install gitagenthq/tap/git-agent`. Then `git-agent init` configures the project. The project's `.git-agent/config.yml` is committed, so the scopes and validation rules are shared automatically.",
          zh: "安装只需一个 Homebrew 命令：`brew install gitagenthq/tap/git-agent`。然后运行 `git-agent init` 配置项目。项目的 `.git-agent/config.yml` 已提交，因此范围和验证规则自动共享。",
        },
      },
      {
        question: {
          en: "Does git-agent bypass my team's existing pre-commit hooks?",
          zh: "git-agent 会绕过团队现有的 pre-commit 钩子吗？",
        },
        answer: {
          en: "No. git-agent runs `git commit` normally, which executes all existing hooks. If a hook rejects a message, git-agent's retry loop regenerates the message with the hook's error output as context, up to 3 times per commit.",
          zh: "不会。git-agent 正常运行 `git commit`，这会执行所有现有钩子。如果钩子拒绝信息，git-agent 的重试循环会以钩子的错误输出为上下文重新生成信息，每次提交最多重试 3 次。",
        },
      },
    ],
  },
  {
    slug: "solo-dev",
    title: {
      en: "Solo Developer Workflow",
      zh: "独立开发者工作流",
    },
    tagline: {
      en: "Professional commit history without the overhead of manual formatting",
      zh: "无需手动格式化，即可获得专业的提交历史",
    },
    description: {
      en: "Solo developers often skip commit message conventions because the overhead feels unnecessary when you are the only contributor. But clean commits pay off when debugging old changes, publishing open-source projects, or returning to a project after months away. git-agent makes professional commit history effortless for solo developers.",
      zh: "独立开发者通常跳过提交信息约定，因为当你唯一的贡献者时，这种开销感觉没有必要。但干净的提交在调试旧变更、发布开源项目或在数月后重返项目时是值得的。git-agent 让独立开发者轻松获得专业的提交历史。",
    },
    challenge: {
      en: "When you work alone, it is tempting to commit with one-liners like 'fix stuff' or 'update'. This works in the moment but creates problems later: you cannot find why a bug was introduced, you cannot generate a changelog for a side project, and you cannot easily cherry-pick a fix across branches. Fixing the history retroactively is painful and rarely done.",
      zh: "当独自工作时，很容易使用 'fix stuff' 或 'update' 等一行提交信息。这在当时没问题，但后续会带来问题：你无法找到引入错误的原因，无法为副项目生成变更日志，也无法轻松地在分支间 cherry-pick 修复。事后修复历史既痛苦又很少真正去做。",
    },
    solution: {
      en: "git-agent automates the entire Git handoff for solo developers. Finish your work, run the relevant checks, and give git-agent the intent in one command. It discovers the changes, stages them, and creates well-structured conventional commits with detailed messages. No need to remember format rules, type choices, or scope naming.",
      zh: "git-agent 为独立开发者自动化了整个 Git 交接过程。完成工作、运行相关检查，然后在一条命令中把意图交给 git-agent。它会发现并暂存改动，创建结构良好且带详细信息的约定式提交。无需记住格式规则、类型选择或范围命名。"
    },
    steps: [
      {
        en: "Install git-agent with `brew install gitagenthq/tap/git-agent`. No other dependencies are needed.",
        zh: "使用 `brew install gitagenthq/tap/git-agent` 安装 git-agent。无需其他依赖。",
      },
      {
        en: "Run `git-agent init` in your project to set up scopes and the validation hook based on your project structure.",
        zh: "在项目中运行 `git-agent init`，根据项目结构设置提交范围和验证钩子。",
      },
      {
        en: "Work as you normally do, run the relevant checks, then pass the work intent to `git-agent --intent \"...\"`.",
        zh: "像往常一样工作，运行相关检查，然后将工作意图传给 `git-agent --intent \"...\"`。"
      },
      {
        en: "Review the generated commit messages. git-agent splits unrelated changes, selects the right types, and writes clear descriptions — so you can focus on coding instead of formatting.",
        zh: "查看生成的提交信息。git-agent 拆分不相关的变更，选择正确的类型，并撰写清晰的描述——让你专注于编码而非格式。",
      },
    ],
    relatedLinks: [
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
      {
        label: { en: "Conventional Commits explained", zh: "约定式提交详解" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Commit message format explained", zh: "提交信息格式详解" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Is git-agent useful if I am the only developer on my project?",
          zh: "如果我是项目中唯一的开发者，git-agent 还有用吗？",
        },
        answer: {
          en: "Absolutely. Clean commits help you debug, revert, and cherry-pick more effectively. They also make it easy to open-source a project later, onboard collaborators, or simply understand your own changes from six months ago.",
          zh: "非常有用。干净的提交帮助你更有效地调试、回滚和 cherry-pick。它们也让你以后更容易开源项目、引入协作者，或者理解自己六个月前的变更。",
        },
      },
      {
        question: {
          en: "Do I need to configure anything to use git-agent on a personal project?",
          zh: "在个人项目上使用 git-agent 需要配置什么吗？",
        },
        answer: {
          en: "Minimal setup. The bare `git-agent` command detects missing project metadata and suggests reasonable defaults as it works. Run `git-agent init` only when you want to configure or regenerate those settings explicitly.",
          zh: "最小化配置。裸 `git-agent` 命令会在工作时发现缺失的项目元数据并生成合理默认值。只有在你想显式配置或重新生成这些设置时，才需要运行 `git-agent init`。"
        },
      },
      {
        question: {
          en: "Will git-agent slow down my solo development workflow?",
          zh: "git-agent 会拖慢我的个人开发工作流吗？",
        },
        answer: {
          en: "No. `git-agent --intent \"...\"` is a single handoff after the work is complete. It adds a few seconds for the LLM to understand the diff, but removes the need to stage files, choose commit groups, or write messages manually.",
          zh: "不会。`git-agent --intent \"...\"` 是完成工作后的一次性交接。它会增加几秒钟的 LLM 分析时间，但不再需要手动暂存文件、选择提交分组或撰写提交信息。"
        },
      },
    ],
  },
];

export function findUseCase(slug: string): UseCaseEntry | undefined {
  return useCaseEntries.find((e) => e.slug === slug);
}