# git-agent-home ![](https://img.shields.io/badge/React-19.0-blue) ![](https://img.shields.io/badge/Cloudflare-Workers-orange)

[![CI](https://img.shields.io/github/actions/workflow/status/GitAgentHQ/git-agent-home/deploy.yml)](https://github.com/GitAgentHQ/git-agent-home/actions) [![License](https://img.shields.io/github/license/GitAgentHQ/git-agent-home)](https://github.com/GitAgentHQ/git-agent-home/blob/main/LICENSE)

**English** | [简体中文](README.zh-CN.md)

Web dashboard for [git-agent](https://github.com/GitAgentHQ/git-agent-cli) — an AI-first Git execution layer. Give it a work intent and it discovers, stages, splits, validates, and commits atomic Conventional Commits. Built with React Router 8 and deployed to Cloudflare Workers.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev          # http://localhost:5173

# Type check
pnpm typecheck

# Production build
pnpm build

# Deploy to Cloudflare Workers
pnpm deploy
```

## Project Structure

- `app/` — React Router 7 application
  - `components/` — UI components (HomeView, CommandDetail, TicketView, Barcode, Pattern, CodeBlock, ComparisonTable, HubGrid, LangSwitch, PseoLayout, PseoFooter, HomeFooter, CrossLinksSection)
  - `routes/` — Route definitions: home, SEO playbooks (`/for/[language]`, `/vs/[competitor]`, `/glossary/[term]`, `/templates/[type]`), sitemap, robots.txt
- `workers/` — Cloudflare Worker entry point
- `public/install.md` — installation and coding-agent handoff guide

## Coding-agent handoff

The `public/install.md` file is served as the installation and handoff guide. The recommended write path is the bare `git-agent --intent "..."`: coding agents pass the user's goal and verification context, then git-agent owns change discovery, staging, atomic planning, hook validation, and commits. Update it whenever the CLI interface or autonomous workflow changes.

## Related Projects

| Project | Description |
|---------|-------------|
| [git-agent-cli](https://github.com/GitAgentHQ/git-agent-cli) | AI-powered Git CLI |

## License

[MIT](LICENSE)
