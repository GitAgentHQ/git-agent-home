---
name: git-agent-cli
description: Operates the git-agent CLI — prefers official binaries with built-in FREE mode (no provider flags), then user config at ~/.config/git-agent/config.yml when needed; use --api-key/--base-url/--model only on explicit request. Drafts Conventional Commits, atomic splits, init, and config. Use whenever the user mentions git-agent, init/commit, or provider setup.
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

**Provider setup (in order of preference)**

1. **Official binary, no extra provider flags** — Prefer invoking `git-agent commit`, `git-agent init`, etc. **without** `--api-key`, `--base-url`, or `--model` so built-in FREE credentials apply when the release includes them.
2. **Confirm** — `git-agent config show` prints `mode: FREE (using built-in credentials)` when the embedded key is active (no model/base-url lines).
3. **On error** (e.g. missing API key / not in FREE mode): if **`~/.config/git-agent/config.yml` is absent** and there is no suitable per-repo `git config` for the provider, **suggest creating** that file (or `git config`) with `base_url`, `api_key`, and `model` — do **not** reach for CLI provider flags first.
4. **Only on explicit need** — Use `--base-url`, `--model`, and `--api-key` for one-off overrides (CI, scripts, temporary endpoint), not as the default teaching path.

**Persistent custom provider** (`git config` per-repo or global YAML — preferred over repeating flags):

```bash
# Per-repo (git config)
git config git-agent.base-url https://api.openai.com/v1
git config git-agent.model gpt-4o

# Global: ~/.config/git-agent/config.yml
base_url: https://api.openai.com/v1
api_key: sk-...
model: gpt-4o
```

**Exceptional: flags on one invocation** (only when the user or task requires it):

```bash
git-agent commit --base-url https://api.openai.com/v1 --model gpt-4o --api-key sk-...
git-agent init --scope --base-url https://api.openai.com/v1 --model gpt-4o --api-key sk-...
```

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
| `--api-key string` | API key for the AI provider |
| `--base-url string` | base URL for the AI provider |
| `--co-author stringArray` | add a co-author trailer (repeatable) |
| `--dry-run` | print commit message without committing |
| `--free` | use only build-time embedded provider credentials; ignores `git config`, `~/.config/git-agent/config.yml`, and build-time defaults; mutually exclusive with `--api-key`, `--model`, and `--base-url` |
| `--intent string` | describe the intent of the change |
| `--max-diff-lines int` | maximum diff lines to send to the model (default: 0, no limit) |
| `--model string` | model to use for generation |
| `--no-attribution` | omit the default Git Agent co-author trailer |
| `--no-stage` | skip auto-staging; only commit already-staged changes |
| `--trailer stringArray` | add an arbitrary git trailer, format "Key: Value" (repeatable) |

`--amend` and `--no-stage` are mutually exclusive.

**Config resolution order** (when several sources exist — highest wins; this is implementation order, not a recommendation to rely on flags):

1. CLI flags (`--api-key`, `--model`, `--base-url`)
2. `git config --local git-agent.{model,base-url}`
3. `~/.config/git-agent/config.yml` (supports `$ENV_VAR` expansion)
4. Build-time defaults

Teach users: default to **no provider flags** + official FREE when possible; then **YAML / git config** for custom providers; use CLI provider flags only when there is a **specific** reason.

**With `--free`:** only build-time embedded credentials are used (same sources as FREE mode); git config, the YAML file, and per-flag overrides are not applied.

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
| `--api-key string` | API key for the AI provider |
| `--base-url string` | base URL for the AI provider |
| `--model string` | model to use for generation |

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

4. Run `git-agent commit` with `--co-author "..."` and `--intent "..."`. Do **not** add
   `--api-key` / `--base-url` / `--model` unless the user explicitly needs a one-off
   provider override; rely on official FREE or existing `~/.config/git-agent/config.yml`
   first. If commit fails for missing key and there is no config file, suggest creating
   `~/.config/git-agent/config.yml` before using provider flags.

   Add when relevant: `--dry-run` (preview first), `--no-stage` (staged only),
   `--amend` (rewrite last commit only).

   If the hook keeps failing on the same rule (e.g. title > 50 chars), hook feedback
   can be lost across re-plans — narrow `--intent` to a short phrase that caps the
   title, e.g. `--intent "update module path"`.

5. Show outcome: `git log --oneline -5`
```
