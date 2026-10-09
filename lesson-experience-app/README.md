# Lesson Experience app

React + Vite source for the Lesson Experience page. Teacher-only: it is not linked from the
site for students and is marked `noindex`.

This is the one part of the site with a build step. The built files are committed to
`lesson-experience/app/`, which GitHub Pages serves as-is. `lesson-experience.html` redirects there.

To change it:

1. Edit lessons in `src/data/curriculumData.ts` (or the components in `src/components/`)
2. `npm install` (first time only), then `npm run build`
3. Commit both `lesson-experience-app/` and `lesson-experience/app/`

`npm run dev` runs it locally with live reload. `npm run lint` type-checks.

## How it is styled

It uses the site's Blue Glass files directly, not copies: `vite.config.ts` links
`assets/theme.css`, `assets/glass.css` (last in `<head>`) and `assets/theme.js` from the site
root. So the app always matches the rest of the site, and a change to `glass.css` shows up here
without a rebuild. `src/app.css` holds only what `glass.css` lacks; its classes start `lx-`.

The site header, tools bar (Back to workspace, Search, Design Team, Light / Dark) and footer
are plain HTML in `index.html`, outside React. `theme.js` drives Search and the theme control;
`App.tsx` points "Back to workspace" and the year tab at the selected class's year.

Figma frames (design/BUILD-BRIEF.md): 61 timeline, 62 blueprint, 63 cards, 64 lesson detail,
65 today's lesson, 66 resource locker, 77 / 78 strand details, 79–83 design quote.

## Links

`?class=myp2a&view=cards&lesson=myp2a-3&theme=dark` opens a class, a view (`timeline`,
`cards`, `blueprint`, `resources`, `lesson`, `today`) and a lesson. The app updates the URL as
you move around, so a bookmark returns to the same place.
