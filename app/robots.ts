import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Generates `/robots.txt`. Everything is crawlable except the transactional
 * `/checkout` route (which is also `noindex` via its own metadata), and the
 * sitemap is advertised so crawlers can discover every product page.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/checkout',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
