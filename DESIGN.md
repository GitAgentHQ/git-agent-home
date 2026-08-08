---
name: git-agent
description: AI-first Git CLI: conventional commits and atomic splits
colors:
  bg: "#050505"
  card-surface: "#f0ede6"
  ink: "#111111"
  ink-secondary: "rgba(0, 0, 0, 0.55)"
  ink-tertiary: "rgba(0, 0, 0, 0.35)"
  code-bg: "#0d0d0d"
  heading: "#ffffff"
  text-on-dark: "rgba(255, 255, 255, 0.60)"
  label-on-dark: "rgba(255, 255, 255, 0.40)"
  positive: "#2a7a4b"
  divider: "rgba(0, 0, 0, 0.15)"
  dot: "rgba(0, 0, 0, 0.18)"
  line: "rgba(0, 0, 0, 0.1)"
  glow-blue: "rgba(85, 140, 255, 0.26)"
  glow-orange: "rgba(255, 125, 75, 0.22)"
typography:
  display:
    fontFamily: "\"IBM Plex Mono\", ui-monospace, \"SFMono-Regular\", \"Menlo\", monospace"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1
  heading:
    fontFamily: "\"IBM Plex Mono\", ui-monospace, \"SFMono-Regular\", \"Menlo\", monospace"
    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "\"IBM Plex Sans\", \"Helvetica Neue\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.85vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  graph-title:
    fontFamily: "\"IBM Plex Sans\", \"Helvetica Neue\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "\"IBM Plex Sans\", \"Helvetica Neue\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "\"IBM Plex Sans\", \"Helvetica Neue\", ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.55
  mono-label:
    fontFamily: "\"IBM Plex Mono\", ui-monospace, \"SFMono-Regular\", \"Menlo\", monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
rounded:
  card: "3px"
  code-block: "4px"
  button: "3px"
  inline-code: "2px"
  bar: "1px"
  pattern-rounded: "14px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  section: "14px"
components:
  button-nav:
    backgroundColor: "transparent"
    textColor: "rgba(255, 255, 255, 0.68)"
    rounded: "{rounded.button}"
    padding: "5px 10px"
    height: "44px"
  button-nav-hover:
    borderColor: "rgba(255, 255, 255, 0.55)"
    textColor: "#ffffff"
  card-entry:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px 24px 20px"
  card-section:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "22px 26px"
  card-hub:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "18px 20px"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "rgba(255, 255, 255, 0.78)"
    rounded: "{rounded.code-block}"
    padding: "11px 16px"
  explore-card:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "rgba(255, 255, 255, 0.68)"
    rounded: "{rounded.card}"
    padding: "14px 16px"
---

# Design System: git-agent

## Overview

**Creative North Star: "The Terminal Printer"**

git-agent's visual identity draws from the material culture of the terminal and the printed page. The near-black background is the desk surface; cream cards are paper output from a terminal printer — barcode receipts, index cards, technical documentation sheets. The design lives in the friction between the digital and the physical: SVG noise texture adds paper grain, barcode graphics are functional decorations, and IBM Plex Mono typesets everything with the precision of a line printer.

The system is resolutely monochrome — a single cream surface against a dark ground — with no secondary palette. Warmth and texture come from the paper grain, dot fields, and subtle animated glow gradients on decorative patterns. The mode is **Persuade**: the visitor decides and acts; the design is the product. Every element earns its place by helping the visitor understand what git-agent is and why it matters.

**Key Characteristics:**
- Monochrome palette with a single cream card surface
- IBM Plex Mono as the voice of the product (headings, labels, code); IBM Plex Sans for body
- Paper grain (noise texture) on all card surfaces
- SVG dot patterns that taper radially, with animated turbulence displacement
- Barcode visual language as a recurring decorative motif
- Dark background exclusively — no light mode
- Subtle shadow layering: cards as paper on a desk, not floating elements
- All motion respects `prefers-reduced-motion`

## Colors

The palette is monochrome with a single cream card surface against a near-black background. There is no secondary accent color — the only chromatic color appears in the decorative glow gradients on the Related command's pattern lines circle, which use a muted blue and warm orange at very low opacity (both ≤26%).

