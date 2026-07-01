'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from 'chiselui';
import { featuredProducts } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import styles from './FeaturedProducts.module.css';

const MAX_FEATURED = 8;

/** Homepage highlights: a capped grid of featured products with a link to all. */
export function FeaturedProducts() {
  const products = featuredProducts.slice(0, MAX_FEATURED);

  return (
    <section className={`section ${styles.featured}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>Featured products</h2>
        <p className={styles.subtitle}>
          Hand-picked kits, templates, and type — the best of Marble.
        </p>
      </header>

      <ProductGrid products={products} />

      <div className={styles.footer}>
        <Link href="/products">
          <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={18} aria-hidden />}>
            View all products
          </Button>
        </Link>
      </div>
    </section>
  );
}
