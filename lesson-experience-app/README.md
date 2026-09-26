# Lesson Experience app

React + Vite + Tailwind source for the Lesson Experience page. Teacher-only: it is not linked
from the site for students and is marked `noindex`.

This is the one part of the site with a build step. The built files are committed to
`lesson-experience/app/`, which GitHub Pages serves as-is. `lesson-experience.html` redirects there.

To change it:

1. Edit lessons in `src/data/curriculumData.ts` (or the components in `src/components/`)
2. `npm install` (first time only), then `npm run build`
3. Commit both `lesson-experience-app/` and `lesson-experience/app/`

`npm run dev` runs it locally with live reload.
