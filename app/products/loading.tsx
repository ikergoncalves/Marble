'use client';

import { Skeleton } from 'chiselui';
import styles from './loading.module.css';

/** Placeholder cards to render — roughly a first screenful of the real grid. */
const PLACEHOLDER_COUNT = 8;

/**
 * Route-level loading UI for /products, shown by the App Router while the
 * segment streams in. It mirrors the real heading + product grid with chiselui
 * Skeletons so the layout stays stable when the content arrives.
 *
 * Must be a Client Component: chiselui's barrel export pulls in stateful pieces,
 * so anything importing from it lives in a client tree (see the project's
 * "createContext" note). The visual placeholders are `aria-hidden` — there's no
 * meaningful content for a screen reader to announce here.
 */
export default function ProductsLoading() {
  return (
    <section className="section">
      <header className={styles.header} aria-hidden>
        <Skeleton variant="text" width="14rem" height="2rem" />
        <Skeleton variant="text" width="min(60ch, 100%)" />
      </header>

      <div className={styles.grid} aria-hidden>
        {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
          <div key={index} className={styles.card}>
            <Skeleton variant="rectangular" className={styles.media} />
            <div className={styles.body}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" lines={2} />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
