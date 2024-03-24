import { visit } from 'unist-util-visit';

import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Parent } from 'unist';
import { isBareLink, isParent } from './mdast/node-is';

const LIST_ITEM = 'listItem';

export const RemarkLinkCard: Plugin<void[], Root> = () => {
  return (tree) => {
    visit(tree, isBareLink, (node, _index, parent: Parent | undefined) => {
      if (!isParent(parent)) {
        return;
      }

      if (parent.type === LIST_ITEM) {
        return;
      }

      const child = node.children[0];

      if (!child.url.startsWith('http')) {
        return;
      }

      child.data = {
        ...child.data,
        // TODO: fix
        hProperties: {
          ...(child.data?.hProperties ?? {}),
          dataLinkcard: true,
        },
      };
    });
  };
};
