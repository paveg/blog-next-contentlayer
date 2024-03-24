import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { cfg } from './utils/constants';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  site: cfg.siteURL,
});
