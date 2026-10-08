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

1. **Foundation + pilot:** `assets/glass.css`, dark backdrops, icons, shared header / tools bar /
   footer / search dialog / progress-code dialogs, `CLAUDE.md` house-style update. Then Home,
   `myp4-5/index.html` and `myp4-5/criterion-a.html` (all four strands). Stop for Dev's review.
2. Rest of MYP 4 & 5: criterion B and C, frameworks, journey, sa, units, teacher + key screen.
3. MYP 3: all pages.
4. MYP 1–2: all pages, including quizzes, live host and worksheets.
5. Shared pages (appendix, bookmarks, tsc), group maker, `lesson-experience/*.html`.
6. `lesson-experience-app/` restyle and rebuild.

## Checking, every session

- Playwright (pre-installed) screenshots at 1440 and 390, light and dark; compare with the
  frame screenshots. Look closely only where they differ.
- Tags balance; `node --check` on edited inline scripts.
- Every behaviour on the page still works: tabs and deep links, checklist save/load against the
  live Worker, quizzes, forms, dialogs, theme toggle.
- Checklist IDs unchanged (see Hard rules).
