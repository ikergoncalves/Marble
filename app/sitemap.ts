import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { SITE_URL } from '@/lib/site';

/**
 * Generates `/sitemap.xml`. Lists the two static, indexable routes plus one
 * entry per product, derived straight from the catalog so new products are
 * included automatically. `/checkout` is intentionally omitted — it's `noindex`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
