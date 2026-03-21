import type { I18nText, CrossLink, FaqItem } from "./types";

export interface PersonaEntry {
  slug: string;
  language: I18nText;
  tagline: I18nText;
  description: I18nText;
  diffExample: string;
  commitExample: string;
  installSnippet: string;
  features: I18nText[];
  relatedLinks: CrossLink[];
  faq: FaqItem[];
}

export const personaEntries: PersonaEntry[] = [
  {
    slug: "python",
    language: { en: "Python", zh: "Python" },
    tagline: {
      en: "Conventional commits for Python projects, automatically",
      zh: "为 Python 项目自动生成规范化提交信息",
    },
    description: {
      en: "git-agent understands Django, Flask, FastAPI, and standard Python project layouts, splitting your staged changes into meaningful atomic commits with properly scoped conventional messages.",
      zh: "git-agent 理解 Django、Flask、FastAPI 及标准 Python 项目结构，将暂存的变更自动拆分为有意义的原子提交，并生成规范化的提交信息。",
    },
    diffExample: `diff --git a/app/api/users.py b/app/api/users.py
index 3a1f2c4..8b9d1e7 100644
--- a/app/api/users.py
+++ b/app/api/users.py
@@ -12,6 +12,14 @@ from app.models import User
 from app.schemas import UserCreate, UserRead
 from app.database import get_db

+class UserAlreadyExistsError(Exception):
+    """Raised when attempting to create a user with a duplicate email."""
+    pass
+
 async def create_user(db: AsyncSession, payload: UserCreate) -> UserRead:
-    user = User(**payload.dict())
-    db.add(user)
-    await db.commit()
-    return UserRead.from_orm(user)
+    existing = await db.execute(select(User).where(User.email == payload.email))
+    if existing.scalar_one_or_none():
+        raise UserAlreadyExistsError(f"email {payload.email!r} already registered")
+    user = User(**payload.model_dump())
+    db.add(user)
+    await db.commit()
+    await db.refresh(user)
+    return UserRead.model_validate(user)`,
    commitExample: `feat(users): guard against duplicate email on creation

- add UserAlreadyExistsError domain exception
- check for existing email before insert to avoid db constraint failures
- migrate payload.dict() to payload.model_dump() for Pydantic v2 compatibility

Prevents a 500 on duplicate-email POST /users; callers now receive a
clear exception they can map to 409 Conflict at the HTTP layer.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Python repo
git-agent init   # detects pyproject.toml / setup.cfg and suggests scopes`,
    features: [
      {
        en: "Recognizes Django, Flask, and FastAPI project layouts for accurate scope detection",
        zh: "识别 Django、Flask 和 FastAPI 项目结构，准确检测提交范围",
      },
      {
        en: "Understands Pydantic model changes and migration diffs",
        zh: "理解 Pydantic 模型变更和数据库迁移差异",
      },
      {
        en: "Handles monorepo Python services independently, committing each service atomically",
        zh: "独立处理 monorepo 中的各个 Python 服务，为每个服务生成原子提交",
      },
      {
        en: "Works with pyproject.toml and setup.cfg-based projects out of the box",
        zh: "开箱即用，支持基于 pyproject.toml 和 setup.cfg 的项目",
      },
    ],
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
          en: "Does git-agent work with Django migrations?",
          zh: "git-agent 能处理 Django 数据库迁移文件吗？",
        },
        answer: {
          en: "Yes. git-agent detects migration files and treats them as a separate atomic commit with scope `migrations`, keeping them out of your feature commits.",
          zh: "可以。git-agent 会检测迁移文件，并将其作为独立的原子提交处理，使用 `migrations` 作为范围，与功能提交分离。",
        },
      },
      {
        question: {
          en: "Can I use git-agent with a virtual environment or conda?",
          zh: "git-agent 能与虚拟环境或 conda 一起使用吗？",
        },
        answer: {
          en: "git-agent is a standalone Go binary installed via Homebrew. It does not run inside your Python environment and requires no pip install.",
          zh: "git-agent 是通过 Homebrew 安装的独立 Go 二进制文件，不在 Python 环境内运行，无需 pip 安装。",
        },
      },
      {
        question: {
          en: "How does git-agent determine scopes for Python projects?",
          zh: "git-agent 如何确定 Python 项目的提交范围？",
        },
        answer: {
          en: "Running `git-agent init` scans your git history to infer scopes from your directory structure, then writes them to `.git-agent/project.yml` for consistent scope suggestions.",
          zh: "运行 `git-agent init` 会扫描 git 历史记录，从目录结构推断范围，并写入 `.git-agent/project.yml` 以便后续使用一致的范围建议。",
        },
      },
    ],
  },
  {
    slug: "typescript",
    language: { en: "TypeScript", zh: "TypeScript" },
    tagline: {
      en: "Atomic conventional commits for TypeScript codebases",
      zh: "为 TypeScript 代码库生成原子化的约定式提交",
    },
    description: {
      en: "git-agent splits TypeScript changes across types, implementation, and tests into separate atomic commits, generating precise conventional messages that reflect your type-safe refactors and feature additions.",
      zh: "git-agent 将 TypeScript 中类型定义、实现和测试的变更拆分为独立的原子提交，为类型安全的重构和功能新增生成精确的约定式提交信息。",
    },
    diffExample: `diff --git a/src/services/auth.ts b/src/services/auth.ts
index c2d4f1a..9e8b3c2 100644
--- a/src/services/auth.ts
+++ b/src/services/auth.ts
@@ -1,5 +1,6 @@
 import { sign, verify } from "jsonwebtoken";
 import { config } from "../config";
+import { TokenExpiredError } from "../errors";

-export function verifyToken(token: string): { userId: string } {
-  return verify(token, config.jwtSecret) as { userId: string };
+export interface TokenPayload {
+  userId: string;
+  iat: number;
+  exp: number;
+}
+
+export function verifyToken(token: string): TokenPayload {
+  try {
+    return verify(token, config.jwtSecret) as TokenPayload;
+  } catch (err) {
+    if (err instanceof Error && err.name === "TokenExpiredError") {
+      throw new TokenExpiredError(token);
+    }
+    throw err;
+  }
 }`,
    commitExample: `refactor(auth): strengthen verifyToken return type and error handling

- export TokenPayload interface with iat/exp fields for downstream consumers
- wrap jsonwebtoken errors so callers receive domain-specific TokenExpiredError
- remove unsafe cast in favour of typed return signature

Eliminates the implicit any in callers that previously destructured the
return value without type guards; downstream middleware can now distinguish
expired tokens from malformed ones.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# in your TypeScript repo
git-agent init   # reads tsconfig.json paths to suggest scopes`,
    features: [
      {
        en: "Separates type definition changes from implementation changes into distinct commits",
        zh: "将类型定义变更与实现变更分离为独立的提交",
      },
      {
        en: "Recognizes tsconfig.json project structure for accurate scope inference",
        zh: "识别 tsconfig.json 项目结构以准确推断提交范围",
      },
      {
        en: "Works with NestJS, Express, and tRPC project layouts",
        zh: "适用于 NestJS、Express 和 tRPC 项目结构",
      },
      {
        en: "Handles .d.ts declaration file changes independently",
        zh: "独立处理 .d.ts 声明文件的变更",
      },
    ],
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
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Will git-agent split my TypeScript and JavaScript files into separate commits?",
          zh: "git-agent 会将 TypeScript 和 JavaScript 文件的变更拆分为不同的提交吗？",
        },
        answer: {
          en: "git-agent groups changes by logical concern, not file extension. If a .ts file and a .js file are part of the same feature, they stay in one commit.",
          zh: "git-agent 按逻辑关联分组变更，而非文件扩展名。如果 .ts 文件和 .js 文件属于同一功能，它们会被归入同一个提交。",
        },
      },
      {
        question: {
          en: "Does git-agent understand TypeScript decorators and metadata?",
          zh: "git-agent 能理解 TypeScript 装饰器和元数据吗？",
        },
        answer: {
          en: "git-agent sends the raw diff to the LLM, which understands decorator syntax. NestJS controller diffs and Angular component changes are handled correctly.",
          zh: "git-agent 将原始 diff 发送给 LLM，LLM 能理解装饰器语法。NestJS 控制器和 Angular 组件的变更均能正确处理。",
        },
      },
      {
        question: {
          en: "Can I configure scopes to match my TypeScript path aliases?",
          zh: "能否将提交范围配置为与 TypeScript 路径别名对应？",
        },
        answer: {
          en: "Yes. Run `git-agent init` and it will read your tsconfig paths to suggest scopes. You can then edit `.git-agent/project.yml` to fine-tune them.",
          zh: "可以。运行 `git-agent init` 会读取 tsconfig 路径并建议范围，之后可编辑 `.git-agent/project.yml` 进行微调。",
        },
      },
    ],
  },
  {
    slug: "javascript",
    language: { en: "JavaScript", zh: "JavaScript" },
    tagline: {
      en: "LLM-powered conventional commits for JavaScript projects",
      zh: "为 JavaScript 项目提供 LLM 驱动的约定式提交",
    },
    description: {
      en: "From Express APIs to vanilla browser scripts, git-agent reads your JavaScript diffs and produces conventional commit messages that accurately capture what changed and why.",
      zh: "无论是 Express API 还是原生浏览器脚本，git-agent 都能读取你的 JavaScript diff 并生成准确描述变更内容和原因的约定式提交信息。",
    },
    diffExample: `diff --git a/src/middleware/rateLimit.js b/src/middleware/rateLimit.js
index 7f3c1a9..2d8e4b1 100644
--- a/src/middleware/rateLimit.js
+++ b/src/middleware/rateLimit.js
@@ -1,10 +1,20 @@
 const rateLimit = require("express-rate-limit");
+const RedisStore = require("rate-limit-redis");
+const { redisClient } = require("../lib/redis");

 module.exports = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 100,
-  standardHeaders: true,
-  legacyHeaders: false,
+  standardHeaders: "draft-7",
+  legacyHeaders: false,
+  store: new RedisStore({
+    sendCommand: (...args) => redisClient.sendCommand(args),
+  }),
+  handler: (req, res) => {
+    res.status(429).json({
+      error: "too_many_requests",
+      retryAfter: res.getHeader("Retry-After"),
+    });
+  },
 });`,
    commitExample: `feat(middleware): back rate limiter with Redis and structured 429 response

- replace in-memory store with RedisStore for multi-instance consistency
- upgrade standardHeaders to draft-7 format
- return machine-readable JSON body with retryAfter field on 429

In-memory rate limiting was reset on every dyno restart and did not
share state across instances; Redis store ensures limits are enforced
cluster-wide.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your JS repo
git-agent init   # scans package.json workspaces for scope suggestions`,
    features: [
      {
        en: "Works with CommonJS (require) and ESM (import) projects equally well",
        zh: "同等支持 CommonJS (require) 和 ESM (import) 项目",
      },
      {
        en: "Understands Express, Fastify, and Koa middleware patterns",
        zh: "理解 Express、Fastify 和 Koa 中间件模式",
      },
      {
        en: "Detects package.json changes and separates dependency bumps into chore commits",
        zh: "检测 package.json 变更，将依赖升级单独提交为 chore 类型",
      },
      {
        en: "Handles bundler configs (webpack, rollup, esbuild) as distinct chore commits",
        zh: "将打包器配置（webpack、rollup、esbuild）变更单独处理为 chore 提交",
      },
    ],
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "feat commit template", zh: "feat 提交模板" },
        href: "/templates/feat",
      },
      {
        label: { en: "chore commit template", zh: "chore 提交模板" },
        href: "/templates/chore",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent work with npm, yarn, and pnpm projects?",
          zh: "git-agent 能与 npm、yarn 和 pnpm 项目一起使用吗？",
        },
        answer: {
          en: "Yes. git-agent is package-manager agnostic. It reads diffs regardless of which lockfile format you use.",
          zh: "可以。git-agent 与包管理器无关，能读取任何 lockfile 格式的 diff。",
        },
      },
      {
        question: {
          en: "How does git-agent handle minified or generated JavaScript files?",
          zh: "git-agent 如何处理压缩或生成的 JavaScript 文件？",
        },
        answer: {
          en: "Add generated files to `.gitignore`. git-agent commits only what is staged, and `git-agent init` generates a `.gitignore` entry for common build output directories.",
          zh: "将生成的文件添加到 `.gitignore`。git-agent 只提交已暂存的内容，`git-agent init` 会为常见的构建输出目录生成 `.gitignore` 条目。",
        },
      },
      {
        question: {
          en: "Can git-agent split a large JavaScript refactor into multiple commits?",
          zh: "git-agent 能将大型 JavaScript 重构拆分为多个提交吗？",
        },
        answer: {
          en: "Yes. Atomic commit splitting is git-agent's core differentiator. It plans commit groups from the diff before writing any commit, then stages and commits each group independently.",
          zh: "可以。原子提交拆分是 git-agent 的核心特性。它在写入任何提交之前，先从 diff 中规划提交组，然后独立暂存并提交每个组。",
        },
      },
    ],
  },
  {
    slug: "go",
    language: { en: "Go", zh: "Go" },
    tagline: {
      en: "Conventional commits for Go modules and services",
      zh: "为 Go 模块和服务生成约定式提交",
    },
    description: {
      en: "git-agent understands Go module boundaries, interface changes, and test file conventions, producing accurate conventional commits that align with Go project standards.",
      zh: "git-agent 理解 Go 模块边界、接口变更和测试文件约定，生成符合 Go 项目标准的准确约定式提交信息。",
    },
    diffExample: `diff --git a/internal/cache/redis.go b/internal/cache/redis.go
index 4d2e9f1..1a3b8c7 100644
--- a/internal/cache/redis.go
+++ b/internal/cache/redis.go
@@ -8,12 +8,25 @@ import (
 	"context"
 	"encoding/json"
 	"time"
+	"fmt"

 	"github.com/redis/go-redis/v9"
 )

+// ErrCacheMiss is returned when the requested key is not present in the cache.
+var ErrCacheMiss = fmt.Errorf("cache: key not found")
+
 type Client struct {
 	rdb *redis.Client
 }

-func (c *Client) Get(ctx context.Context, key string) ([]byte, error) {
-	return c.rdb.Get(ctx, key).Bytes()
+func (c *Client) Get(ctx context.Context, key string) ([]byte, error) {
+	b, err := c.rdb.Get(ctx, key).Bytes()
+	if err == redis.Nil {
+		return nil, ErrCacheMiss
+	}
+	return b, err
 }`,
    commitExample: `feat(cache): expose sentinel ErrCacheMiss from Redis client

- add package-level ErrCacheMiss sentinel so callers can use errors.Is
- translate redis.Nil to ErrCacheMiss inside Get to hide driver details
- document the new error var with a godoc comment

Callers previously had to import go-redis directly to check for
redis.Nil; the sentinel decouples the cache package's public API from
its underlying driver.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Go module
git-agent init   # reads go.mod module path to suggest scopes`,
    features: [
      {
        en: "Understands Go module boundaries and suggests scopes from go.mod",
        zh: "理解 Go 模块边界，并根据 go.mod 建议提交范围",
      },
      {
        en: "Separates *_test.go changes into test commits automatically",
        zh: "自动将 *_test.go 文件的变更分离为 test 类型提交",
      },
      {
        en: "Recognises interface definition changes versus implementation changes",
        zh: "区分接口定义变更与实现变更",
      },
      {
        en: "Works with multi-module Go workspaces (go.work)",
        zh: "支持多模块 Go 工作区（go.work）",
      },
    ],
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
          en: "Does git-agent handle go.sum changes separately?",
          zh: "git-agent 会单独处理 go.sum 文件的变更吗？",
        },
        answer: {
          en: "Yes. go.sum and go.mod updates triggered by `go get` are grouped into a chore(deps) commit, separate from your code changes.",
          zh: "会的。由 `go get` 触发的 go.sum 和 go.mod 更新会被归入 chore(deps) 提交，与代码变更分离。",
        },
      },
      {
        question: {
          en: "Can git-agent work inside a Go workspace with multiple modules?",
          zh: "git-agent 能在包含多个模块的 Go 工作区中工作吗？",
        },
        answer: {
          en: "Yes. git-agent operates at the git repository root. If your repo contains a go.work file, each module directory is treated as a potential separate scope.",
          zh: "可以。git-agent 在 git 仓库根目录运行。如果仓库包含 go.work 文件，每个模块目录会被视为潜在的独立范围。",
        },
      },
      {
        question: {
          en: "How does git-agent handle generated protobuf files in Go?",
          zh: "git-agent 如何处理 Go 中生成的 protobuf 文件？",
        },
        answer: {
          en: "Protobuf generated files (*.pb.go) are recognised as generated code. git-agent groups them into a separate chore or build commit rather than mixing them with hand-written changes.",
          zh: "Protobuf 生成的文件（*.pb.go）被识别为生成代码。git-agent 会将它们归入独立的 chore 或 build 提交，而不是与手写代码混合。",
        },
      },
    ],
  },
  {
    slug: "rust",
    language: { en: "Rust", zh: "Rust" },
    tagline: {
      en: "Precise conventional commits for Rust crates and workspaces",
      zh: "为 Rust crate 和工作区生成精确的约定式提交",
    },
    description: {
      en: "git-agent understands Cargo workspace layouts and Rust's ownership patterns, splitting your staged changes into clean atomic commits with conventional messages that match the Rust community's standards.",
      zh: "git-agent 理解 Cargo 工作区结构和 Rust 的所有权模式，将暂存变更拆分为干净的原子提交，并生成符合 Rust 社区标准的约定式提交信息。",
    },
    diffExample: `diff --git a/src/error.rs b/src/error.rs
index 8c1d3f2..5e9a7b4 100644
--- a/src/error.rs
+++ b/src/error.rs
@@ -1,10 +1,22 @@
-use std::fmt;
+use std::fmt;
+use std::io;

 #[derive(Debug)]
 pub enum Error {
     NotFound(String),
     Unauthorized,
+    Io(io::Error),
+    Parse { input: String, reason: String },
 }

 impl fmt::Display for Error {
     fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
         match self {
             Error::NotFound(key) => write!(f, "not found: {key}"),
             Error::Unauthorized => write!(f, "unauthorized"),
+            Error::Io(e) => write!(f, "io error: {e}"),
+            Error::Parse { input, reason } => {
+                write!(f, "parse error on {input!r:?}: {reason}")
+            }
         }
     }
 }
+
+impl From<io::Error> for Error {
+    fn from(e: io::Error) -> Self {
+        Error::Io(e)
+    }
+}`,
    commitExample: `feat(error): add Io and Parse variants to Error enum

- add Error::Io(io::Error) variant with From<io::Error> impl for ? operator use
- add Error::Parse with structured input/reason fields for diagnostic context
- implement Display for both new variants

Callers that perform file I/O can now propagate errors with ? instead
of manually wrapping; the Parse variant carries enough context for
user-facing error messages without a separate error type.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Rust project
git-agent init   # reads Cargo.toml workspace members to suggest scopes`,
    features: [
      {
        en: "Understands Cargo workspace members and suggests per-crate scopes",
        zh: "理解 Cargo 工作区成员，建议按 crate 划分的提交范围",
      },
      {
        en: "Separates Cargo.lock updates into chore commits automatically",
        zh: "自动将 Cargo.lock 更新分离为 chore 类型提交",
      },
      {
        en: "Distinguishes trait definition changes from trait implementation changes",
        zh: "区分 trait 定义变更与 trait 实现变更",
      },
      {
        en: "Handles macro-heavy code diffs without losing context",
        zh: "处理宏密集型代码的 diff 时不丢失上下文",
      },
    ],
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
          en: "Does git-agent handle Rust macro expansions in diffs?",
          zh: "git-agent 能处理 Rust 宏展开的 diff 吗？",
        },
        answer: {
          en: "git-agent works on the source diff, not the expanded output. Proc-macro and derive attribute changes are treated as normal source changes.",
          zh: "git-agent 处理源代码的 diff，而非展开后的输出。过程宏和 derive 属性的变更被视为普通源代码变更。",
        },
      },
      {
        question: {
          en: "Will unsafe blocks affect how git-agent categorises commits?",
          zh: "unsafe 块会影响 git-agent 对提交的分类吗？",
        },
        answer: {
          en: "git-agent detects unsafe block additions and will note them in the commit body, but the commit type is still determined by the overall change intent (feat, fix, refactor, etc.).",
          zh: "git-agent 会检测 unsafe 块的新增，并在提交正文中注明，但提交类型仍由整体变更意图决定（feat、fix、refactor 等）。",
        },
      },
      {
        question: {
          en: "Can I use git-agent on a Rust project without a Cargo workspace?",
          zh: "在没有 Cargo 工作区的 Rust 项目中也能使用 git-agent 吗？",
        },
        answer: {
          en: "Yes. Single-crate projects work out of the box. git-agent infers scopes from your `src/` directory structure when no workspace is present.",
          zh: "可以。单 crate 项目开箱即用。当没有工作区时，git-agent 会从 `src/` 目录结构推断提交范围。",
        },
      },
    ],
  },
  {
    slug: "java",
    language: { en: "Java", zh: "Java" },
    tagline: {
      en: "Conventional commits for Java and Spring projects",
      zh: "为 Java 和 Spring 项目生成约定式提交",
    },
    description: {
      en: "git-agent handles Maven and Gradle project layouts, Spring component annotations, and Java class hierarchies to produce conventional commit messages that reflect the enterprise patterns in your codebase.",
      zh: "git-agent 处理 Maven 和 Gradle 项目结构、Spring 组件注解和 Java 类层次结构，生成反映代码库中企业级模式的约定式提交信息。",
    },
    diffExample: `diff --git a/src/main/java/com/example/order/OrderService.java b/src/main/java/com/example/order/OrderService.java
index 1f4a2d3..8c7e9b1 100644
--- a/src/main/java/com/example/order/OrderService.java
+++ b/src/main/java/com/example/order/OrderService.java
@@ -15,10 +15,18 @@ public class OrderService {
     private final OrderRepository orderRepository;
     private final EventPublisher eventPublisher;

-    public Order createOrder(CreateOrderRequest request) {
+    @Transactional
+    public Order createOrder(CreateOrderRequest request) {
+        if (request.getItems().isEmpty()) {
+            throw new IllegalArgumentException("order must contain at least one item");
+        }
         Order order = Order.from(request);
         Order saved = orderRepository.save(order);
+        eventPublisher.publish(new OrderCreatedEvent(saved.getId()));
         return saved;
     }
 }`,
    commitExample: `feat(order): add transaction boundary and order-created event

- annotate createOrder with @Transactional to ensure event and persist are atomic
- validate that request contains at least one item before persisting
- publish OrderCreatedEvent after successful save for downstream consumers

Without the transaction boundary a failed event publish could leave an
orphaned order record; wrapping both operations ensures all-or-nothing
semantics.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Java project
git-agent init   # detects Maven/Gradle structure and suggests scopes`,
    features: [
      {
        en: "Understands Maven multi-module and Gradle subproject layouts for scope detection",
        zh: "理解 Maven 多模块和 Gradle 子项目结构以检测提交范围",
      },
      {
        en: "Recognises Spring annotations (@Service, @Controller, @Repository) for accurate descriptions",
        zh: "识别 Spring 注解（@Service、@Controller、@Repository）以生成准确描述",
      },
      {
        en: "Groups pom.xml / build.gradle dependency changes into chore commits",
        zh: "将 pom.xml / build.gradle 依赖变更归入 chore 提交",
      },
      {
        en: "Handles Lombok-annotated classes and generated boilerplate correctly",
        zh: "正确处理 Lombok 注解的类和生成的样板代码",
      },
    ],
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
        label: { en: "fix commit template", zh: "fix 提交模板" },
        href: "/templates/fix",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent work with Maven and Gradle equally?",
          zh: "git-agent 对 Maven 和 Gradle 的支持相同吗？",
        },
        answer: {
          en: "Yes. git-agent detects both build systems from project files and adjusts scope suggestions accordingly.",
          zh: "是的。git-agent 能从项目文件中检测两种构建系统，并相应调整范围建议。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Java boilerplate like getters and setters?",
          zh: "git-agent 如何处理 getter 和 setter 等 Java 样板代码？",
        },
        answer: {
          en: "The LLM understands that getter/setter additions are structural changes. It will group them with the class they belong to rather than creating noise commits.",
          zh: "LLM 理解 getter/setter 的新增是结构性变更，会将它们与所属类归入同一提交，而不是创建无意义的提交。",
        },
      },
      {
        question: {
          en: "Can git-agent handle changes across many Java classes at once?",
          zh: "git-agent 能同时处理多个 Java 类的变更吗？",
        },
        answer: {
          en: "Yes. The atomic split planning step analyses all staged hunks together and groups them into logically coherent commits before writing any commit to history.",
          zh: "可以。原子拆分规划步骤会一起分析所有已暂存的 hunk，并在写入任何提交之前将它们分组为逻辑连贯的提交。",
        },
      },
    ],
  },
  {
    slug: "react",
    language: { en: "React", zh: "React" },
    tagline: {
      en: "Conventional commits for React component and hook changes",
      zh: "为 React 组件和 Hook 变更生成约定式提交",
    },
    description: {
      en: "git-agent understands React component structure, custom hook patterns, and context changes, producing conventional commit messages that clearly describe UI and state management updates.",
      zh: "git-agent 理解 React 组件结构、自定义 Hook 模式和 Context 变更，生成清晰描述 UI 和状态管理更新的约定式提交信息。",
    },
    diffExample: `diff --git a/src/hooks/useAuth.ts b/src/hooks/useAuth.ts
index 2b3f8d1..9c4a7e2 100644
--- a/src/hooks/useAuth.ts
+++ b/src/hooks/useAuth.ts
@@ -1,14 +1,28 @@
-import { useState } from "react";
+import { useState, useCallback } from "react";
 import { authClient } from "../lib/auth";
+import type { User } from "../types";

-export function useAuth() {
-  const [user, setUser] = useState(null);
-  const [loading, setLoading] = useState(false);
+export function useAuth() {
+  const [user, setUser] = useState<User | null>(null);
+  const [loading, setLoading] = useState(false);
+  const [error, setError] = useState<string | null>(null);

-  async function login(email: string, password: string) {
+  const login = useCallback(async (email: string, password: string) => {
+    setError(null);
     setLoading(true);
-    const result = await authClient.login(email, password);
-    setUser(result.user);
-    setLoading(false);
-  }
+    try {
+      const result = await authClient.login(email, password);
+      setUser(result.user);
+    } catch (err) {
+      setError(err instanceof Error ? err.message : "login failed");
+    } finally {
+      setLoading(false);
+    }
+  }, []);

-  return { user, loading, login };
+  return { user, loading, error, login };
 }`,
    commitExample: `refactor(hooks): stabilise useAuth login callback and surface error state

- wrap login in useCallback to prevent child re-renders on parent updates
- add error state so components can display login failure messages
- add try/finally to guarantee setLoading(false) even on thrown errors
- strengthen types: User | null instead of null, string | null for error

The unstable login reference caused form components to re-register event
handlers on every render; useCallback with an empty dep array fixes the
identity.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your React project
git-agent init   # reads src/ structure to suggest component scopes`,
    features: [
      {
        en: "Separates component changes, hook changes, and test changes into distinct commits",
        zh: "将组件变更、Hook 变更和测试变更分离为不同的提交",
      },
      {
        en: "Understands JSX and TSX syntax in diffs for accurate descriptions",
        zh: "理解 diff 中的 JSX 和 TSX 语法以生成准确描述",
      },
      {
        en: "Groups CSS module and styled-component changes with their component",
        zh: "将 CSS Module 和 styled-component 的变更与对应组件归入同一提交",
      },
      {
        en: "Works with Create React App, Vite, and custom webpack setups",
        zh: "支持 Create React App、Vite 和自定义 webpack 配置",
      },
    ],
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
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Will git-agent separate my component logic from its styles?",
          zh: "git-agent 会将组件逻辑与样式分离提交吗？",
        },
        answer: {
          en: "When a CSS module or style file is changed alongside a component, git-agent groups them together unless the style change is clearly independent (e.g., a global theme update).",
          zh: "当 CSS module 或样式文件与组件一起变更时，git-agent 会将它们归入同一提交，除非样式变更明显独立（如全局主题更新）。",
        },
      },
      {
        question: {
          en: "Does git-agent understand React Server Components?",
          zh: "git-agent 理解 React Server Components 吗？",
        },
        answer: {
          en: "The LLM understands the 'use client' / 'use server' directives and will note the component boundary type in the commit message when relevant.",
          zh: "LLM 理解 'use client' / 'use server' 指令，在相关时会在提交信息中注明组件边界类型。",
        },
      },
      {
        question: {
          en: "Can git-agent commit Storybook story changes separately?",
          zh: "git-agent 能将 Storybook 故事文件的变更单独提交吗？",
        },
        answer: {
          en: "Yes. Files matching *.stories.tsx are treated as documentation or test artefacts and grouped into a separate docs or test commit.",
          zh: "可以。匹配 *.stories.tsx 的文件被视为文档或测试产物，会被归入独立的 docs 或 test 提交。",
        },
      },
    ],
  },
  {
    slug: "nextjs",
    language: { en: "Next.js", zh: "Next.js" },
    tagline: {
      en: "Conventional commits for Next.js App Router and Pages Router",
      zh: "为 Next.js App Router 和 Pages Router 生成约定式提交",
    },
    description: {
      en: "git-agent understands Next.js routing conventions, Server Actions, API routes, and middleware, producing atomic conventional commits that accurately reflect your Next.js-specific changes.",
      zh: "git-agent 理解 Next.js 路由约定、Server Actions、API 路由和中间件，生成准确反映 Next.js 特定变更的原子约定式提交。",
    },
    diffExample: `diff --git a/app/api/revalidate/route.ts b/app/api/revalidate/route.ts
index new file mode 100644
--- /dev/null
+++ b/app/api/revalidate/route.ts
@@ -0,0 +1,22 @@
+import { revalidatePath } from "next/cache";
+import { NextRequest, NextResponse } from "next/server";
+
+const SECRET = process.env.REVALIDATION_SECRET;
+
+export async function POST(req: NextRequest) {
+  const { secret, path } = await req.json();
+
+  if (!SECRET || secret !== SECRET) {
+    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
+  }
+
+  if (!path || typeof path !== "string") {
+    return NextResponse.json({ error: "path required" }, { status: 400 });
+  }
+
+  revalidatePath(path);
+  return NextResponse.json({ revalidated: true, path });
+}`,
    commitExample: `feat(api): add on-demand revalidation endpoint for ISR paths

- implement POST /api/revalidate secured by REVALIDATION_SECRET env var
- validate path param before calling revalidatePath to avoid silent no-ops
- return structured JSON for both success and error cases

Allows the CMS webhook to trigger cache purges for specific pages without
a full rebuild; secret validation prevents unauthorised cache busting.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Next.js project
git-agent init   # detects app/ or pages/ layout and suggests route scopes`,
    features: [
      {
        en: "Understands App Router (app/) and Pages Router (pages/) directory conventions",
        zh: "理解 App Router（app/）和 Pages Router（pages/）目录约定",
      },
      {
        en: "Separates Server Action changes from client component changes",
        zh: "将 Server Action 变更与客户端组件变更分离提交",
      },
      {
        en: "Groups next.config.js and middleware changes into appropriate commit types",
        zh: "将 next.config.js 和 middleware 变更归入适当的提交类型",
      },
      {
        en: "Handles route handler files (route.ts) and page files (page.tsx) distinctly",
        zh: "分别处理路由处理文件（route.ts）和页面文件（page.tsx）",
      },
    ],
    relatedLinks: [
      {
        label: { en: "What are Conventional Commits?", zh: "什么是约定式提交？" },
        href: "/glossary/conventional-commits",
      },
      {
        label: { en: "feat commit template", zh: "feat 提交模板" },
        href: "/templates/feat",
      },
      {
        label: { en: "Atomic commits explained", zh: "原子提交详解" },
        href: "/glossary/atomic-commits",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent understand Next.js dynamic route segments?",
          zh: "git-agent 理解 Next.js 动态路由段吗？",
        },
        answer: {
          en: "Yes. Directory names like [id] and [...slug] are recognised as route parameters, and the LLM includes the route pattern in the commit scope.",
          zh: "是的。[id] 和 [...slug] 等目录名被识别为路由参数，LLM 会在提交范围中包含路由模式。",
        },
      },
      {
        question: {
          en: "How does git-agent handle changes to both layout.tsx and page.tsx?",
          zh: "git-agent 如何处理 layout.tsx 和 page.tsx 同时变更的情况？",
        },
        answer: {
          en: "If the layout and page changes are logically related (e.g., both add the same auth guard), git-agent commits them together. Unrelated changes are split into separate commits.",
          zh: "如果 layout 和 page 的变更在逻辑上相关（如都添加了相同的鉴权守卫），git-agent 会将它们归入同一提交；不相关的变更则拆分为独立提交。",
        },
      },
      {
        question: {
          en: "Can git-agent commit my Server Actions separately from UI components?",
          zh: "git-agent 能将 Server Actions 与 UI 组件分开提交吗？",
        },
        answer: {
          en: "Yes. Files in a dedicated actions/ directory or files with 'use server' at the top are treated as a separate concern from UI components and committed independently when the changes are independent.",
          zh: "可以。位于专用 actions/ 目录中的文件或顶部带有 'use server' 的文件，会被视为与 UI 组件不同的关注点，在变更独立时单独提交。",
        },
      },
    ],
  },
  {
    slug: "vue",
    language: { en: "Vue", zh: "Vue" },
    tagline: {
      en: "Conventional commits for Vue 3 Composition API and SFCs",
      zh: "为 Vue 3 Composition API 和单文件组件生成约定式提交",
    },
    description: {
      en: "git-agent handles Vue single-file component diffs, Pinia store changes, and Vue Router updates, producing conventional commit messages that align with Vue project conventions.",
      zh: "git-agent 处理 Vue 单文件组件的 diff、Pinia store 变更和 Vue Router 更新，生成符合 Vue 项目约定的约定式提交信息。",
    },
    diffExample: `diff --git a/src/stores/cart.ts b/src/stores/cart.ts
index 5a2b1c3..3d8f9e4 100644
--- a/src/stores/cart.ts
+++ b/src/stores/cart.ts
@@ -1,16 +1,28 @@
 import { defineStore } from "pinia";
+import { ref, computed } from "vue";
+import type { CartItem } from "@/types";

-export const useCartStore = defineStore("cart", {
-  state: () => ({ items: [] }),
-  getters: {
-    total: (state) => state.items.reduce((s, i) => s + i.price, 0),
-  },
-  actions: {
-    addItem(item) { this.items.push(item); },
-  },
+export const useCartStore = defineStore("cart", () => {
+  const items = ref<CartItem[]>([]);
+
+  const total = computed(() =>
+    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
+  );
+
+  function addItem(item: CartItem) {
+    const existing = items.value.find((i) => i.id === item.id);
+    if (existing) {
+      existing.quantity += item.quantity;
+    } else {
+      items.value.push(item);
+    }
+  }
+
+  return { items, total, addItem };
 });`,
    commitExample: `refactor(store): migrate cart store to Composition API setup syntax

- convert Options API store to setup() style for consistency with component code
- add quantity accumulation when adding a duplicate item instead of duplicating the entry
- strengthen types: CartItem[] for items, multiply price by quantity in total

The Options API style was the only remaining store not using setup syntax;
unifying the pattern improves readability and makes type inference work
without casting.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Vue project
git-agent init   # detects src/stores and src/views for scope suggestions`,
    features: [
      {
        en: "Understands Vue SFC structure (script, template, style blocks) in diffs",
        zh: "理解 diff 中的 Vue 单文件组件结构（script、template、style 块）",
      },
      {
        en: "Separates Pinia store changes from component changes",
        zh: "将 Pinia store 变更与组件变更分离提交",
      },
      {
        en: "Recognises Vue Router route definition changes for accurate scope naming",
        zh: "识别 Vue Router 路由定义变更以准确命名提交范围",
      },
      {
        en: "Works with Nuxt.js projects and their file-based routing conventions",
        zh: "支持 Nuxt.js 项目及其基于文件的路由约定",
      },
    ],
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
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent handle changes inside .vue files correctly?",
          zh: "git-agent 能正确处理 .vue 文件内的变更吗？",
        },
        answer: {
          en: "Yes. The LLM understands SFC file format and can correctly interpret diffs that span multiple blocks within a single .vue file.",
          zh: "可以。LLM 理解单文件组件格式，能正确解读跨越单个 .vue 文件中多个块的 diff。",
        },
      },
      {
        question: {
          en: "Can git-agent work with both Vue 2 and Vue 3 projects?",
          zh: "git-agent 能同时处理 Vue 2 和 Vue 3 项目吗？",
        },
        answer: {
          en: "Yes. git-agent operates on diffs without requiring a specific Vue version. Both Options API (Vue 2 style) and Composition API diffs are handled correctly.",
          zh: "可以。git-agent 处理 diff 时不依赖特定 Vue 版本，选项式 API（Vue 2 风格）和组合式 API 的 diff 均能正确处理。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Vuex vs Pinia store changes?",
          zh: "git-agent 如何区分 Vuex 和 Pinia store 变更？",
        },
        answer: {
          en: "Both Vuex and Pinia store files are grouped by store module. The LLM recognises the respective APIs and generates accurate descriptions regardless of which state management library you use.",
          zh: "Vuex 和 Pinia 的 store 文件都按 store 模块分组。LLM 能识别各自的 API，无论使用哪种状态管理库都能生成准确描述。",
        },
      },
    ],
  },
  {
    slug: "swift",
    language: { en: "Swift", zh: "Swift" },
    tagline: {
      en: "Conventional commits for Swift and SwiftUI projects",
      zh: "为 Swift 和 SwiftUI 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Swift Package Manager layouts, SwiftUI view hierarchies, and actor concurrency patterns, producing conventional commits that reflect iOS and macOS development conventions.",
      zh: "git-agent 理解 Swift Package Manager 结构、SwiftUI 视图层次和 actor 并发模式，生成反映 iOS 和 macOS 开发约定的约定式提交。",
    },
    diffExample: `diff --git a/Sources/App/Services/ImageLoader.swift b/Sources/App/Services/ImageLoader.swift
index 6c3d2a1..4f8e9b7 100644
--- a/Sources/App/Services/ImageLoader.swift
+++ b/Sources/App/Services/ImageLoader.swift
@@ -1,14 +1,26 @@
 import Foundation
+import OSLog

-class ImageLoader: ObservableObject {
-    @Published var image: UIImage?
+@MainActor
+final class ImageLoader: ObservableObject {
+    @Published var image: UIImage?
+    @Published var isLoading = false

-    func load(url: URL) {
-        URLSession.shared.dataTask(with: url) { data, _, _ in
-            if let data = data {
-                DispatchQueue.main.async {
-                    self.image = UIImage(data: data)
-                }
-            }
-        }.resume()
-    }
+    private let logger = Logger(subsystem: "com.example.app", category: "ImageLoader")
+
+    func load(url: URL) async {
+        isLoading = true
+        defer { isLoading = false }
+        do {
+            let (data, _) = try await URLSession.shared.data(from: url)
+            image = UIImage(data: data)
+        } catch {
+            logger.error("Failed to load image from \\(url): \\(error)")
+        }
+    }
 }`,
    commitExample: `refactor(services): migrate ImageLoader to async/await and MainActor isolation

- annotate with @MainActor to eliminate manual DispatchQueue.main.async dispatch
- convert load(url:) to async throws using URLSession's async data(from:) method
- add isLoading published property with defer-based cleanup
- replace print with OSLog Logger for structured logging

The DispatchQueue approach was not safe under strict concurrency checking;
@MainActor annotation satisfies the compiler and makes the isolation
intent explicit.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Swift project
git-agent init   # reads Package.swift targets to suggest scopes`,
    features: [
      {
        en: "Understands Swift Package Manager target structure for accurate scope detection",
        zh: "理解 Swift Package Manager 目标结构以准确检测提交范围",
      },
      {
        en: "Recognises SwiftUI View body changes versus ViewModel changes",
        zh: "区分 SwiftUI View 主体变更与 ViewModel 变更",
      },
      {
        en: "Handles actor, async/await, and structured concurrency diffs correctly",
        zh: "正确处理 actor、async/await 和结构化并发的 diff",
      },
      {
        en: "Groups Xcode project file (.xcodeproj) changes into chore commits",
        zh: "将 Xcode 项目文件（.xcodeproj）变更归入 chore 提交",
      },
    ],
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
        label: { en: "refactor commit template", zh: "refactor 提交模板" },
        href: "/templates/refactor",
      },
    ],
    faq: [
      {
        question: {
          en: "Does git-agent handle Xcode project file changes?",
          zh: "git-agent 能处理 Xcode 项目文件的变更吗？",
        },
        answer: {
          en: "Yes. .xcodeproj and .xcworkspace changes are detected and committed separately as chore commits to keep them out of feature history.",
          zh: "可以。.xcodeproj 和 .xcworkspace 的变更会被检测并单独作为 chore 提交，以保持功能历史的整洁。",
        },
      },
      {
        question: {
          en: "Can git-agent work with Swift on Linux?",
          zh: "git-agent 能在 Linux 上与 Swift 一起使用吗？",
        },
        answer: {
          en: "git-agent itself runs on macOS and Linux. For Swift on Linux (server-side Swift), it works identically as it reads diffs without needing the Swift toolchain installed.",
          zh: "git-agent 本身可在 macOS 和 Linux 上运行。对于 Linux 上的 Swift（服务端 Swift），它的工作方式完全相同，因为它读取 diff 不需要安装 Swift 工具链。",
        },
      },
      {
        question: {
          en: "How does git-agent handle SwiftUI previews?",
          zh: "git-agent 如何处理 SwiftUI 预览代码？",
        },
        answer: {
          en: "#Preview and PreviewProvider blocks are recognised as non-production code. Changes to preview code alone are grouped into a docs or test commit rather than a feat commit.",
          zh: "#Preview 和 PreviewProvider 块被识别为非生产代码。仅修改预览代码会被归入 docs 或 test 提交，而非 feat 提交。",
        },
      },
    ],
  },
  {
    slug: "kotlin",
    language: { en: "Kotlin", zh: "Kotlin" },
    tagline: {
      en: "Conventional commits for Kotlin Android and server-side projects",
      zh: "为 Kotlin Android 和服务端项目生成约定式提交",
    },
    description: {
      en: "git-agent handles Kotlin coroutine-based code, Android Jetpack patterns, and Ktor server changes, producing conventional commit messages that reflect modern Kotlin idioms.",
      zh: "git-agent 处理基于协程的 Kotlin 代码、Android Jetpack 模式和 Ktor 服务端变更，生成反映现代 Kotlin 惯用法的约定式提交信息。",
    },
    diffExample: `diff --git a/app/src/main/kotlin/com/example/data/UserRepository.kt b/app/src/main/kotlin/com/example/data/UserRepository.kt
index 3e1f8b2..7d4c9a5 100644
--- a/app/src/main/kotlin/com/example/data/UserRepository.kt
+++ b/app/src/main/kotlin/com/example/data/UserRepository.kt
@@ -5,12 +5,24 @@ import kotlinx.coroutines.flow.Flow
 import kotlinx.coroutines.flow.flow
+import kotlinx.coroutines.flow.catch
+import kotlinx.coroutines.flow.onStart

 class UserRepository(private val api: UserApi, private val dao: UserDao) {

-    fun getUser(id: String): Flow<User> = flow {
-        emit(api.getUser(id))
-    }
+    fun getUser(id: String): Flow<Result<User>> = flow {
+        emit(Result.success(api.getUser(id)))
+    }
+    .onStart { emit(Result.success(dao.getUser(id) ?: return@onStart)) }
+    .catch { emit(Result.failure(it)) }
 }`,
    commitExample: `feat(data): wrap UserRepository flow emissions in Result for error propagation

- change return type from Flow<User> to Flow<Result<User>> for explicit error handling
- emit cached db result via onStart before network fetch for instant UI update
- catch network errors and emit Result.failure instead of crashing the flow

Collectors previously had to handle uncaught exceptions at the catch
operator level; wrapping in Result moves error handling into the type
system and enables consistent loading/error/success UI states.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Kotlin project
git-agent init   # detects Gradle module structure and suggests scopes`,
    features: [
      {
        en: "Understands Kotlin coroutine and Flow patterns for accurate commit descriptions",
        zh: "理解 Kotlin 协程和 Flow 模式以生成准确的提交描述",
      },
      {
        en: "Recognises Android Jetpack components (ViewModel, Repository, Room) for scope naming",
        zh: "识别 Android Jetpack 组件（ViewModel、Repository、Room）以命名提交范围",
      },
      {
        en: "Handles Gradle Kotlin DSL (build.gradle.kts) dependency changes as chore commits",
        zh: "将 Gradle Kotlin DSL（build.gradle.kts）依赖变更处理为 chore 提交",
      },
      {
        en: "Works with Kotlin Multiplatform projects and platform-specific source sets",
        zh: "支持 Kotlin 多平台项目及平台特定的源码集",
      },
    ],
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
          en: "Does git-agent understand Kotlin data classes and sealed classes?",
          zh: "git-agent 理解 Kotlin 数据类和密封类吗？",
        },
        answer: {
          en: "Yes. The LLM understands Kotlin-specific constructs including data classes, sealed classes, and object declarations, and generates accurate descriptions for changes to them.",
          zh: "是的。LLM 理解 Kotlin 特有的构造，包括数据类、密封类和对象声明，并能为这些变更生成准确描述。",
        },
      },
      {
        question: {
          en: "Can git-agent handle Android resource file changes?",
          zh: "git-agent 能处理 Android 资源文件的变更吗？",
        },
        answer: {
          en: "Yes. XML layout files, string resources, and drawable changes are recognised as resource changes and committed separately from Kotlin code changes.",
          zh: "可以。XML 布局文件、字符串资源和 drawable 变更被识别为资源变更，会与 Kotlin 代码变更分开提交。",
        },
      },
      {
        question: {
          en: "Does git-agent work with Ktor server projects?",
          zh: "git-agent 能用于 Ktor 服务端项目吗？",
        },
        answer: {
          en: "Yes. Ktor route definitions, plugins, and application.conf changes are all handled correctly. The tool works with any Kotlin project regardless of the framework.",
          zh: "可以。Ktor 路由定义、插件和 application.conf 变更均能正确处理。该工具适用于任何 Kotlin 项目，与框架无关。",
        },
      },
    ],
  },
  {
    slug: "ruby",
    language: { en: "Ruby", zh: "Ruby" },
    tagline: {
      en: "Conventional commits for Ruby and Rails projects",
      zh: "为 Ruby 和 Rails 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Rails MVC conventions, Active Record migrations, and Gemfile dependency changes, splitting your staged work into clean atomic commits with conventional messages.",
      zh: "git-agent 理解 Rails MVC 约定、Active Record 迁移和 Gemfile 依赖变更，将暂存的工作拆分为干净的原子提交并附上约定式提交信息。",
    },
    diffExample: `diff --git a/app/services/invoice_generator.rb b/app/services/invoice_generator.rb
index 9a2c4f1..3b7d8e5 100644
--- a/app/services/invoice_generator.rb
+++ b/app/services/invoice_generator.rb
@@ -1,14 +1,26 @@
 class InvoiceGenerator
   def initialize(order)
     @order = order
   end

-  def call
-    Invoice.create!(
+  def call
+    raise ArgumentError, "order must be completed" unless @order.completed?
+
+    ActiveRecord::Base.transaction do
+      invoice = Invoice.create!(
         number: generate_number,
         order: @order,
-        total: @order.total
-    )
+        total: @order.total,
+        tax: calculate_tax(@order.total),
+        issued_at: Time.current
+      )
+      @order.update!(invoiced: true)
+      invoice
+    end
   end

+  private
+
+  def calculate_tax(amount)
+    (amount * TaxRate.current).round(2)
+  end
 end`,
    commitExample: `feat(invoice): wrap generation in transaction and add tax calculation

- guard against invoicing incomplete orders with ArgumentError
- wrap Invoice.create! and order status update in a transaction for atomicity
- extract calculate_tax private method using current TaxRate record
- add issued_at and tax fields to the created invoice

Previously a failed order status update would leave an invoice without
marking the order as invoiced; the transaction ensures both records are
consistent or neither is written.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Ruby project
git-agent init   # detects Rails app structure and suggests scopes`,
    features: [
      {
        en: "Recognises Rails MVC structure (models, controllers, views, services) for scope naming",
        zh: "识别 Rails MVC 结构（models、controllers、views、services）以命名提交范围",
      },
      {
        en: "Separates Active Record migration files into dedicated db commits",
        zh: "将 Active Record 迁移文件分离为专用的 db 类型提交",
      },
      {
        en: "Groups Gemfile and Gemfile.lock changes into chore(deps) commits",
        zh: "将 Gemfile 和 Gemfile.lock 变更归入 chore(deps) 提交",
      },
      {
        en: "Works with RSpec and Minitest test file conventions",
        zh: "支持 RSpec 和 Minitest 测试文件约定",
      },
    ],
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
          en: "Does git-agent handle Rails migration files separately from model changes?",
          zh: "git-agent 会将 Rails 迁移文件与模型变更分开处理吗？",
        },
        answer: {
          en: "Yes. Files in db/migrate/ are always treated as a separate commit with a db or chore scope, keeping migration history distinct from application logic.",
          zh: "会的。db/migrate/ 中的文件始终作为独立提交处理，使用 db 或 chore 范围，保持迁移历史与应用逻辑的分离。",
        },
      },
      {
        question: {
          en: "Can git-agent work with non-Rails Ruby projects?",
          zh: "git-agent 能用于非 Rails 的 Ruby 项目吗？",
        },
        answer: {
          en: "Yes. Sinatra, Hanami, pure Ruby gems, and scripts are all handled correctly. git-agent does not require Rails to be present.",
          zh: "可以。Sinatra、Hanami、纯 Ruby gem 和脚本均能正确处理。git-agent 不要求 Rails 存在。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Ruby metaprogramming patterns?",
          zh: "git-agent 如何处理 Ruby 元编程模式？",
        },
        answer: {
          en: "The LLM understands Ruby's define_method, method_missing, and module inclusion patterns. Metaprogramming changes are described at the intent level rather than the implementation level.",
          zh: "LLM 理解 Ruby 的 define_method、method_missing 和模块包含模式。元编程变更会以意图层面而非实现层面进行描述。",
        },
      },
    ],
  },
];

export function findPersona(slug: string): PersonaEntry | undefined {
  return personaEntries.find((e) => e.slug === slug);
}
