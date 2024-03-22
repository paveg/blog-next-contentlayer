import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import readingTime from 'reading-time';
import remarkFootnotes from 'remark-footnotes';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    isPublished: {
      type: 'boolean',
      required: false,
    },
    publishedDate: {
      type: 'date',
      required: true,
    },
    lastUpdatedDate: {
      type: 'date',
      required: false,
    },
    category: {
      type: 'string',
      required: false,
    },
    heroImage: {
      type: 'string',
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [
      remarkUnwrapImages,
      // remark-gfm 4.0.0 has an issue to render table.
      // @see https://github.com/remarkjs/remark-gfm/issues/57
      remarkGfm,
      [remarkFootnotes, { inlineNotes: true }],
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
    ],
  },
});