### Neutral
- **Near Black** (`#050505`): The background. The entire interface sits on this surface. Dominant by area.
- **Cream Paper** (`#f0ede6`): The card surface — all cards, sections, and containers use this single color. It is the only non-background surface.
- **Rich Ink** (`#111111`): Primary text on cream cards. High contrast, slightly softened from pure black.
- **Faded Ink** (`rgba(0, 0, 0, 0.55)`): Secondary text, body copy on cards, command descriptions.
- **Pale Ink** (`rgba(0, 0, 0, 0.35)`): Tertiary text, metadata, serial numbers, feature list items.
- **Dot** (`rgba(0, 0, 0, 0.18)`): Dot pattern fills. Always at this opacity.
- **Line** (`rgba(0, 0, 0, 0.1)`): Decorative line pattern fills. Always at this opacity.
- **Divider** (`rgba(0, 0, 0, 0.15)`): Line separators in tables, grids, and sections.

### On-Dark Whites
- **Bright White** (`#ffffff`): Headings, titles, and the product name on the dark background.
- **Body White** (`rgba(255, 255, 255, 0.60)`): Body copy on the dark background (subtitle, descriptions).
- **Muted White** (`rgba(255, 255, 255, 0.40)`): Labels, section headers, pricing note text on dark.
- **Faint White** (`rgba(255, 255, 255, 0.35)`): Footer links, secondary metadata on dark.
- **Code White** (`rgba(255, 255, 255, 0.78)`): Code block text, lighter than body for readability.
- **Nav White** (`rgba(255, 255, 255, 0.68)`): Navigation and interactive button text.
- **Breadcrumb White** (`rgba(255, 255, 255, 0.45)`): Breadcrumb navigation text.

### Decorative Accents
- **Glow Blue** (`rgba(85, 140, 255, 0.26)`): Cool glow in the lines pattern circle decoration. Only appears in the Related command's decorative graphic.
- **Glow Orange** (`rgba(255, 125, 75, 0.22)`): Warm glow in the lines pattern circle decoration. Pairs with Glow Blue.
- **Positive Green** (`#2a7a4b`): The "yes" indicator in comparison tables. The only use of pure green in the system.

### Named Rules
**The One Surface Rule.** Cream cards are the only non-background surface. Never introduce a second card color, a tinted surface, or a gradient background for content containers. The relationship is always: dark background → cream paper.

**The 10% Chroma Rule.** Chromatic color (the blue and orange glow gradients) is confined to the decorative pattern lines circle, which occupies ≤5% of any screen. Its rarity is the point — the rest of the system is monochrome.

## Typography

**Display / Heading Font:** IBM Plex Mono (with ui-monospace, SFMono-Regular, Menlo, monospace fallback)
**Body Font:** IBM Plex Sans (with Helvetica Neue, ui-sans-serif, system-ui, sans-serif fallback)
**Label / Mono Font:** IBM Plex Mono (same stack as Display)

**Character:** The pairing is a terminal mechanic meets a humanist reader. IBM Plex Mono is the voice of the product — it typesets headings, the product name, command names, labels, code, and all metadata. It communicates precision, tool-ness, and terminal authenticity. IBM Plex Sans handles body paragraphs and feature descriptions, providing comfortable readability at small sizes. The clash is intentional: the product speaks in mono, and when it needs to explain, it switches to sans.

### Hierarchy
- **Display** (IBM Plex Mono 700, `clamp(2rem, 5vw, 3.25rem)`, line-height 1): The product name "git-agent" on the homepage. Mono display weight, tight letter-spacing -0.02em. Only appears once per page.
- **Heading** (IBM Plex Mono 700, `clamp(1.5rem, 3.5vw, 2.5rem)`, line-height 1.05, letter-spacing -0.025em): Section titles, pricing comparison titles, command detail headings.
- **Card Title** (IBM Plex Sans 700, `clamp(1.25rem, 2.85vw, 2rem)`, line-height 1.05, letter-spacing -0.03em): Two-line entry card titles on the homepage. The only 700-weight sans in the system.
- **Graph Title** (IBM Plex Sans 600, `clamp(1.15rem, 2.4vw, 1.45rem)`, letter-spacing -0.01em): The graph pitch section title.
- **Body** (IBM Plex Sans 400, 1rem/16px, line-height 1.5–1.65): Paragraphs, descriptions, feature text. Max line length 65–70ch.
- **Label** (IBM Plex Sans 400, 0.8125rem/13px, line-height 1.55): Feature list items, card descriptions, small text.
- **Micro** (IBM Plex Sans 400, 0.6875rem/11px): The smallest text. Used sparingly.
- **Mono Label** (IBM Plex Mono 500, 0.6875rem/11px, letter-spacing 0.04–0.12em): Command names, serial numbers, breadcrumbs, code labels, navigation text. Often uppercase via CSS `text-transform: uppercase`.
- **Mono Micro** (IBM Plex Mono, 0.625rem/10px): The smallest mono text. Pricing notes, comparison table headers, cross-links labels.
- **Mono Body** (IBM Plex Mono 400, 0.8125rem/13px): Code block content, inline code.

