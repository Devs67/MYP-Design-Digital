# Blue Glass redesign — build brief

Read this, `CLAUDE.md` and `design/figma-export/` before touching any page.

## Goal

Rebuild every page in the **Blue Glass layout** from the Figma file. Dev has chosen the full
redesigned layout, not a reskin: each page should match its Figma frame in structure, order and
components, at desktop (1440) and mobile (390), in light and dark.

What must survive from the current pages:
- **All wording**, especially checklist labels, band descriptors, command terms, examples.
- **All behaviour**: checklist saving and progress codes, strand tabs and `#i`-style deep links,
  quizzes and scoring, live quiz host, teacher dashboard and notes, group maker, search,
  theme toggle. Restructure the markup around the existing scripts; do not drop features.

This overrides the "keep the existing source page layouts" line in `figma-export/notes.md`.

## Sources

- **Visual system:** `design/figma-export/tokens.css` and `components.css` (newer than the PNGs
  — where they disagree, follow the CSS). Also `style-brief.md` and `icons/README.md`.
- **Layout per page:** the Figma frame for that page (table below).
  File key `FedM3qdAEpfkigDqWC4rom`, page `03 · Blue glass · Complete content`.
- **Content:** the current HTML page. The Figma text was copied from it, so where they differ,
  the HTML wins.

### Reading Figma cheaply

Never call `get_metadata` on the whole page (`127:223`) — it is over 2 MB. For each page you
build: `get_screenshot` its desktop and mobile frame, then `get_design_context` only on the
sections you need detail for. Load the Figma design-to-code guidance first, as the Figma server
requires.

## Decisions already made by Dev

- Full redesigned layout on every page (above).
- Dark mode on every page. The site toggles `:root.dark` via `assets/theme.js` and `?theme=`.
  Map the Figma `[data-theme="dark"]` tokens onto `:root.dark`.
- Worked examples, framework groups and the full command-term list are collapsed by default;
  first relevant section may be open. Keep a mobile jump menu on long guide pages.
- Fonts: Work Sans everywhere, IBM Plex Mono for eyebrows and micro labels. Fraunces is retired.
- Icons: Lucide (ISC licence) as SVG files in `assets/icons/`, outline, 20–24 px, 1.8 stroke,
  always beside a text label. Placement in `icons/README.md` (`check-circle` is `circle-check`,
  `grid` is `layout-grid` in current Lucide). Licence notice goes in `credits/`.
  Never replace Criterion A–D labels, checklist text or bands with icons.
- MYP 4 & 5 gets its own workspace page, `myp4-5/index.html` (frame 43), like MYP 1–2 and
  MYP 3. Point the year tab and the Home card at it.

## Do not copy these Figma faults (found in review)

- Text run together on import ("Step 1Identify", "7–8Explains and justifies 1234…").
  Rebuild from the HTML structure.
- Achievement bands: band number + command term as a header, step squares shown on/off,
  descriptor, then the "Added at / Missing from this band:" line under it. Band 0 is not
  "Guidance".
- Checklist: show the `<small>` hint as a second line. Do not change the label text.
- Class progress: a real table on desktop, stacked cards on mobile; title once.
- Buttons: use primary / secondary / text-link from `components.css`, not one style for all.
- Light/Dark control shows the selected mode. Home has one search, and no "Home" button on
  Home itself.

## Fixes the export needs

1. `color-mix()` fails on iOS ≤ 16.1 → solid `rgba()` fallback before each glass value.
2. Add `-webkit-backdrop-filter` and `-webkit-mask-image`.
3. Backdrop SVGs are light-only → make dark versions from the dark tokens.
4. Status chips (`addressed`, `planned`) need dark colours.
5. Do not ship the global `* {}` / `body {}` resets from `components.css` unscoped.
6. Motion inside `@media (prefers-reduced-motion: no-preference)`; transform/opacity; ≤ 600 ms.
7. Mobile column = full width minus a 16–24 px gutter, not a fixed 342 px cap.

## Hard rules (CLAUDE.md — still apply)

