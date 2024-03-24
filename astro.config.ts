import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { cfg } from './utils/constants';
import rehypeSlug from 'rehype-slug';
import rehypeAutoHeadings from 'rehype-autolink-headings';
import type { Element } from 'hast';
import { h } from 'hastscript';
import rehypePrettyCode from 'rehype-pretty-code';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap(),
    robotsTxt(),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      lightningcss: {
        drafts: {
          customMedia: true,
        },
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutoHeadings,
        {
          behavior: 'append',
          properties(node: Element) {
            return {
              'aria-labelledby': node.properties.id,
            };
          },
          content: h('span.heading-link-icon', {
            title: 'Link',
          }),
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light-default',
            dark: 'github-dark-dimmed',
          },
          grid: false,
          defaultLang: 'plaintext',
        },
      ],
    ],
  },
  site: cfg.siteURL,
});
