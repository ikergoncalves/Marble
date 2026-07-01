import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getProductBySlug, getProductsByCategory, products } from '@/data/products';
import { getCategory } from '@/data/categories';
import { getReviewsByProductId } from '@/data/reviews';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductPurchaseCard } from '@/components/products/ProductPurchaseCard';
import { ProductTabs } from '@/components/products/ProductTabs';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import styles from './page.module.css';

/** How many same-category products to surface under "You might also like". */
const RELATED_LIMIT = 4;

interface ProductPageParams {
  params: { slug: string };
}

/** Pre-render every product route at build time from the static catalog. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageParams): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product not found — Marble' };
  }
  return {
    title: `${product.name} — Marble`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageParams) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const category = getCategory(product.category);
  const reviews = getReviewsByProductId(product.id);
  const related = getProductsByCategory(product.category)
    .filter((candidate) => candidate.id !== product.id)
    .slice(0, RELATED_LIMIT);

  return (
    <div className="section">
      {/* Custom breadcrumb (next/link) rather than chiselui's Breadcrumb, which
          emits raw <a> tags — see the phase report for the rationale. */}
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol className={styles.crumbs}>
          <li className={styles.crumb}>
            <Link href="/" className={styles.crumbLink}>
              Home
            </Link>
            <ChevronRight size={14} aria-hidden className={styles.crumbSep} />
          </li>
          <li className={styles.crumb}>
            <Link href="/products" className={styles.crumbLink}>
              Products
            </Link>
            <ChevronRight size={14} aria-hidden className={styles.crumbSep} />
          </li>
          {category && (
            <li className={styles.crumb}>
              <Link
                href={`/products?category=${category.slug}`}
                className={styles.crumbLink}
              >
                {category.label}
              </Link>
              <ChevronRight size={14} aria-hidden className={styles.crumbSep} />
            </li>
          )}
          <li className={styles.crumb}>
            <span className={styles.crumbCurrent} aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className={styles.layout}>
        <div className={styles.galleryColumn}>
          <ProductGallery
            coverImage={product.coverImage}
            previewImages={product.previewImages}
            name={product.name}
          />
        </div>
        <div className={styles.purchaseColumn}>
          <ProductPurchaseCard product={product} />
        </div>
      </div>

      <section className={styles.tabsSection} aria-label="Product details">
        <ProductTabs product={product} reviews={reviews} />
      </section>

      <RelatedProducts products={related} />
    </div>
  );
}