- No build step, no framework. Exception: `lesson-experience-app/`, rebuilt with its own tooling.
- **Never reword a checklist item.** IDs are a hash of the `<span>` textContent (including
  `<small>`), keyed by `data-panel`. Keep the text and the panel exactly; after each criterion
  page, confirm every label still hashes to the same ID (the Figma `Checklist · i…` instance
  names list the expected IDs).
- Never invent rubric descriptors. Do not edit `examples/`.
- Shared CSS lives in `assets/` (`glass.css` plus page-type files if useful) — no new
  700-line copies inside pages.
- Rewritten files may use modern JS; partially edited files keep their existing style.
- Update the House style sections of `CLAUDE.md` to Blue Glass in the first session.

## Page → frame map

Desktop / mobile frame IDs.

| Page | Frame | Desktop | Mobile |
|---|---|---|---|
| `index.html` | 02 Home | 127:387 | 127:388 |
| `index.html` dark reference | D02 | 185:6897 | 185:6960 |
| `appendix-citations.html` | 01 | 127:385 | 127:386 |
| `teacher-bookmarks.html` | 03 | 127:389 | 127:390 |
| `tsc.html` | 04 | 127:391 | 127:392 |
| **MYP 1–2** | | | |
| `myp1-2/index.html` | 21 | 127:413 | 127:414 |
| `myp1-2/criterion-a.html` strands i–iv | 08, 09, 10, 11 | 127:399, 151:5935, 151:6029, 151:6123 | 127:400, 151:5982, 151:6076, 151:6170 |
| `myp1-2/criterion-b.html` strands i–iv | 15, 16, 17, 18 | 127:407, 151:6363, 151:6457, 151:6553 | 127:408, 151:6410, 151:6505, 151:6601 |
| `myp1-2/criterion-b-fa-myp2.html` quiz / review | 12 / 13 | 127:401 / 127:403 | 127:402 / 127:404 |
| `myp1-2/criterion-b-fa-quiz.html` closed / archived | 14 / 76 | 127:405 / 152:6467 | 127:406 / 152:6504 |
| `myp1-2/brief-builder-task-sheet.html` | 05 | 127:393 | 127:394 |
| `myp1-2/brief-builder.html` | 06 | 127:395 | 127:396 |
| `myp1-2/CRAAP_MYP1.html` | 07 | 127:397 | 127:398 |
| `myp1-2/frameworks.html` | 19 | 127:409 | 127:410 |
| `myp1-2/ignite-worksheet_2.html` | 20 | 127:411 | 127:412 |
| `myp1-2/live-host.html` / lobby | 22 / 71 | 127:415 / 127:489 | 127:416 / 127:490 |
| `myp1-2/PEEL_MYP1_Strand_i.html` | 23 | 127:417 | 127:418 |
| `myp1-2/quiz-results.html` | 24 | 127:419 | 127:420 |
| `myp1-2/sa.html` | 25 | 127:421 | 127:422 |
| `myp1-2/sensing-our-world-quiz.html` | 26 | 127:423 | 127:424 |
| `myp1-2/SWOT.html` | 27 | 127:425 | 127:426 |
| `myp1-2/unit1-resources.html` | 28 | 127:427 | 127:428 |
| `myp1-2/units.html` | 29 | 127:429 | 127:430 |
| **MYP 3** | | | |
| `myp3/index.html` | 39 | 127:443 | 127:444 |
| `myp3/criterion-a.html` strands i–iv | 32, 33, 34, 35 | 127:435, 151:7119, 151:7213, 151:7307 | 127:436, 151:7166, 151:7260, 151:7354 |
| `myp3/criterion-b.html` | 36 | 127:437 | 127:438 |
| `myp3/brief-builder-task-sheet.html` | 30 | 127:431 | 127:432 |
| `myp3/brief-builder.html` | 31 | 127:433 | 127:434 |
| `myp3/fa.html` | 37 | 127:439 | 127:440 |
| `myp3/frameworks.html` | 38 | 127:441 | 127:442 |
| `myp3/MYP3_Strand_iii_Product_Analysis-FA.html` | 40 | 127:445 | 127:446 |
| `myp3/Research_Planner.html` | 41 | 127:447 | 127:448 |
| `myp3/units.html` | 42 | 127:449 | 127:450 |
| **MYP 4 & 5** | | | |
| `myp4-5/index.html` (new) | 43 | 127:451 | 127:452 |
| `myp4-5/criterion-a.html` strands i–iv | 44, 45, 46, 47 | 127:453, 152:3689, 152:3783, 152:3877 | 127:454, 152:3736, 152:3830, 152:3924 |
| `myp4-5/criterion-b.html` strands i–iv | 48, 49, 50, 51 | 127:455, 152:5223, 152:5317, 152:5411 | 127:456, 152:5270, 152:5364, 152:5458 |
| `myp4-5/criterion-c.html` strands i–iv | 52, 53, 54, 55 | 127:457, 152:5555, 152:5649, 152:5743 | 127:458, 152:5602, 152:5696, 152:5790 |
| `myp4-5/frameworks.html` | 56 | 127:459 | 127:460 |
| `myp4-5/journey.html` | 57 | 127:461 | 127:462 |
| `myp4-5/sa.html` | 58 | 127:463 | 127:464 |
| `myp4-5/teacher.html` / key screen | 59 / 72 | 127:465 / 127:491 | 127:466 / 127:492 |
| `myp4-5/teacher.html` dark reference | D41 | 185:7023 | 185:7140 |
| `myp4-5/units.html` | 60 | 127:467 | 127:468 |
| **Lesson experience** | | | |
| app: timeline / blueprint / cards | 61 / 62 / 63 | 127:469 / 127:471 / 127:473 | 127:470 / 127:472 / 127:474 |
| app: lesson detail / today's lesson | 64 / 65 | 127:475 / 127:477 | 127:476 / 127:478 |
| app: resource locker | 66 | 127:479 | 127:480 |
| app: strand details A / B | 77 / 78 | 152:6541 / 152:6615 | 152:6578 / 152:6652 |
| app: design philosophy pop-up | 79–83 | 152:6689 … 152:6977 | 152:6725 … 152:7013 |
| `lesson-experience/myp2a.html` | 67 | 127:481 | 127:482 |
| `lesson-experience/myp2d.html` | 68 | 127:483 | 127:484 |
| `lesson-experience/myp3b.html` | 69 | 127:485 | 127:486 |
| `lesson-experience/myp4.html` | 70 | 127:487 | 127:488 |
| **Group maker** | | | |
| `group-maker/index.html` join / joined | 73 / 74 | 127:493 / 127:495 | 127:494 / 127:496 |
| `group-maker/teacher.html` / clear dialog | 75 / 87 | 127:497 / 152:7265 | 127:498 / 152:7301 |
| **Shared dialogs** | | | |
| Progress code: get / enter / connected | 84 / 85 / 86 | 152:7049 / 152:7121 / 152:7193 | 152:7085 / 152:7157 / 152:7229 |
| Site search | 88 | 152:7337 | 152:7373 |

