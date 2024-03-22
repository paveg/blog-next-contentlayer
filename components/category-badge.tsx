import { Badge } from './ui/badge';

type Props = {
  badgeString?: string;
};

type CategoryTypes =
  | 'technology'
  | 'programming'
  | 'productivity'
  | 'lifestyle'
  | 'gadgets'
  | 'other';
const ALL_CATEGORIES = [
  'technology',
  'programming',
  'productivity',
  'lifestyle',
  'gadgets',
  'other',
];

function isSuit(value: string) {
  return ALL_CATEGORIES.includes(value);
}

export const CategoryBadge = ({ badgeString }: Props) => {
  if (!badgeString || !isSuit(badgeString)) {
    return <Badge variant="secondary">other</Badge>;
  }
  return <Badge variant="secondary">{badgeString}</Badge>;
};