### Named Rules
**The Mono Voice Rule.** The product speaks in IBM Plex Mono. Headings, the product name, command names, labels, navigation, serial numbers, and code are all mono. Sans is reserved for explanatory prose only. If it's a label or a name, it's mono.

## Layout

The layout is a single-column, centered, scrollable page with a max-width of 860px on the homepage. Content is vertically stacked with generous gaps (40px between sections). The page uses `position: fixed; inset: 0` to create a full-viewport canvas with internal scrolling.

**The entry grid** (homepage command cards) is a 2-column grid at 20px gap, collapsing to 1 column at 680px. Cards stretch to match the tallest in each row.

**The hub grid** (pSEO index pages) is 3-column at 14px gap, collapsing to 2-column at 700px and 1-column at 440px.

**The explore grid** (homepage explore section) is 4-column at 12px gap, collapsing to 2-column at 680px.

**Command detail content** has a max-width of 780px with 40px horizontal padding (reduced to 20px below 600px).

**Safe areas:** All layouts respect `env(safe-area-inset-*)` for notched devices. Top padding includes `safe-area-inset-top`, bottom padding includes `safe-area-inset-bottom`.

**Spacing rhythm:** 14px is the standard gap between sections and cards. 20px between grid items. 40px between major page sections. 18px inside card headers. 11px between feature list items.

## Elevation & Depth

The system uses **paper-on-desk flat layering**. Cards and sections sit on the dark background like paper on a desk — they have a subtle shadow (`0 2px 12px rgba(0, 0, 0, 0.45)`) that separates them from the background, but they do not float. The shadow is an edge shadow, not a lift shadow.

On hover, cards lift slightly with a deeper shadow (`0 14px 44px rgba(0, 0, 0, 0.6)`) and a subtle upward translate. This is the only elevation change in the system.

Hub cards use a lighter shadow (`0 2px 8px rgba(0, 0, 0, 0.35)`) since they are smaller and sit in a denser grid.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows are thin and tight — enough to separate layers, not to float them. Elevation changes only appear on interactive hover states.

## Shapes

The form language is gently rectangular with subtle rounding — nothing is aggressively rounded, nothing is sharply square. The 3px card radius is consistent across all card types (entry, section, hub, ticket). Buttons share the same 3px radius. Code blocks use 4px for a slightly softer inset feel. Decorative exceptions: pricing bars use 1px radius (they are sub-pixel thin, so any larger radius would be invisible), and the rounded-square dot pattern uses 14px for a noticeable-but-gentle curve.

Decorative patterns use circles (for the init card's dot field) and rounded squares (14px radius for the commit card's dot field). The lines pattern circle is a perfect circle (50% radius).

**Borders:** Cards are borderless — they rely on the shadow and the cream color against the dark background. Explore cards on dark backgrounds use a subtle border (`rgba(255, 255, 255, 0.08)`) instead of a shadow. Navigation buttons use a visible border (`rgba(255, 255, 255, 0.22)`) for interactive affordance.

**Dividers:** Dashed lines (`repeating-linear-gradient` with 5px on, 5px off) create dashed card dividers. Solid 1px lines at `var(--divider)` opacity separate table rows and flag lists.

## Components

