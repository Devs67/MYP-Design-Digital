# Working notes for Claude Code

Read `README.md` first for what this project is and how it is structured.
This file is the working rules.

---

## Hard rules

**Browser storage (`localStorage`, `sessionStorage`) is allowed, approved by Dev.** Wrap every
read and write in `try`/`catch`, and make the page work without it: private browsing and some
school devices block it. Remember that school iPads are often shared, so anything stored is
visible to the next student on that device. State that must follow a student between devices
still lives in the URL (`?code=...`) or in D1 via the Worker.

**Never commit the admin key.** `ADMIN_KEY` is a Cloudflare secret read via `env.ADMIN_KEY`.
If you see a key literal appearing anywhere in a committed file, that is a bug — flag it.

**Never reword an existing checklist item without saying so.** Item IDs are hashed from the
item's text. Rewording detaches every student's saved progress for that item and any teacher
note attached to it. If a rewording is genuinely needed, say plainly that saved data will be
lost for that item and let Dev decide.

**Do not add a build step.** No npm, no bundler, no framework. Plain HTML, CSS and vanilla JS,
served straight from GitHub Pages. If a task seems to need React or a build pipeline, say so
and explain the trade rather than introducing one.
Exception, approved by Dev: `lesson-experience-app/` is a React + Vite app built into
`lesson-experience/app/`. See its README before editing.

**Do not edit files in `examples/`.** They are real student portfolios.

---

## House style — CSS

The site uses the **Blue Glass** look. Its single source is `assets/glass.css`, linked as the
**last** element in `<head>` on every page so it wins over the page's own `<style>`. New pages
link it the same way (`node design/link-glass.js` adds it to any page that lacks it). The Figma
handoff it was built from is in `design/figma-export/`; the plan is `design/BUILD-BRIEF.md`.
Quizzes, worksheets and teacher screens also link `assets/glass-tools.css` straight after
it (section list at the top of that file).

Tokens, light / dark (dark applies under `:root.dark`):

```
--myp-bg       #F5F8FF / #0B1220   page background
--myp-surface  #FFFFFF / #182538   cards, dialogs
--myp-text     #111111 / #F4F7FF   body text
--myp-muted    #515D70 / #B5C3D8   secondary text
--myp-accent   #2862AE / #92C5FF   brand blue: the MYP mark, eyebrows, labels, bullets, bands
--myp-border   #BACEE9 / #395474   borders
--myp-tint     #E8F1FF / #203955   chips, selected tabs, secondary buttons, soft fills
--myp-body     #344054 / #D3DCEA   body text: descriptions, instructions, longer reading
--myp-disabled-bg / -text   #EEF2F7 + #78869B / #1E2A3B + #8391A6
--myp-ok       #236B50 / #8BE3B5   success: saved, completed, addressed
--myp-warn     #8A5B12 / #F2D37A   warning: needs attention
--myp-error    #B42318 / #FDA29B   error: invalid input, failed action
```

Berry is the interaction colour: everything a student can click, and what is selected.

```
--myp-interaction        #A13C66 / #EE9FC0   links, nav, year tabs, actions, primary button fill,
                                             checklist ticks, focus rings, interactive icons
--myp-interaction-hover  #7D2D4E / #F7C6DA   hover and pressed (--myp-hover is the old name for it)
--myp-interaction-tint   #F8E9F0 / #3A2233   selected tab fill, secondary button fill, the pill
--myp-on-interaction     #FFFFFF / #0B1220   label on a primary button
```

Never use #A13C66 in dark mode: it is only 2.5 to 3.0:1 on the dark surfaces. Blue stays on the
brand mark, eyebrows, labels, bullets, bands, borders and the backdrop. Success, warning, error,
status chips, criterion colours and `--dev` are unchanged.

How Dev's colour table is applied (`glass.css` section 11):

