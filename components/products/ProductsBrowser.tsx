'use client';

import { useCallback, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PackageOpen } from 'lucide-react';
import { Button, Pagination } from 'chiselui';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from './ProductFilters';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import {
  filterProducts,
  PRICE_BOUNDS,
  type ProductFilterCriteria,
} from '@/lib/filter-products';
import type { ProductCategory } from '@/lib/types';
import styles from './ProductsBrowser.module.css';

/** Products shown per page. 12 forces at least two pages across the 20-item catalog. */
const PAGE_SIZE = 12;

const CATEGORY_SLUGS = new Set<ProductCategory>(categories.map((category) => category.slug));

function isCategory(value: string | null): value is ProductCategory {
  return value != null && CATEGORY_SLUGS.has(value as ProductCategory);
}

/** Parse a finite, in-range price from a raw query param; undefined when absent/invalid. */
function parsePrice(raw: string | null): number | undefined {
  if (raw == null) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value)) return undefined;
  return Math.min(Math.max(value, PRICE_BOUNDS.min), PRICE_BOUNDS.max);
}

/** Derive the filter criteria from the URL, ignoring anything malformed. */
function readFilters(params: URLSearchParams): ProductFilterCriteria {
  const category = params.get('category');
  const search = params.get('search')?.trim();
  return {
    category: isCategory(category) ? category : undefined,
    minPrice: parsePrice(params.get('minPrice')),
    maxPrice: parsePrice(params.get('maxPrice')),
    search: search ? search : undefined,
  };
}

/** Set a query param, or delete it when the value is empty — keeps URLs tidy. */
function setParam(
  params: URLSearchParams,
  key: string,
  value: string | number | undefined,
): void {
  if (value == null || value === '') params.delete(key);
  else params.set(key, String(value));
}

/**
 * Client-side controller for the /products listing. The URL is the single source
 * of truth: filters and the current page live in query params, so every state is
 * shareable and the browser back/forward buttons just work. `useSearchParams`
 * makes an incoming `?category=` (e.g. from the homepage) apply on first paint.
 */
export function ProductsBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(
    () => readFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const filtered = useMemo(() => filterProducts(products, filters), [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = Math.floor(Number(searchParams.get('page')));
  const currentPage =
    Number.isFinite(requestedPage) && requestedPage >= 1
      ? Math.min(requestedPage, totalPages)
      : 1;

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const hasActiveFilters = Boolean(
    filters.category ||
      filters.minPrice != null ||
      filters.maxPrice != null ||
      filters.search,
  );

  const commit = useCallback(
    (params: URLSearchParams) => {
      const qs = params.toString();
      // `replace` + `scroll: false` keeps the history clean while filters change.
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const handleFilterChange = useCallback(
    (patch: Partial<ProductFilterCriteria>) => {
      const params = new URLSearchParams(searchParams.toString());
      if ('category' in patch) setParam(params, 'category', patch.category);
      if ('minPrice' in patch) setParam(params, 'minPrice', patch.minPrice);
      if ('maxPrice' in patch) setParam(params, 'maxPrice', patch.maxPrice);
      if ('search' in patch) setParam(params, 'search', patch.search);
      params.delete('page'); // any filter change returns to the first page
      commit(params);
    },
    [searchParams, commit],
  );

  const handleClear = useCallback(() => commit(new URLSearchParams()), [commit]);

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page <= 1) params.delete('page');
      else params.set('page', String(page));
      // Bring the top of the results into view so the new page starts at the top.
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      commit(params);
    },
    [searchParams, commit],
  );

  return (
    <>
      <ProductFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      <div ref={resultsRef} className={styles.results}>
        {filtered.length > 0 ? (
          <>
            <p className={styles.count} aria-live="polite">
              Showing {pageItems.length} of {filtered.length}{' '}
              {filtered.length === 1 ? 'product' : 'products'}
            </p>
            <ProductGrid products={pageItems} />
          </>
        ) : (
          <div className={styles.empty}>
            <PackageOpen size={40} aria-hidden className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>No products match your filters</h2>
            <p className={styles.emptyText}>
              Try widening your price range or clearing the search to see more of the catalog.
            </p>
            <Button variant="primary" onClick={handleClear}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
