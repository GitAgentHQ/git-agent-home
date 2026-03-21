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

## Step 4: Confirm and hand off

Tell the user that git-agent is ready. From this point on, follow the installed skill (`use-git-agent`) for all git-agent operations.
