import { useMDXComponent } from 'next-contentlayer/hooks';
import { CustomLink } from './custom-link';
import { CustomImage } from './custom-image';
import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from './custom-heading';

const components = {
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
  a: CustomLink,
  p: (props: any) => <p className="text-sm lg:text-base" {...props} />,
  // TODO: Improve CustomImage component as can be handled size automatically
  img: (props: any) => <CustomImage alt={props.alt} src={props.src} />,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
