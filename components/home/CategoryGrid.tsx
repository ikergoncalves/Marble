import Link from 'next/link';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { getCategoryIcon } from '@/lib/category-icons';
import styles from './CategoryGrid.module.css';

/**
 * "Shop by category" section. Each card links into the /products listing with a
 * `category` query param that Phase 3 will read to pre-filter the results.
 */
export function CategoryGrid() {
  return (
    <section id="categories" className={`section ${styles.categories}`}>
      <header className={styles.header}>
        <h2 className={styles.title}>Shop by category</h2>
        <p className={styles.subtitle}>Find exactly what your next project needs.</p>
      </header>

      <div className={styles.grid}>
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const count = getProductsByCategory(category.slug).length;

          return (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className={styles.card}
            >
              <span className={styles.iconWrap}>
                <Icon size={24} aria-hidden />
              </span>
              <h3 className={styles.cardTitle}>{category.label}</h3>
              <p className={styles.cardDescription}>{category.description}</p>
              <span className={styles.count}>
                {count} {count === 1 ? 'product' : 'products'}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
