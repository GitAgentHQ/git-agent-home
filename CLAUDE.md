# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server with HMR (localhost:5173)
pnpm build        # Production build
pnpm typecheck    # pnpm cf-typegen && tsc -b
pnpm check        # typecheck + build + wrangler deploy --dry-run (full validation)
pnpm deploy       # Deploy to Cloudflare Workers
```

Always run `pnpm check` before deploying; it catches type errors, build failures, and wrangler config issues in one pass.

## Architecture

React Router 7 SSR app on Cloudflare Workers. Routes are server-rendered — no browser-only APIs in route loaders/actions. Worker entry point: `workers/app.ts`.

TailwindCSS v4 is configured via the `@tailwindcss/vite` plugin — no `tailwind.config.ts` needed.

## Environment Variables

Local secrets go in `.dev.vars` (Cloudflare's local env file). Never commit `.dev.vars`.

## Conventions

- All programmatic SEO routes (`for/`, `vs/`, `glossary/`, `templates/`) must use `pseo-layout.tsx` as their layout wrapper.
- Route transitions use `AnimatePresence` from `motion/react` — maintain this pattern for new routes.
- All user-facing strings must go through `LanguageProvider` context (`app/contexts/language-context.tsx`), not hardcoded.
- `verbatimModuleSyntax: true` in tsconfig — use `import type` for type-only imports.

## TypeScript

Strict mode + `verbatimModuleSyntax: true`. Path alias `~/*` maps to `./app/*`.

No lint or format tooling is configured — maintain style consistent with surrounding code.
