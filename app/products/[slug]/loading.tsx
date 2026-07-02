'use client';

import { Skeleton } from 'chiselui';
import styles from './loading.module.css';

/** Thumbnail placeholders under the gallery stage. */
const THUMB_COUNT = 4;
/** License / Formats / File size rows in the buy box. */
const DETAIL_ROWS = 3;

/**
 * Route-level loading UI for /products/[slug], shown by the App Router while the
 * segment streams in. It mirrors the gallery + purchase-card two-column layout
 * with chiselui Skeletons so the page doesn't reflow when content arrives.
 *
 * Must be a Client Component (see the products loading file and the project's
 * "createContext" note). Purely decorative, so the tree is `aria-hidden`.
 */
export default function ProductLoading() {
  return (
    <div className="section" aria-hidden>
      <div className={styles.breadcrumb}>
        <Skeleton variant="text" width="18rem" />
      </div>

      <div className={styles.layout}>
        <div className={styles.galleryColumn}>
          <Skeleton variant="rectangular" className={styles.stage} />
          <div className={styles.thumbs}>
            {Array.from({ length: THUMB_COUNT }, (_, index) => (
              <Skeleton key={index} variant="rectangular" width={84} height={63} />
            ))}
          </div>
        </div>

        <div className={styles.purchaseColumn}>
          <div className={styles.card}>
            <Skeleton variant="rectangular" width="5rem" height="1.5rem" />
            <Skeleton variant="text" width="80%" height="2rem" />
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="text" width="8rem" height="1.75rem" />
            <div className={styles.details}>
              {Array.from({ length: DETAIL_ROWS }, (_, index) => (
                <Skeleton key={index} variant="text" />
              ))}
            </div>
            <Skeleton variant="rectangular" width="100%" height="3rem" />
          </div>
        </div>
      </div>
    </div>
  );
}
