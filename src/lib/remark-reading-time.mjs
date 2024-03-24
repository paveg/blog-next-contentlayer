import readingTime from 'reading-time';

import { toString } from 'mdast-util-to-string';

// TODO: fix type
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const rt = readingTime(textOnPage);

    data.astro.frontmatter.readingTime = rt.text;
  };
}