Redirect pages (`criterion-a.html`, `criterion-b.html`, `frameworks.html`,
`lesson-experience.html`, `teacher.html` at the root) stay as they are.

## Sessions

Run each in a **fresh chat** to keep cost down. Each ends with a push, screenshots and a stop.

**Status:** sessions 1 to 6 are done and merged into `claude/epic-hamilton-5yr4s4`. Next is
step 8 (berry), then step 7 (final check and go live). Step 8 must also repoint the section 12
controls (`.myp-chips`, `.myp-seg`, `.fw__src` rows in `myp4-5/frameworks.html`), which use
`--myp-accent`, and the copy of `.myp-chips` in `assets/glass-tools.css`.

Sessions 3 to 6 ran in parallel on their own branches and each added a "section 12" to
`glass.css`. After the merge they are: **12** session 2 (year resource pages), **13** session 3
(reference pages), **14** session 5 (shared pages, group maker, lesson logs). Session 4 put its
tool-page styles in `assets/glass-tools.css` and session 6 in the app's own `src/app.css`.
Where two sessions styled the same class differently, the merge kept both looks and scoped them:

- `.myp-stats` / `.myp-stat`: section 12 has the box and the `<dl>` form (dt / dd); section 14
  adds the `<div>` form with `.myp-stat__label` / `.myp-stat__value` under `div.myp-stats`.
