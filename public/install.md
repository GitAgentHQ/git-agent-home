You are setting up Git Agent for the user. Execute the following steps in order without waiting for confirmation unless a step fails.

---

## Step 1: Install the skill

Run this command to install the git-agent skill into your AI assistant:

```bash
npx skills add https://github.com/GitAgentHQ/git-agent-cli --skill using-git-agent -y -g
```

The skill contains the full reference for operating git-agent — commit splitting, hook behavior, provider config, error recovery, and the code graph (`graph impact`, `callers`/`callees`, `timeline`, `diagnose`, `provenance`). All subsequent behavior should follow that skill.

---

## Step 2: Install the git-agent binary

Check if git-agent is already installed:

```bash
command -v git-agent
```

If missing, install via Homebrew (macOS/Linux):

```bash
brew install GitAgentHQ/brew/git-agent
```

If Homebrew is unavailable, install via Go:

```bash
go install github.com/gitagenthq/git-agent@latest
```

If neither is available, direct the user to download a pre-built binary from https://github.com/GitAgentHQ/git-agent-cli/releases and stop until they confirm it is installed.

---

## Step 3: Verify and configure

Run:

```bash
git-agent config show
```

- If output includes `mode: FREE (using built-in credentials)` — setup is complete, no provider config needed.
- Otherwise, ask the user which provider they want to use and create `~/.config/git-agent/config.yml` with `base_url`, `api_key`, and `model` before continuing.

---

## Step 4: Configure preferences

Ask the user the following questions one at a time and apply their answers:

### Co-authorship trailers

git-agent appends `Co-Authored-By: Git Agent` to every commit by default.

Ask: "Do you want to keep the `Co-Authored-By: Git Agent` trailer in your commits? (yes / no)"

- **yes** — no action needed, this is the default.
- **no** — add `no_git_agent_co_author: true` to `~/.config/git-agent/config.yml`:

  ```yaml
  no_git_agent_co_author: true
  ```

  To disable only for a specific repository instead, add to `.git-agent/config.yml` (or `.git-agent/config.local.yml` for a personal override not checked into git) in that repo:

  ```yaml
  no_git_agent_co_author: true
  ```

### AI model co-author trailer

AI coding assistants such as Claude Code automatically pass a `--co-author` flag when invoking `git-agent commit`, appending a trailer like `Co-Authored-By: Claude <noreply@anthropic.com>` to attribute the model. This is enabled by default.

Ask: "Do you want to include the AI model's `Co-Authored-By` trailer (e.g. from Claude Code) in your commits? (yes / no)"

- **yes** — no action needed, this is the default.
- **no** — add `no_model_co_author: true` to `~/.config/git-agent/config.yml`:

  ```yaml
  no_model_co_author: true
  ```

  Or, to restrict it to one repository, add to `.git-agent/config.yml` (or `.git-agent/config.local.yml` for a personal override not checked into git):

  ```yaml
  no_model_co_author: true
  ```

### Require AI model co-author trailer

For teams that want every commit to be explicitly attributed to the AI model behind it, git-agent can refuse commits that lack a `Co-Authored-By` from a known AI provider domain (`anthropic.com`, `openai.com`, `google.com`). This is **disabled by default**.

Ask: "Do you want to require every commit to carry an AI model `Co-Authored-By` trailer? Commits without one will be rejected before the model is even called. (yes / no)"

- **no** — no action needed, this is the default.
- **yes** — add `require_model_co_author: true` to `~/.config/git-agent/config.yml`:

  ```yaml
  require_model_co_author: true
  ```

  Or, to enforce only in one repository, add to `.git-agent/config.yml` (or `.git-agent/config.local.yml` for a personal override not checked into git):

  ```yaml
  require_model_co_author: true
  ```

  When enabled, every `git-agent commit` invocation must include `--co-author "Model Name <email@allowed-domain>"` (e.g. `--co-author "Claude Opus 4.7 <noreply@anthropic.com>"`). git-agent validates this at the CLI layer and exits with a hint before calling the LLM if it is missing. To allow additional provider domains beyond the three defaults, add `model_co_author_domains: [acme.ai, ...]` to the same file. This setting is mutually exclusive with `no_model_co_author: true`.

### Per-repo initialization

Ask: "Do you want to initialize git-agent in your current repository now? This generates scopes from your git history and optionally installs a commit-message hook. (yes / no)"

- **yes** — run `git-agent init --scope` and show the user the generated `.git-agent/config.yml`.
- **no** — skip; the user can run `git-agent init` manually later.

### Action capture (the code graph)

