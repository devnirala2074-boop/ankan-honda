import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Build Plugin to copy dist/index.html to dist/404.html so static
 * subpath hosts serve the SPA entrypoint on browser refresh of nested routes.
 */
function spaFallback404Plugin() {
  return {
    name: 'ankan-honda-spa-404-fallback',
    closeBundle() {
      const distDir = path.resolve(process.cwd(), 'dist');
      const indexFile = path.join(distDir, 'index.html');
      const notFoundFile = path.join(distDir, '404.html');
      if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile);
      }
    },
  };
}

export default defineConfig({
  base: '/ankan-honda/',
  plugins: [react(), spaFallback404Plugin()],
  server: {
    port: 5173,
    open: false,
  },
});
