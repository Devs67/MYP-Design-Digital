# Blue Glass redesign — build brief

Read this, `CLAUDE.md` and `design/figma-export/` before touching any page. Do not open the Figma
file unless something here is missing — the export holds everything needed.

## Goal

Restyle the whole site in the Blue Glass look from the Figma file. Keep every page's existing
HTML content, scripts and information order. This is a reskin through shared CSS, not a rewrite.

## Source of truth

1. `design/figma-export/tokens.css` — colours (light + dark), glass, radii, spacing, type
2. `design/figma-export/components.css` — header, tools bar, cards, list row, fields, buttons
   (primary / secondary / text), checklist row, achievement band, dialog, status chips, footer
3. `design/figma-export/style-brief.md`, `notes.md`, `icons/README.md`
4. The four `ref-*.png` files show **layout only**. They predate `components.css`, so where they
   disagree (flat identical buttons, two search boxes on Home, no Light/Dark selected state),
   follow `components.css`.

## Decisions already made by Dev

- Dark mode on every page. The site already toggles `:root.dark` via `assets/theme.js` and
  `?theme=`. Map the Figma `[data-theme="dark"]` tokens onto `:root.dark`.
- Keep current page layouts and hierarchy. Apply tokens, spacing, glass and icons.
- Worked examples (`details.docwrap`), framework groups (`details.fwgroup`) and the full
  command-term list (`details.ctall`) stay collapsed by default. Keep the mobile jump menu.
- Fonts: Work Sans everywhere, IBM Plex Mono for eyebrows and micro labels. Fraunces is retired.
- Icons: Lucide (ISC licence), stored as SVG files in `assets/icons/`, outline, 20–24 px,
  1.8 stroke, always with a text label. Names and placement in `icons/README.md`
  (`check-circle` is `circle-check` and `grid` is `layout-grid` in current Lucide). Add the
  Lucide licence notice to `credits/`. Never replace Criterion A–D labels, checklist text or
  bands with icons.

## How to apply it (cheapest route)

- Build `assets/glass.css` = tokens + components + overrides that remap the existing page
  variables (`--ink`, `--paper`, `--card`, `--rule`, `--slate`, `--amber`, `--display` …) and
  shared classes (`.wrap`, `.sec`, `.eyebrow`, `.topbar`, `.card`, `.tpl`, `.step`, `.band`,
  `.ck`, `.fwc`, `.docwrap` …) onto the Blue Glass tokens.
- `assets/theme.css` is linked **before** each page's inline `<style>`, so link `glass.css`
  as the **last** element in `<head>` (after `</style>`), or it will lose to page styles.
- Add that link to every page with one small script, not by hand. ~40 pages already link
  `theme.css`; 38 define the same `--ink`-style variables.
- Hand-edit only pages whose layout must change: Home, the three year workspaces, and the
  criterion strand template.

## Fixes the export needs (do these in `glass.css`)

1. `color-mix()` fails on iOS ≤ 16.1 → add solid `rgba()` fallbacks before each glass value.
2. Add `-webkit-backdrop-filter` and `-webkit-mask-image` alongside the unprefixed versions.
3. Backdrop SVGs are light-only → make dark versions from the dark tokens.
4. Status chips (`addressed`, `planned`) need dark-mode colours.
5. Do not ship the global `* {}` and `body {}` resets from `components.css`; scope them.
6. Motion goes inside `@media (prefers-reduced-motion: no-preference)` (house rule), transform
   and opacity only, ≤ 600 ms.
7. Mobile column: full width minus a 16–24 px gutter, not a fixed 342 px cap.

## Hard rules (from CLAUDE.md — still apply)

- No build step, no framework (exception: `lesson-experience-app/`, rebuilt with its own tooling).
- Never reword a checklist item. IDs are hashed from the `<span>` text (including `<small>`).
  On screen, show the `<small>` hint as its own line; do not change the markup text.
- Never invent rubric descriptors. Do not edit `examples/`.
- Existing files keep their JS style (`var`, IIFE, guarded lookups).
- Update the House style sections of `CLAUDE.md` to the Blue Glass palette, type and radii.

## Plan

1. **Pilot:** `assets/glass.css`, icons, link script; restyle `index.html`,
   `myp4-5` workspace view, `myp4-5/criterion-a.html`. Light + dark, 1440 px and 390 px.
   Stop and show Dev before continuing.
2. All remaining pages via the shared link, then fix any page that looks wrong.
3. `lesson-experience-app/` restyle and rebuild.

## Checking

- Playwright (pre-installed) screenshots of each changed page at 1440 and 390, light and dark.
  Look closely only at pages that look wrong.
- Tags balance; `node --check` on any edited inline script.
- Checklist ticks still save and load against the live Worker after restyling.