git-agent builds a queryable code graph — call graph, co-change history, and a tamper-evident log of every agent and human action — that powers `graph impact` (files that move with your change), `graph diagnose` (trace a regression to the action that introduced it), `graph timeline`, and `graph provenance`. All graph queries are read-only and offline (no LLM, no API key).

The graph is fed by `git-agent capture`, a hidden command the Claude Code `PostToolUse` hook calls automatically. Ask: "Do you want to install the capture hook so agent edits are recorded into the graph automatically? (yes / no)"

- **yes** — run `git-agent init --agent-hook`. This writes a `PostToolUse` hook (matcher `Edit|Write|Bash`) to `.claude/settings.json` that runs `git-agent capture --source claude-code` on each agent action. Capture is fast (<200ms), never blocks the agent, and redacts secrets before storage.
- **no** — skip; the graph can still be built from git history via `git-agent graph index`, but agent actions won't be in the event log, so `timeline`/`diagnose`/`provenance` will only reflect commits, not live edits.

After capture runs, build the projections before querying: `git-agent graph index` (full) or `git-agent graph sync` (incremental).

**Using the call graph while coding.** Before changing a function, run `git-agent graph impact --symbol <Name>` (or `graph callers <Name>`) to see every caller that depends on it — across files and packages — so nothing coupled to the change is missed. After editing, `git-agent graph affected [files...]` lists exactly which test files to run (transitively, via the symbols you touched). `graph callees <Name>` shows what a function calls. These are the highest-leverage graph commands for active development; they run offline with no API key.

**The graph database is never tracked.** `.git-agent/graph.db` is generated at runtime and git-agent keeps it out of version control automatically: `git-agent init` writes it into `.gitignore` and untracks any already-committed copy, and every graph command also writes the ignore rule to `.git/info/exclude` and untracks `graph.db` if a fork you cloned committed it. If you ever see a `chore: update graph database file` commit, run `git-agent init --gitignore` to fix it. Never `git add -f .git-agent/graph.db`.

---

## Step 5: Shell completion (optional)

Ask: "Do you want to set up shell completion for git-agent? (yes / no)"

- **yes** — detect the user's shell and run the appropriate command:
  - **bash**: `git-agent completion bash > $(brew --prefix)/etc/bash_completion.d/git-agent` (macOS) or `git-agent completion bash > /etc/bash_completion.d/git-agent` (Linux)
  - **zsh**: `git-agent completion zsh > "${fpath[1]}/_git-agent"`
  - **fish**: `git-agent completion fish > ~/.config/fish/completions/git-agent.fish`
  - **powershell**: `git-agent completion powershell >> $PROFILE`
- **no** — skip; the user can run `git-agent completion --help` later.

---

## Step 6: Confirm and hand off

Tell the user that git-agent is ready. From this point on, follow the installed skill (`using-git-agent`) for all git-agent operations — committing, and querying the code graph before edits (`graph impact`), after regressions (`graph diagnose`), or when reviewing history (`graph timeline`, `graph provenance`).

---

## Step 7: Add a git-agent usage rule to your coding-agent config (recommended)

So that every coding agent working in this repo follows the same git-agent workflow, add a short rule to the root `CLAUDE.md` (Claude Code) or `AGENTS.md` (other agents) at the repo root. Ask: "Do you want me to add a git-agent usage rule to your root CLAUDE.md / AGENTS.md? (yes / no)"

- **yes** — append the block below to `CLAUDE.md` (or `AGENTS.md` if that's what the repo uses). Create the file if it does not exist. Do not overwrite existing content.

  ```markdown
  ## git-agent usage

  Use `git-agent` for commits and code-graph queries in this repo.

  - **Committing**: stage changes, then run `git-agent commit --intent "<one-sentence intent>"` (do not hand-write commit messages). On a 401, retry with `--free`.
  - **Before editing a function**, run `git-agent graph impact --symbol <Name>` (or `graph callers <Name>`) to find every caller that depends on it; update coupled files together.
  - **After editing**, run `git-agent graph affected [files...]` to see which tests to run.
  - **Regressions**: `git-agent graph diagnose [symptom] --file <source>` traces a failure to the action that introduced it.
  - Graph queries are read-only and offline (no LLM, no API key). Only `commit` and `init --scope` need a provider.
  - Never `git add -f .git-agent/graph.db` — it is generated and auto-ignored. If it shows as tracked, run `git-agent init --gitignore`.
  - Full reference: the `using-git-agent` skill.
  ```

- **no** — skip; the user can add it manually later. The rule is optional, but recommended for teams so every agent behaves consistently.

