import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Badge } from 'chiselui';
import type { Product } from '@/lib/types';
import { getCategory } from '@/data/categories';
import { formatCurrency } from '@/lib/format';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  product: Product;
}

/** Five-star rating with a proportional fill (e.g. 4.8 → 96% of stars gold). */
function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fillPercent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div className={styles.rating}>
      <span
        className={styles.stars}
        role="img"
        aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${reviewCount} reviews`}
      >
        <span className={styles.starsBase} aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={14} />
          ))}
        </span>
        <span className={styles.starsFill} style={{ width: `${fillPercent}%` }} aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={14} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      </span>
      <span className={styles.ratingMeta}>
        {rating.toFixed(1)} <span className={styles.reviewCount}>({reviewCount})</span>
      </span>
    </div>
  );
}

/**
 * Card presentation for a single product. Deliberately generic — the whole card
 * links to the product's detail page and carries no "featured" styling — so it
 * can be reused unchanged across the homepage and the /products listing.
 */
export function ProductCard({ product }: ProductCardProps) {
  const category = getCategory(product.category);
  const { price, discountPrice } = product;

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className={styles.image}
        />
        {category && (
          <Badge size="sm" className={styles.categoryBadge}>
            {category.label}
          </Badge>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className={styles.priceRow}>
          {discountPrice != null ? (
            <>
              <span className={styles.price}>{formatCurrency(discountPrice)}</span>
              <span className={styles.priceOriginal}>{formatCurrency(price)}</span>
            </>
          ) : (
            <span className={styles.price}>{formatCurrency(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
