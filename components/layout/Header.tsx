'use client';

import Link from 'next/link';
import { Gem, ShoppingBag } from 'lucide-react';
import { Button, ThemeToggle } from 'chiselui';
import styles from './Header.module.css';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/categories', label: 'Categories' },
];

/**
 * Global site header: brand wordmark, primary navigation, theme toggle, and a
 * (currently inert) cart button that will be wired up in Phase 5.
 */
export function Header() {
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
          <Button variant="ghost" size="md" aria-label="Shopping bag">
            <ShoppingBag size={18} aria-hidden />
          </Button>
        </div>
      </div>
    </header>
  );
}
