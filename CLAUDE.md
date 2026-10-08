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

Tokens, light / dark (dark applies under `:root.dark`):

```
--myp-bg       #F5F8FF / #0B1220   page background
--myp-surface  #FFFFFF / #182538   cards, dialogs
--myp-text     #111111 / #F4F7FF   body text
--myp-muted    #515D70 / #B5C3D8   secondary text
--myp-accent   #2862AE / #92C5FF   links, active states, emphasis
--myp-border   #BACEE9 / #395474   borders
--myp-tint     #E8F1FF / #203955   chips, selected states, soft fills
```

The old names still work and are remapped in `glass.css`: `--ink` → text, `--paper` → bg,
`--card` → surface, `--rule` → border, `--slate` → muted, `--amber` → accent. `--moss` stays
success / progress, `--clay` stays warnings and "what is missing", `--dev` stays teacher-only.
Criterion colours `--a` teal, `--b` gold, `--c` green, `--d` red are unchanged.

Glass: section panels, the header, tools bar and dialogs use a translucent surface, a 1px
border and a soft shadow, with an 18px backdrop blur (blur only on large desktop screens for
section panels, to keep school iPads smooth). Cards inside a panel are solid surfaces.

Typefaces: **Work Sans** for everything, display headings included. **IBM Plex Mono** for
eyebrows, micro labels and codes. Fraunces is retired. Loaded from Google Fonts.

Corner radii: 24px on panels and dialogs, 16px on cards and buttons, 12px on fields and
checklist rows, pill (999px) on chips and progress bars.

Icons: Lucide outline SVGs in `assets/icons/`, 20–24px, stroke 1.8, always beside a text label.
See `assets/icons/README.md`.

`color-mix()` needs an `rgba()` fallback (iOS 16.1 and older). Pair `backdrop-filter` and
`mask-image` with their `-webkit-` versions.

**Motion must sit inside `@media (prefers-reduced-motion: no-preference)`.** Animate only
`transform` and `opacity`. Nothing longer than ~600ms. Scroll reveals must fail *visible* —
if JS or IntersectionObserver is unavailable, content shows immediately rather than staying
hidden.

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
