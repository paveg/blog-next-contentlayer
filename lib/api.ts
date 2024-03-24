import fetchSiteMetadata from 'fetch-site-metadata';

const siteMetadata = async (url: string) => {
  const { description, image, title } = await fetchSiteMetadata(url, {
    suppressAdditionalRequest: true,
  }).catch(() => ({
    description: 'Page not found',
    image: {
      src: undefined,
    },
    title: 'Not found',
  }));
  return { description, image, title };
};

const siteImage = async (src: string) => {
  const image = await fetch(src).then((res) => res.arrayBuffer());
  if (!image) {
    return undefined;
  }
  return image;
};

export const getLinkCard = async (href: string) => {
  const { description, image, title } = await siteMetadata(href);
  const og = image?.src ? await siteImage(image.src) : undefined;

  return {
    description,
    image: {
      src: og,
    },
    title,
  };
};
