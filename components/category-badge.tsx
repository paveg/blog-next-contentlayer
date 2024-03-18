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

const toPascalCase = (str: string): CategoryTypes => {
  return [str]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

export const CategoryBadge = ({ badgeString }: Props) => {
  const bs = badgeString ? toPascalCase(badgeString) : 'Other';
  return <Badge variant="secondary">{bs}</Badge>;
};
