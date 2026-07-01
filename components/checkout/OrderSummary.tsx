'use client';

import Image from 'next/image';
import { Progress } from 'chiselui';
import type { CartItem, Product } from '@/lib/types';
import { getProductById } from '@/data/products';
import { formatCurrency } from '@/lib/format';
import { getVolumePerk, VOLUME_DISCOUNT_LABEL } from '@/lib/cart-perk';
import { getCartTotal } from '@/lib/store/cart';
import styles from './OrderSummary.module.css';

export interface OrderSummaryProps {
  /** The current cart line items (already hydrated by the caller). */
  items: CartItem[];
}

/** A resolved cart line: the stored item paired with its live catalog product. */
interface OrderLine {
  item: CartItem;
  product: Product;
}

/**
 * Read-only recap of what's being purchased, shown in the checkout's right
 * column. Mirrors the cart drawer's data model (live product lookup + shared
 * {@link getCartTotal}) but without any quantity controls — editing lives in the
 * drawer. The volume-perk progress is reused from {@link getVolumePerk} so the
 * threshold and copy stay in sync with the drawer.
 *
 * This is a Client Component because it's rendered inside the client-only
 * checkout tree and reads cart-derived data; the caller passes already-hydrated
 * `items` so there's no hydration guard needed here.
 */
export function OrderSummary({ items }: OrderSummaryProps) {
  const lines: OrderLine[] = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((line): line is OrderLine => line.product !== undefined);

  const subtotal = getCartTotal(items);
  const { remaining, progressValue, unlocked } = getVolumePerk(subtotal);

  return (
    <section className={styles.summary} aria-label="Order summary">
      <h2 className={styles.title}>Order summary</h2>

      <ul className={styles.list}>
        {lines.map(({ item, product }) => {
          const unitPrice = product.discountPrice ?? product.price;
          return (
            <li key={item.productId} className={styles.item}>
              <span className={styles.thumb}>
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  fill
                  sizes="56px"
                  className={styles.thumbImage}
                />
                <span className={styles.qtyBadge} aria-hidden>
                  {item.quantity}
                </span>
              </span>

              <span className={styles.itemMain}>
                <span className={styles.itemName}>{product.name}</span>
                <span className={styles.itemMeta}>
                  {item.quantity} × {formatCurrency(unitPrice)}
                </span>
              </span>

              <span className={styles.itemTotal}>
                {formatCurrency(unitPrice * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className={styles.perk}>
        <p className={styles.perkText}>
          {unlocked ? (
            <>🎉 You&apos;ve unlocked {VOLUME_DISCOUNT_LABEL} on a future order.</>
          ) : (
            <>
              Spend <strong>{formatCurrency(remaining)}</strong> more to unlock {VOLUME_DISCOUNT_LABEL}.
            </>
          )}
        </p>
        <Progress
          value={progressValue}
          color={unlocked ? 'success' : 'primary'}
          size="sm"
          label={`Volume discount progress: ${Math.round(progressValue)}%`}
        />
      </div>

      <dl className={styles.totals}>
        <div className={styles.totalRow}>
          <dt className={styles.totalLabel}>Subtotal</dt>
          <dd className={styles.totalValue}>{formatCurrency(subtotal)}</dd>
        </div>
        <div className={styles.totalRow}>
          <dt className={styles.totalLabel}>Taxes</dt>
          <dd className={styles.totalMuted}>Calculated at payment</dd>
        </div>
        <div className={`${styles.totalRow} ${styles.grandRow}`}>
          <dt className={styles.grandLabel}>Total due</dt>
          <dd className={styles.grandValue}>{formatCurrency(subtotal)}</dd>
        </div>
      </dl>
    </section>
  );
}
