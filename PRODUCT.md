# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing project: React Router 8 + React 19 + TypeScript 7, TailwindCSS 4, motion library, Vite 8, Cloudflare Workers (Wrangler 4). Package manager: pnpm.

## Users

- **Individual developers**: solo developers, open-source maintainers, and freelancers who want cleaner git history with conventional commits without manual effort, setup overhead, or API cost.
- **Professional teams**: engineering teams that enforce conventional commits, code review standards, and atomic commit discipline. Teams that need co-change analysis to understand coupling across their codebase.

Both segments share the same core job: hand the intent of completed work to git-agent and get a well-structured, conventional, atomic history from the working tree with minimal friction.

## Product Purpose

git-agent is an AI-first Git execution layer. Give it the intent of completed work and it discovers staged, unstaged, and untracked changes, prepares project metadata, plans atomic groups, stages each group, generates conventional messages, validates hooks, and commits. Commit discipline becomes automatic — the developer or coding agent works freely, then hands Git operations to git-agent.

The web dashboard at gitagent.dev is the product's public face: it documents every CLI command, explains the co-change graph, compares cost against raw LLM usage, and drives adoption through programmatic SEO content (personas, comparisons, glossary, templates, integrations, use cases).

## Positioning

The only Git CLI that combines autonomous Git execution, conventional commit generation, automatic atomic splitting, and an offline co-change graph — all through a free shared gateway with zero configuration. Other tools generate messages or require users to stage and split changes manually; git-agent accepts the work intent and executes the Git operation.

## Operating Context

- Developers and coding agents invoke the bare `git-agent` command after a unit of work is complete, passing `--intent` when context will improve planning or explanation. The CLI discovers staged, unstaged, and untracked changes, plans atomic groups, owns staging, generates messages, validates hooks, and commits.
- The co-change graph is built from the repository's git history and powers the `related` and `status` commands entirely offline with no API key.
- Configuration lives in `~/.config/git-agent/config.yml`. Official release binaries embed a free shared gateway URL as the default; users can override with their own OpenAI-compatible endpoint, API key, and model.
- The web dashboard is a server-rendered React app (SSR on Cloudflare Workers), browsed by prospective users evaluating the tool and by existing users referencing documentation.

## Capabilities and Constraints

Confirmed capabilities:

- **Autonomous Git handoff**: `git-agent --intent "..."` reads staged, unstaged, and untracked changes → prepares missing metadata → plans atomic groups → stages, generates conventional messages, validates hooks, and commits each group.
- **Init**: `git-agent init` generates scope suggestions from git history, writes `.git-agent/config.yml`, optionally installs a commit-msg hook.
- **Co-change graph**: `git-agent related <file>` queries the offline co-change index to find files that historically change together. `git-agent status` checks index health.
- **Skills**: `git-agent skills` installs AI assistant skill files for Claude Code, Cursor, Windsurf, etc.
- **Config**: `git-agent config` views and edits settings.
- **Free shared gateway**: zero-config, rate-limited. Users can BYO key to any OpenAI-compatible endpoint.
- **Bilingual**: English and Chinese Simplified (Simplified Chinese) throughout the web dashboard.
- **Programmatic SEO**: 6 content groups (for, vs, glossary, templates, integrations, use cases) generating ~82 indexed pages.

Explicitly undecided or not part of this scope:

- No user accounts, authentication, or API-key management on the website.
- No interactive playground or sandbox on the web dashboard.
- No pricing/subscription tier on the website (the CLI itself is free).

## Brand Commitments

- **Name**: "git-agent" (lowercase, hyphenated). Product name on the site: "git-agent". The recommended write entry point is the bare `git-agent [--intent "..."]`; focused commands such as `git-agent init`, `git-agent related`, and `git-agent status` remain available for explicit maintenance and queries.
- **Domain**: gitagent.dev
- **GitHub**: https://github.com/GitAgentHQ/git-agent-cli
- **Install**: `brew install gitagenthq/tap/git-agent`
- **Voice**: Technical, direct, confident. No marketing fluff. Explains what the tool does and how it works. Bilingual (English and Chinese Simplified).
- **Typography**: IBM Plex Sans (sans-serif) and IBM Plex Mono (monospace) — both from Google Fonts.
- **Visual identity**: Dark theme exclusively (no light mode). Near-black background (`#050505`), cream/ivory card surfaces (`#f0ede6`), high-contrast ink. Monochrome palette with subtle noise texture. SVG dot patterns and barcode graphics as decorative elements. Responsive, mobile-first.
- **Tagline**: "AI-first Git execution layer" / "Intent in. Clean atomic history out."

## Evidence on Hand

- Full implementation at `gitagent.dev` with all routes, components, and bilingual content.
- `app/i18n/translations.ts` — complete bilingual copy for all surfaces.
- `app/app.css` — full design token set and component styles (1651 lines).
- `app/data/` — content files for all 6 SEO content groups.
- `public/og-image.svg` — Open Graph image.
- Pricing data: measured ~4,200 input + ~400 output tokens per commit. Source: provider pricing pages, Mar 2026.

## Product Principles

1. **Zero-config value first**: The tool must deliver immediate value without configuration. The free shared gateway is the default; BYO is an advanced option, not a requirement.
2. **Git execution is delegated, not manual**: The CLI should make the right thing (atomic conventional commits) happen from a work intent, without requiring the user or coding agent to learn staging, grouping, or commit-message mechanics.
3. **Offline-first where possible**: The co-change graph operates entirely offline — no API key, no network. This is a durable differentiator.
4. **Documentation as the product surface**: The website is the product's documentation and public face. Every CLI capability must be clearly documented there.
5. **Bilingual by default**: English and Chinese Simplified are first-class languages, not afterthoughts. Every user-facing string exists in both.

## Accessibility & Inclusion

- All animations respect `prefers-reduced-motion` via the `useAccessibleMotion` hook.
- Route transitions use `AnimatePresence` with `mode="wait"` for predictable navigation.
- Server-rendered content ensures SEO and basic accessibility for all routes.
- Bilingual interface supports Chinese and English readers natively.