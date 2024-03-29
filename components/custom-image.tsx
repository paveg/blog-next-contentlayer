import Image, { ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export const CustomImage = ({
  src,
  height,
  width,
  base64,
  alt,
  ...others
}: Props) => {
  if (!src) return null;
  if (typeof src === 'string' && (!height || !width)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="rounded-sm"
        src={src}
        height={height ?? 600}
        width={width ?? 1000}
        alt={alt}
        {...others}
      />
    );
  }
  return (
    <Image
      className="rounded-sm"
      layout="responsive"
      src={src}
      alt={alt}
      height={height}
      width={width}
      sizes="(min-width: 40em) 40em, 100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...others}
    />
  );
};
