import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Matches public/CNAME.
  site: 'https://dacrab.is-a.dev',
  trailingSlash: 'never',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true },
  build: {
    assets: 'assets',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
