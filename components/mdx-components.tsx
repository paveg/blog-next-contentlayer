import NextImage, { ImageProps } from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { CustomLink } from "./custom-link";
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6 } from "./custom-heading";

const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
};

const components = {
  Image,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
  a: CustomLink
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
