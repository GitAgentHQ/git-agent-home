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
          en: "Running `git-agent init` scans your git history to infer scopes from your directory structure, then writes them to `.git-agent/config.yml` for consistent scope suggestions.",
          zh: "运行 `git-agent init` 会扫描 git 历史记录，从目录结构推断范围，并写入 `.git-agent/config.yml` 以便后续使用一致的范围建议。",
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
          en: "Yes. Run `git-agent init` and it will read your tsconfig paths to suggest scopes. You can then edit `.git-agent/config.yml` to fine-tune them.",
          zh: "可以。运行 `git-agent init` 会读取 tsconfig 路径并建议范围，之后可编辑 `.git-agent/config.yml` 进行微调。",
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
  {
    slug: "angular",
    language: { en: "Angular", zh: "Angular" },
    tagline: {
      en: "Conventional commits for Angular components, services, and NgRx stores",
      zh: "为 Angular 组件、服务和 NgRx 状态管理生成约定式提交",
    },
    description: {
      en: "git-agent understands Angular module structure, standalone component patterns, and NgRx effects, producing atomic conventional commits that reflect Angular's opinionated architecture.",
      zh: "git-agent 理解 Angular 模块结构、独立组件模式和 NgRx 副作用，生成反映 Angular 架构约定的原子约定式提交。",
    },
    diffExample: `diff --git a/src/app/users/user-list.component.ts b/src/app/users/user-list.component.ts
index 3a1b2c4..8d9e7f5 100644
--- a/src/app/users/user-list.component.ts
+++ b/src/app/users/user-list.component.ts
@@ -1,20 +1,22 @@
-import { Component, OnInit } from "@angular/core";
+import { Component, signal, computed, inject } from "@angular/core";
 import { UserService } from "./user.service";
-import { Observable } from "rxjs";
+import { toSignal } from "@angular/core/rxjs-interop";

 @Component({
   selector: "app-user-list",
   templateUrl: "./user-list.component.html",
-  changeDetection: ChangeDetectionStrategy.Default,
+  changeDetection: ChangeDetectionStrategy.OnPush,
+  standalone: true,
+  imports: [CommonModule, RouterLink],
 })
 export class UserListComponent implements OnInit {
-  users$: Observable<User[]> = this.userService.getUsers();
-  filteredUsers$: Observable<User[]> = this.users$;
+  private userService = inject(UserService);
+  readonly users = toSignal(this.userService.getUsers(), { initialValue: [] });
+  readonly searchTerm = signal("");
+  readonly filteredUsers = computed(() =>
+    this.users().filter((u) =>
+      u.name.toLowerCase().includes(this.searchTerm().toLowerCase())
+    )
+  );
 }`,
    commitExample: `refactor(users): migrate UserListComponent to OnPush and signals

- switch to OnPush change detection for better performance on large lists
- replace async pipe and Observable with signal/toSignal pattern
- add searchTerm signal and filteredUsers computed for reactive filtering
- migrate to standalone component with inject() instead of constructor DI

The async pipe with Observable streams was causing unnecessary change
detection cycles; the signal-based approach provides granular reactivity
with zero overhead when the list is not actively changing.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Angular project
git-agent init   # detects angular.json project structure and suggests scopes`,
    features: [
      {
        en: "Understands NgRx store, effect, and reducer changes for accurate commit scoping",
        zh: "理解 NgRx store、effect 和 reducer 变更以准确划分提交范围",
      },
      {
        en: "Recognises standalone vs NgModule architecture differences",
        zh: "识别独立组件与 NgModule 架构的区别",
      },
      {
        en: "Separates Angular Material and component library upgrades into chore commits",
        zh: "将 Angular Material 和组件库的升级归入 chore 提交",
      },
      {
        en: "Handles Angular CLI workspace configuration (angular.json) changes distinctly",
        zh: "单独处理 Angular CLI 工作区配置（angular.json）的变更",
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
          en: "Does git-agent handle Angular CLI generated files?",
          zh: "git-agent 能处理 Angular CLI 生成的文件吗？",
        },
        answer: {
          en: "Yes. Generated files from ng generate are recognised as scaffolded code. git-agent commits them together with related changes rather than creating noise commits for each generated file.",
          zh: "可以。ng generate 生成的文件被识别为脚手架代码。git-agent 会将它们与相关变更一起提交，而不是为每个生成的文件创建无意义的提交。",
        },
      },
      {
        question: {
          en: "How does git-agent handle NgRx boilerplate files?",
          zh: "git-agent 如何处理 NgRx 样板文件？",
        },
        answer: {
          en: "Actions, reducers, effects, and selectors for the same feature slice are grouped together into a single commit. The LLM understands the NgRx architecture and describes changes at the feature level.",
          zh: "同一功能模块的 actions、reducers、effects 和 selectors 会被归入同一提交。LLM 理解 NgRx 架构，在功能层面描述变更。",
        },
      },
      {
        question: {
          en: "Can git-agent work with Angular Universal and SSR projects?",
          zh: "git-agent 能用于 Angular Universal 和 SSR 项目吗？",
        },
        answer: {
          en: "Yes. Server-side transfer state, platform-server module changes, and Angular Universal config are all handled correctly alongside the standard Angular diffs.",
          zh: "可以。服务端传输状态、platform-server 模块变更和 Angular Universal 配置都能与标准 Angular diff 一起正确处理。",
        },
      },
    ],
  },
  {
    slug: "svelte",
    language: { en: "Svelte", zh: "Svelte" },
    tagline: {
      en: "Conventional commits for Svelte 5 runes and SvelteKit projects",
      zh: "为 Svelte 5 runes 和 SvelteKit 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Svelte 5 runes syntax, SvelteKit route conventions, and store patterns, producing atomic conventional commits that match Svelte's reactive paradigm.",
      zh: "git-agent 理解 Svelte 5 runes 语法、SvelteKit 路由约定和 store 模式，生成匹配 Svelte 响应式范式的原子约定式提交。",
    },
    diffExample: `diff --git a/src/lib/stores/counter.svelte.ts b/src/lib/stores/counter.svelte.ts
index 2c4f1a3..7b8e9d2 100644
--- a/src/lib/stores/counter.svelte.ts
+++ b/src/lib/stores/counter.svelte.ts
@@ -1,16 +1,22 @@
-import { writable, derived } from "svelte/store";
+import { writable, derived } from "svelte/store";

-export const count = writable(0);
-export const double = derived(count, ($c) => $c * 2);
+export class Counter {
+  count = $state(0);
+  max = $state(100);
+  double = $derived(this.count * 2);
+  isAtLimit = $derived(this.count >= this.max);

-export function increment() {
-  count.update((n) => n + 1);
-}
+  increment() {
+    if (this.count < this.max) {
+      this.count++;
+    }
+  }

-export function reset() {
-  count.set(0);
-}
+  reset() {
+    this.count = 0;
+  }
+}`,
    commitExample: `refactor(store): migrate counter store to Svelte 5 runes class syntax

- replace writable/derived store with $state/$derived class-based runes
- add max and isAtLimit reactive state for boundary-aware counting
- guard increment against exceeding max limit

The legacy store API introduced indirection through update/set calls;
the runes class syntax provides direct mutable state with compiler-managed
reactivity, reducing boilerplate and improving type inference.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Svelte project
git-agent init   # detects SvelteKit src/routes structure and suggests scopes`,
    features: [
      {
        en: "Understands Svelte 5 runes ($state, $derived, $effect) in .svelte.ts files",
        zh: "理解 Svelte 5 runes（$state、$derived、$effect）在 .svelte.ts 文件中的用法",
      },
      {
        en: "Recognises SvelteKit route groups, layouts, and server load functions",
        zh: "识别 SvelteKit 路由组、布局和服务端加载函数",
      },
      {
        en: "Separates Svelte component template changes from script logic changes",
        zh: "将 Svelte 组件模板变更与脚本逻辑变更分离提交",
      },
      {
        en: "Handles legacy Svelte store and new runes syntax side by side",
        zh: "同时处理旧版 Svelte store 和新版 runes 语法",
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
          en: "Does git-agent understand Svelte 5 runes syntax?",
          zh: "git-agent 理解 Svelte 5 runes 语法吗？",
        },
        answer: {
          en: "Yes. The LLM understands $state, $derived, $effect, and $props runes, and can accurately describe migrations from the legacy store API to the runes-based approach.",
          zh: "是的。LLM 理解 $state、$derived、$effect 和 $props 等 runes，能准确描述从旧版 store API 到 runes 的迁移。",
        },
      },
      {
        question: {
          en: "Can git-agent handle SvelteKit form actions and API routes?",
          zh: "git-agent 能处理 SvelteKit 表单操作和 API 路由吗？",
        },
        answer: {
          en: "Yes. SvelteKit +server.ts files and form actions are recognised as server-side logic and committed separately from client-side component changes when they are independent.",
          zh: "可以。SvelteKit 的 +server.ts 文件和表单操作被识别为服务端逻辑，在独立时会与客户端组件变更分开提交。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Svelte component CSS scoping?",
          zh: "git-agent 如何处理 Svelte 组件 CSS 作用域？",
        },
        answer: {
          en: "CSS changes inside a .svelte file's style block are grouped with the component's template and script changes, since they are part of the same component definition.",
          zh: ".svelte 文件中 style 块内的 CSS 变更会与组件模板和脚本变更归入同一提交，因为它们属于同一个组件定义。",
        },
      },
    ],
  },
  {
    slug: "csharp",
    language: { en: "C#", zh: "C#" },
    tagline: {
      en: "Conventional commits for .NET and C# projects",
      zh: "为 .NET 和 C# 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands .NET solution structure, ASP.NET Core middleware patterns, Entity Framework migrations, and C# language features, producing accurate conventional commits for enterprise .NET codebases.",
      zh: "git-agent 理解 .NET 解决方案结构、ASP.NET Core 中间件模式、Entity Framework 迁移和 C# 语言特性，为企业级 .NET 代码库生成准确的约定式提交。",
    },
    diffExample: `diff --git a/src/Services/OrderService.cs b/src/Services/OrderService.cs
index 4d1e2f3..9a8b7c6 100644
--- a/src/Services/OrderService.cs
+++ b/src/Services/OrderService.cs
@@ -5,15 +5,24 @@
 using Microsoft.EntityFrameworkCore;
+using Microsoft.Extensions.Logging;

-public class OrderService
+public class OrderService(ILogger<OrderService> logger, AppDbContext db)
 {
-    private readonly AppDbContext _db;
-    public OrderService(AppDbContext db) { _db = db; }
-
-    public async Task<Order> CreateOrder(CreateOrderRequest request)
+    public async Task<Order> CreateOrder(CreateOrderRequest request)
     {
+        ArgumentNullException.ThrowIfNull(request);
+        using var transaction = await db.Database.BeginTransactionAsync();
         try
         {
-            var order = new Order(request);
-            _db.Orders.Add(order);
-            await db.SaveChangesAsync();
+            var order = new Order(request);
+            db.Orders.Add(order);
+            await db.SaveChangesAsync();
+            await transaction.CommitAsync();
+            logger.LogInformation("Created order {OrderId}", order.Id);
             return order;
         }
-        catch (DbUpdateException ex)
+        catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("IX_Orders_Number") == true)
         {
+            await transaction.RollbackAsync();
             throw new OrderConflictException(request.Number, ex);
         }
     }
 }`,
    commitExample: `refactor(orders): migrate to primary constructors and add transactional safety

- convert OrderService to use C# 12 primary constructor syntax
- add ArgumentNullException guard for request parameter
- wrap persist in explicit transaction with rollback on conflict
- catch filtered DbUpdateException for duplicate order number specifically
- add structured logging for order creation events

The traditional constructor pattern added unnecessary boilerplate; primary
constructors make the dependency contract explicit at the class declaration
site. The transaction ensures partial writes are rolled back if either
SaveChanges or logging fails.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your .NET project
git-agent init   # detects .sln / .csproj structure and suggests scopes`,
    features: [
      {
        en: "Understands .NET solution and project reference structure for scope detection",
        zh: "理解 .NET 解决方案和项目引用结构以检测提交范围",
      },
      {
        en: "Recognises Entity Framework migration files and separates them into db commits",
        zh: "识别 Entity Framework 迁移文件并将其分离为 db 类型提交",
      },
      {
        en: "Handles ASP.NET Core middleware pipeline and endpoint configuration changes",
        zh: "处理 ASP.NET Core 中间件管道和端点配置的变更",
      },
      {
        en: "Works with both .csproj and modern SDK-style project files",
        zh: "支持传统 .csproj 和现代 SDK 风格的项目文件",
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
          en: "Does git-agent handle .NET SDK and runtime version changes?",
          zh: "git-agent 能处理 .NET SDK 和运行时版本变更吗？",
        },
        answer: {
          en: "Yes. global.json and TargetFramework changes in .csproj files are detected as build configuration changes and committed separately as chore commits.",
          zh: "可以。global.json 和 .csproj 文件中的 TargetFramework 变更被识别为构建配置变更，会单独作为 chore 提交。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Entity Framework migrations?",
          zh: "git-agent 如何处理 Entity Framework 迁移？",
        },
        answer: {
          en: "Migration files in Migrations/ directories are grouped into a separate db commit. The Snapshot and Designer files that accompany a migration stay with the migration file.",
          zh: "Migrations/ 目录中的迁移文件会被归入独立的 db 提交。伴随迁移的 Snapshot 和 Designer 文件会与迁移文件一起提交。",
        },
      },
      {
        question: {
          en: "Can git-agent work with Blazor projects?",
          zh: "git-agent 能用于 Blazor 项目吗？",
        },
        answer: {
          en: "Yes. Blazor component files (.razor), code-behind files, and Razor class library changes are all handled. The LLM understands the Blazor component lifecycle and rendering model.",
          zh: "可以。Blazor 组件文件（.razor）、code-behind 文件和 Razor 类库的变更均能处理。LLM 理解 Blazor 组件生命周期和渲染模型。",
        },
      },
    ],
  },
  {
    slug: "php-laravel",
    language: { en: "PHP (Laravel)", zh: "PHP (Laravel)" },
    tagline: {
      en: "Conventional commits for Laravel and PHP projects",
      zh: "为 Laravel 和 PHP 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Laravel's MVC architecture, Eloquent ORM patterns, Artisan commands, and PHP namespace conventions, producing atomic conventional commits that align with Laravel best practices.",
      zh: "git-agent 理解 Laravel 的 MVC 架构、Eloquent ORM 模式、Artisan 命令和 PHP 命名空间约定，生成符合 Laravel 最佳实践的原子约定式提交。",
    },
    diffExample: `diff --git a/app/Http/Controllers/OrderController.php b/app/Http/Controllers/OrderController.php
index 5c2a1b4..3d8f7e9 100644
--- a/app/Http/Controllers/OrderController.php
+++ b/app/Http/Controllers/OrderController.php
@@ -1,14 +1,24 @@
 <?php

 namespace App\Http\Controllers;

+use App\Actions\CreateOrderAction;
+use App\DataTransferObjects\OrderData;
+use App\Exceptions\InsufficientStockException;
 use App\Models\Order;
-use Illuminate\Http\Request;
+use App\Http\Requests\StoreOrderRequest;

 class OrderController extends Controller
 {
-    public function store(Request $request)
+    public function __construct(
+        private readonly CreateOrderAction $createOrder,
+    ) {}
+
+    public function store(StoreOrderRequest $request)
     {
-        $order = Order::create($request->all());
-        return response()->json($order, 201);
+        $order = $this->createOrder->execute(
+            OrderData::fromRequest($request->validated())
+        );
+        return OrderResource::make($order)->response()->setStatusCode(201);
     }
 }`,
    commitExample: `feat(orders): move order creation to dedicated action class with form request

- extract order creation logic from controller into CreateOrderAction class
- replace loose Request::all() with typed StoreOrderRequest and validation rules
- introduce OrderData DTO for type-safe data transfer through the action
- return OrderResource instead of raw JSON for consistent API responses

The controller was handling both HTTP concerns and business logic; the
action class encapsulates the creation workflow, making it testable
independently of the HTTP layer and reusable across controllers and
queue jobs.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Laravel project
git-agent init   # detects app/ directory structure and suggests scopes`,
    features: [
      {
        en: "Understands Laravel directory conventions (app/Models, app/Http/Controllers, app/Actions) for scope naming",
        zh: "理解 Laravel 目录约定（app/Models、app/Http/Controllers、app/Actions）以命名提交范围",
      },
      {
        en: "Separates Eloquent model changes from migration and seeder changes",
        zh: "将 Eloquent 模型变更与迁移文件和种子文件变更分离",
      },
      {
        en: "Recognises Artisan command and scheduled task definitions for accurate commit types",
        zh: "识别 Artisan 命令和计划任务定义以生成准确的提交类型",
      },
      {
        en: "Handles Composer dependency updates (composer.json/composer.lock) as chore commits",
        zh: "将 Composer 依赖更新（composer.json/composer.lock）处理为 chore 提交",
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
          en: "Does git-agent handle Laravel Sail and Docker development setups?",
          zh: "git-agent 能处理 Laravel Sail 和 Docker 开发环境吗？",
        },
        answer: {
          en: "Yes. git-agent runs outside of Docker. It reads the staged git diff directly, so it works with any development environment including Laravel Sail, Valet, and Herd without additional configuration.",
          zh: "可以。git-agent 在 Docker 外部运行，直接读取 git 暂存的 diff，因此无需额外配置即可与 Laravel Sail、Valet 和 Herd 等开发环境兼容。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Laravel Nova and Filament admin panel changes?",
          zh: "git-agent 如何处理 Laravel Nova 和 Filament 管理后台的变更？",
        },
        answer: {
          en: "Admin panel resource files and configuration are recognised as distinct concerns. They are committed separately from core application logic when the changes are independent.",
          zh: "管理后台的资源文件和配置被识别为独立的关注点，在变更独立时会与核心应用逻辑分开提交。",
        },
      },
      {
        question: {
          en: "Can git-agent work with PHP package libraries and non-Laravel frameworks?",
          zh: "git-agent 能用于 PHP 包库和非 Laravel 框架吗？",
        },
        answer: {
          en: "Yes. Symfony, Slim, WordPress plugin development, and standalone PHP packages are all supported. git-agent focuses on the diff content rather than the framework.",
          zh: "可以。Symfony、Slim、WordPress 插件开发和独立的 PHP 包均受支持。git-agent 关注的是 diff 内容而非具体框架。",
        },
      },
    ],
  },
  {
    slug: "dart-flutter",
    language: { en: "Dart (Flutter)", zh: "Dart (Flutter)" },
    tagline: {
      en: "Conventional commits for Flutter widgets and Dart packages",
      zh: "为 Flutter 组件和 Dart 包生成约定式提交",
    },
    description: {
      en: "git-agent understands Flutter widget trees, state management patterns (Riverpod, BLoC, Provider), and Dart package conventions, producing atomic conventional commits for mobile and cross-platform codebases.",
      zh: "git-agent 理解 Flutter 组件树、状态管理模式（Riverpod、BLoC、Provider）和 Dart 包约定，为移动端和跨平台代码库生成原子约定式提交。",
    },
    diffExample: `diff --git a/lib/features/auth/providers/auth_provider.dart b/lib/features/auth/providers/auth_provider.dart
index 1f4a2c3..8e7b9d5 100644
--- a/lib/features/auth/providers/auth_provider.dart
+++ b/lib/features/auth/providers/auth_provider.dart
@@ -1,18 +1,24 @@
 import 'package:flutter_riverpod/flutter_riverpod.dart';
+import 'package:riverpod_annotation/riverpod_annotation.dart';
+import 'package:freezed_annotation/freezed_annotation.dart';

-class AuthNotifier extends StateNotifier<AsyncValue<User?>> {
-  AuthNotifier(this._authService) : super(const AsyncValue.data(null));
+part 'auth_provider.freezed.dart';
+part 'auth_provider.g.dart';

-  final AuthService _authService;
+@freezed
+sealed class AuthState with _$AuthState {
+  const factory AuthState.initial() = _Initial;
+  const factory AuthState.authenticated(User user) = _Authenticated;
+  const factory AuthState.unauthenticated() = _Unauthenticated;
+}

-  Future<void> login(String email, String password) async {
-    state = const AsyncValue.loading();
-    state = await AsyncValue.guard(() => _authService.login(email, password));
-  }
+@riverpod
+class Auth extends _$Auth {
+  @override
+  AuthState build() => const AuthState.initial();

-  Future<void> logout() async {
-    await _authService.logout();
-    state = const AsyncValue.data(null);
+  Future<void> login(String email, String password) async {
+    state = await AsyncValue.guard(() => userService.login(email, password));
+    state = AuthState.authenticated(user);
   }
 }`,
    commitExample: `refactor(auth): migrate to Riverpod code generation and freezed union state

- replace StateNotifier with Riverpod code-gen @riverpod annotation
- model auth state as sealed union (initial/authenticated/unauthenticated) via freezed
- generate part files for type-safe state handling
- simplify login method by removing manual loading state management

The raw StateNotifier required manual AsyncValue management and allowed
invalid state combinations; the sealed union makes impossible states
unrepresentable while the code-gen eliminates boilerplate.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Flutter project
git-agent init   # reads pubspec.yaml and lib/ structure for scope suggestions`,
    features: [
      {
        en: "Understands Flutter widget tree rebuild patterns and state management architecture",
        zh: "理解 Flutter 组件树重建模式和状态管理架构",
      },
      {
        en: "Recognises Riverpod, BLoC, and Provider patterns for accurate commit descriptions",
        zh: "识别 Riverpod、BLoC 和 Provider 模式以生成准确的提交描述",
      },
      {
        en: "Separates Flutter asset and pubspec.yaml changes into dedicated commits",
        zh: "将 Flutter 资源和 pubspec.yaml 变更分离为独立的提交",
      },
      {
        en: "Works with Flutter platform-specific code (android/, ios/) without mixing concerns",
        zh: "处理 Flutter 平台特定代码（android/、ios/）时不混淆关注点",
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
          en: "Does git-agent handle Flutter's generated code (freezed, json_serializable)?",
          zh: "git-agent 能处理 Flutter 的生成代码（freezed、json_serializable）吗？",
        },
        answer: {
          en: "Yes. Generated .freezed.dart and .g.dart files are recognised as build artefacts. git-agent commits them alongside their source definition rather than treating them as separate unrelated changes.",
          zh: "可以。生成的 .freezed.dart 和 .g.dart 文件被识别为构建产物。git-agent 会将它们与源定义一起提交，而非作为独立的无关变更处理。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Flutter platform channel changes?",
          zh: "git-agent 如何处理 Flutter 平台通道的变更？",
        },
        answer: {
          en: "Dart-side MethodChannel definitions and the native counterpart (Swift/Kotlin) are kept in separate commits, as they belong to the Flutter module and the platform-specific module respectively.",
          zh: "Dart 端的 MethodChannel 定义和原生实现（Swift/Kotlin）会分别提交，因为它们分别属于 Flutter 模块和平台特定模块。",
        },
      },
      {
        question: {
          en: "Can git-agent work with Flutter monorepos (melos, pub workspaces)?",
          zh: "git-agent 能用于 Flutter monorepo（melos、pub workspaces）吗？",
        },
        answer: {
          en: "Yes. git-agent detects melos and pub workspace configurations and suggests scopes per package. Changes to different packages within the same commit are split into separate commits.",
          zh: "可以。git-agent 检测 melos 和 pub workspace 配置，并按包建议提交范围。同一提交中不同包的变更会被拆分为独立的提交。",
        },
      },
    ],
  },
  {
    slug: "c-cpp",
    language: { en: "C/C++", zh: "C/C++" },
    tagline: {
      en: "Conventional commits for C and C++ projects",
      zh: "为 C 和 C++ 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands C/C++ header and implementation separation, CMake project structure, and modern C++ patterns, producing atomic conventional commits for systems and embedded codebases.",
      zh: "git-agent 理解 C/C++ 头文件和实现文件的分离、CMake 项目结构以及现代 C++ 模式，为系统和嵌入式代码库生成原子约定式提交。",
    },
    diffExample: `diff --git a/src/io/file_reader.cpp b/src/io/file_reader.cpp
index 3d1b8c2..7a9e4f6 100644
--- a/src/io/file_reader.cpp
+++ b/src/io/file_reader.cpp
@@ -1,14 +1,22 @@
 #include "file_reader.h"
+#include <memory>
+#include <system_error>

-FileReader::FileReader(const char* path) : file_(fopen(path, "r")) {
-    if (!file_) throw std::runtime_error("failed to open file");
+FileReader::FileReader(const std::filesystem::path& path)
+    : file_(std::fopen(path.c_str(), "r")) {
+    if (!file_) {
+        throw std::system_error(errno, std::generic_category(),
+                                path.string());
+    }
 }

-FileReader::~FileReader() { if (file_) fclose(file_); }
+FileReader::~FileReader() = default;

-FileReader::FileReader(FileReader&& other) noexcept
-    : file_(std::exchange(other.file_, nullptr)) {}
+FileReader::FileReader(FileReader&&) noexcept = default;

-std::string FileReader::ReadLine() {
+std::expected<std::string, FileReader::Error> FileReader::ReadLine() {
+    if (!file_) return std::unexpected(Error::NotOpen);
     std::array<char, 256> buf;
     if (auto* p = std::fgets(buf.data(), buf.size(), file_)) {
         return std::string(p);
diff --git a/src/io/file_reader.h b/src/io/file_reader.h
index 5c2a1b4..8d3f7e9 100644
--- a/src/io/file_reader.h
+++ b/src/io/file_reader.h
@@ -1,8 +1,14 @@
 #pragma once
+#include <expected>
+#include <filesystem>
 #include <string>
+#include <memory>

 class FileReader {
 public:
+    enum class Error { NotOpen, ReadError, Eof };
+
     explicit FileReader(const std::filesystem::path& path);
     ~FileReader();
     FileReader(FileReader&&) noexcept;`,
    commitExample: `refactor(io): modernise FileReader with RAII, std::expected, and filesystem path

- replace raw fopen/fclose with RAII via unique_ptr custom deleter (defaulted destructor)
- migrate from const char* to std::filesystem::path for Unicode path support
- switch return type from string to std::expected<string, Error> for explicit error handling
- replace std::runtime_error with std::system_error preserving errno context
- default move constructor/assignment instead of manual exchange

The old API leaked file descriptor ownership semantics into callers and
threw exceptions on I/O errors; std::expected makes failures part of the
return type, and the modernised path handling supports Unicode filenames
on all platforms.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your C/C++ project
git-agent init   # detects CMakeLists.txt / Makefile structure for scopes`,
    features: [
      {
        en: "Understands header (.h/.hpp) and implementation file pairs for atomic grouping",
        zh: "理解头文件（.h/.hpp）与实现文件的配对关系以进行原子分组",
      },
      {
        en: "Recognises CMakeLists.txt and Makefile build configuration changes as chore commits",
        zh: "将 CMakeLists.txt 和 Makefile 构建配置变更识别为 chore 提交",
      },
      {
        en: "Separates C++ template metaprogramming changes from runtime code changes",
        zh: "将 C++ 模板元编程变更与运行时代码变更分离",
      },
      {
        en: "Handles embedded C projects with platform-specific #ifdef blocks correctly",
        zh: "正确处理包含平台特定 #ifdef 块的嵌入式 C 项目",
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
          en: "Does git-agent handle C++ template metaprogramming diffs?",
          zh: "git-agent 能处理 C++ 模板元编程的 diff 吗？",
        },
        answer: {
          en: "Yes. The LLM understands template specialisation, SFINAE, constexpr, and concepts. Template-related changes are grouped together and described in terms of their effect on the type system.",
          zh: "可以。LLM 理解模板特化、SFINAE、constexpr 和 concepts。模板相关的变更会被归为一组，并从其对类型系统的影响角度进行描述。",
        },
      },
      {
        question: {
          en: "How does git-agent handle C++ preprocessor directives and conditional compilation?",
          zh: "git-agent 如何处理 C++ 预处理器指令和条件编译？",
        },
        answer: {
          en: "Preprocessor changes are kept with the code they guard. The LLM understands #ifdef / #endif blocks and will note platform-specific additions in the commit message.",
          zh: "预处理器变更会与它们所保护的代码一起提交。LLM 理解 #ifdef / #endif 块，并会在提交信息中注明平台特定的新增内容。",
        },
      },
      {
        question: {
          en: "Can git-agent work with CMake presets and vcpkg/conan dependency management?",
          zh: "git-agent 能用于 CMake presets 和 vcpkg/conan 依赖管理吗？",
        },
        answer: {
          en: "Yes. CMakePresets.json, vcpkg.json, and conanfile.txt changes are detected as build configuration changes and committed separately from source code changes.",
          zh: "可以。CMakePresets.json、vcpkg.json 和 conanfile.txt 的变更被识别为构建配置变更，会与源代码变更分开提交。",
        },
      },
    ],
  },
  {
    slug: "scala",
    language: { en: "Scala", zh: "Scala" },
    tagline: {
      en: "Conventional commits for Scala and functional programming projects",
      zh: "为 Scala 和函数式编程项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Scala's type-level programming, ZIO and Cats Effect patterns, and sbt build definitions, producing atomic conventional commits for Scala codebases of any size.",
      zh: "git-agent 理解 Scala 的类型级编程、ZIO 和 Cats Effect 模式以及 sbt 构建定义，为任意规模的 Scala 代码库生成原子约定式提交。",
    },
    diffExample: `diff --git a/src/main/scala/com/example/user/UserService.scala b/src/main/scala/com/example/user/UserService.scala
index 7f2c3a1..4b9d8e6 100644
--- a/src/main/scala/com/example/user/UserService.scala
+++ b/src/main/scala/com/example/user/UserService.scala
@@ -1,20 +1,26 @@
 package com.example.user

-import scala.concurrent.{ExecutionContext, Future}
-import com.example.db.Database
+import zio.*

-class UserService(db: Database)(implicit ec: ExecutionContext) {
-  def getUser(id: String): Future[Option[User]] = {
-    db.query[User]("SELECT * FROM users WHERE id = ?", id)
-  }
+class UserService(db: Database) {
+  def getUser(id: String): ZIO[Any, AppError, User] = {
+    for
+      row <- db.query[User]("SELECT * FROM users WHERE id = ?", id)
+      user <- ZIO.fromOption(row).orElseFail(AppError.NotFound(id))
+    yield user
+  }

-  def createUser(data: CreateUser): Future[User] = {
-    db.execute("INSERT INTO users ...", data).map { _ =>
-      User(id = UUID.randomUUID(), name = data.name)
-    }
+  def createUser(data: CreateUser): ZIO[Any, AppError, User] = {
+    for
+      id <- Random.nextUUID
+      _ <- db.execute("INSERT INTO users ...", data)
+    yield User(id = id, name = data.name)
+  }
+
+  def deleteUser(id: String): ZIO[Any, AppError, Unit] = {
+    db.execute("DELETE FROM users WHERE id = ?", id).unit
   }
 }`,
    commitExample: `refactor(users): migrate UserService from Future to ZIO effect system

- replace implicit ExecutionContext with ZIO's built-in fiber-based concurrency
- make getUser return ZIO[Any, AppError, User] with explicit NotFound error
- replace UUID.randomUUID() with ZIO Random service for testability
- add deleteUser method with proper error channel typing
- remove implicit parameter list in favour of ZIO environment

The Future-based API hid errors in failed futures and required global
ExecutionContext threading; the ZIO migration makes the error channel
explicit, eliminates implicit dependencies, and enables structured
concurrency with interruption support.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Scala project
git-agent init   # reads build.sbt subproject definitions for scope suggestions`,
    features: [
      {
        en: "Understands sbt multi-project builds and provides per-module scope suggestions",
        zh: "理解 sbt 多项目构建，提供按模块的提交范围建议",
      },
      {
        en: "Recognises ZIO and Cats Effect type signatures for accurate commit descriptions",
        zh: "识别 ZIO 和 Cats Effect 类型签名以生成准确的提交描述",
      },
      {
        en: "Separates Scala 2 and Scala 3 source compatibility changes into distinct commits",
        zh: "将 Scala 2 和 Scala 3 的源代码兼容性变更分离为不同的提交",
      },
      {
        en: "Handles Scala macro and compile-time reflection changes correctly",
        zh: "正确处理 Scala 宏和编译时反射的变更",
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
          en: "Does git-agent handle Scala 3 syntax alongside Scala 2?",
          zh: "git-agent 能同时处理 Scala 3 和 Scala 2 的语法吗？",
        },
        answer: {
          en: "Yes. The LLM understands both Scala 2 and Scala 3 syntax including indentation-based syntax, enums, given/using, and extension methods. Migration diffs between the two versions are described accurately.",
          zh: "可以。LLM 理解 Scala 2 和 Scala 3 的语法，包括缩进语法、enum、given/using 和扩展方法。两个版本之间的迁移 diff 会被准确描述。",
        },
      },
      {
        question: {
          en: "How does git-agent handle ZIO effectful code with for-comprehensions?",
          zh: "git-agent 如何处理包含 for-comprehension 的 ZIO 效果代码？",
        },
        answer: {
          en: "ZIO for-comprehension changes are recognised as sequential effect composition. The LLM understands the ZIO type parameters (R, E, A) and accurately describes the error channel and dependency changes.",
          zh: "ZIO for-comprehension 的变更被识别为顺序效果组合。LLM 理解 ZIO 类型参数（R, E, A），能准确描述错误通道和依赖的变更。",
        },
      },
      {
        question: {
          en: "Can git-agent work with Scala.js and Scala Native projects?",
          zh: "git-agent 能用于 Scala.js 和 Scala Native 项目吗？",
        },
        answer: {
          en: "Yes. Cross-platform projects with sbt-crossproject are handled correctly. Platform-specific source directories are recognised, and changes to shared vs platform-specific code are committed appropriately.",
          zh: "可以。使用 sbt-crossproject 的跨平台项目能正确处理。平台特定的源目录会被识别，共享代码与平台特定代码的变更会分别提交。",
        },
      },
    ],
  },
  {
    slug: "elixir",
    language: { en: "Elixir", zh: "Elixir" },
    tagline: {
      en: "Conventional commits for Elixir and Phoenix projects",
      zh: "为 Elixir 和 Phoenix 项目生成约定式提交",
    },
    description: {
      en: "git-agent understands Phoenix context boundaries, Ecto query and schema changes, and OTP GenServer patterns, producing atomic conventional commits for Elixir's functional, actor-based architecture.",
      zh: "git-agent 理解 Phoenix Context 边界、Ecto 查询和模式变更以及 OTP GenServer 模式，为基于 Actor 的 Elixir 函数式架构生成原子约定式提交。",
    },
    diffExample: `diff --git a/lib/my_app/accounts/account.ex b/lib/my_app/accounts/account.ex
index 2c4f1a3..8b7d9e5 100644
--- a/lib/my_app/accounts/account.ex
+++ b/lib/my_app/accounts/account.ex
@@ -1,14 +1,22 @@
 defmodule MyApp.Accounts.Account do
   use Ecto.Schema
+  import Ecto.Changeset

   schema "accounts" do
     field :email, :string
     field :name, :string
+    field :role, Ecto.Enum, values: [:user, :admin, :moderator]
+    field :status, Ecto.Enum, values: [:active, :suspended, :archived]
+    field :last_login_at, :utc_datetime
     timestamps()
   end

-  def changeset(account, attrs) do
-    cast(account, attrs, [:email, :name])
+  def changeset(account, attrs) do
+    account
+    |> cast(attrs, [:email, :name, :role])
+    |> validate_required([:email, :role])
+    |> validate_format(:email, ~r/^[^\\s@]+@[^\\s@]+$/)
+    |> unique_constraint(:email)
   end
 end`,
    commitExample: `feat(accounts): add role-based access control and account status tracking

- add role field with user/admin/moderator enum values for authorization
- add status field with active/suspended/archived lifecycle states
- add last_login_at timestamp for audit and idle account detection
- strengthen changeset with email format validation and unique constraint
- add role to allowed cast fields while keeping name as optional

Previously all accounts were treated equally with no access control
granularity; the role enum enables middleware-level authorization checks
while the status field supports account lifecycle management without
hard deletes.`,
    installSnippet: `brew install gitagenthq/tap/git-agent
# inside your Elixir project
git-agent init   # detects Phoenix context structure and suggests scopes`,
    features: [
      {
        en: "Understands Phoenix Context boundaries and suggests scope names per context",
        zh: "理解 Phoenix Context 边界，建议按 Context 分隔的提交范围",
      },
      {
        en: "Separates Ecto schema changes from migration files into distinct commits",
        zh: "将 Ecto schema 变更与迁移文件分离为不同的提交",
      },
      {
        en: "Recognises OTP supervision tree changes and GenServer lifecycle modifications",
        zh: "识别 OTP 监督树变更和 GenServer 生命周期修改",
      },
      {
        en: "Handles Phoenix LiveView mount, handle_event, and render changes appropriately",
        zh: "正确处理 Phoenix LiveView 的 mount、handle_event 和 render 变更",
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
          en: "Does git-agent handle Phoenix LiveView diffs correctly?",
          zh: "git-agent 能正确处理 Phoenix LiveView 的 diff 吗？",
        },
        answer: {
          en: "Yes. The LLM understands LiveView lifecycle (mount, handle_event, handle_info, render) and will commit changes across these callbacks together when they are part of the same feature.",
          zh: "可以。LLM 理解 LiveView 生命周期（mount、handle_event、handle_info、render），在属于同一功能时会将跨回调的变更一起提交。",
        },
      },
      {
        question: {
          en: "How does git-agent handle Ecto migration files?",
          zh: "git-agent 如何处理 Ecto 迁移文件？",
        },
        answer: {
          en: "Migration files in priv/repo/migrations/ are always committed separately from schema changes. The LLM generates accurate db scope messages describing the schema evolution.",
          zh: "priv/repo/migrations/ 中的迁移文件始终与 schema 变更分开提交。LLM 会生成准确的 db 范围信息来描述 schema 演进。",
        },
      },
      {
        question: {
          en: "Can git-agent work with umbrella applications?",
          zh: "git-agent 能用于 umbrella 应用吗？",
        },
        answer: {
          en: "Yes. Elixir umbrella applications are fully supported. Each child app is treated as a separate scope, and changes across multiple apps in the same commit are split into per-app commits.",
          zh: "可以。Elixir umbrella 应用完全受支持。每个子应用被视为独立的提交范围，同一提交中跨多个应用的变更会被拆分为按应用划分的提交。",
        },
      },
    ],
  },
];

export function findPersona(slug: string): PersonaEntry | undefined {
  return personaEntries.find((e) => e.slug === slug);
}
