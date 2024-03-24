import { Badge } from '../src/components/ui/badge';
import { ALL_CATEGORIES } from '@/utils/constants';

type Props = {
  badgeString?: string;
};

function isSuit(value: string) {
  return ALL_CATEGORIES.includes(value);
}

export const CategoryBadge = ({ badgeString }: Props) => {
  if (!badgeString || !isSuit(badgeString)) {
    return <Badge variant="secondary">other</Badge>;
  }
  return <Badge variant="secondary">{badgeString}</Badge>;
};
