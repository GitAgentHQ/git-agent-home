import type { I18nText, CrossLink, FaqItem } from "./types";

export interface TemplateEntry {
  slug: string;
  type: I18nText;
  description: I18nText;
  templateFormat: string;
  realExamples: string[];
  whenToUse: I18nText;
  relatedLinks: CrossLink[];
  faq: FaqItem[];
}

export const templateEntries: TemplateEntry[] = [
  {
    slug: "feat",
    type: { en: "feat", zh: "feat" },
    description: {
      en: "A commit that introduces new functionality visible to end users or downstream consumers of your API.",
      zh: "引入对最终用户或 API 下游消费者可见的新功能的提交。",
    },
    templateFormat: `feat(scope): short imperative description of the new capability

- what was added or enabled (bullet 1)
- what was added or enabled (bullet 2)
- any notable implementation detail worth preserving in history

Why this change is needed and what problem it solves for users or
downstream consumers. Keep under 72 characters per line.`,
    realExamples: [
      `feat(auth): add magic-link email login

- generate a time-limited signed token and send it via SendGrid
- validate token on callback and issue a session cookie
- expire tokens after 15 minutes and invalidate on first use

Reduces sign-up friction for users who prefer not to create a password;
magic links are the only auth method supported by our enterprise SSO
customers.`,
      `feat(api): support cursor-based pagination on /v2/items

- add after_cursor and before_cursor query params to replace offset
- encode cursor as base64 opaque string to hide sort field implementation
- return next_cursor and prev_cursor in response envelope

Offset pagination was returning stale or duplicate results under concurrent
writes; cursor pagination is stable regardless of inserts between pages.`,
      `feat(dashboard): add CSV export for all report tables

- add Export button to TableToolbar that opens format selector sheet
- stream CSV through a Server Action to avoid loading full dataset into memory
- set Content-Disposition header so browser downloads rather than navigates

The previous workaround was to copy-paste from the table; CSV export
satisfies the compliance team's data retention audit workflow.`,
      `feat(cli): add --dry-run flag to preview changes without writing

- parse --dry-run / -n flag in root command and propagate to all writers
- print a coloured diff of what would be written instead of writing files
- exit 0 so --dry-run can be used in scripts without special-casing

Power users requested preview mode before running destructive operations
in production environments.`,
    ],
    whenToUse: {
      en: "Use feat when you are adding something that did not exist before: a new endpoint, a new UI component, a new CLI flag, a new integration, or any capability that users or API consumers can observe.",
      zh: "当你添加之前不存在的功能时使用 feat：新端点、新 UI 组件、新 CLI 参数、新集成，或用户或 API 消费者可以感知到的任何功能。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Does feat always trigger a minor version bump?",
          zh: "feat 总是触发次要版本升级吗？",
        },
        answer: {
          en: "Yes, in tools that follow SemVer automation (semantic-release, release-please). A feat commit increments the MINOR version. If the feat also contains a BREAKING CHANGE footer, it increments MAJOR instead.",
          zh: "是的，在遵循 SemVer 自动化的工具中（semantic-release、release-please）。feat 提交递增 MINOR 版本。如果 feat 还包含 BREAKING CHANGE 页脚，则递增 MAJOR 版本。",
        },
      },
      {
        question: {
          en: "Should I use feat for a new dependency that enables a feature?",
          zh: "为启用功能而添加的新依赖应该用 feat 吗？",
        },
        answer: {
          en: "Split it: chore(deps) for the dependency addition and feat(scope) for the capability it enables. The dependency addition by itself does not add user-visible functionality.",
          zh: "拆分处理：依赖添加用 chore(deps)，它启用的功能用 feat(scope)。仅添加依赖本身不会增加用户可见的功能。",
        },
      },
      {
        question: {
          en: "What is the difference between feat and a refactor that adds a new code path?",
          zh: "feat 与添加新代码路径的 refactor 有什么区别？",
        },
        answer: {
          en: "If the new code path produces a behaviour change observable by the user or API consumer, it is a feat. If it only changes the internal structure without changing any observable output, it is a refactor.",
          zh: "如果新代码路径产生了用户或 API 消费者可观察到的行为变化，那就是 feat。如果它只改变内部结构而不改变任何可观察的输出，那就是 refactor。",
        },
      },
    ],
  },
  {
    slug: "fix",
    type: { en: "fix", zh: "fix" },
    description: {
      en: "A commit that corrects a defect: unintended behaviour, an error condition, or a regression that caused something to work incorrectly.",
      zh: "修正缺陷的提交：非预期行为、错误条件或导致某些功能无法正常工作的回归。",
    },
    templateFormat: `fix(scope): short imperative description of what is corrected

- root cause of the bug (bullet 1)
- what the incorrect behaviour was (bullet 2)
- what the correct behaviour is now (bullet 3)

Why the fix was necessary and any edge cases covered. Reference issue
numbers in the footer if applicable (Fixes #123).`,
    realExamples: [
      `fix(auth): prevent session fixation by regenerating ID after login

- destroy the pre-login session and issue a new session ID on successful auth
- copy flash messages and CSRF token to the new session before destroying old
- add regression test for the fixation scenario

Session ID was not rotated on privilege escalation; an attacker who set a
known session ID before login could take over the authenticated session.`,
      `fix(api): return 404 instead of 500 when requested resource is missing

- catch RecordNotFound at controller level and map to 404 JSON response
- add error body with machine-readable code field for client error handling
- cover missing-resource path in API integration tests

Unhandled RecordNotFound was propagating to the global 500 handler; clients
had no way to distinguish a server error from a missing record.`,
      `fix(checkout): correct VAT rounding on fractional cent amounts

- switch from Math.round to banker's rounding (round-half-to-even) for VAT
- align calculation with EU VAT directive rounding rules
- add test cases for 0.5-cent boundary amounts

Accumulated rounding errors on large orders caused per-item VAT totals to
diverge from the order-level VAT by up to 2 cents.`,
      `fix(notifications): de-duplicate email sends on job retry

- add idempotency key derived from notification_id to outbox table
- check for existing key before enqueuing send job
- add unique index on (notification_id, channel) in migration

Background job failures were retried without checking for prior sends,
resulting in users receiving duplicate notifications on transient errors.`,
    ],
    whenToUse: {
      en: "Use fix when correcting behaviour that was unintentionally broken: a bug, an edge case that causes errors, an incorrect calculation, a race condition, or a regression introduced by a previous change.",
      zh: "当修正非故意破坏的行为时使用 fix：错误、导致出错的边缘情况、错误计算、竞态条件，或由先前变更引入的回归。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
    ],
    faq: [
      {
        question: {
          en: "Does fix trigger a patch version bump?",
          zh: "fix 触发补丁版本升级吗？",
        },
        answer: {
          en: "Yes. In semantic-release and release-please, a fix commit increments the PATCH version. If the fix also contains a BREAKING CHANGE footer, it increments MAJOR.",
          zh: "是的。在 semantic-release 和 release-please 中，fix 提交递增 PATCH 版本。如果 fix 还包含 BREAKING CHANGE 页脚，则递增 MAJOR 版本。",
        },
      },
      {
        question: {
          en: "Should I use fix or refactor when I clean up code that also happens to fix a bug?",
          zh: "当我清理代码并顺便修复了一个错误时，应该用 fix 还是 refactor？",
        },
        answer: {
          en: "Use fix if the bug correction is the primary intent, and mention the cleanup in the body. Use refactor if the cleanup is the intent and document the incidental bug fix. Split them into two commits if both are substantial.",
          zh: "如果修复错误是主要意图，使用 fix 并在正文中提及清理工作。如果清理是意图，使用 refactor 并记录附带的错误修复。如果两者都很重要，将它们拆分为两个提交。",
        },
      },
      {
        question: {
          en: "Is it correct to use fix for a security vulnerability patch?",
          zh: "用 fix 表示安全漏洞补丁是正确的吗？",
        },
        answer: {
          en: "Yes. Security patches that correct incorrect behaviour use fix. If the patch changes the public API in a breaking way, add a BREAKING CHANGE footer. You can also add a security advisory reference in the footer.",
          zh: "是的。修正错误行为的安全补丁使用 fix。如果补丁以破坏性方式更改了公开 API，添加 BREAKING CHANGE 页脚。你也可以在页脚中添加安全公告引用。",
        },
      },
    ],
  },
  {
    slug: "refactor",
    type: { en: "refactor", zh: "refactor" },
    description: {
      en: "A commit that restructures existing code without changing its observable behaviour — no new features and no bug fixes.",
      zh: "在不改变可观察行为的情况下重构现有代码的提交——没有新功能，也没有错误修复。",
    },
    templateFormat: `refactor(scope): short imperative description of the restructuring

- what was restructured or extracted (bullet 1)
- what was renamed or moved (bullet 2)
- what was simplified or removed (bullet 3)

Why the refactor improves the codebase: maintainability, testability,
performance model, or alignment with current patterns. Max 72 chars/line.`,
    realExamples: [
      `refactor(auth): extract token validation into standalone TokenValidator

- move verifyToken logic from AuthMiddleware into TokenValidator class
- inject TokenValidator through constructor for testability
- delete duplicate token parsing in AdminMiddleware that duplicated auth logic

AuthMiddleware had grown to 400 lines; the extraction makes token logic
independently testable and removes a duplication that had already drifted
out of sync with the main path.`,
      `refactor(db): replace raw SQL strings with query builder throughout

- migrate 14 hand-crafted SELECT strings to knex query builder calls
- remove sql-template-strings dependency no longer needed after migration
- add ESLint rule to disallow new string-concatenated queries

Raw SQL strings were not type-checked and had caused two injection-adjacent
bugs in code review; the query builder provides structural guarantees and
consistent parameterisation.`,
      `refactor(api): flatten nested error-handling callbacks with async/await

- convert 6 handler functions from callback pyramid to async/await
- remove custom asyncWrap helper now that all handlers are native async
- standardise error propagation via next(err) in catch blocks

Callback nesting made control flow hard to follow during code review;
async/await reduces cognitive overhead and makes the error path linear.`,
      `refactor(config): consolidate environment variable reading to single module

- create src/config/index.ts that reads and validates all env vars at startup
- replace 23 scattered process.env accesses with imports from config module
- add Zod schema validation with descriptive error messages on missing vars

Scattered env reads made it impossible to see the full config surface in
one place; centralising them also moves validation to startup rather than
request time.`,
    ],
    whenToUse: {
      en: "Use refactor when the external behaviour stays the same but the internal code structure, organisation, naming, or readability improves. If any observable output changes, it is a feat or fix, not a refactor.",
      zh: "当外部行为保持不变但内部代码结构、组织、命名或可读性得到改善时使用 refactor。如果任何可观察的输出发生变化，那就是 feat 或 fix，而非 refactor。",
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
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Does refactor trigger a version bump?",
          zh: "refactor 触发版本升级吗？",
        },
        answer: {
          en: "No. refactor commits do not trigger version bumps in standard semantic-release configuration because they represent no change in observable behaviour for users or consumers.",
          zh: "不会。refactor 提交在标准 semantic-release 配置中不触发版本升级，因为它们对用户或消费者来说没有可观察行为的变化。",
        },
      },
      {
        question: {
          en: "Should I test that behaviour is preserved after a refactor?",
          zh: "重构后应该测试行为是否被保留吗？",
        },
        answer: {
          en: "Yes. The definition of a refactor is unchanged observable behaviour. If you don't have tests covering the refactored code, write them before refactoring. This is the essence of test-driven refactoring.",
          zh: "是的。重构的定义是可观察行为不变。如果你没有覆盖重构代码的测试，在重构之前先写好测试。这是测试驱动重构的本质。",
        },
      },
      {
        question: {
          en: "What is the difference between refactor and style commits?",
          zh: "refactor 与 style 提交有什么区别？",
        },
        answer: {
          en: "style covers purely cosmetic changes that do not affect logic: whitespace, formatting, missing semicolons. refactor involves meaningful structural changes to how code is organised, named, or how concerns are separated.",
          zh: "style 涵盖纯粹的外观变更，不影响逻辑：空白、格式化、缺少的分号。refactor 涉及代码组织方式、命名方式或关注点分离方式的有意义的结构变化。",
        },
      },
    ],
  },
  {
    slug: "docs",
    type: { en: "docs", zh: "docs" },
    description: {
      en: "A commit that changes documentation only: README files, API docs, inline comments, or guides — no production code changes.",
      zh: "仅更改文档的提交：README 文件、API 文档、内联注释或指南——不包含生产代码变更。",
    },
    templateFormat: `docs(scope): short imperative description of what was documented

- what was added or updated (bullet 1)
- what was removed or corrected (bullet 2)

Why the documentation change was needed: outdated info, missing coverage,
or new feature that required documentation. Max 72 chars/line.`,
    realExamples: [
      `docs(api): add OpenAPI 3.1 schema for /payments endpoints

- document all query parameters, request bodies, and response schemas
- add example payloads for 200, 400, 401, 422, and 500 responses
- add authentication section referencing Bearer token format

The payments API was undocumented; client teams were reverse-engineering
the schema from network logs rather than a canonical specification.`,
      `docs(readme): update installation section for Homebrew tap

- replace manual binary download instructions with brew install command
- add brew tap gitagenthq/tap prerequisite step
- remove outdated go install fallback that no longer works with v2 module path

The README still showed the pre-release installation method; new users
were filing issues because the old instructions failed on Apple Silicon.`,
      `docs(contributing): add commit message format guide with examples

- document the type(scope): subject format requirement
- add a table of valid types with descriptions and version bump impact
- add five example commits covering feat, fix, refactor, docs, and chore

Contributors were submitting PRs with unformatted commit messages; the
guide gives them a reference before they open a PR rather than after
review feedback.`,
      `docs(architecture): add sequence diagram for the OAuth2 PKCE flow

- add Mermaid sequence diagram showing client, auth server, and resource server
- document the code verifier and code challenge generation steps
- link to RFC 7636 for the full PKCE specification

The onboarding doc referred to the PKCE flow without explaining it; new
engineers spent hours in the RFC when a diagram would have sufficed.`,
    ],
    whenToUse: {
      en: "Use docs for any change that is purely textual and affects only documentation: README, CONTRIBUTING, inline code comments, JSDoc/godoc/rustdoc annotations, wiki content, or docsite pages.",
      zh: "对于纯文本且仅影响文档的变更使用 docs：README、CONTRIBUTING、内联代码注释、JSDoc/godoc/rustdoc 注解、Wiki 内容或文档站页面。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
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
          en: "Should I use docs for JSDoc or inline comment changes?",
          zh: "JSDoc 或内联注释的变更应该用 docs 吗？",
        },
        answer: {
          en: "Yes, if the comments are the only change. If inline comments accompany a code change, include them in the same commit with the appropriate type (feat, fix, refactor).",
          zh: "是的，如果注释是唯一的变更。如果内联注释伴随代码变更，将它们包含在相同的提交中，使用适当的类型（feat、fix、refactor）。",
        },
      },
      {
        question: {
          en: "Does docs appear in generated changelogs?",
          zh: "docs 会出现在生成的变更日志中吗？",
        },
        answer: {
          en: "Not by default. Standard changelog presets exclude docs from the public changelog. You can configure your changelog tool to include it if your project has public API documentation that users should track.",
          zh: "默认情况下不会。标准变更日志预设从公开变更日志中排除 docs。如果你的项目有用户应该跟踪的公开 API 文档，你可以配置变更日志工具将其包含在内。",
        },
      },
      {
        question: {
          en: "Should Storybook stories use docs or test as the commit type?",
          zh: "Storybook 故事应该用 docs 还是 test 作为提交类型？",
        },
        answer: {
          en: "Either is reasonable depending on your team convention. docs is appropriate when stories serve as living documentation. test is appropriate when stories are used as visual regression test baselines.",
          zh: "两者都合理，取决于团队约定。当故事作为活文档时，docs 是合适的。当故事用作视觉回归测试基线时，test 是合适的。",
        },
      },
    ],
  },
  {
    slug: "test",
    type: { en: "test", zh: "test" },
    description: {
      en: "A commit that adds missing tests, corrects existing tests, or refactors the test suite — no production code changes.",
      zh: "添加缺失测试、修正现有测试或重构测试套件的提交——不包含生产代码变更。",
    },
    templateFormat: `test(scope): short imperative description of what is tested

- what scenarios are now covered (bullet 1)
- what edge cases were added (bullet 2)
- what was corrected in existing tests (bullet 3)

Why these tests were needed: missing coverage, regression prevention,
or test quality improvement. Max 72 chars/line.`,
    realExamples: [
      `test(auth): add integration tests for refresh token rotation

- cover successful rotation: old token revoked, new token issued and usable
- cover concurrent rotation: second use of same token returns 401
- cover expired token: returns 401 with token_expired error code
- assert HttpOnly and Secure cookie flags on issued tokens

Refresh token logic had zero integration coverage; these tests caught a
bug where concurrent rotation was not atomic under parallel requests.`,
      `test(checkout): add unit tests for discount calculation edge cases

- cover percentage discounts that round to sub-cent amounts
- cover stacked discounts where order matters for final price
- cover maximum discount cap enforcement
- parameterise test data to cover all discount type combinations

Discount calculations were changed three times without test coverage;
parameterised tests ensure regressions are caught without adding new
test functions for each scenario.`,
      `test(api): migrate integration tests from supertest to httpx

- rewrite 34 supertest-based tests using httpx client
- preserve all existing assertions with equivalent httpx API calls
- add request/response logging fixture for easier failure debugging

supertest is unmaintained; httpx provides active maintenance, better
TypeScript types, and native async/await without wrapping in promises.`,
      `test(parser): add property-based tests for CSV parser with fast-check

- generate arbitrary CSV inputs including unicode, quoted commas, and newlines
- verify that parse(serialise(data)) round-trips without loss
- assert no thrown errors on any valid RFC 4180 input

Unit tests only covered hand-crafted examples; property-based tests found
two bugs in unicode quote handling that the fixed examples missed.`,
    ],
    whenToUse: {
      en: "Use test when adding, updating, or reorganising tests without touching production code. If you fix a bug and add a regression test in the same commit, use fix — the test is part of the fix.",
      zh: "在添加、更新或重新组织测试而不触及生产代码时使用 test。如果你在同一提交中修复错误并添加回归测试，使用 fix——测试是修复的一部分。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Should regression tests be committed with fix or test?",
          zh: "回归测试应该与 fix 还是 test 一起提交？",
        },
        answer: {
          en: "With the fix. A regression test and its corresponding fix are logically one unit of work. Splitting them would leave the fix commit without coverage and the test commit without any failing case to reference.",
          zh: "与 fix 一起。回归测试和对应的修复在逻辑上是一个工作单元。分拆它们会使修复提交没有覆盖，测试提交没有可参考的失败用例。",
        },
      },
      {
        question: {
          en: "Does test trigger a version bump or appear in changelogs?",
          zh: "test 触发版本升级或出现在变更日志中吗？",
        },
        answer: {
          en: "No. test commits are excluded from public changelogs and do not trigger version bumps in standard semantic-release or release-please configurations.",
          zh: "不会。test 提交从公开变更日志中排除，在标准 semantic-release 或 release-please 配置中不触发版本升级。",
        },
      },
      {
        question: {
          en: "Should test infrastructure changes (jest.config.ts, vitest.config.ts) use test or chore?",
          zh: "测试基础设施变更（jest.config.ts、vitest.config.ts）应该用 test 还是 chore？",
        },
        answer: {
          en: "Either is reasonable. test is appropriate because the change directly affects the test suite. chore is also used when the change is a configuration housekeeping task. Be consistent within your project.",
          zh: "两者都合理。test 是合适的，因为变更直接影响测试套件。chore 也适用于当变更是配置维护任务时。在项目中保持一致。",
        },
      },
    ],
  },
  {
    slug: "chore",
    type: { en: "chore", zh: "chore" },
    description: {
      en: "A commit for maintenance tasks that do not modify production source code or tests: dependency updates, tooling configuration, build scripts, and housekeeping.",
      zh: "不修改生产源代码或测试的维护任务提交：依赖更新、工具配置、构建脚本和日常维护。",
    },
    templateFormat: `chore(scope): short imperative description of the maintenance task

- what was updated, added, or removed (bullet 1)
- any notable version or config change (bullet 2)

Why the maintenance task was necessary: security patch, deprecation,
tooling alignment, or routine housekeeping. Max 72 chars/line.`,
    realExamples: [
      `chore(deps): upgrade express from 4.18.2 to 4.19.2

- bump express and @types/express to 4.19.2
- update jest mock to match new res.json() return type in 4.19
- verify no breaking changes apply to our usage per the changelog

4.18.x reached end of security updates; 4.19.2 patches CVE-2024-29041
path traversal in static file serving.`,
      `chore(ci): add caching for pnpm store in GitHub Actions

- add actions/cache step keyed on pnpm-lock.yaml hash
- restore cache before pnpm install and save after on cache miss
- add separate cache for Playwright browser binaries

CI install time was 3m 20s per run without caching; with cache hits the
install step completes in under 10 seconds for unchanged lockfiles.`,
      `chore(tooling): migrate from eslint 8 to eslint 9 flat config

- replace .eslintrc.json with eslint.config.mjs using flat config format
- update eslint-plugin-import and @typescript-eslint to versions supporting flat config
- remove eslint-config-airbnb-base in favour of direct rule configuration

ESLint 8 is end-of-life; the flat config migration is required before
upgrading to eslint 9 which drops legacy config support entirely.`,
      `chore(gitignore): add common build and tool output paths

- add .turbo/, .next/, dist/, and out/ directories
- add .env.local and .env.*.local credential files
- add OS-specific files (.DS_Store, Thumbs.db)

Several build outputs were being staged accidentally by contributors
unfamiliar with the project's toolchain.`,
    ],
    whenToUse: {
      en: "Use chore for maintenance work that does not change what the software does: dependency upgrades, tooling updates, CI configuration, lockfile updates, .gitignore changes, and project scaffolding.",
      zh: "对于不改变软件功能的维护工作使用 chore：依赖升级、工具更新、CI 配置、lockfile 更新、.gitignore 变更和项目脚手架。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Monorepo commits", zh: "Monorepo 提交" },
        href: "/glossary/monorepo-commits",
      },
      {
        label: { en: "Commit message format", zh: "提交信息格式" },
        href: "/glossary/commit-message-format",
      },
    ],
    faq: [
      {
        question: {
          en: "Should dependency updates that enable a new feature use chore or feat?",
          zh: "启用新功能的依赖更新应该用 chore 还是 feat？",
        },
        answer: {
          en: "Split them: chore(deps) for the dependency update and feat(scope) for the feature that uses the new dependency. Each is a separate logical change.",
          zh: "拆分处理：依赖更新用 chore(deps)，使用新依赖的功能用 feat(scope)。每个都是独立的逻辑变更。",
        },
      },
      {
        question: {
          en: "Does chore appear in public changelogs?",
          zh: "chore 出现在公开变更日志中吗？",
        },
        answer: {
          en: "Not by default. Standard changelog presets exclude chore. For libraries, chore(deps) updates are sometimes included in a separate Dependencies section when they contain security patches.",
          zh: "默认情况下不会。标准变更日志预设排除 chore。对于库，当 chore(deps) 更新包含安全补丁时，有时会包含在单独的依赖章节中。",
        },
      },
      {
        question: {
          en: "Is there a difference between chore and build commit types?",
          zh: "chore 和 build 提交类型有什么区别？",
        },
        answer: {
          en: "Some teams use build specifically for changes to the build system (webpack config, Makefile, Dockerfile) and chore for general housekeeping. Both are excluded from changelogs. Choose one convention and apply it consistently.",
          zh: "一些团队专门将 build 用于构建系统的变更（webpack 配置、Makefile、Dockerfile），将 chore 用于一般维护。两者都从变更日志中排除。选择一种约定并一致应用。",
        },
      },
    ],
  },
  {
    slug: "perf",
    type: { en: "perf", zh: "perf" },
    description: {
      en: "A commit that improves performance — reduces latency, memory use, or CPU consumption — without changing the observable behaviour of the software.",
      zh: "提升性能的提交——减少延迟、内存使用或 CPU 消耗——不改变软件的可观察行为。",
    },
    templateFormat: `perf(scope): short imperative description of what was optimised

- what specific operation was optimised (bullet 1)
- what technique or data structure change achieves the improvement (bullet 2)
- measured before/after if available (bullet 3)

Why the performance was unacceptable and what the target metric is.
Max 72 chars/line.`,
    realExamples: [
      `perf(query): replace N+1 user joins with single batched DataLoader fetch

- collect all user IDs from the result set before resolving
- fetch via UserDataLoader in a single SELECT WHERE id IN (...)
- remove per-row db.findUser() calls from the GraphQL resolver loop

At 50 items the endpoint issued 51 db queries (250ms); with the loader
it issues 2 queries (12ms). Profiled under production-replica load.`,
      `perf(cache): add read-through cache for product catalogue lookups

- add Redis cache layer in ProductRepository.findById with 5-minute TTL
- use cache-aside pattern: read cache first, fall through to db on miss
- add cache.invalidate() call in product update and delete handlers

Product catalogue reads were 40% of db load; the catalogue changes
rarely (< 5 writes/hour) making it an ideal cache candidate. p99 read
latency drops from 45ms to 2ms on cache hits.`,
      `perf(build): enable SWC compiler in Next.js to replace Babel

- add @next/swc-* native binary for the target platform
- remove babel.config.js and @babel/preset-env no longer needed
- verify jest transform still uses babel-jest for test files only

Full rebuild time drops from 38s to 11s; hot reload from 800ms to
120ms on a 14-inch MacBook Pro M3. No behaviour changes in output.`,
      `perf(images): switch to WebP with AVIF fallback via next/image

- replace <img> tags with next/image in ProductCard and HeroSection
- set sizes prop for responsive srcset generation
- add avifQuality: 60 to next.config.js image optimisation settings

LCP on the product listing page improves from 3.2s to 1.1s (Lighthouse
mobile simulation); total image payload drops from 1.8MB to 340KB.`,
    ],
    whenToUse: {
      en: "Use perf when the change is motivated by a measurable performance improvement. Include before/after metrics in the body when available. If the optimisation also changes behaviour, use feat.",
      zh: "当变更的动机是可测量的性能改进时使用 perf。如果可以，在正文中包含前后对比指标。如果优化也改变了行为，使用 feat。",
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
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
    ],
    faq: [
      {
        question: {
          en: "Does perf trigger a version bump?",
          zh: "perf 触发版本升级吗？",
        },
        answer: {
          en: "Not in the default semantic-release configuration. perf is treated like an internal improvement. If you want perf commits to trigger a patch bump, you can configure your release preset to include them.",
          zh: "在默认的 semantic-release 配置中不会。perf 被视为内部改进。如果你希望 perf 提交触发补丁升级，可以配置发布预设将其包含在内。",
        },
      },
      {
        question: {
          en: "Should I include benchmark numbers in the commit body?",
          zh: "应该在提交正文中包含基准测试数字吗？",
        },
        answer: {
          en: "Yes, when they are available and reproducible. Specific numbers (p99 latency, mb/s throughput, build time) make it possible to verify the improvement and detect future regressions from git log.",
          zh: "是的，如果数字可用且可重现。具体数字（p99 延迟、mb/s 吞吐量、构建时间）使得可以从 git log 中验证改进并检测未来的回归。",
        },
      },
      {
        question: {
          en: "Is it perf or refactor when I extract code to improve cache locality?",
          zh: "当我提取代码以改善缓存局部性时，是 perf 还是 refactor？",
        },
        answer: {
          en: "perf if the primary motivation is measurable performance improvement, even if the code structure also changes. The distinction is intent: perf commits are motivated by metrics, refactor commits by code structure.",
          zh: "如果主要动机是可测量的性能改进，则为 perf，即使代码结构也发生了变化。区别在于意图：perf 提交由指标驱动，refactor 提交由代码结构驱动。",
        },
      },
    ],
  },
  {
    slug: "style",
    type: { en: "style", zh: "style" },
    description: {
      en: "A commit that makes purely cosmetic changes to code formatting with no effect on logic: whitespace, indentation, semicolons, trailing commas, or quote style.",
      zh: "对代码格式进行纯外观变更的提交，不影响逻辑：空白、缩进、分号、尾随逗号或引号风格。",
    },
    templateFormat: `style(scope): short imperative description of what was formatted

- what formatter or linter rule was applied (bullet 1)
- scope of files affected if not obvious from the diff (bullet 2)

Why the formatting change was needed: new formatter configuration,
pre-commit hook enforcement, or codebase-wide consistency pass.`,
    realExamples: [
      `style(src): apply prettier 3.2 formatting across all source files

- run prettier --write on src/ after upgrading from 3.0 to 3.2
- printWidth changed from 80 to 100 per updated .prettierrc.json
- no logic changes; all tests pass unchanged

Prettier 3.2 adjusts object destructuring and ternary formatting rules;
running the formatter now prevents churn on subsequent PRs.`,
      `style(api): enforce double quotes throughout with ESLint fix

- run eslint --fix on api/ to apply quotes: ["error", "double"] rule
- 47 files updated; no mixed-quote strings remain in the module
- add the rule to .eslintrc.json so it is enforced going forward

Single and double quotes were mixed inconsistently; the ESLint rule makes
the style machine-enforceable and removes style discussions from review.`,
      `style(go): run gofmt and goimports on all packages

- format all .go files with gofmt -w
- sort and group imports with goimports
- no semantic changes; go vet passes with no new warnings

New contributors were adding files without running gofmt; adding a
pre-commit hook requires all files to be formatted first.`,
      `style(python): apply black formatting with line-length 88

- run black src/ tests/ with --line-length 88
- add pyproject.toml [tool.black] section with the same configuration
- resolve the one pre-existing black disagreement in utils.py manually

The codebase had no enforced formatter; this establishes black as the
canonical formatter and unblocks adding it to the pre-commit config.`,
    ],
    whenToUse: {
      en: "Use style exclusively for changes that a formatter or linter makes automatically, with zero logic change. If you rename a variable while reformatting, that is a refactor, not a style commit.",
      zh: "仅对格式化器或代码检查器自动进行的、零逻辑变更的变更使用 style。如果你在重新格式化时重命名了变量，那是 refactor，而非 style 提交。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Pre-commit hooks", zh: "pre-commit 钩子" },
        href: "/glossary/pre-commit-hooks",
      },
      {
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Should style commits be separated from other types?",
          zh: "style 提交应该与其他类型分开吗？",
        },
        answer: {
          en: "Yes. Mixing formatting changes with logic changes makes diffs harder to review. Run the formatter first, commit the style changes, then make your logic changes in a separate commit.",
          zh: "是的。将格式化变更与逻辑变更混合会使 diff 更难审查。先运行格式化器，提交 style 变更，然后在独立的提交中进行逻辑变更。",
        },
      },
      {
        question: {
          en: "Does style appear in the changelog?",
          zh: "style 出现在变更日志中吗？",
        },
        answer: {
          en: "No. style commits are excluded from all standard changelog presets because they carry no information relevant to users or API consumers.",
          zh: "不会。style 提交从所有标准变更日志预设中排除，因为它们不包含与用户或 API 消费者相关的信息。",
        },
      },
      {
        question: {
          en: "Is adding an end-of-file newline a style commit?",
          zh: "添加文件末尾换行符是 style 提交吗？",
        },
        answer: {
          en: "Yes, if it is the only change. EOL normalisation, trailing whitespace removal, and line ending conversion (CRLF to LF) are all style changes.",
          zh: "是的，如果这是唯一的变更。行尾规范化、尾随空白删除和行尾转换（CRLF 到 LF）都是 style 变更。",
        },
      },
    ],
  },
  {
    slug: "ci",
    type: { en: "ci", zh: "ci" },
    description: {
      en: "A commit that changes CI/CD pipeline configuration files and scripts: GitHub Actions, GitLab CI, CircleCI, Dockerfile, or deployment scripts.",
      zh: "更改 CI/CD 管道配置文件和脚本的提交：GitHub Actions、GitLab CI、CircleCI、Dockerfile 或部署脚本。",
    },
    templateFormat: `ci(scope): short imperative description of the pipeline change

- what workflow, job, or step was added or modified (bullet 1)
- what trigger or condition was changed (bullet 2)
- any performance or reliability improvement (bullet 3)

Why the CI change was necessary: new requirement, flaky test fix,
cost reduction, or environment update. Max 72 chars/line.`,
    realExamples: [
      `ci(github-actions): add release workflow with semantic-release

- add .github/workflows/release.yml triggered on push to main
- configure semantic-release with @semantic-release/github and npm plugins
- add GITHUB_TOKEN and NPM_TOKEN to required workflow secrets

Releases were manual and inconsistent; semantic-release derives the next
version from commit history and publishes automatically on every main push.`,
      `ci(test): split unit and integration tests into parallel jobs

- add unit-tests and integration-tests jobs that run concurrently
- move db setup and migrations to integration-tests job only
- reduce total CI time from 8m to 3m on typical PRs

Unit tests were blocked on database setup even though they do not use the
db; parallelising them removes the unnecessary dependency.`,
      `ci(docker): switch base image from node:18 to node:20-alpine

- update Dockerfile FROM to node:20-alpine
- pin to node:20.14.0-alpine3.19 for reproducible builds
- remove manual SSL cert update step no longer needed in alpine 3.19

node:18 reaches end of life in April 2025; alpine base reduces the
final image from 1.1GB to 210MB.`,
      `ci(dependabot): add weekly dependency update schedule for npm and actions

- add .github/dependabot.yml with package-ecosystem: npm and github-actions
- set schedule to weekly on Monday at 09:00 UTC
- add reviewers and labels for automated triage

Dependencies were only updated manually when a vulnerability was reported;
automated PRs ensure routine updates surface before they accumulate.`,
    ],
    whenToUse: {
      en: "Use ci for changes to pipeline definition files, Dockerfiles, deployment scripts, and CI configuration. If the change also modifies application source code, consider splitting it.",
      zh: "对管道定义文件、Dockerfiles、部署脚本和 CI 配置的变更使用 ci。如果变更也修改了应用源代码，考虑将其拆分。",
    },
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "chore commit template", zh: "chore 提交模板" },
        href: "/templates/chore",
      },
      {
        label: { en: "Conventional changelog", zh: "约定式变更日志" },
        href: "/glossary/conventional-changelog",
      },
    ],
    faq: [
      {
        question: {
          en: "What is the difference between ci and chore for pipeline changes?",
          zh: "对于管道变更，ci 和 chore 有什么区别？",
        },
        answer: {
          en: "ci is specifically for CI/CD pipeline files (.github/workflows/, .gitlab-ci.yml, Jenkinsfile). chore covers other maintenance. Use ci for pipeline changes to make them easy to filter in git log.",
          zh: "ci 专门用于 CI/CD 管道文件（.github/workflows/、.gitlab-ci.yml、Jenkinsfile）。chore 涵盖其他维护工作。对管道变更使用 ci，使其在 git log 中易于过滤。",
        },
      },
      {
        question: {
          en: "Should Dockerfile changes use ci or chore?",
          zh: "Dockerfile 变更应该用 ci 还是 chore？",
        },
        answer: {
          en: "Either is acceptable. ci is appropriate when the Dockerfile is part of the CI/CD pipeline definition. chore or build is appropriate when it defines the production runtime image. Be consistent within your project.",
          zh: "两者都可以接受。当 Dockerfile 是 CI/CD 管道定义的一部分时，ci 是合适的。当它定义生产运行时镜像时，chore 或 build 是合适的。在项目中保持一致。",
        },
      },
      {
        question: {
          en: "Does ci appear in public changelogs?",
          zh: "ci 出现在公开变更日志中吗？",
        },
        answer: {
          en: "No. ci commits are internal infrastructure changes with no relevance to users or API consumers, and are excluded from all standard changelog presets.",
          zh: "不会。ci 提交是内部基础设施变更，与用户或 API 消费者无关，被所有标准变更日志预设排除。",
        },
      },
    ],
  },
  {
    slug: "breaking-change",
    type: { en: "breaking-change", zh: "破坏性变更" },
    description: {
      en: "A commit that introduces an incompatible change to a public API, protocol, or behaviour that requires consumers to make corresponding changes.",
      zh: "引入对公开 API、协议或行为的不兼容变更的提交，要求消费者做出相应变更。",
    },
    templateFormat: `feat(scope)!: short description of the new incompatible behaviour

- what was removed or changed incompatibly (bullet 1)
- what the new behaviour or API is (bullet 2)
- what consumers must do to migrate (bullet 3)

BREAKING CHANGE: Detailed description of the incompatible change and
migration path. Consumers who do X must now do Y instead. Max 72
chars/line.`,
    realExamples: [
      `feat(api)!: replace session cookies with Bearer token authentication

- remove Set-Cookie / Cookie session mechanism from all endpoints
- require Authorization: Bearer <token> header on all authenticated requests
- issue tokens via POST /auth/token and revoke via DELETE /auth/token

BREAKING CHANGE: All API clients must migrate from session cookie auth to
Bearer token auth. Existing session cookies are no longer accepted. Issue
tokens using the new POST /auth/token endpoint before the next release.`,
      `feat(config)!: rename DATABASE_URL to DB_CONNECTION_STRING

- update all internal config reads to use DB_CONNECTION_STRING
- add deprecation error at startup if DATABASE_URL is set without the new key
- update documentation and .env.example with the new variable name

BREAKING CHANGE: The DATABASE_URL environment variable is no longer
recognised. Rename it to DB_CONNECTION_STRING in all deployment
environments, CI secrets, and local .env files before upgrading.`,
      `refactor(exports)!: remove default export in favour of named exports

- change all module files from export default to named exports
- update internal import sites throughout the codebase
- add migration codemod script at scripts/migrate-imports.ts

BREAKING CHANGE: Default imports (import Client from '@example/sdk') no
longer work. Replace with named imports: import { Client } from '@example/sdk'.
Run the codemod at scripts/migrate-imports.ts to automate the update.`,
      `feat(cli)!: remove --output flag; use --format and --destination instead

- add --format flag accepting json, yaml, or table
- add --destination flag for output file path (default: stdout)
- print deprecation error when --output is passed and exit 1

BREAKING CHANGE: The --output flag is removed. Scripts using --output <file>
must be updated to --format table --destination <file>. The --format and
--destination flags are available from this version onward.`,
    ],
    whenToUse: {
      en: "Use feat(scope)!: or fix(scope)!: (a ! immediately before the colon, after optional scope) and add a BREAKING CHANGE: footer whenever you remove a public API, change a method signature incompatibly, rename a required config key, or change a default behaviour that consumers depend on.",
      zh: "每当你删除公开 API、以不兼容的方式更改方法签名、重命名必需的配置键，或更改消费者依赖的默认行为时，使用 feat(scope)!: 或 fix(scope)!:（在可选 scope 之后、冒号之前加 !）并添加 BREAKING CHANGE: 页脚。",
    },
    relatedLinks: [
      {
        label: { en: "Semantic versioning", zh: "语义化版本" },
        href: "/glossary/semantic-versioning",
      },
      {
        label: { en: "Conventional Commits", zh: "约定式提交" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "Conventional changelog", zh: "约定式变更日志" },
        href: "/glossary/conventional-changelog",
      },
    ],
    faq: [
      {
        question: {
          en: "What triggers a MAJOR version bump in semantic-release?",
          zh: "什么触发 semantic-release 中的 MAJOR 版本升级？",
        },
        answer: {
          en: "Any commit with a BREAKING CHANGE: footer, or any commit with ! immediately before the colon (feat!, fix!, feat(api)!:, etc.), triggers a MAJOR bump. The ! shorthand and the footer are equivalent.",
          zh: "任何包含 BREAKING CHANGE: 页脚的提交，或冒号前带有 ! 的提交（feat!、fix!、feat(api)!: 等），都会触发 MAJOR 升级。! 简写和页脚是等效的。",
        },
      },
      {
        question: {
          en: "Should I provide a migration guide in the commit body?",
          zh: "应该在提交正文中提供迁移指南吗？",
        },
        answer: {
          en: "Yes. The BREAKING CHANGE: footer should describe what changed and what consumers must do differently. A specific before/after example in the footer is more useful than a vague notice.",
          zh: "是的。BREAKING CHANGE: 页脚应该描述变更内容以及消费者必须做什么不同的事情。页脚中的具体前后对比示例比模糊的通知更有用。",
        },
      },
      {
        question: {
          en: "Can a chore or docs commit be a breaking change?",
          zh: "chore 或 docs 提交可以是破坏性变更吗？",
        },
        answer: {
          en: "Technically yes — any commit type can carry a BREAKING CHANGE footer. In practice, breaking changes almost always come from feat or fix commits that alter observable behaviour.",
          zh: "技术上可以——任何提交类型都可以携带 BREAKING CHANGE 页脚。实际上，破坏性变更几乎总是来自改变可观察行为的 feat 或 fix 提交。",
        },
      },
    ],
  },
];

export function findTemplate(slug: string): TemplateEntry | undefined {
  return templateEntries.find((e) => e.slug === slug);
}
