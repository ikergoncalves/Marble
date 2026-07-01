'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from 'chiselui';
import { featuredProducts } from '@/data/products';
import styles from './Hero.module.css';

// A small, purely decorative mosaic built from the first few featured covers.
const heroImages = featuredProducts.slice(0, 3);

/** Opening section of the homepage: value proposition, CTAs, and a cover mosaic. */
export function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>Curated digital design assets</span>
        <h1 className={styles.title}>Design assets, precisely crafted.</h1>
        <p className={styles.subtitle}>
          UI kits, templates, icon sets, and fonts — meticulously made for
          designers and developers who sweat the details.
        </p>

        <div className={styles.actions}>
          <Link href="/products">
            <Button size="lg" rightIcon={<ArrowRight size={18} aria-hidden />}>
              Browse Products
            </Button>
          </Link>
          <Link href="#categories">
            <Button variant="secondary" size="lg">
              Explore Categories
            </Button>
          </Link>
        </div>

        <p className={styles.trust}>Trusted by 40,000+ designers and teams.</p>
      </div>

      <div className={styles.gallery} aria-hidden>
        {heroImages.map((product) => (
          <div key={product.id} className={styles.tile}>
            <Image
              src={product.coverImage}
              alt=""
              fill
              sizes="(max-width: 900px) 45vw, 260px"
              className={styles.tileImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
