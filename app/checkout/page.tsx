import type { Metadata } from 'next';
import { CheckoutView } from '@/components/checkout/CheckoutView';
import styles from './page.module.css';

export const metadata: Metadata = {
  // Root layout's title template appends the "— Marble" suffix.
  title: 'Checkout',
  description: 'Review your order and complete your purchase of premium digital design assets.',
  // Transactional, cart-dependent page — keep it out of search indexes.
  robots: { index: false, follow: false },
};

/**
 * The /checkout route. A thin Server Component renders the static heading, then
 * hands off to {@link CheckoutView} — a Client Component — for everything that
 * depends on the persisted cart (loading/empty states, the form + order summary,
 * and the confirmation modal). Splitting it this way keeps `metadata` on the
 * server while the cart-driven UI stays client-side.
 */
export default function CheckoutPage() {
  return (
    <section className="section">
      <header className={styles.header}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.subtitle}>
          You&apos;re one step away — review your order and complete your purchase.
        </p>
      </header>

      <CheckoutView />
    </section>
  );
}
