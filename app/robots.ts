import { MetadataRoute } from 'next';
import { cfg } from '@/utils/constants';

const url = cfg.siteURL;
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
