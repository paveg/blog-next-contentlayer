import { Badge } from './ui/badge';

type Props = {
  badgeString?: string;
};

type BadgeTypes =
  | 'Technology'
  | 'Programming'
  | 'Productivity'
  | 'Lifestyle'
  | 'Gadgets'
  | 'Other';

const toPascalCase = (str: string) => {
  return [str]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

export const CategoryBadge = ({ badgeString }: Props) => {
  const bs = badgeString ? toPascalCase(badgeString) : 'Other';
  return <Badge variant="secondary">{bs}</Badge>;
};
