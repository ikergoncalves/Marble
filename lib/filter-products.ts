/**
 * Catalog filtering logic.
 *
 * {@link filterProducts} is a pure function — no side effects, no reads of the
 * URL or the DOM — so it is trivial to reason about and reuse. The listing page
 * parses the URL into a {@link ProductFilterCriteria} and hands it here.
 */

import { products } from '@/data/products';
import type { Product, ProductCategory } from '@/lib/types';

/** The criteria a shopper can narrow the catalog by. Every field is optional; an
 * empty object matches everything. Fields combine with AND. */
export interface ProductFilterCriteria {
  /** Exact-match category. */
  category?: ProductCategory;
  /** Inclusive lower bound on the product's effective price. */
  minPrice?: number;
  /** Inclusive upper bound on the product's effective price. */
  maxPrice?: number;
  /** Free-text query matched case-insensitively against name, description and tags. */
  search?: string;
}

/**
 * The price a shopper actually pays: the promotional price when present,
 * otherwise the list price. All price filtering compares against this.
 */
export function getEffectivePrice(product: Product): number {
  return product.discountPrice ?? product.price;
}

/**
 * The price range the catalog spans, used to seed and bound the price inputs.
 * `max` is rounded up to the nearest $10 so the slider/inputs sit on a tidy
 * ceiling rather than an arbitrary product price.
 */
export const PRICE_BOUNDS = {
  min: 0,
  max: Math.ceil(Math.max(...products.map(getEffectivePrice)) / 10) * 10,
} as const;

/**
 * Return the subset of `products` matching every provided criterion. Absent
 * criteria are ignored, so passing `{}` returns the list unchanged.
 */
export function filterProducts(
  products: Product[],
  { category, minPrice, maxPrice, search }: ProductFilterCriteria,
): Product[] {
  const query = search?.trim().toLowerCase();

  return products.filter((product) => {
    if (category && product.category !== category) return false;

    const price = getEffectivePrice(product);
    if (minPrice != null && price < minPrice) return false;
    if (maxPrice != null && price > maxPrice) return false;

    if (query) {
      const haystack = [product.name, product.description, ...product.tags]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
