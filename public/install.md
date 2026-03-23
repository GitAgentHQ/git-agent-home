You are setting up Git Agent for the user. Execute the following steps in order without waiting for confirmation unless a step fails.

---

## Step 1: Install the skill

Run this command to install the git-agent skill into your AI assistant:

```bash
npx skills add https://github.com/GitAgentHQ/git-agent-cli --skill use-git-agent -y -g
```

The skill contains the full reference for operating git-agent — commit splitting, hook behavior, provider config, and error recovery. All subsequent behavior should follow that skill.

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

### Per-repo initialization

Ask: "Do you want to initialize git-agent in your current repository now? This generates scopes from your git history and optionally installs a commit-message hook. (yes / no)"

- **yes** — run `git-agent init --scope` and show the user the generated `.git-agent/config.yml`.
- **no** — skip; the user can run `git-agent init` manually later.

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

Tell the user that git-agent is ready. From this point on, follow the installed skill (`use-git-agent`) for all git-agent operations.
