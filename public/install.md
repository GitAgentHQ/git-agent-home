You are setting up Git Agent for the user. Execute the following steps in order without waiting for confirmation unless a step fails.

---

## Step 1: Install the skill

Run this command to install the git-agent skill into your AI assistant:

```bash
npx skills add https://github.com/GitAgentHQ/git-agent-cli --skill using-git-agent -y -g
```

The skill contains the full reference for operating git-agent — commit splitting, hook behavior, provider config, error recovery, and co-change relations (`git-agent related` to see what changes together, `git-agent status` for index health). All subsequent behavior should follow that skill.

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

For teams that want every commit to be explicitly attributed to the AI model behind it, git-agent can refuse commits that lack a `Co-Authored-By` from a known AI provider domain. Built-in domains cover the common providers out of the box (`anthropic.com`, `openai.com`, `google.com`, `x.ai`, `zhipuai.cn`, `qwen.ai`, `deepseek.com`, `moonshot.ai`) — no extra domain list is required. This is **disabled by default**.

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

  When enabled, every `git-agent commit` invocation must include `--co-author "Model Name <email@allowed-domain>"` (e.g. `--co-author "Claude Opus 4.7 <noreply@anthropic.com>"` or `--co-author "Grok 4.5 <noreply@x.ai>"`). git-agent validates this at the CLI layer and exits with a hint before calling the LLM if it is missing. Only custom / lesser-known providers need `model_co_author_domains: [acme.ai, ...]`. This setting is mutually exclusive with `no_model_co_author: true`.

### Per-repo initialization

Ask: "Do you want to initialize git-agent in your current repository now? This generates scopes from your git history and optionally installs a commit-message hook. (yes / no)"

- **yes** — run `git-agent init --scope` and show the user the generated `.git-agent/config.yml`.
- **no** — skip; the user can run `git-agent init` manually later.

### The co-change graph

git-agent builds a co-change graph of your code from git history — the files that habitually change together — and keeps it current automatically as you commit (no setup, no hook, no capture step). It powers two read-only, offline queries (no LLM, no API key): `git-agent related` (what else moves with a file, plus the commits that prove the coupling) and `git-agent status` (index health and row counts).

`related` is the temporal complement to grep: grep finds files by their current content and symbols, while `related` finds them by how they have changed together — surfacing couplings a symbol search can't see, such as a test in another package, a changelog, or sibling files with no shared import. It auto-indexes on first run, so there is nothing to install here — just know it is available.

**Using co-change while coding.** Before changing a file, run `git-agent related <files...>` to see what historically moves with it — and why, via the linking commits — so nothing coupled to the change is missed. After editing, `git-agent related <files...> --tests` lists exactly which test files to run. These run offline with no API key.

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

Tell the user that git-agent is ready. From this point on, follow the installed skill (`using-git-agent`) for all git-agent operations — committing, and querying co-change relations before edits (`git-agent related`) or checking index health (`git-agent status`).

---

## Step 7: Add a co-change usage rule to your coding-agent config (recommended)

The `using-git-agent` skill only fires when an agent decides to invoke it, so agents rarely run `git-agent related` on their own — they grep and edit. A short rule in the agent's **global** instructions (loaded on every task, in every repo) is what makes them do it proactively. Add one there, not per-project.

Ask the user two questions:

1. "Do you want me to add a git-agent co-change usage rule to your coding agent's global config? (yes / no)"
2. If yes: "Which agent? Claude Code (`~/.claude/CLAUDE.md`), or another agent — I'll add it to that agent's global instruction file under your home directory (e.g. `~/.codex/AGENTS.md`, `~/.config/<agent>/...`)?"

Then act on the answer:

- **Claude Code** — append the block below to `~/.claude/CLAUDE.md` (create the file if absent; never overwrite existing content).
- **Another agent** — locate that agent's global instruction file under the user's home directory and append the same block, adapting only the sentence that names the skill if that agent has no skills.
- **no** — skip; the rule is optional but recommended for consistent agent behavior.

  ```markdown
  ## git-agent

  Before editing a feature or starting multi-file work in any git repo, run `git-agent related <files...>` to find the files that historically change together with the ones you are touching — the temporal complement to Grep (Grep finds current references; `related` finds what moves together, with the linking commits that explain why). Read those commits to judge each coupling and open the strongly-coupled files before finishing; after editing, `git-agent related <files...> --tests` lists which tests to run. Commit with `git-agent commit --intent "..."` (never hand-write messages; on 401 retry `--free`). `related` and `status` are offline and need no API key; only `commit` and `init --scope` need a provider. Full reference: the `using-git-agent` skill.
  ```


