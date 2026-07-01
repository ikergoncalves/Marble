import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import styles from './ProductGrid.module.css';

export interface ProductGridProps {
  products: Product[];
}

/** Responsive grid of {@link ProductCard}s. Column count adapts to the viewport. */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