- `.myp-embed`: one box, iframe and bar (section 14). Section 13 adds the collapsible
  `<details>` form with a summary row. `glass-tools.css` sizes the MYP 1–2 slide embeds.
- `.myp-note` is the session 3 note (body size). The smaller session 5 note is
  `.myp-note--small` (`tsc.html` was given that class; no wording changed).
- `.myp-input select` in section 12 now only styles a select with no class of its own, so the
  group maker's `.gm-select` and the app's `.lx-select` keep their own rules.
- Session 3's `.myp-panel__head > *{margin:0}` applies everywhere. It tightens the "Start here"
  eyebrow on the session 1 Home by 11 px above and below; step 8 replaces that page anyway.

Checked after the merge: every rebuilt page was rendered from its own session branch and from
the merged branch at 1440 and 390, and every element's box and computed styles compared. Apart
from the Home eyebrow above, they match. No page's checklist text was touched by the merge.

Session 1: commit `bb3536d` laid the foundation (`assets/glass.css`, backdrops, Lucide icons,
`design/link-glass.js`, Light/Dark control and Search dialog in `assets/theme.js`, `CLAUDE.md`
house style). The follow-up rebuilt Home and `myp4-5/criterion-a.html` to their frames, created
`myp4-5/index.html`, and moved progress codes into `assets/progress.js` with the 84–86 dialogs.
Every `#myp4-5` link on the site now points at the workspace; Home still redirects old
`index.html#myp4-5` bookmarks.

Session 2 finished MYP 4 & 5. Criteria B and C now have A's shell (tools bar, hero, strand
buttons, "Strand guidance" panel, footer) and use `assets/progress.js` (`criterion-b`,
`criterion-c`); their inline sync code is gone and every checklist ID is unchanged (B 44, C 42).
B's Preview buttons now work (the markup was there but the handler was missing). Frameworks,
journey, sa, units and teacher were rebuilt on `.myp-panel` with their wording intact.
Frameworks gained the frame's "Search frameworks" field and a "Search the site" button beside
the criterion filters. Teacher: the key screen is a panel with the input field, the student
table becomes stacked cards on phones, and note status is a three-button control (still open /
planned / addressed). The Worker host is blocked from the build container, so the teacher
dashboard was checked against mocked data only; check it once with the real key.

Shared pieces: `glass.css` section 10 (`.myp-hero`, `.myp-panel`, `.myp-list` / `.myp-row`,
`.myp-input`, `footer.myp-footer`, strand-page panel styles) and section 12 (`.docwrap` embeds
inside a panel, `.myp-kv` unit table, `.myp-stats`, the `.tl` timeline, `.myp-chips` filters,
`.myp-seg` segmented control, `select` in `.myp-input`).

Session 3 (MYP 3): every page in `myp3/` is rebuilt on the shell (header, tools bar, hero,
panels, footer). New shared pieces: `glass.css` section 13 (`.myp-defs` for units, `.myp-note`,
the collapsible `.myp-embed` for embedded slides, `.myp-panel__lead`) and `assets/worksheet.css`
for the MYP 3 Brief Builder and Task Sheet. Research Planner and Product Analysis keep inline
CSS so their "Save my copy" download still looks right offline. MYP 3 checklists stay in-memory
only (no progress code), although frame 32 shows the progress card: that needs a Worker page key
and a teacher view, so it waits for Dev.

