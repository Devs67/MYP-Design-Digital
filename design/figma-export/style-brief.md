# Blue Glass UI style brief

## Direction

Create a calm, editorial learning workspace for MYP Digital Design. The interface should feel like clear glass panels over a soft blue study surface: generous space, strong hierarchy and quiet depth. Content is the hero; glass, gradients and icons provide orientation rather than decoration.

## Visual language

- Light mode uses an almost-white blue background, white translucent surfaces, ink text and a medium blue action colour.
- Dark mode uses navy surfaces and background, pale text and a lighter blue accent so controls remain readable.
- Use a subtle 32 px grid and two blurred blue fluid forms behind the content. Keep the grid low contrast.
- Panels use 24 px corners, a 1 px border, a soft shadow and 18 px backdrop blur. Buttons use 16 px corners; chips use a pill radius.
- Use Work Sans for display, section, card, body and label text. Use IBM Plex Mono for eyebrows and micro labels.

## Layout

The shared header contains the linked MYP brand, year tabs and utility actions. Every interior page keeps a visible Back to workspace action, Search, Design Team and Light / Dark controls. Desktop content is centred at 1312 px; mobile content uses a 342 px column with a two-column utility wrap.

## Components

Build Header, Tools bar, Resource card, List row, Input / Dropdown, Primary / Secondary / Text-link buttons, Checklist row, Achievement band, Dialog, Status card and Footer. Every component needs light, dark, hover, selected and disabled or unavailable states where the source page uses them.

## Interaction

Use a short ease-out glide for page transitions and a gentle dissolve for overlays. Keep motion around 200–280 ms. Respect `prefers-reduced-motion`. Dialogs open as overlays; Close and Cancel dismiss them. Theme controls switch the semantic colour mode, not individual hard-coded colours.

## Icon system

Use one consistent 20–24 px outline icon set with a 1.8 px stroke. Pair icons with visible labels. Use icons for Home, Back, Search, Design Team, Light / Dark, external links, guides, task sheets, Download, Save, Copy, Refresh, Clear, completion and lesson views. Keep Criterion A–D labels and exact checklist text as text.

## Content rules

Keep the real source wording for strands, command terms, examples, frameworks, achievement bands, traps and checklists. Long worked examples and framework groups start collapsed; the first relevant section can be open as an orientation cue. Never alter a checklist label without updating its source-derived ID.

## Implementation handoff

Start with `tokens.css`, then `components.css`, then the two responsive SVG backdrops. Use the four PNGs as visual regression references. The Figma index is the source of truth for the full page inventory and prototype links.
