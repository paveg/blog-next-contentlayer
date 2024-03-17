import NextImage, { ImageProps } from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { CustomLink } from "./custom-link";
import { CustomH1, CustomH2, CustomH3, CustomH4, CustomH5, CustomH6 } from "./custom-heading";

const Image = (props: ImageProps) => {
  return <NextImage {...props} />;
};

const components = {
  Image,
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
  CustomLink
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
