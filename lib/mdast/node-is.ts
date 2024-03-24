import type { Paragraph, Link, Text } from 'mdast';
import type { Node, Literal, Parent } from 'unist';

function isObject(target: unknown): target is { [key: string]: unknown } {
  return typeof target === 'object' && target !== null;
}

export function isNode(node: unknown): node is Node {
  return isObject(node) && 'type' in node;
}

export function isParent(node: unknown): node is Parent {
  return isObject(node) && Array.isArray(node.children);
}

export function isLiteral(node: unknown): node is Literal {
  return isObject(node) && 'value' in node;
}

export function isParagraph(node: unknown): node is Paragraph {
  return isNode(node) && node.type === 'paragraph';
}

export function isText(node: unknown): node is Text {
  return (
    isLiteral(node) && node.type === 'text' && typeof node.value === 'string'
  );
}

export function isLink(node: unknown): node is Link {
  return isNode(node) && node.type === 'link';
}

export function isBareLink(
  node: unknown
): node is Paragraph & { children: [Link & { children: [Text] }] } {
  return (
    isParagraph(node) &&
    node.children.length === 1 &&
    isLink(node.children[0]) &&
    isText(node.children[0].children[0])
  );
}