Session 4 (MYP 1–2): every page in `myp1-2/` has the pill header, tools bar (back link, Search,
Design Team, Design quote, Light / Dark), hero, glass panels and Figma footer. Tool pages
(quizzes, worksheets, live host, results) also link `assets/glass-tools.css`, which holds the
quiz cards, confirm dialog, result tiles, teacher tables (stacked cards on phones), the Brief
Builder components (`main.bb`) and the PEEL / CRAAP / SWOT worksheet shell (`main.ws`, page
colours on `--ws-*` tokens with dark values). So the two Brief Builders are styled from
different files: MYP 3 from `worksheet.css`, MYP 1–2 from `glass-tools.css`. New behaviour, from
frames 14 / 76: the closed MYP 1 FA has "Review archived assessment"
(`criterion-b-fa-quiz.html?view=archive`, with `&level=2` for Level 2), a read-only view that
marks the right answer and shows the feedback on every question; nothing is saved or sent.

Session 5 (shared pages): `appendix-citations.html`, `teacher-bookmarks.html`, `tsc.html`,
`group-maker/` (join, joined, teacher, clear-roster dialog) and the four
`lesson-experience/*.html` logs. New shared pieces in `glass.css` section 14 (`.myp-note--small`,
the `<div>` stat tiles, `.myp-button--danger`, `.myp-hero__chips`, `.myp-panel__bar`,
`.myp-label`, `.myp-hint`); the logs share `assets/lesson-log.css`. Shared pages and the group
maker use **Home** in the tools bar (they have no workspace); the logs use **Back to Lesson
Experience**. The Figma frames for these pages are flat text imports, so their structure was
rebuilt from the HTML.

Session 6 (lesson experience app): see step 6 below and `lesson-experience-app/README.md`.

1. **Foundation + pilot:** `assets/glass.css`, dark backdrops, icons, shared header / tools bar /
   footer / search dialog / progress-code dialogs, `CLAUDE.md` house-style update. Then Home,
   `myp4-5/index.html` and `myp4-5/criterion-a.html` (all four strands). Stop for Dev's review.
2. Rest of MYP 4 & 5: criterion B and C, frameworks, journey, sa, units, teacher + key screen.
3. MYP 3: all pages.
4. MYP 1–2: all pages, including quizzes, live host and worksheets.
5. Shared pages (appendix, bookmarks, tsc), group maker, `lesson-experience/*.html`.
6. `lesson-experience-app/` restyle and rebuild. **Done:** the app now links the site's
   `theme.css`, `glass.css` and `theme.js` instead of using Tailwind, with the shared header,
   tools bar and footer in its `index.html`. See `lesson-experience-app/README.md`.
7. Final check of the whole site, then merge to `main` only after Dev says yes.
8. **Berry interaction colour + new Home.** See the section below. Dev's numbering; it runs
   before step 7.
9. **Real glass everywhere + the gliding selection pill.** See the section below. Runs after
   step 8 and before step 7.

## Step 8: berry interaction colour and the new Home

Source: `design/figma-export-berry/` (Home only, desktop frame `229:7359`; there is no mobile
frame, so use the `@media (max-width: 800px)` rules in its `components.css`).

**Decided by Dev:** berry is the interaction colour on **every page**, and it covers buttons,
selected tabs and focus as well as links. Headings, reading text, the A–D overview and the
criterion colours stay neutral and unchanged.

### Tokens (add to `glass.css`, light / dark)

```
--myp-interaction        #A13C66 / #EE9FC0   links, nav, year tabs, actions, primary button fill
--myp-interaction-hover  #7D2D4E / #F7C6DA   hover and pressed
--myp-interaction-tint   #F8E9F0 / #3A2233   selected tab fill, secondary button fill
--myp-on-interaction     #FFFFFF / #0B1220   label on a primary button
```

The export has light values only; the dark ones above were chosen for contrast. Measured
contrast: #A13C66 is 5.2–6.3:1 on white, page, tint and field blue (passes AA), but only
2.5–3.0:1 on the dark surfaces, so it must not be used in dark mode. #EE9FC0 is 7.1–9.2:1 on
the dark surfaces and tints. White on #A13C66 is 6.3:1; #0B1220 on #EE9FC0 is 9.2:1.

### Where berry goes

Everything a student can click or that shows what is selected: links and card actions
("Enter MYP 1 & 2 →", "Open citation guide →"), header year tabs, Design Team, Light / Dark
(selected mode shown), the tools bar actions, strand tabs (selected = berry tint fill, berry
text, berry edge), primary buttons (berry fill, white bold label), secondary buttons (berry tint
fill, berry text), checklist ticks, focus rings (solid 2px berry), interactive icons.

