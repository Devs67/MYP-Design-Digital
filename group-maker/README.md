# Balanced Group Maker

A classroom tool, split into two pages:

- **`index.html`** — student-facing. Name + gender + submit, nothing else.
  This is the link you share with the class.
- **`teacher.html`** — your view only. Live count of who's joined (with a
  boys/girls breakdown), the running name list, and **Form Groups** /
  **Clear all** controls. Don't share this link with students — the class
  roster and clear control live here.

Both pull from the same Google Sheet roster, so what students submit on
`index.html` shows up live on `teacher.html`.

Live demo mode (no backend needed) — just open either page. Note: in demo
mode each page keeps its own in-memory roster (there's no shared storage
without a backend), so `index.html` and `teacher.html` won't see each
other's demo data until `API_URL` points at a real Apps Script deployment.

## Files

| File | Purpose |
|---|---|
| `index.html` | Student join page. Static, hosted on GitHub Pages. |
| `teacher.html` | Teacher dashboard — live roster, counts, group forming, clear all. |
| `shared.js` | Config (`API_URL`), the API calls, and the grouping algorithm — used by both pages so the logic exists in one place. |
| `style.css` | Shared styling for both pages. |
| `Code.gs` | Reference copy of the Apps Script backend. **Not deployed from this repo** — paste it into the Apps Script editor bound to the roster Sheet (see below). Editing this file changes nothing live until you do. |

## How it works

```
[Student's phone] --POST/GET--> [Apps Script Web App] <--> [Google Sheet]
[Teacher's screen] --GET-------> [Apps Script Web App]  (polls every ~2.5s)
```

`shared.js` ships in **local demo mode** by default (an in-memory array
stands in for the Sheet) until `API_URL` near the top of the file is
pointed at a real deployment. Nothing else about either page's behaviour
differs between demo and live mode.

## One-time backend setup (Dev's own Google account — requires his login)

1. Create a Google Sheet, e.g. "MYP4 Grouping Roster".
2. **Extensions → Apps Script**, replace the default code with `Code.gs`.
3. Change `CLEAR_PIN` in the pasted script to a real private value.
4. **Deploy → New deployment → type: Web app.** Execute as **Me**, access
   **Anyone**.
5. Accept the "unverified app" warning (Advanced → Go to project (unsafe) →
   Allow) — expected for a personal script.
6. Copy the `/exec` URL into `API_URL` in `shared.js`.
7. After any future edit to the Apps Script code: **Deploy → Manage
   deployments → Edit → New version** — editing alone does not update the
   live URL.

## Known limitations

- `index.html` is reachable by anyone with the link — that's expected,
  it's the join page. Keep `teacher.html` for yourself and use **Clear
  all** between periods.
- Live updates poll every ~2.5s, not push — a short delay before a new
  name appears on the teacher dashboard is normal.
- No de-duplication of identical names — students with the same first name
  should add a last initial themselves.
- Apps Script's free quota (~20,000 requests/day) is far beyond one class's
  needs.
