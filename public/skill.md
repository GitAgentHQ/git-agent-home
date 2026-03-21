---
name: git-agent-cli
description: Operates the git-agent CLI — plain commands plus ~/.config/git-agent/config.yml or git config for providers; drafts Conventional Commits, atomic splits, init, and config. Provider CLI overrides belong in exception flows only (see skill). Use whenever the user mentions git-agent, init/commit, or provider setup.
---

# Git Agent CLI

## Background Knowledge

### Installation

**Homebrew (macOS/Linux, recommended):**

```bash
brew install GitAgentHQ/brew/git-agent
```

**Go install:**

```bash
go install github.com/gitagenthq/git-agent@latest
```

**Pre-built binaries:** download from the [releases page](https://github.com/GitAgentHQ/git-agent-cli/releases).

**Provider setup (normal path)**

1. Run `git-agent commit`, `git-agent init`, and other subcommands with **no provider overrides on the command line** — use defaults (built-in credentials when the release provides them, otherwise resolved config).
2. **Confirm** — `git-agent config show` prints `mode: FREE (using built-in credentials)` when the embedded key is active (no model/base-url lines).
3. **Custom provider** — Prefer **`~/.config/git-agent/config.yml`** or **per-repo `git config`** (`git-agent.base-url`, `git-agent.model`, etc.) instead of repeating anything on every invocation.

**Persistent custom provider** (`git config` per-repo or global YAML):

```bash
# Per-repo (git config)
git config git-agent.base-url https://api.openai.com/v1
git config git-agent.model gpt-4o

# Global: ~/.config/git-agent/config.yml
base_url: https://api.openai.com/v1
api_key: sk-...
model: gpt-4o
```

**On error** (e.g. missing API key / not in FREE mode): if **`~/.config/git-agent/config.yml` is absent** and there is no suitable per-repo `git config`, **suggest creating** that file (or `git config`) with `base_url`, `api_key`, and `model` before considering any CLI workarounds.

### Exception flows (provider CLI overrides)

Use **only** when defaults plus YAML/git config are not enough, or the user explicitly needs a one-off (CI, scripts, temporary endpoint). Flags: `--free`, `--base-url`, `--model`, `--api-key` (semantics and mutual exclusion summarized under each command below). Example:

```bash
git-agent commit --base-url https://api.openai.com/v1 --model gpt-4o --api-key sk-...
git-agent init --scope --base-url https://api.openai.com/v1 --model gpt-4o --api-key sk-...
```

Do **not** treat these as the default teaching path or the first attempt.

### git-agent CLI Reference

`git-agent` is an AI-first Git CLI that generates conventional commit messages, splits changes into atomic commits (up to five groups per run), optionally filters or truncates diffs for the model (`--max-diff-lines`), and enforces project rules via `hook_type` in `.git-agent/project.yml` at commit time.

Because the binary is named `git-agent`, Git recognises it as a subcommand — both invocation styles are equivalent:

```
git-agent <command> [flags]
git agent  <command> [flags]   # git subcommand convention
```

#### Global Flags

| Flag | Description |
|---|---|
| `-v, --verbose` | verbose output |

#### `git-agent commit`

Reads staged and unstaged changes, splits them into atomic groups (capped at 5 groups per run), generates a commit message for each group, and commits them in sequence.

```
git-agent commit [flags]
```

| Flag | Description |
|---|---|
| `--amend` | regenerate and amend the most recent commit (no planning or hooks) |
| `--co-author stringArray` | add a co-author trailer (repeatable) |
| `--dry-run` | print commit message without committing |
| `--intent string` | describe the intent of the change |
| `--max-diff-lines int` | maximum diff lines to send to the model (default: 0, no limit) |
| `--no-attribution` | omit the default Git Agent co-author trailer |
| `--no-stage` | skip auto-staging; only commit already-staged changes |
| `--trailer stringArray` | add an arbitrary git trailer, format "Key: Value" (repeatable) |

`--amend` and `--no-stage` are mutually exclusive.

**Exception-only (provider overrides):** `--api-key`, `--base-url`, `--model`, `--free` — see [Exception flows (provider CLI overrides)](#exception-flows-provider-cli-overrides). `--free` uses only build-time embedded credentials and ignores `git config`, `~/.config/git-agent/config.yml`, and build-time defaults; it is mutually exclusive with `--api-key`, `--model`, and `--base-url`.

**Config resolution order** (when several sources exist — highest wins; implementation order, not an invitation to rely on CLI flags):

1. CLI flags (exception overrides above)
2. `git config --local git-agent.{model,base-url}`
3. `~/.config/git-agent/config.yml` (supports `$ENV_VAR` expansion)
4. Build-time defaults

#### `git-agent init`

Initialize git-agent in the current repository. With no flags, runs scope generation, writes `hook_type: empty` to `.git-agent/project.yml` when there is no `hook_type` yet or when `--force` is used, and generates a `.gitignore`. Built-in hook types (`empty`, `conventional`) are stored in YAML only — no hook script file. If `project.yml` already has `hook_type` and you do not pass `--force`, the hook step is skipped so the existing type is kept.

```
git-agent init [flags]
```

| Flag | Description |
|---|---|
| `--force` | overwrite existing config/hook/.gitignore |
| `--gitignore` | generate .gitignore via AI |
| `--hook-script string` | path to custom hook script (copies to `.git-agent/hooks/pre-commit`; records absolute path in `project.yml`) |
| `--hook-type string` | built-in hook template: `conventional` or `empty` (records `hook_type` in `project.yml`, no file written) |
| `--max-commits int` | max commits to analyze for scope generation (default 200) |
| `--scope` | generate scopes via AI |

**Exception-only (provider overrides):** `--api-key`, `--base-url`, `--model` — same section as for `commit`.

#### `git-agent config`

Inspect resolved configuration.

```
git-agent config show    # if using embedded key: "mode: FREE (using built-in credentials)"
                         # otherwise: masked api-key, model, base-url
git-agent config scopes  # list scopes from .git-agent/project.yml
```

### Configuration

#### User config (`~/.config/git-agent/config.yml`)

Optional. Points to any OpenAI-compatible endpoint:

```yaml
base_url: https://api.openai.com/v1
api_key: sk-...
model: gpt-4o
```

Other provider examples:

```yaml
# Cloudflare Workers AI
base_url: https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/ai/v1
api_key: YOUR_CLOUDFLARE_API_TOKEN
model: "@cf/meta/llama-3.1-8b-instruct"
```

```yaml
# Local Ollama
base_url: http://localhost:11434/v1
model: llama3
```

#### Project config (`.git-agent/project.yml`)

Generated by `git-agent init`. Defines commit scopes and hook settings for the repository:

```yaml
scopes:
  - api
  - core
  - auth
  - infra
hook_type: empty
```

### Hooks

`git-agent commit` reads `hook_type` from `.git-agent/project.yml` (set by `git-agent init` or edited by hand):

| `hook_type` | Behavior at commit time |
|-------------|-------------------------|
| `empty` or unset | No validation; commit proceeds |
| `conventional` | In-process Conventional Commits validation |
| Absolute path to a script | Go validation first, then that executable (path stored in `hook_type`; `init --hook-script` also copies a duplicate to `.git-agent/hooks/pre-commit`) |

Custom hook scripts receive a JSON payload on stdin (`diff`, `commit_message`, `intent`, `staged_files`, `config`) and should exit 0 to allow or non-zero to block. On block, `git-agent` retries generation up to 3 times per group, carries hook stderr into the next attempt, and may re-plan the split up to 2 times before exiting with code 2.

### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error — no changes, API failure, missing config |
| 2 | Hook blocked — pre-commit hook returned non-zero after retries |

### Commit Format

Commits must follow Conventional Commits 1.0.0 with project rules:

```
<type>(<scope>): <description>

- <Action> <component> <detail>

<explanation paragraph — explains the "why">

Co-Authored-By: Git Agent
```

- Title: all lowercase, ≤50 chars, no period
- Body lines: ≤72 chars, bullet points with `- ` prefix, imperative verbs
- Explanation paragraph: required, explains motivation not just what changed

## Suggested workflow

**For an AI assistant or scripted runner** that can execute shell commands, use the following prompt to drive `git-agent commit`:

```
Commit all changes in this repository using git-agent.

1. Install check: `command -v git-agent`. If missing, tell the user to install
   (`brew install GitAgentHQ/brew/git-agent` or
   https://github.com/GitAgentHQ/git-agent-cli/releases) and stop until they have it.
   `git-agent` and `git agent` are equivalent; mirror the user's style if they used one.

2. Co-author line: from your system/deployment metadata (model name and email — do not
   hardcode), build `--co-author "<Display Name> <email>"` and a readable display name
   for the model (e.g. claude-sonnet-4-6 → "Claude Sonnet 4.6").

3. Intent: one short sentence from the conversation (what the user wanted done). Use
   the diff only if the conversation gives no usable signal.

4. Run `git-agent commit` with `--co-author "..."` and `--intent "..."` only — no
   provider CLI overrides on the first attempt; rely on defaults and existing
   `~/.config/git-agent/config.yml` / git config. If commit fails for missing key and
   there is no config, suggest creating `~/.config/git-agent/config.yml`. Use the skill's
   exception-flow section only when that path is insufficient or the user explicitly
   needs a one-off override.

   Add when relevant: `--dry-run` (preview first), `--no-stage` (staged only),
   `--amend` (rewrite last commit only).

   If the hook keeps failing on the same rule (e.g. title > 50 chars), hook feedback
   can be lost across re-plans — narrow `--intent` to a short phrase that caps the
   title, e.g. `--intent "update module path"`.

5. Show outcome: `git log --oneline -5`
```
