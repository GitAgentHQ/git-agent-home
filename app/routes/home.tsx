import { useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Route } from "./+types/home";
import { HomeView } from "../components/home-view";
import { CommandDetail } from "../components/command-detail";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "git-agent | AI-first Git CLI" },
		{
			name: "description",
			content:
				"AI-powered Git CLI that splits changes into atomic commits with conventional messages, powered by LLMs.",
		},
	];
}

type View = "home" | "init" | "commit";

const INIT_DATA = {
	cmd: "git-agent init",
	description: "Initialize your repository",
	usage: "git-agent init [--scope] [--hook-type <type>] [--hook-script <path>] [--gitignore] [--install-hook] [--force] [--max-commits <n>]",
	overview:
		"Set up git-agent in the current repository. With no flags, runs scope generation, installs an empty pre-commit hook, and generates a .gitignore — all in one step. Each behavior can be triggered individually via flags.",
	flags: [
		{
			name: "--scope",
			description:
				"Generate scopes via AI analysis of commit history and project structure",
		},
		{
			name: "--hook-type <value>",
			description: "Built-in hook template: conventional or empty",
			default: "empty",
		},
		{
			name: "--hook-script <path>",
			description: "Path to custom hook script",
		},
		{
			name: "--gitignore",
			description: "Generate a .gitignore based on project context",
		},
		{
			name: "--install-hook",
			description: "Install the commit-msg shim into .git/hooks/",
		},
		{
			name: "--force",
			description: "Overwrite existing config, hook, and .gitignore without merging",
		},
		{
			name: "--max-commits <n>",
			description: "Maximum number of commits to analyze for scope generation",
			default: "200",
		},
		{
			name: "--api-key <key>",
			description: "API key for the AI provider (overrides config file)",
		},
		{
			name: "--model <name>",
			description: "Model to use, e.g. gpt-4o (overrides config)",
		},
		{
			name: "--base-url <url>",
			description: "Base URL for AI provider (overrides config)",
		},
		{ name: "-v, --verbose", description: "Enable verbose output" },
	],
	steps: [
		{
			title: "Validate environment",
			description:
				"Checks that the current directory is a Git repository and that an API key is configured in ~/.config/git-agent/config.yml or via --api-key.",
		},
		{
			title: "Analyze commit history",
			description:
				"Reads up to --max-commits recent commit subjects, the project's top-level directories, and tracked file list (capped at 300 entries).",
		},
		{
			title: "Generate scopes via LLM",
			description:
				"Calls the configured LLM to derive commit scopes from actual directory names. Scopes are derived strictly from real directories — never invented from filenames or commit types.",
		},
		{
			title: "Write project config",
			description:
				"Saves generated scopes to .git-agent/project.yml. Merges with existing scopes unless --force is set.",
		},
		{
			title: "Install git hook",
			description:
				'Writes the chosen hook to .git-agent/hooks/pre-commit (mode 0755). The "conventional" hook validates Conventional Commits format with a Go-native validator; "empty" always passes. Use --install-hook to also shim .git/hooks/commit-msg.',
		},
		{
			title: "Generate .gitignore",
			description:
				"Asks the LLM to produce a .gitignore tailored to the detected project structure. Skipped if a .gitignore already exists, unless --force is set.",
		},
	],
};

const COMMIT_DATA = {
	cmd: "git-agent commit",
	description: "Generate AI-powered commits",
	usage: "git-agent commit [--dry-run] [--intent <text>] [--amend] [--no-stage] [--co-author <name>] [--trailer <key:value>] [--no-attribution]",
	overview:
		"Stages all tracked changes, intelligently groups them into atomic commits, generates conventional commit messages using an LLM, validates against your pre-commit hook, and retries on failure.",
	flags: [
		{
			name: "--dry-run",
			description:
				"Print planned commit messages without actually committing",
		},
		{
			name: "--intent <text>",
			description:
				"Describe the intent of the change — acts as the primary directive for the LLM's grouping and message decisions",
		},
		{
			name: "--amend",
			description: "Regenerate and amend the most recent commit message",
		},
		{
			name: "--no-stage",
			description: "Skip auto-staging; only commit already-staged changes",
		},
		{
			name: "--co-author <name>",
			description: 'Add a co-author trailer, e.g. "Name <email@domain>" (repeatable)',
		},
		{
			name: "--trailer <value>",
			description: 'Add an arbitrary git trailer, format "Key: Value" (repeatable)',
		},
		{
			name: "--no-attribution",
			description: 'Omit the default "Git Agent <noreply@git-agent.dev>" co-author trailer',
		},
		{
			name: "--max-diff-lines <n>",
			description: "Maximum diff lines to send to the model; set to limit token cost",
			default: "0 (no limit)",
		},
		{
			name: "--api-key <key>",
			description: "API key for the AI provider (overrides config file)",
		},
		{
			name: "--model <name>",
			description: "Model to use, e.g. gpt-4o (overrides config)",
		},
		{
			name: "--base-url <url>",
			description: "Base URL for AI provider (overrides config)",
		},
		{
			name: "-v, --verbose",
			description: "Enable verbose output including retry details and hook feedback",
		},
	],
	steps: [
		{
			title: "Resolve configuration",
			description:
				"Resolves settings with 4-level priority: CLI flags > git config --local > ~/.config/git-agent/config.yml > build-time defaults (Anthropic Claude 3.5 Haiku, claude-3-5-haiku-20241022).",
		},
		{
			title: "Collect diffs",
			description:
				"Unless --no-stage is set, runs git add --all to stage all tracked changes. Then reads both staged and unstaged diffs to understand the full scope of changes.",
		},
		{
			title: "Plan commits via LLM",
			description:
				"Groups changed files into logical atomic commits by concern (feat, fix, refactor, test, docs). The --intent flag acts as the primary directive for grouping decisions.",
		},
		{
			title: "Generate commit messages",
			description:
				"For each group, generates a Conventional Commits title (≤50 chars), body (bullet points + explanation paragraph), and a human-readable outline.",
		},
		{
			title: "Validate with hook",
			description:
				"Runs .git-agent/hooks/pre-commit with the diff and message. On failure, feeds the error back to the LLM and retries up to 3 times per group.",
		},
		{
			title: "Commit or re-plan",
			description:
				"Creates the git commit on success. If the hook keeps blocking after retries, triggers a full re-plan (up to 2 re-plans total) before exiting with code 2.",
		},
	],
};

export default function Home() {
	const [view, setView] = useState<View>("home");

	return (
		<div className="page">
			<AnimatePresence mode="wait" initial={false}>
				{view === "home" && <HomeView key="home" onSelect={setView} />}
				{view === "init" && (
					<CommandDetail
						key="init"
						{...INIT_DATA}
						onBack={() => setView("home")}
					/>
				)}
				{view === "commit" && (
					<CommandDetail
						key="commit"
						{...COMMIT_DATA}
						onBack={() => setView("home")}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
