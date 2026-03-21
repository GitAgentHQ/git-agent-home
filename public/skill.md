---
name: git-agent-cli
description: Operates the git-agent CLI — an AI-first Git tool that generates conventional commit messages, splits changes into atomic commits, initializes repositories, and manages project config. Use this skill whenever the user mentions git-agent, wants AI-generated commits, asks to set up git-agent in a repo, or needs to inspect/change git-agent configuration.
---

# Git Agent CLI

## Background Knowledge

### Installation

**Homebrew (macOS/Linux, recommended):**

```bash
brew install FradSer/brew/git-agent
```

**Go install:**

```bash
go install github.com/fradser/git-agent@latest
```

**Pre-built binaries:** download from the [releases page](https://github.com/FradSer/git-agent-cli/releases).

git-agent ships with built-in credentials — no API key configuration needed to get started.
Run `git-agent config show` to confirm: it will print `mode: FREE` when the built-in key is active.

To use a custom provider, set the base URL and model via `git config` (per-repo) or `~/.config/git-agent/config.yml` (global):

```bash
# Per-repo (git config)
git config git-agent.base-url https://api.openai.com/v1
git config git-agent.model gpt-4o

# Global config file
# ~/.config/git-agent/config.yml
base_url: https://api.openai.com/v1
api_key: sk-...
model: gpt-4o
```

Or pass flags directly on each invocation:

```bash
git-agent commit --base-url https://api.openai.com/v1 --model gpt-4o --api-key sk-...
```

### git-agent CLI Reference

`git-agent` is an AI-first Git CLI that generates conventional commit messages, splits changes into atomic commits, and enforces project conventions via hooks.

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
| `--free` | ignore git config and build-time defaults; use only CLI flags or config file |
| `--intent string` | describe the intent of the change |
| `--max-diff-lines int` | maximum diff lines to send to the model (default: 0, no limit) |
| `--model string` | model to use for generation |
| `--no-attribution` | omit the default Git Agent co-author trailer |
| `--no-stage` | skip auto-staging; only commit already-staged changes |
| `--trailer stringArray` | add an arbitrary git trailer, format "Key: Value" (repeatable) |

`--amend` and `--no-stage` are mutually exclusive.

**Config resolution order** (highest to lowest priority):
1. CLI flags (`--api-key`, `--model`, `--base-url`)
2. `git config --local git-agent.{model,base-url}`
3. `~/.config/git-agent/config.yml` (supports `$ENV_VAR` expansion)
4. Build-time defaults

**With `--free` flag:** ignores git config and build-time defaults; still reads config file.

#### `git-agent init`

Initialize git-agent in the current repository. With no flags, runs scope generation, installs an empty hook (only if no existing hook_type found), and generates a `.gitignore`. If project.yml already has hook_type configured, it will be preserved unless `--force` is used.

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

#### `git-agent config`

Inspect resolved configuration.

```
git-agent config show    # display resolved provider config (api-key masked, model, base-url)
                         # prints "mode: FREE (using built-in credentials)" when no custom key is set
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

Built-in hooks installed by `git-agent init --hook-type <name>`:

| Hook | Description |
|------|-------------|
| `empty` | Placeholder that always passes |
| `conventional` | Validates Conventional Commits format |

Custom hooks are executable scripts at `.git-agent/hooks/pre-commit`. They receive a JSON payload on stdin (`diff`, `commit_message`, `intent`, `staged_files`, `config`) and should exit 0 to allow or non-zero to block. On block, `git-agent` retries up to 3 times (with up to 2 re-plans) before exiting with code 2.

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

## Workflow Execution

**Launch a general-purpose agent** with the following prompt:

```
Run git-agent to commit all changes in this repository.

1. Check that git-agent is installed: run `command -v git-agent`
   Both `git-agent <cmd>` and `git agent <cmd>` are valid; prefer whichever the user wrote.
   - If not found, tell the user to install it:
     - macOS/Linux via Homebrew: `brew install FradSer/brew/git-agent`
     - Or download from: https://github.com/FradSer/git-agent-cli/releases
   - Then stop and wait for the user to install before continuing
2. Check staged/unstaged changes with `git status` and `git diff`
3. If there are no changes, report "No changes to commit" and stop
4. Identify yourself: read your own system prompt to find your model name and the
   associated email address. Both may vary depending on deployment — do not hardcode
   either. Format the model name as a human-readable display name
   (e.g. "claude-sonnet-4-6" → "Claude Sonnet 4.6").
5. Determine the intent — look at the full conversation context first:
   what did the user ask for? what task were you working on before committing?
   Distil that into one concise sentence. Only fall back to inferring intent from
   the diff if the conversation provides no clear signal.
6. Run `git-agent commit` to generate messages and create atomic commits.
   Always pass both flags below — they improve output quality and attribution:
   - `--co-author "<Display Name> <email>"` (identity from step 4)
   - `--intent "<one-sentence summary>"` (derived in step 5)
   Additional flags:
   - Add `--dry-run` first if the user wants to preview messages before committing
   - Pass `--no-stage` if only staged changes should be committed
   - Pass `--amend` if the user wants to regenerate the last commit message
7. Report the resulting commit(s) with `git log --oneline -5`
```
