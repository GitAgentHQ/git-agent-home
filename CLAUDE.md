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
- All user-facing strings must go through `LanguageProvider` context (`app/contexts/language-context.tsx`), not hardcoded — including the skip link, dynamic `<html lang>` (via `HtmlLang` in `root.tsx`), and all a11y labels (`aria-label`, `alt`).
- `verbatimModuleSyntax: true` in tsconfig — use `import type` for type-only imports.

## Accessibility (audited 20/20, 2026-08-07)

The design system is documented in `DESIGN.md` (authoritative) with a machine-readable sidecar in `.impeccable/design.json`. The full a11y audit report is in `AUDIT-2026-08-07.md`. These are enforced by the impeccable design hook — run `/impeccable audit` before finalizing UI changes. Non-negotiable rules:

- Every page's root view must be `<motion.main id="main-content">` (never `<motion.div>`) — `<main>` landmark + skip-link target.
- All interactive elements need a visible `:focus-visible` ring (white on dark surfaces, dark `rgba(0,0,0,0.5)` on cream cards). Do not add new surface types without a corresponding focus-ring rule.
- Never use `display: none` to hide content that carries meaning for screen readers — use the visually-hidden `clip` technique. The comparison table's `<thead>` is collapsed this way at mobile widths, not removed from the DOM.
- Semantic tables: use real `<table>/<thead>/<tbody>/<th scope>` elements, not div grids.
- Decorative elements (barcodes, icons, patterns) get `aria-hidden="true"`.
- Respect `prefers-reduced-motion` (via `useAccessibleMotion()`) and `prefers-contrast: more` (token overrides in `app/app.css`).

## TypeScript

Strict mode + `verbatimModuleSyntax: true`. Path alias `~/*` maps to `./app/*`.

No lint or format tooling is configured — maintain style consistent with surrounding code.
