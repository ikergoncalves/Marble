'use client';

import Link from 'next/link';
import { Gem, ShoppingBag } from 'lucide-react';
import { Button, ThemeToggle } from 'chiselui';
import { getCartItemCount, useCartStore, useHasHydrated } from '@/lib/store/cart';
import { useUiStore } from '@/lib/store/ui';
import { CartDrawer } from '@/components/cart/CartDrawer';
import styles from './Header.module.css';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
];

/**
 * Global site header: brand wordmark, primary navigation, theme toggle, and the
 * cart button (with live item-count badge) that opens the {@link CartDrawer}.
 *
 * The drawer is mounted here rather than in the root layout: the Header is
 * already a Client Component and owns the trigger, so co-locating them keeps all
 * cart UI in one client island. The Drawer portals to `document.body` regardless,
 * so its overlay/z-index are unaffected by this mount point.
 *
 * The badge reads from the persisted cart store, so it's gated behind
 * {@link useHasHydrated} — it renders nothing on the server and the first client
 * render, then appears after mount, avoiding a hydration mismatch.
 */
export function Header() {
  const openCart = useUiStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const hasHydrated = useHasHydrated();
  const itemCount = hasHydrated ? getCartItemCount(items) : 0;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Marble home">
          <Gem className={styles.brandIcon} size={20} aria-hidden />
          <span>Marble</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <span className={styles.cartButton}>
            <Button
              variant="ghost"
              size="md"
              aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : 'Open cart'}
              onClick={openCart}
            >
              <ShoppingBag size={18} aria-hidden />
            </Button>
            {itemCount > 0 && (
              <span className={styles.cartBadge} aria-hidden>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </span>
        </div>
      </div>

      <CartDrawer />
    </header>
  );
}
