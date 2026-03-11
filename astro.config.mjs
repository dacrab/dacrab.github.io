import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

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
    },
    plugins: [tailwindcss()],
    css: { devSourcemap: false },
  },
  integrations: [],
});
