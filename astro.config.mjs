import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Astro-internal module paths whose unused-import warnings can be safely ignored.
const SUPPRESSED_IDS = [
  '@astrojs/internal-helpers/remote',
  'node_modules/astro/dist/assets/utils/remotePattern.js',
  'node_modules/astro/dist/assets/services/service.js',
];

// https://astro.build/config
export default defineConfig({
  site: 'https://dacrab.github.io',
  base: '/',
  trailingSlash: 'never',
  compressHTML: true,
  prefetch: { prefetchAll: true },
  build: {
    assets: 'assets',
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (
            (warning.code === 'UNUSED_EXTERNAL_IMPORT' || warning.code === 'UNUSED_IMPORT') &&
            typeof warning.id === 'string' &&
            SUPPRESSED_IDS.some((id) => warning.id.includes(id))
          ) return;
          defaultHandler(warning);
        },
      },
    },
    plugins: [tailwindcss()],
    css: { devSourcemap: false },
  },
  integrations: [sitemap()],
});
