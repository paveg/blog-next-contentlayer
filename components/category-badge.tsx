import { Badge } from './ui/badge';

type Props = {
  badgeString?: string;
};

type CategoryTypes =
  | 'Technology'
  | 'Programming'
  | 'Productivity'
  | 'Lifestyle'
  | 'Gadgets'
  | 'Other';
const ALL_CATEGORIES = [
  'Technology',
  'Programming',
  'Productivity',
  'Lifestyle',
  'Gadgets',
  'Other',
];

function isSuit(value: string) {
  return ALL_CATEGORIES.includes(value);
}

const toPascalCase = (str: string) => {
  return [str]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

export const CategoryBadge = ({ badgeString }: Props) => {
  const bs = badgeString ? toPascalCase(badgeString) : 'Other';
  if (!isSuit(bs)) {
    return <Badge variant="secondary">Other</Badge>;
  }
  return <Badge variant="secondary">{bs}</Badge>;
};
