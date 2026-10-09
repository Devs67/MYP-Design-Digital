import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// The app is built into ../lesson-experience/app and served as static files by GitHub Pages.
// It uses the site's own Blue Glass files (assets/theme.css, glass.css, theme.js) rather than
// copies, so it always matches the rest of the site. They are linked as they are, not bundled:
// from the built page the site root is ../../; in `npm run dev` Vite serves them through /@fs/.
const SITE_ROOT = path.resolve(import.meta.dirname, '..');

function siteShell(): Plugin {
  let root = '../../';
  return {
    name: 'myp-site-shell',
    configResolved(config) {
      if (config.command === 'serve') root = `/@fs${SITE_ROOT}/`;
    },
    transformIndexHtml: {
      order: 'post',
      handler() {
        return [
          {tag: 'link', attrs: {rel: 'stylesheet', href: `${root}assets/theme.css`}, injectTo: 'head'},
          // glass.css goes last in <head>, as on every other page
          {tag: 'link', attrs: {rel: 'stylesheet', href: `${root}assets/glass.css`}, injectTo: 'head'},
          {tag: 'script', attrs: {src: `${root}assets/theme.js`}, injectTo: 'body'},
          {tag: 'script', attrs: {src: `${root}assets/glide.js`}, injectTo: 'body'},
        ];
      },
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    outDir: '../lesson-experience/app',
    emptyOutDir: true,
  },
  plugins: [react(), siteShell()],
  server: {
    fs: {allow: [SITE_ROOT]},
  },
});
