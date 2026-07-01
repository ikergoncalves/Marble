'use client';

import { Sparkles } from 'lucide-react';
import { Button, useToast } from 'chiselui';
import styles from './page.module.css';

/**
 * Phase 1 placeholder. Its only job is to prove the foundation works end to
 * end: chiselui's stylesheet is loaded, its components render, the toast queue
 * is live, and the header's ThemeToggle drives light/dark. The real homepage
 * (hero, featured products, categories) arrives in Phase 2.
 */
export default function HomePage() {
  const { toast } = useToast();

  return (
    <section className={styles.hero}>
      <span className={styles.eyebrow}>Phase 1 · Foundation ready</span>
      <h1 className={styles.title}>Digital design assets, precisely chiseled.</h1>
      <p className={styles.subtitle}>
        Marble is a curated marketplace for UI kits, templates, icon sets, and
        fonts. This is the project foundation — Next.js 14, TypeScript in strict
        mode, and the chiselui design system. Toggle the theme in the header;
        light and dark work out of the box.
      </p>

      <div className={styles.actions}>
        <Button
          size="lg"
          leftIcon={<Sparkles size={18} aria-hidden />}
          onClick={() =>
            toast({
              message: 'chiselui is wired up — components, theming, and toasts all work.',
              variant: 'success',
            })
          }
        >
          Test the setup
        </Button>
        <Button variant="secondary" size="lg" disabled>
          Storefront coming soon
        </Button>
      </div>
    </section>
  );
}