Stays blue: the MYP brand mark, the backdrop fields and grid, borders, `--myp-tint` surfaces
that are not selected states. Stays as is: success / warning / error, status chips, criterion
colours, teacher-only `--dev`.

Implement it by pointing the interactive selectors in `glass.css` section 11 at the new tokens,
not by editing pages one by one. Update the colour table in `CLAUDE.md`.

### New Home

Rebuild `index.html` to the berry frame: "Big ideas. Start here." hero with the site search
field, the A / B / D / C cycle tiles, "Where will you begin?" year cards, "A little help along
the way." cards (citations, task-specific clarifications, teacher bookmarks), footer. It
replaces the session 1 Home. Keep the search working with the existing index, keep the theme
control and the old `index.html#myp4-5` redirect.

Do not copy from the export: "MYP 4&5" (write "MYP 4 & 5"), the Light / Dark pair with no
selected state, the fixed 696 px / 520 px hero columns (make them fluid), empty space under the
year card text if `min-height: 292px` leaves a gap, the unscoped `* {}` / `body {}` resets,
`color-mix()` without an `rgba()` fallback, `backdrop-filter` without `-webkit-`.

### Motion (Dev's spec, final — overrides `animation-notes.md` where they differ)

**Background (Flow behaviour from feralui.dev/gradients).**
- 3–4 large white and soft-blue fields (#FFFFFF, #DCEBFF, #A9D0FF), 48–96 px blur,
  12–32% opacity. Dark mode: same motion with dark-token fields.
- Deform them continuously with translate, scale, rotate **and changing border-radius**.
  No simple left-to-right blob movement.
- Loop durations **19 s, 23 s and 27 s**, slow ease-in-out, `alternate` direction.
- Grid, cards, text and header stay completely still. No berry in the background.
- CSS/SVG is enough; no shader.
- Performance: border-radius on a blurred layer repaints every frame. Apply the blur once on a
  wrapper, and drop the border-radius keyframes (keep translate/scale/rotate) on small or touch
  screens (`(max-width: 900px)`, `(hover: none)`) so school iPads stay smooth. Pause the loop
  when the tab is hidden if that is easy.
- Applies wherever the Blue Glass backdrop shows (Home first; other pages may share it if it
  stays smooth).

**Page entrance.** Header: fade + rise 8 px, 350 ms. Hero: fade + rise 12 px, 450 ms. Cycle
panel: fade, 500 ms. Cards: fade + rise 12 px, 450–700 ms. Stagger sections 50–70 ms. CSS only
with `animation-fill-mode: both`, so content is visible if anything fails.

**Hover and focus (site-wide).** Links: berry colour transition 180–220 ms with a subtle
underline or 1–2 px rise. Cards that are links: lift 2 px and stronger shadow, 220–280 ms.
Keyboard focus: berry outline, animated over 160 ms. The A–D overview is not clickable and does
not move.

**A → B transition** (criterion tabs on the workspaces, strand tabs on criterion pages). Header
and background stay fixed. Current content fades to 15% opacity; incoming content slides
24–32 px into place; 450–550 ms, ease-out. The selected button or criterion indicator glides
with the content. Attach the interaction to the button or action label, not the whole card.
Tabs, deep links and the checklist tracker keep working.

**Theme transition.** Crossfade background, surfaces, borders and text over 300–400 ms (use
`document.startViewTransition` where supported, colour transitions on the main surfaces
otherwise). Layout dimensions unchanged. No white flash between themes.

**Reduced motion** (`prefers-reduced-motion: reduce`). Stop the fluid background (static
backdrop). Remove entrance movement and card lift. Keep transitions under 150 ms. Focus and
selected states stay visible.

**`CLAUDE.md` exceptions to record (approved by Dev):** the background loop may exceed ~600 ms
and may animate `border-radius`; the theme crossfade may transition colours. Everything else
stays transform/opacity, under ~600 ms, inside `prefers-reduced-motion: no-preference`.

Check: no layout shift or horizontal scroll, text stays readable over the moving background,
berry links work by keyboard and touch; desktop, 390 px and reduced motion.

## Step 9: real glass everywhere and the gliding selection pill

Dev's feedback after step 8: the glass look is not coming through, and the gliding pill from
the "Glide" frames (`88:1094` … `88:2086`, the black "Selection pill" behind the active item)
is missing. Dev wants both **across the whole website**, including the lesson experience app.

### Glass

The page should read as frosted glass over the moving blue fields, not white cards on blue.
- Header, tools bar, section panels, **cards** and dialogs all get glass: translucent surface
  (cards ~72–80% light / ~70% dark, panels ~80–86%, dialogs and long reading panels stay ~94%
  for legibility), `backdrop-filter: blur(18–24px) saturate(140%)` with the `-webkit-` pair, a
  1px border plus a faint top highlight (inset 0 1px 0 rgba(255,255,255,.6); dark: .08), and
  the soft shadow. This replaces "cards inside a panel are solid surfaces".
- With the fluid background moving behind, the blur must be visible: check that colour shifts
  show through cards on Home, a workspace and a criterion page.
- Text contrast is checked on the glass at its lightest and darkest point over the fields
  (body text ≥ 4.5:1, berry links ≥ 4.5:1). Raise opacity where it fails.
- Performance: on small or touch screens (`(max-width: 900px)`, `(hover: none)`) keep the
  translucency but use 10–12px blur and only on the header, tools bar, dialogs and the cards in
  view; never blur more than a dozen large layers at once. `rgba()` fallbacks before every
  `color-mix()`. Update the Glass paragraph in `CLAUDE.md`.

### Gliding selection pill

One shared, dependency-free script, `assets/glide.js` (plain JS, IIFE, `var`, guarded), linked
on every page after `theme.js`. Any group marked `data-glide` gets one pill element behind its
items that **slides to the selected or clicked item** instead of the highlight jumping.
- Apply it to every selector group on the site: header year tabs, Light / Dark, the tools bar
  where it has a current item, strand tabs (i–iv) on every criterion page, the criterion
  navigation (A–D) on the three workspaces, framework / bookmark / units filter chips, the
  teacher section filter, quiz option groups where one answer is chosen, the group maker size
  control, and the lesson app view switcher (Timeline / Cards / Blueprint / Resources), which
  needs the same behaviour in React and a rebuild.
- Look: pill = berry tint fill with a 1px berry edge and soft shadow; the selected label is bold
  berry. (The Glide frames' black pill becomes berry tint under the berry colour rules.)
- Motion: `transform: translateX()` plus `width`, 280–350 ms, ease-out; it moves with the A → B
  content transition from step 8. `width` is an approved exception (the pill is absolutely
  positioned, so nothing else reflows). Under reduced motion the pill jumps with no animation.
- Links that go to another page (year tabs, workspace criteria): add cross-document view
  transitions (`@view-transition { navigation: auto; }` with a shared `view-transition-name` on
  the pill) so it glides between pages in browsers that support it; other browsers simply load
  the new page with the pill already in place.
- Behaviour stays correct without JS (the selected item keeps its normal highlight), with
  keyboard (arrow keys / Tab), on resize and font load (re-measure), in both themes, and when
  a group wraps onto two lines on mobile (the pill follows the item's row).
- Never change tab behaviour, deep links (`#ii`), checklist panels or quiz scoring.

### Checking

Screen-record or screenshot sequences of the pill moving on Home, a workspace, a criterion page
and the lesson app; glass visibly blurring the moving fields; contrast pass; reduced motion;
1440 and 390, light and dark.

## Checking, every session

- Playwright (pre-installed) screenshots at 1440 and 390, light and dark; compare with the
  frame screenshots. Look closely only where they differ.
- Tags balance; `node --check` on edited inline scripts.
- Every behaviour on the page still works: tabs and deep links, checklist save/load against the
  live Worker, quizzes, forms, dialogs, theme toggle.
- Checklist IDs unchanged (see Hard rules).
