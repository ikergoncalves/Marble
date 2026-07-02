import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsBrowser } from '@/components/products/ProductsBrowser';
import styles from './page.module.css';

export const metadata: Metadata = {
  // Root layout's title template appends the "— Marble" suffix.
  title: 'Products',
  description:
    'Browse Marble’s catalog of UI kits, templates, icon sets, and fonts. Filter by category, price, or keyword.',
};

/**
 * The /products listing route. A Server Component renders the static heading,
 * then hands off to {@link ProductsBrowser} for the URL-driven filtering and
 * pagination. The Suspense boundary is required because the browser reads the
 * request's search params via `useSearchParams`.
 */
export default function ProductsPage() {
  return (
    <section className="section">
      <header className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <p className={styles.subtitle}>
          UI kits, templates, icon sets, and fonts — filter by category, price, or keyword.
        </p>
      </header>

      <Suspense fallback={<p className={styles.loading}>Loading products…</p>}>
        <ProductsBrowser />
      </Suspense>
    </section>
  );
}
