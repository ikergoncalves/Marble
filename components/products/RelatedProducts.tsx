'use client';

import type { Product } from '@/lib/types';
import { ProductGrid } from '@/components/product/ProductGrid';
import styles from './RelatedProducts.module.css';

export interface RelatedProductsProps {
  products: Product[];
}

/**
 * "You might also like" strip on the product detail page.
 *
 * This is a Client Component for the same reason {@link FeaturedProducts} is:
 * ProductGrid → ProductCard imports from chiselui's barrel, whose top-level
 * `createContext` calls cannot be evaluated under the React Server runtime. The
 * client boundary keeps that import in the browser bundle.
 */
export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.related} aria-labelledby="related-heading">
      <h2 id="related-heading" className={styles.title}>
        You might also like
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
