# Working notes for Claude Code

Read `README.md` first for what this project is and how it is structured.
This file is the working rules.

---

## Hard rules

**Never use `localStorage` or `sessionStorage`.** Not supported in this environment.
State lives in the URL (`?code=...`), in memory, or in D1 via the Worker.

**Never commit the admin key.** `ADMIN_KEY` is a Cloudflare secret read via `env.ADMIN_KEY`.
If you see a key literal appearing anywhere in a committed file, that is a bug — flag it.

**Never reword an existing checklist item without saying so.** Item IDs are hashed from the
item's text. Rewording detaches every student's saved progress for that item and any teacher
note attached to it. If a rewording is genuinely needed, say plainly that saved data will be
lost for that item and let Dev decide.

**Do not add a build step.** No npm, no bundler, no framework. Plain HTML, CSS and vanilla JS,
served straight from GitHub Pages. If a task seems to need React or a build pipeline, say so
and explain the trade rather than introducing one.

**Do not edit files in `examples/`.** They are real student portfolios.

---

## House style — CSS

Palette, defined as custom properties at the top of each page:

```
--ink    #14303C   body text, dark panels
--paper  #F2F5F6   page background
--card   #FFF      card background
--rule   #D3E0E5   borders
--slate  #5A727B   secondary text
--amber  #B05A1C   accent, active states, emphasis
--moss   #2F6B4F   success, progress, "good"
--clay   #9C3E2F   warnings, "what is missing"
--dev    #6A4C93   teacher-only elements
```

Criterion colours on the landing page: `--a` teal, `--b` gold, `--c` green, `--d` red.

Typefaces: **Fraunces** for display headings, **Work Sans** for body, **IBM Plex Mono** for
labels, eyebrows and codes. Loaded from Google Fonts.

Corner radii: 12px on cards, 7px on chips and buttons, 99px on progress bars.

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
