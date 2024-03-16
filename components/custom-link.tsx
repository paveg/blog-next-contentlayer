import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Props = React.ComponentPropsWithoutRef<'a'>;

export const CustomLink = ({ href, children, ...rest }: Props) => {
  const isInternal = href && href.startsWith('/');
  const isAnchor = href && href.startsWith('#');

  if (isInternal || isAnchor) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={href || '#'}
      {...rest}
    >
      {children}
      {typeof children === 'string' && (
        <ExternalLinkIcon className="ml-1 inline-block h-4 w-4" />
      )}
    </Link>
  );
};
