import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

export interface StarRatingProps {
  /** Rating on a 0–5 scale; the gold fill is proportional (e.g. 4.8 → 96%). */
  rating: number;
  /** Star glyph size in px. @default 14 */
  size?: number;
  /** Show the numeric rating (e.g. `4.8`) after the stars. @default false */
  showValue?: boolean;
  /** When provided, appends a `(count)` and folds into the accessible label. */
  reviewCount?: number;
}

/**
 * Five-star rating with a proportional fill, extracted so the product detail
 * page's purchase card and its individual reviews render stars identically.
 * (ProductCard keeps its own copy to stay untouched this phase.)
 */
export function StarRating({ rating, size = 14, showValue = false, reviewCount }: StarRatingProps) {
  const fillPercent = Math.max(0, Math.min(100, (rating / 5) * 100));
  const label =
    reviewCount != null
      ? `Rated ${rating.toFixed(1)} out of 5 from ${reviewCount} reviews`
      : `Rated ${rating.toFixed(1)} out of 5`;

  return (
    <div className={styles.rating}>
      <span className={styles.stars} role="img" aria-label={label}>
        <span className={styles.starsBase} aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={size} />
          ))}
        </span>
        <span className={styles.starsFill} style={{ width: `${fillPercent}%` }} aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={size} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      </span>

      {(showValue || reviewCount != null) && (
        <span className={styles.meta}>
          {showValue && rating.toFixed(1)}
          {reviewCount != null && (
            <span className={styles.reviewCount}> ({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
