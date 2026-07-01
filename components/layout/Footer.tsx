import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

/** Static site footer. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <span className={styles.brand}>Marble</span>
          <p className={styles.tagline}>
            Digital design assets for people who care about the details.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {year} Marble. All rights reserved.</span>
        <span className={styles.builtWith}>Built with chiselui.</span>
      </div>
    </footer>
  );
}
