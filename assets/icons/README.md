# Icons

Lucide outline icons (ISC licence, notice in `credits/LUCIDE-LICENSE.txt`), stroke 1.8.
File names follow current Lucide: `house` (was `home`), `circle-check` (was `check-circle`),
`layout-grid` (was `grid`).

Use them through `assets/glass.css`, which paints each file in the current text colour:

```html
<span class="myp-icon myp-icon--search" aria-hidden="true"></span>Search
```

Every icon sits beside a visible text label. Never use an icon in place of a Criterion A–D
label, checklist text or an achievement band.

| File | Use |
|---|---|
| `house` | Home and brand return links |
| `arrow-left` | Back to workspace, previous dialog |
| `arrow-right` | Enter / continue |
| `search` | Search control and dialog |
| `users` | Design Team, class roster, group maker |
| `sun`, `moon` | Light and Dark theme controls |
| `external-link` | Links that leave the site |
| `book-open` | Guides, frameworks, lesson resources |
| `file-text` | Task sheets, briefs, templates |
| `download` | PDF, template and export actions |
| `save` | Save progress, teacher notes |
| `copy` | Copy progress code |
| `refresh-cw` | Reset, refresh, restart |
| `trash-2` | Clear roster, destructive reset |
| `circle-check` | Submit, addressed, completed |
| `layout-grid` | Lesson cards, framework grid, overview |
| `sparkles` | Design quote |
| `eye` | Preview |
| `plus`, `chevron-down`, `x` | Expand, open, close |

To add one, copy it from `lucide-static`, set `stroke-width="1.8"`, and add a
`.myp-icon--name` rule in `glass.css` next to the others.
