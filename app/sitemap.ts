import { MetadataRoute } from 'next';
import { allPages, allPosts } from '@/.contentlayer/generated';
import { cfg } from '@/utils/constants';

const url = cfg.siteURL;

const postsSitemap: MetadataRoute.Sitemap = allPosts
  .filter((post) => process.env.NODE_ENV === 'development' || post?.isPublished)
  .map((post) => ({
    url: `${url}/posts/${post.slugAsParams}`,
    lastModified: post?.lastUpdatedDate
      ? post.lastUpdatedDate
      : post.publishedDate,
  }));

const pagesSitemap: MetadataRoute.Sitemap = allPages.map((page) => ({
  url: `${url}/${page.slugAsParams}`,
  lastModified: new Date(),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url,
      lastModified: new Date(),
    },
    ...pagesSitemap,
    ...postsSitemap,
  ];
}