### Buttons
- **Shape:** Gently rectangular (3px radius), single-pixel border
- **Navigation / Back buttons:** Transparent background, 1px solid `rgba(255, 255, 255, 0.22)` border, mono label text at `rgba(255, 255, 255, 0.68)`. Padding: 5px 10px. Min-height: 44px for touch accessibility.
- **Hover:** Border lightens to `rgba(255, 255, 255, 0.55)`, text brightens to white. 0.28s transition with ease-out-quint.
- **Code Copy button:** Inline inside code blocks. Dark fill (`rgba(255, 255, 255, 0.06)`), border `rgba(255, 255, 255, 0.18)`, mono label. Hover: fill brightens, border brightens, text brightens.

### Cards / Containers
- **Corner Style:** 3px radius throughout
- **Background:** Cream (`#f0ede6`) with SVG noise texture (`background-image: var(--noise)`) blended via `multiply`
- **Shadow Strategy:** `0 2px 12px rgba(0, 0, 0, 0.45)` — tight edge shadow, not a lift shadow
- **Border:** None
- **Internal Padding:** 24px horizontal, 24px top, 20px bottom (entry cards); 22px 26px (sections); 18px 20px (hub cards)
- **Hover (entry cards):** Shadow deepens to `0 14px 44px rgba(0, 0, 0, 0.6)`, card lifts ~8px upward. The dot pattern inside animates with SVG turbulence displacement.

### Code Blocks
- **Style:** Dark fill (`#0d0d0d`), 1px border `rgba(255, 255, 255, 0.08)`, 4px radius
- **Text:** IBM Plex Mono at `rgba(255, 255, 255, 0.78)`, `0.8125rem`
- **Padding:** 11px 16px
- **Copy button:** Inline, right-aligned. Shows "Copy" / "Copied" feedback with 2s timer.

### Navigation
- **Style:** Sticky top bar, dark background, 1px bottom border `rgba(255, 255, 255, 0.06)`
- **Typography:** IBM Plex Mono, `0.6875rem`, letter-spacing 0.04em, uppercase
- **Back button:** Bordered button with mono label, min-height 44px
- **Homepage nav:** Space-between layout with GitHub icon link, language switcher, and optional spacer

### Pattern Graphics (Decorative)
- **Dot Fields:** SVG grids of circles (16px step) that taper radially from full radius (3px) to minimum (1.12px) toward the edge. Two variants: circular taper (init card) and square-corner taper (commit card). Animated SVG turbulence displacement filter on hover.
- **Noise Texture:** SVG fractal noise via `feTurbulence` applied as `background-image` on all card surfaces. Blended with `multiply` at 6% opacity.
- **Lines Pattern:** Repeating linear gradient stripes (6px transparent, 1px line) with a 36s linear drift animation. Used in the Related command's decorative circle, with dual glow overlays (blue and orange radial gradients).
- **Barcode:** Vertical bars at varying heights (22–30px) and widths (2–3px). 12 bars per barcode, each unique to its command card. Opacity 0.92.

### Inputs / Fields
- The system has no form inputs, text fields, or search fields. The only interactive elements are buttons, links, and cards.

## Do's and Don'ts

### Do:
- **Do** use the cream card surface (`#f0ede6`) with noise texture for all content containers. The single surface is the system's signature.
- **Do** set headings, command names, labels, and navigation in IBM Plex Mono. The mono voice is the product's identity.
- **Do** keep the dark background (`#050505`) as the dominant surface. It is the desk.
- **Do** use the 3px radius consistently — it is the system's corner DNA.
- **Do** respect `prefers-reduced-motion` — all animations must degrade gracefully.
- **Do** use the paper-on-desk shadow vocabulary: tight shadows that separate, not lift.

### Don't:
- **Don't** introduce a second card color, tinted surfaces, or gradient backgrounds for content containers. One surface is the rule.
- **Don't** use chromatic color outside the decorative pattern glow gradients. The system is monochrome.
- **Don't** use IBM Plex Sans for labels, headings, or command names. Sans is for explanatory prose only.
- **Don't** add large rounded corners — 3px is the standard; 4px is the maximum for code blocks. The 14px pattern-rounded and 1px bar values are documented exceptions, not a license to introduce new radius values.
- **Don't** create floating, heavily shadowed elements. Cards are paper on a desk, not panels in space.
- **Don't** add form fields, inputs, or search bars without establishing a new component pattern for them.
- **Don't** introduce a light mode. The system is exclusively dark.