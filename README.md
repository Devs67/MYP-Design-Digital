# MYP Design Digital

Task-specific clarification guides for IB MYP Design, built for students and for the teacher.

Live at **https://devs67.github.io/MYP-Design-Digital/**

Maintained by Dev (Devendhar Bachhu), Secondary School Design Teacher.

---

## What this is

A static site that explains, strand by strand, what each MYP Design criterion actually asks
for — the command terms, the steps in order, the frameworks that produce each part, worked
examples from real portfolios, and a checklist students run before submitting.

Students can save their checklist progress against a code. The teacher can see class-wide
progress and record notes against the items the class is struggling with.

**Current state:** Criterion A complete (all four strands). Criteria B, C and D not built yet.

---

## Structure

```
/
├─ index.html              Landing page. Tiles for each criterion + frameworks + teacher.
├─ criterion-a.html        All four strands of Criterion A, as tab panels.
├─ frameworks.html         31 thinking tools mapped to the criterion they serve.
├─ teacher.html            Class progress dashboard. Key-protected. Not for students.
├─ worker.js               Cloudflare Worker source. Deployed on Cloudflare, NOT from here.
├─ templates/              Downloadable .docx writing templates.
│  └─ crit-a-strand-i-template.docx
└─ examples/               Student portfolio PDFs, embedded in the strand pages.
   ├─ crit-a-s3-sample-1.pdf
   ├─ crit-a-s3-sample-2.pdf
   ├─ crit-a-s4-sample-1.pdf
   └─ crit-a-s4-sample-2.pdf
```

No build step. No package manager. Plain HTML, CSS and vanilla JavaScript, served by
GitHub Pages. Edit a file, commit, push, done.

---

## How a criterion page is built

One file per criterion. Inside it, one panel per strand:

```html
<div data-panel="i">   ...strand i content...   </div>
<div data-panel="ii"  hidden> ... </div>
<div data-panel="iii" hidden> ... </div>
<div data-panel="iv"  hidden> ... </div>
```

Tabs at the top toggle the `hidden` attribute. Everything else keys off this: the checklist
tracker, the mobile jump menu and the scroll-reveal all find the visible panel and work
within it.

Each strand panel follows the same running order:

1. Objective + command terms (`.obj`, `.ctbox` — the terms auto-convert to flip tiles)
2. Template download card, where one exists (`.tpl`)
3. The flow — four steps as a strip (`.flow`)
4. Each step in detail, with an extract from a real portfolio (`.step`)
5. Worked examples, collapsed (`.docwrap`)
6. Frameworks, grouped by step, collapsed (`.fwgroup`)
7. Achievement levels (`.band`)
8. Checklist (`.clbar` + `.clgroup` + `.ck`)
9. Traps (`.traps`)

Adding a strand means writing that content into the panel, removing `hidden` from the div
and `todo` from its tab button. No script changes needed.

---

## Progress saving

```
student page  ──►  Cloudflare Worker  ──►  D1 (SQLite)
                   myp-progress.bachhudevenderchintu.workers.dev
```

The Worker source is `worker.js` in this repo, but it is **deployed through the Cloudflare
dashboard**, not from here. Editing the file in the repo changes nothing until it is pasted
into the Worker editor and deployed. The copy here is a backup and a reference.

### Endpoints

| Route | Method | Purpose |
|---|---|---|
| `/api/register` | POST | Create a student code |
| `/api/save` | POST | Save one checklist item |
| `/api/load` | GET | Restore a student's ticks |
| `/api/admin` | GET | Class summary + heatmap + notes (key required) |
| `/api/notes` | POST | Save a teacher note (key required) |
| `/api/timeline` | GET | First/last tick per strand (key required) |

### Database — `myp-design-progress`

| Table | What it holds |
|---|---|
| `students` | One row per code: name, section, created, last seen |
| `ticks` | Current state. One row per item per student, overwritten on change |
| `events` | Append-only log of every tick and untick, timestamped |
| `notes` | Teacher notes and status against each checklist item |

`events` is never read by the student side. It exists so that time-based charts
(burn-up, Gantt, "how long did strand ii take") remain possible later. Do not drop it.

### Codes

Format `ABC-4A-K3M9` — three letters from the name, the section, four random characters.
The random block excludes I, L, O, 0, 1, S and 5 so nothing is mistyped when read off a screen.

Once a student has a code the URL becomes `criterion-a.html?code=ABC-4A-K3M9`. Bookmarking
that page carries the code with it, so progress restores with nothing typed.

### Secrets

`ADMIN_KEY` is a Cloudflare secret, read at runtime via `env.ADMIN_KEY`. It is **not** in
this repo and must never be committed. The D1 binding is `env.DB`.

---

## Local development

Open with VS Code Live Server, not by double-clicking the file. The Worker only accepts
requests from `devs67.github.io`, `127.0.0.1:5500` and `localhost:5500`, so `file://` will
fail on anything that touches the API.

---

## Deploying

```bash
git add .
git commit -m "..."
git push
```

GitHub Pages picks it up from `main`, root. Worker changes are separate — paste into the
Cloudflare editor and deploy there.

---

## Known constraints

- **Checklist item IDs are derived from the item's wording.** Reword a checklist item and
  every student's saved progress for that item detaches, as does any teacher note on it.
  Change wording between units, never during one.
- **`TOTALS` in `teacher.html` is hardcoded** — `{ i:15, ii:13, iii:12, iv:14 }`. Add or
  remove a checklist item and this must be updated or every percentage is wrong.
- **CSS is duplicated across the four HTML files.** Extracting it to `assets/style.css` is
  the next refactor.
- **Student portfolio PDFs are real student work.** Check for names before adding more.

---

## Not built yet

- Criteria B, C and D
- Shared stylesheet
- Year-group variants (MYP 1–2 and MYP 3 use different rubrics)
- Two-level teacher table for when there are 16 strands rather than 4
