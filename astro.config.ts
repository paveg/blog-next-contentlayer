import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { cfg } from './utils/constants';
import rehypeSlug from 'rehype-slug';
import rehypeAutoHeadings from 'rehype-autolink-headings';
import type { Element } from 'hast';
import { h } from 'hastscript';
import tailwindcssNesting from 'tailwindcss/nesting';
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      css: {
        transformer: 'lightningcss',
        lightningcss: {
          drafts: {
            customMedia: true,
          },
        },
        postcss: {
          plugins: [tailwindcssNesting()],
        },
      },
    },
  },
  markdown: {
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [],
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
