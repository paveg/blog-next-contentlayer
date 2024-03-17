import { Link2Icon } from '@radix-ui/react-icons';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type CustomHeadingProps = HeadingProps & {
  Component: keyof JSX.IntrinsicElements;
};

const CustomHeading = ({
  Component,
  id,
  children,
  ...others
}: CustomHeadingProps) => {
  const ComponentType = Component as any; // Cast to any to bypass type checking

  return (
    <ComponentType
      id={id}
      className="group scroll-mt-24 whitespace-pre-wrap"
      {...others}
    >
      <span className="mr-2">{children}</span>
      <a
        href={id && `#${id}`}
        className="inline-flex h-6 w-6 items-center justify-center rounded-md text-lg no-underline opacity-0 shadow-sm ring-1 transition-all hover:shadow group-hover:opacity-100"
        aria-label="Anchor"
      >
        <Link2Icon className="h-4 w-4" />
      </a>
    </ComponentType>
  );
};

export const CustomH1 = (props: HeadingProps) => (
  <CustomHeading Component="h1" {...props} />
);
export const CustomH2 = (props: HeadingProps) => (
  <CustomHeading Component="h2" {...props} />
);
export const CustomH3 = (props: HeadingProps) => (
  <CustomHeading Component="h3" {...props} />
);
export const CustomH4 = (props: HeadingProps) => (
  <CustomHeading Component="h4" {...props} />
);
export const CustomH5 = (props: HeadingProps) => (
  <CustomHeading Component="h5" {...props} />
);
export const CustomH6 = (props: HeadingProps) => (
  <CustomHeading Component="h6" {...props} />
);
