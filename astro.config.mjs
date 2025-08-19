import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://dacrab.github.io',
  base: '/',
  integrations: [react()],
  build: {
    assets: 'assets',
  },
});
