# MYP Design Digital — Project Brief

**Owner:** Dev (Devendhar Bachhu), Design Educator, Sreenidhi International School
**Repo:** `Devs67/MYP-Design-Digital`
**Live at:** https://devs67.github.io/MYP-Design-Digital/
**Status as of this brief:** Criterion A complete (4 strands). B, C, D not started.

This document is the project history and the decisions behind it — why things
are shaped the way they are, not just what exists. For code structure, see
`README.md`. For working rules if handing this to Claude Code, see
`CLAUDE.md`. For MYP Design subject knowledge independent of this site, see
the `myp-design-support` skill.

---

## 1. What this project is

A free, student-facing reference site for IB MYP Design, built strand by
strand from the school's own task-specific clarifications (TSC), department
checklists, and real (anonymised) student portfolio samples — not generic
internet content. Paired with a lightweight progress-tracking system so
students can save their checklist progress and a teacher can see class-wide
patterns.

Built entirely as static HTML/CSS/JS, no framework, no build step, hosted
free on GitHub Pages. A Cloudflare Worker + D1 database handles the only
part that needs a server: saving and reading progress.

---

## 2. Site structure

```
index.html                    Landing page — one tile per criterion, one for
                               Frameworks, one for the teacher view
criterion-a.html               All four strands of Criterion A, as tabs
frameworks.html                31 thinking-tool reference, mapped to criterion/strand
teacher.html                    Class progress dashboard, key-protected
class-journey.html              Live log of actual lessons taught, timeline format
worker.js                       Cloudflare Worker source (deployed via dashboard,
                                 this copy is a backup/reference only)
templates/                       Downloadable .docx writing templates, one per strand
examples/                        Real student portfolio PDFs, embedded in-page
myp-design-support-SKILL.md         Portable MYP Design domain skill (not site code)
```

Not yet built: `assets/style.css` (CSS is still duplicated per page — the
next refactor once Criterion B starts), `criterion-b/c/d.html`.

---

## 3. How a criterion page is built

One file per criterion, four strand panels inside it, toggled by tabs:

```html
<div data-panel="i">   ...  </div>
<div data-panel="ii" hidden> ... </div>
```

Every strand panel follows the same running order, established while
building Criterion A and meant to repeat for B, C, D:

1. Objective + command term box (auto-converts to flip tiles via JS)
2. Template download card, where a template exists
3. The flow — four steps as a strip
4. Each step in detail, with a real portfolio extract
5. Worked examples (collapsed dropdown)
6. Full PDF sample embeds (collapsed dropdown, `<object>` + `<iframe>` fallback)
7. Frameworks, grouped by step (collapsed dropdown)
8. Achievement bands, with a `.conflict` box if the TSC and checklist disagree
9. Checklist (live progress-tracked)
10. Traps — four common mistakes as cards

Adding a new strand means writing content into that structure and updating
`TOTALS` in `teacher.html`. No script changes needed — the checklist tracker,
mobile jump menu, and scroll reveal all find panels automatically.

---

## 4. The TSC-handling convention — the most important rule in the project

**Never invent or smooth over a school document.** Every strand was built
from three real inputs: the customised TSC, the department checklist
(sometimes a spreadsheet screenshot), and real student PDFs. Where two
documents disagreed — and this happened repeatedly — the disagreement was
surfaced on the page itself, not resolved by guessing:

| Where a conflict was found | What it was | How it was handled |
|---|---|---|
| Strand iii, product count | TSC says 5 at 7–8; checklist says minimum 6 | Red flag: "analysing 6 satisfies both" |
| Strand i (Crit B), aspect headings | TSC says ACCESS FM; checklist gives 10 different subheadings | `.conflict` box on the achievement-levels section |
| Strand ii (Crit B), idea count | TSC says "Max 3"; checklist says "at least 6" | Flagged, unresolved — needs Dev's decision before Crit B strand ii is written |

This pattern — a visible `.conflict` box rather than silent resolution — is
the house style for the whole project and should continue into B, C, D.

---

## 5. Criterion A — what's built, strand by strand

### Strand i — Explain and justify the need
- Steps: establish context → identify target audience → present cause/reason
  → justify the need
- Full worked exemplar embedded (India child-nutrition snack), annotated
  with "why this works" / "what is missing" throughout
- Command terms: State (1–2) → Outline (3–4) → Explain (5–6) → Justify (7–8)
- Known gap flagged on the page: neither reference sample shows genuine
  evidence of meeting the target audience, or a graphic organiser for
  perspectives — both required at the top band

### Strand ii — Research plan
- Steps: identify areas → construct questions → identify research type →
  prioritise