- Page and section headings `--myp-text` (#111). Reading text `--myp-body`. Captions and
  metadata `--myp-muted`.
- Links, navigation, card actions and clickable headings (a card's title when the whole card
  is a link, anything that opens or closes) are `--myp-interaction` and **bold**.
- Selected tabs: `--myp-interaction-tint` fill with bold berry text and a berry edge.
- Primary button: berry fill, white bold label (dark mode: light-berry fill, dark label).
  Secondary button: berry tint fill, berry text. Both go `--myp-interaction-hover` on hover and
  press.
- Keyboard focus is a solid 2px berry outline. Disabled controls use the disabled pair.
- Headings, reading text and the A to D overview on Home stay neutral.
- Fluid background: #FFFFFF, #DCEBFF and #A9D0FF fields. Grid: blue at 6%.

The old names still work and are remapped in `glass.css`: `--ink` → text, `--paper` → bg,
`--card` → surface, `--rule` → border, `--slate` → muted, `--amber` → accent. `--moss` stays
success / progress, `--clay` stays warnings and "what is missing", `--dev` stays teacher-only.
Criterion colours `--a` teal, `--b` gold, `--c` green, `--d` red are unchanged.

Glass (`glass.css` section 17): the page reads as frosted glass over the moving fields. Header,
tools bar and panels are 84% (dark 82%), cards 76% (dark 70%), dialogs and long reading panels
94%. Each has a 1px border, a faint top highlight and the soft shadow. Blur is
`var(--myp-glass-filter)`: 20px + saturate(140%) on large screens; 11px on small or touch
screens, and there only on the header, tools bar, dialogs and Home cards. Cards inside a panel
are translucent but not blurred themselves. Never blur more than about a dozen large layers.

Selector groups (year tabs, Light / Dark, strand tabs, filter chips, segmented controls, the
lesson app tabs) get a gliding pill from `assets/glide.js`, linked after `theme.js`. Mark a new
group `data-glide`; the selected item is the child with `.on`, `.active`, `aria-pressed="true"`
or `aria-current`. The page's own script still decides what is selected.

Typefaces: **Work Sans** for everything, display headings included. **IBM Plex Mono** for
eyebrows, micro labels and codes. Fraunces is retired. Loaded from Google Fonts.

Corner radii: 24px on panels and dialogs, 16px on cards and buttons, 12px on fields and
checklist rows, pill (999px) on chips and progress bars.

The MYP 3 Brief Builder and its Task Sheet also link `assets/worksheet.css`, just before
`glass.css`; its classes start with `ws-`. (The MYP 1–2 copies use `glass-tools.css` instead.)
The four `lesson-experience/*.html` logs link `assets/lesson-log.css` after `glass.css`. Worksheets with a "Save my copy (.html)" button
(Research Planner, Product Analysis) keep their CSS inline instead, written on the tokens with a
light fallback (`var(--myp-surface,#FFFFFF)`), because the downloaded copy cannot reach `assets/`.

Icons: Lucide outline SVGs in `assets/icons/`, 20–24px, stroke 1.8, always beside a text label.
See `assets/icons/README.md`.

`color-mix()` needs an `rgba()` fallback (iOS 16.1 and older). Pair `backdrop-filter` and
`mask-image` with their `-webkit-` versions.

**Motion must sit inside `@media (prefers-reduced-motion: no-preference)`.** Animate only
`transform` and `opacity`. Nothing longer than ~600ms. Scroll reveals must fail *visible* —
if JS or IntersectionObserver is unavailable, content shows immediately rather than staying
hidden.

Exceptions, approved by Dev (`glass.css` sections 16 and 17). Nothing else may break the rule:

- The fluid background loop runs 19 s, 23 s and 27 s and animates `border-radius`.
- The theme crossfade transitions colours (300–400 ms).
- Links fade their colour over 200 ms.
- The keyboard focus outline eases in over 160 ms.
- The selection pill transitions `width` as well as `transform` (it is absolutely positioned,
  so nothing reflows).

Under `prefers-reduced-motion: reduce` the background is still, nothing enters or lifts, and the
pill jumps.

Strand workspace pilot (`myp4-5/strand-pilot.html`, `design/BUILD-BRIEF.md` step 10): its layout
CSS is `assets/strand.css`, linked after `glass.css` on that page only; classes start with `sw-`.
The page is flat: white cards with a 1px border, no moving backdrop and no blur. Exception,
approved by Dev, for this page only: "Open writing template" is a blue (`--myp-accent`) button.
Everything else that can be clicked or is selected stays berry.

---

## House style — JavaScript

One `<script>` block at the end of each page, wrapped in an IIFE.

Written defensively, because it runs on school devices and student phones:

- `var`, not `let`/`const`, in the existing files — stay consistent within a file
- Index loops over NodeLists, not `forEach`, in older sections
- No `:scope`, no optional chaining, no arrow functions in the existing code
- Guard every DOM lookup — `if (!el) return;`
- Wrap anything that can throw

New code may use modern syntax if the whole file is being rewritten, but do not mix styles
inside one file.

---

## House style — writing

The site is read by MYP 4 students, often mid-assessment on a phone. Content should be:

- **Direct.** Short sentences. No filler.
- **Specific.** "Cite 10–12 secondary sources" not "cite plenty of sources".
- **Honest about weaknesses.** Worked examples carry both a "why this works" note and, where
  relevant, a "what is missing" note. Do not present flawed exemplars as flawless.
- **British spelling**, except where quoting IB or a student verbatim.
- **Never invent a rubric descriptor.** Band wording comes from Dev's task-specific
  clarification. If a band's wording is unknown, ask rather than writing a plausible version.

Avoid: em-dash-heavy prose, "delve", "leverage", "in today's fast-paced world", bold on every
other phrase.

---

## Progress codes

Checklist saving lives in `assets/progress.js`, linked after the page script with the page's
Worker key: `<script src="../assets/progress.js" data-page="criterion-a"></script>`. It adds the
"Save your progress." card above every `.clbar` and the Get / Enter / Connected dialogs. Never
change its `hash()` or `labelOf()`, and never change a page's `data-page` key: saved ticks and
teacher notes hang off both. All three MYP 4 & 5 criterion pages use it (`criterion-a`,
`criterion-b`, `criterion-c`). MYP 3 checklists are in-memory only: no Worker page key exists
for them yet.

---

## Adding a new strand

1. Write the content into `<div data-panel="X">` in the criterion page
2. Remove `hidden` from that div
3. Remove `todo` from its tab button
4. Update `TOTALS` in `teacher.html` with that strand's checklist item count

The checklist tracker, mobile jump menu and scroll reveal all wire themselves up
automatically. No script changes needed.

Follow the running order documented in `README.md` so strands stay consistent.

---

## Adding a new criterion page

Copy `criterion-a.html`, strip the panel contents, change the objectives and tabs.

This is the right moment to extract the shared CSS into `assets/style.css` — do not create a
fifth copy of 700 lines of duplicated styles.

Then on `index.html`, turn that criterion's tile from a `<div>` into an `<a>` and change
"Coming" to "Open".

---

## Testing

There is no test suite. Before saying a change is done:

- Confirm HTML tags balance (`<div>` count matches `</div>`)
- Syntax-check the inline script — `node --check` on the extracted JS
- Open in a browser at desktop and at ~390px wide
- If the change touches the API, test against the live Worker, not `file://`

---

## Things Dev has already decided

- Progress codes go in the URL rather than browser storage, so a bookmark carries them
- The teacher page is linked from the landing page — the key protects the data, not obscurity
- `events` table stays, even though nothing reads it yet
- Three-state teacher notes (open / planned / addressed), not a simple done toggle
- No AI-generated grades. Feedback tooling, if built, diagnoses and never scores
