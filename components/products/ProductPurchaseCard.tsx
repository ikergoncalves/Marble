'use client';

import { useCallback, useState } from 'react';
import { Check, Download, FileType2, HardDrive, ShoppingCart } from 'lucide-react';
import { Badge, Button, NumberInput, useToast } from 'chiselui';
import type { Product } from '@/lib/types';
import { getCategory } from '@/data/categories';
import { formatCompactNumber, formatCurrency } from '@/lib/format';
import { StarRating } from '@/components/product/StarRating';
import styles from './ProductPurchaseCard.module.css';

export interface ProductPurchaseCardProps {
  product: Product;
}

const MAX_QUANTITY = 10;

/** Human label for a license tier, e.g. `commercial` → `Commercial`. */
function licenseLabel(license: Product['license']): string {
  return license.charAt(0).toUpperCase() + license.slice(1);
}

/**
 * The buy box for a single product: title, rating, price, technical details, a
 * quantity stepper and the "Add to cart" action.
 *
 * The cart itself lands in Phase 5 (Zustand + Drawer). Until then {@link handleAddToCart}
 * only fires a confirmation toast — but it is intentionally the single place the
 * add logic lives, so Phase 5 can swap its body for a real store action without
 * touching the surrounding markup.
 */
export function ProductPurchaseCard({ product }: ProductPurchaseCardProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const category = getCategory(product.category);
  const { price, discountPrice } = product;

  const handleAddToCart = useCallback(() => {
    // ── Phase 5 will replace the body below with a real cart-store action. ──
    // Keep the quantity + toast wiring; only the "persist" step is a stub today.
    const noun = quantity === 1 ? 'copy' : 'copies';
    toast({
      message: `Added ${quantity} ${noun} of ${product.name} to cart`,
      variant: 'success',
    });

    // Briefly flip the button into a confirmed state for a satisfying beat.
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }, [product.name, quantity, toast]);

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        {category && <Badge variant="info">{category.label}</Badge>}
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.tagline}>{product.description}</p>
      </div>

      <div className={styles.metaRow}>
        <StarRating rating={product.rating} showValue reviewCount={product.reviewCount} size={18} />
        <span className={styles.downloads}>
          <Download size={16} aria-hidden />
          {formatCompactNumber(product.downloadCount)} downloads
        </span>
      </div>

      <div className={styles.priceRow}>
        {discountPrice != null ? (
          <>
            <span className={styles.price}>{formatCurrency(discountPrice)}</span>
            <span className={styles.priceOriginal}>{formatCurrency(price)}</span>
            <Badge variant="success" size="sm">
              Save {formatCurrency(price - discountPrice)}
            </Badge>
          </>
        ) : (
          <span className={styles.price}>{formatCurrency(price)}</span>
        )}
      </div>

      <dl className={styles.details}>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>
            <ShoppingCart size={16} aria-hidden /> License
          </dt>
          <dd className={styles.detailValue}>{licenseLabel(product.license)}</dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>
            <FileType2 size={16} aria-hidden /> Formats
          </dt>
          <dd className={styles.detailValue}>
            <span className={styles.formats}>
              {product.fileFormats.map((format) => (
                <Badge key={format} size="sm">
                  {format}
                </Badge>
              ))}
            </span>
          </dd>
        </div>
        <div className={styles.detail}>
          <dt className={styles.detailLabel}>
            <HardDrive size={16} aria-hidden /> File size
          </dt>
          <dd className={styles.detailValue}>{product.fileSizeMb} MB</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={MAX_QUANTITY}
          step={1}
          locale="en-US"
        />
        <Button
          variant="primary"
          size="lg"
          className={styles.addButton}
          onClick={handleAddToCart}
          leftIcon={justAdded ? <Check size={18} aria-hidden /> : <ShoppingCart size={18} aria-hidden />}
        >
          {justAdded ? 'Added to cart' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
}