- Two worked examples from real portfolios: one using High/Medium/Low, one
  using ranked numbers 1–12 with a priority key
- Standalone template (`.docx`) built with universal ACCESS FM areas and
  specific-but-transferable question stems (a `[product]` placeholder swap)

### Strand iii — Analyse existing products
- Four analysis methods, all on one template, student picks based on
  product type:
  - **CPFC** (Components, Purposes, Flow, Complexities) — for digital
    products. Renamed from an earlier "PPPC" draft at Dev's request.
    Adapted from Project Zero's Parts-Purposes-Complexities thinking
    routine, extended with a Flow step because digital products only exist
    while someone moves through them (hidden states — empty, loading,
    error — are a deliberate teaching point)
  - **ACCESS FM** — physical products, strength/weakness per aspect
  - **PPC** — physical products where construction/mechanism matters most
  - **SWOT** — market position, explicitly framed as an add-on, never
    standalone for this strand
- Product-count red flag reconciling the TSC/checklist conflict (see §4)

### Strand iv — Design brief
- Went through several iterations before landing on the simplest version:
  a single open box, six red guidance points (later restructured to three
  labelled stages: research insights → design question → design
  statement), with a full real portfolio example on page 2
- Explicit rule stated on the page: strand i never names a product; strand
  iv opens with one. Everything after that summarises research already
  gathered — no new research belongs in this strand
- The page-2 example is the Snacktive portfolio's actual "Develop a
  detailed design brief" section — genuinely labelled as such in the
  source, so used with full confidence rather than an approximated stand-in

---

## 6. Templates (`templates/`)

Four `.docx` files, one per strand, all built to a shared visual rule:
**plain black and white, Times New Roman, matching the look of the real
student portfolios** — no colour, no site branding — because these are
working documents students write directly into, not reference pages.

Iteration history worth knowing: strand i and ii went through a "too much
extra scaffolding" correction — early drafts added headings and structure
that weren't in the real portfolios, and were stripped back until they
matched what students actually submitted. Strand iv went through the same
correction twice, ending at the simplest version: **one box, guidance in
red, that's it.**

Colour convention inside the templates: dark red (`C00000`) for hard
instructions, a softer red-brown (`B85450`) for worked examples, grey for
meta-notes about the source. Grey italic text throughout means "an example
or prompt — replace or delete this."

| File | Shape |
|---|---|
| `crit-a-strand-i-template.docx` | Four sections with paste-boxes for chart/empathy-map/graphic organiser |
| `crit-a-strand-ii-template.docx` | Intro + mind-map box + one research-plan table with grey example prompts |
| `crit-a-strand-iii-template.docx` | Method-selector page, then one page per method (CPFC / ACCESS FM / PPC / SWOT) |
| `crit-a-strand-iv-template.docx` | One box, three red-labelled stages, page 2 = full real example |

---

## 7. The backend — progress tracking

**Stack:** Cloudflare Worker (API) + D1 (SQLite). Chosen over Firebase
specifically because it needs no billing account attached and nothing
pauses on inactivity — both real risks for a project used in bursts across
a school term.

**Worker URL:** `myp-progress.bachhudevenderchintu.workers.dev`

**Database:** `myp-design-progress`, four tables:

| Table | Purpose |
|---|---|
| `students` | One row per code — display name, section, created, last seen |
| `ticks` | Current checklist state, overwritten on change |
| `events` | Append-only log of every tick/untick, timestamped — not yet used by any UI, kept deliberately for future Gantt/burn-up charts |
| `notes` | Teacher notes + status (open/planned/addressed) against class-wide struggling items |

**Endpoints:** `/api/register`, `/api/save`, `/api/load` (student-facing, no
key) and `/api/admin`, `/api/notes`, `/api/timeline` (teacher-facing, need
the `ADMIN_KEY`).

**Security note:** the admin key is a Cloudflare **secret**, read via
`env.ADMIN_KEY` at runtime — not hardcoded in `worker.js`, specifically so
that file is safe to commit to the public repo. This was a correction made
mid-build after the key was initially placed directly in the file.

**How students keep their progress:** the code lives in the URL
(`?code=ABC-4A-K3M9`), not in browser storage — deliberate, so a bookmark
carries progress across devices and survives a cleared cache. Manual code
entry is the fallback.

**Codes:** format `ABC-4A-K3M9` — three letters from the name, the section,
four random characters, deliberately excluding I/L/O/0/1/S/5 so nothing
gets misread off a screen.

**One known coupling to watch:** checklist item IDs are hashed from the
item's exact wording. Rewording a live checklist item detaches every
student's saved progress for that item, and any teacher note on it.
Wording changes should happen between units, not during one.

