'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button, Modal, Spinner } from 'chiselui';
import { formatCurrency } from '@/lib/format';
import { getCartItemCount, getCartTotal, useCartStore, useHasHydrated } from '@/lib/store/cart';
import { CheckoutForm } from './CheckoutForm';
import { OrderSummary } from './OrderSummary';
import styles from './CheckoutView.module.css';

/** A confirmed order — a snapshot captured at submit, before the cart is cleared. */
interface PlacedOrder {
  number: string;
  email: string;
  total: number;
  itemCount: number;
}

/** Build a mock order id like `MARBLE-7QK2P`. Client-only (runs on submit). */
function generateOrderNumber(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O/1/I
  let suffix = '';
  for (let i = 0; i < 5; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MARBLE-${suffix}`;
}

/**
 * The interactive heart of the /checkout route: it decides between a loading
 * state, an empty-cart state and the two-column form + summary, and it owns the
 * order-confirmation modal.
 *
 * Hydration: cart contents come from a persisted store, so we gate on
 * {@link useHasHydrated}. Until it's true we show a spinner (never the empty
 * state), which prevents both a hydration mismatch and a flash of "empty cart"
 * before the persisted items load.
 *
 * The confirmation modal is owned here, *above* the form, on purpose: placing the
 * order clears the cart, which would unmount a form-owned modal instantly. Keeping
 * it at this level lets it survive the switch away from the form. The cart is
 * cleared the moment the order is placed (not when the modal is dismissed), so it
 * happens exactly once no matter how the modal is closed.
 */
export function CheckoutView() {
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  // Snapshot the order from the live cart, then empty it. Reading via getState()
  // avoids any stale closure over `items` from when the callback was created.
  const handleOrderPlaced = ({ email }: { email: string }) => {
    const currentItems = useCartStore.getState().items;
    setOrder({
      number: generateOrderNumber(),
      email,
      total: getCartTotal(currentItems),
      itemCount: getCartItemCount(currentItems),
    });
    clearCart();
  };

  const handleContinue = () => {
    setOrder(null);
    router.push('/');
  };

  let body: ReactNode;
  if (!hasHydrated) {
    body = (
      <div className={styles.state} role="status">
        <Spinner size="lg" label="Loading your cart…" />
        <p className={styles.stateText}>Loading your cart…</p>
      </div>
    );
  } else if (order) {
    // Cart is already cleared; this sits behind the confirmation modal overlay.
    body = (
      <div className={styles.state}>
        <span className={styles.stateIcon} aria-hidden>
          <CheckCircle size={40} />
        </span>
        <p className={styles.stateTitle}>Thank you for your purchase!</p>
        <p className={styles.stateText}>Your order {order.number} is confirmed.</p>
        <Button variant="primary" size="md" onClick={handleContinue}>
          Continue shopping
        </Button>
      </div>
    );
  } else if (items.length === 0) {
    body = (
      <div className={styles.state}>
        <span className={styles.stateIcon} aria-hidden>
          <ShoppingBag size={40} />
        </span>
        <p className={styles.stateTitle}>Your cart is empty</p>
        <p className={styles.stateText}>
          Add a few assets to your cart and they&apos;ll show up here, ready to check out.
        </p>
        <Button variant="primary" size="md" onClick={() => router.push('/products')}>
          Browse products
        </Button>
      </div>
    );
  } else {
    body = (
      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <CheckoutForm onOrderPlaced={handleOrderPlaced} />
        </div>
        <aside className={styles.summaryColumn}>
          <OrderSummary items={items} />
        </aside>
      </div>
    );
  }

  return (
    <>
      {body}

      <Modal
        isOpen={order !== null}
        onClose={handleContinue}
        title="Order confirmed!"
        size="sm"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        {order && (
          <div className={styles.confirm}>
            <span className={styles.confirmIcon} aria-hidden>
              <CheckCircle size={48} />
            </span>
            <p className={styles.confirmLead}>
              Thanks! Your order <strong>{order.number}</strong> has been placed.
            </p>
            <dl className={styles.confirmMeta}>
              <div className={styles.confirmRow}>
                <dt className={styles.confirmLabel}>Items</dt>
                <dd className={styles.confirmValue}>
                  {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                </dd>
              </div>
              <div className={styles.confirmRow}>
                <dt className={styles.confirmLabel}>Total paid</dt>
                <dd className={styles.confirmValue}>{formatCurrency(order.total)}</dd>
              </div>
            </dl>
            <p className={styles.confirmEmail}>
              A confirmation email has been sent to <strong>{order.email}</strong>.
            </p>
            <Button
              variant="primary"
              size="lg"
              className={styles.confirmButton}
              onClick={handleContinue}
            >
              Continue shopping
            </Button>
            <p className={styles.confirmNote}>
              This is a demo store — no real charge was made. Browse more in the{' '}
              <Link href="/products" className={styles.confirmLink} onClick={() => setOrder(null)}>
                catalog
              </Link>
              .
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
