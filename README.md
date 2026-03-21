# git-agent-home ![](https://img.shields.io/badge/React-19.0-blue) ![](https://img.shields.io/badge/Cloudflare-Workers-orange)

[![CI](https://img.shields.io/github/actions/workflow/status/GitAgentHQ/git-agent-home/deploy.yml)](https://github.com/GitAgentHQ/git-agent-home/actions) [![License](https://img.shields.io/github/license/GitAgentHQ/git-agent-home)](https://github.com/GitAgentHQ/git-agent-home/blob/main/LICENSE)

**English** | [简体中文](README.zh-CN.md)

Web dashboard for [git-agent](https://github.com/GitAgentHQ/git-agent-cli) — an AI-first Git CLI that generates conventional commit messages and splits changes into atomic commits. Built with React Router 7 and deployed to Cloudflare Workers.

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
- `public/skill.md` — Claude Code skill for git-agent CLI

## Claude Code Skill

The `public/skill.md` file is served as a static asset and registered as a skill in Claude Code. It documents all CLI commands, flags, configuration resolution, and commit format rules. Update it whenever the CLI interface changes.

## Related Projects

| Project | Description |
|---------|-------------|
| [git-agent-cli](https://github.com/GitAgentHQ/git-agent-cli) | AI-powered Git CLI |
| [git-agent-proxy](https://github.com/GitAgentHQ/git-agent-proxy) | Cloudflare Worker proxy with auth and rate limiting |

## License

[MIT](LICENSE)
