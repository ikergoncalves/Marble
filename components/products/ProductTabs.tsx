'use client';

import { Badge, Tabs } from 'chiselui';
import type { License, Product, Review } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { StarRating } from '@/components/product/StarRating';
import styles from './ProductTabs.module.css';

export interface ProductTabsProps {
  product: Product;
  reviews: Review[];
}

/** Plain-language explanation of what each license tier permits. */
const LICENSE_COPY: Record<License, { title: string; description: string }> = {
  personal: {
    title: 'Personal',
    description:
      'For personal, non-commercial work — portfolios, learning, and side projects that are not sold or monetized.',
  },
  commercial: {
    title: 'Commercial',
    description:
      'For a single commercial project — one client site, product, or app that you or your company ships to end users.',
  },
  extended: {
    title: 'Extended',
    description:
      'Unrestricted commercial use across unlimited projects, including work intended for resale or redistribution.',
  },
};

const LICENSE_ORDER: License[] = ['personal', 'commercial', 'extended'];

function OverviewPanel({ product }: { product: Product }) {
  return (
    <div className={styles.panel}>
      <p className={styles.prose}>{product.longDescription}</p>
      {product.tags.length > 0 && (
        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <Badge key={tag} size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewsPanel({ reviews }: { reviews: Review[] }) {
  // The summary is computed from the reviews actually listed below (not the
  // catalog's headline rating/count) so the average and the list never disagree.
  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  if (reviews.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.empty}>No reviews yet — be the first to share your thoughts.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.reviewSummary}>
        <span className={styles.summaryScore}>{average.toFixed(1)}</span>
        <div className={styles.summaryMeta}>
          <StarRating rating={average} size={18} />
          <span className={styles.summaryCount}>
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>

      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.review}>
            <div className={styles.reviewHead}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              <time className={styles.reviewDate} dateTime={review.createdAt}>
                {formatDate(review.createdAt)}
              </time>
            </div>
            <StarRating rating={review.rating} size={14} />
            <p className={styles.reviewComment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LicensePanel({ license }: { license: License }) {
  return (
    <div className={styles.panel}>
      <p className={styles.prose}>
        Every purchase includes a license that sets how you may use the files. This product ships
        with the <strong>{LICENSE_COPY[license].title}</strong> license.
      </p>
      <ul className={styles.licenseList}>
        {LICENSE_ORDER.map((tier) => {
          const isActive = tier === license;
          return (
            <li
              key={tier}
              className={`${styles.license} ${isActive ? styles.licenseActive : ''}`}
            >
              <div className={styles.licenseHead}>
                <span className={styles.licenseTitle}>{LICENSE_COPY[tier].title}</span>
                {isActive && (
                  <Badge variant="success" size="sm">
                    Your license
                  </Badge>
                )}
              </div>
              <p className={styles.licenseText}>{LICENSE_COPY[tier].description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Overview / Reviews / License tabs for the product detail page. chiselui's Tabs
 * is array-driven (`items` of `{ id, label, content }`), so each panel is built
 * here and handed over as `content`.
 */
export function ProductTabs({ product, reviews }: ProductTabsProps) {
  return (
    <Tabs
      items={[
        {
          id: 'overview',
          label: 'Overview',
          content: <OverviewPanel product={product} />,
        },
        {
          id: 'reviews',
          label: `Reviews (${reviews.length})`,
          content: <ReviewsPanel reviews={reviews} />,
        },
        {
          id: 'license',
          label: 'License',
          content: <LicensePanel license={product.license} />,
        },
      ]}
    />
  );
}