---

## 8. Design system

**Palette:** `--ink #14303C`, `--paper #F2F5F6`, `--amber #B05A1C` (accent /
active state), `--moss #2F6B4F` (success / progress), `--clay #9C3E2F`
(warning), `--slate #5A727B` (secondary text). Criterion tiles on the
landing page each get their own hue — teal A, gold B, green C, red D — plus
violet for the teacher tile and ink for Frameworks.

**Type:** Fraunces (display/headings), Work Sans (body), IBM Plex Mono
(labels, codes, eyebrows). All from Google Fonts.

**Corner radii:** 12px cards, 7px chips/buttons, fully rounded progress bars.

**Motion:** CSS transitions + one small IntersectionObserver script, no
library. Deliberately restrained — reveals settle before the reader
reaches them, everything sits inside `prefers-reduced-motion`, and nothing
animates longer than ~600ms. The reasoning throughout: this is a reference
document people search under pressure, not a portfolio site to browse —
motion should never be the thing standing between a student and the
paragraph they need.

**Interaction layer added late in the build:** command-term rows became
flip tiles (click to reveal the definition on the reverse), cards get a
subtle hover lift, and repeated clicks on a card cycle it through five
shades of amber tint — playful, capped, and excluded from every real
control (links, buttons, checkboxes) so it never interferes with function.

**Mobile pass:** container and card padding reduced, sections become
collapsible (closed by default) with a horizontal jump-menu above them,
tables carry a "scroll →" hint. Triggered by a direct complaint that the
site felt "text-heavy and congested" on a phone — the fix was space and
progressive disclosure, not a redesign.

---

## 9. The frameworks reference (`frameworks.html`)

31 thinking tools, mapped to the specific criterion and strand they serve,
each with a plain-language "why it helps" and a numbered "how to apply."
PEEL and OPVL are treated as cross-cutting (they serve all four criteria)
and lead the page. Every framework carries a **real, verified source link**
where one exists — ASQ for the root-cause tools, the Agile Business
Consortium for MoSCoW, Google's Design Sprint Kit for Crazy 8s, Nielsen
Norman Group for usability testing — and an honest note where no single
authoritative source exists (ACCESS FM, the design-question formula).

---

## 10. Licensing decisions made along the way

Two separate copyright questions came up and were resolved differently:

1. **A reference slide deck** ("Design and Inquiry" by Aidan Hammond,
   Branksome Hall Asia) turned out to be **CC BY-NC-ND 4.0** — meaning the
   slides may be used *unaltered* with attribution, but redrawing them in
   the site's own visual style is exactly what the licence prohibits. This
   reversed earlier advice given in-conversation (which had wrongly
   suggested adapting rather than reproducing) — corrected once the actual
   licence was checked.
2. **The IB logo** cannot go on the site at all — trademark use is
   restricted to official school communications, not an individual
   teacher's personal project, regardless of the school being an IB World
   School. A required disclaimer line was identified for the footer:
   *"This work has been developed independently from and is not endorsed
   by the International Baccalaureate Organization..."* — not yet added to
   the live pages as of this brief.

**Standing rule going forward:** check a source's actual licence before
reproducing or adapting it, rather than assuming either "it's for
education so it's fine" or "I should redraw this to be safe" — those
assumptions pointed the wrong way on this project at different points, and
both times the actual licence text was the only reliable answer.

---

## 11. Open items — things flagged but not yet resolved

- [ ] ACCESS FM vs 10-subheading conflict, Criterion B strand i
- [ ] "Max 3" vs "at least 6" design ideas conflict, Criterion B strand ii
- [ ] IB non-endorsement disclaimer not yet added to page footers
- [ ] `assets/style.css` extraction — still duplicated across 5 HTML files
- [ ] Criteria B, C, D not started (B strand i has a full content spec
      written and ready to hand to Claude Code; ii–iv do not yet)
- [ ] Grade-specific structure (Years 1–2, Year 3 use different published
      rubrics) — deliberately deferred until Criterion A has run with a
      real class

---

## 12. Where to pick this up

**If continuing content (writing B/C/D):** work in this chat or a similar
one — the content decisions (what goes in which step, how to handle TSC
conflicts, how to write worked examples honestly) are judgement calls, not
mechanical ones.

**If doing structural refactors (CSS extraction, teacher-view redesign,
multi-year-group restructuring):** hand to Claude Code with `README.md`
and `CLAUDE.md` — those are written for exactly this handoff.

**If starting a new MYP Design conversation unrelated to this site:** use
the `myp-design-support` skill — it carries the subject knowledge without
any of this site's specific file paths or conventions.
