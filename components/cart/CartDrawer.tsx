'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Button, Drawer, NumberInput, Progress } from 'chiselui';
import type { CartItem, Product } from '@/lib/types';
import { getProductById } from '@/data/products';
import { formatCurrency } from '@/lib/format';
import { getVolumePerk, VOLUME_DISCOUNT_LABEL } from '@/lib/cart-perk';
import { getCartTotal, useCartStore } from '@/lib/store/cart';
import { useUiStore } from '@/lib/store/ui';
import styles from './CartDrawer.module.css';

/** Matches the per-line quantity ceiling used by ProductPurchaseCard. */
const MAX_QUANTITY = 10;

/** A resolved cart line: the stored item paired with its live catalog product. */
interface CartLine {
  item: CartItem;
  product: Product;
}

/**
 * The slide-in cart panel. Rendered once (see {@link import('@/components/layout/Header').Header}),
 * it reads its open state from the UI store and its contents from the cart store.
 *
 * Uses chiselui's {@link Drawer}, which ships its own title bar, close button,
 * overlay, focus trap and Escape handling — so this component only supplies the
 * body and footer. Because Drawer renders through a portal on `document.body`,
 * its DOM mount point is irrelevant to overlay/z-index.
 */
export function CartDrawer() {
  const router = useRouter();

  const isCartOpen = useUiStore((state) => state.isCartOpen);
  const closeCart = useUiStore((state) => state.closeCart);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  // Pair each stored line with its live product, dropping any whose product is
  // no longer in the catalog (defensive against a stale persisted id).
  const lines: CartLine[] = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((line): line is CartLine => line.product !== undefined);

  const subtotal = getCartTotal(items);
  const isEmpty = lines.length === 0;

  // Volume-perk progress (visual only — see lib/cart-perk).
  const { remaining, progressValue, unlocked: perkUnlocked } = getVolumePerk(subtotal);

  const goToProducts = () => {
    closeCart();
    router.push('/products');
  };

  const goToCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const footer = isEmpty ? undefined : (
    <div className={styles.footer}>
      <div className={styles.subtotalRow}>
        <span className={styles.subtotalLabel}>Subtotal</span>
        <span className={styles.subtotalValue}>{formatCurrency(subtotal)}</span>
      </div>
      <p className={styles.footerNote}>Taxes and any discounts are calculated at checkout.</p>
      <Button
        variant="primary"
        size="lg"
        className={styles.checkoutButton}
        rightIcon={<ArrowRight size={18} aria-hidden />}
        onClick={goToCheckout}
      >
        Checkout
      </Button>
    </div>
  );

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title="Your Cart"
      placement="right"
      size="md"
      footer={footer}
    >
      {isEmpty ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon} aria-hidden>
            <ShoppingBag size={40} />
          </span>
          <p className={styles.emptyTitle}>Your cart is empty</p>
          <p className={styles.emptyText}>
            Browse the catalog and add a few assets to get started.
          </p>
          <Button variant="primary" size="md" onClick={goToProducts}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className={styles.body}>
          <div className={styles.perk}>
            <div className={styles.perkText}>
              {perkUnlocked ? (
                <>🎉 You&apos;ve unlocked {VOLUME_DISCOUNT_LABEL} at checkout.</>
              ) : (
                <>
                  Add <strong>{formatCurrency(remaining)}</strong> more to unlock {VOLUME_DISCOUNT_LABEL}.
                </>
              )}
            </div>
            <Progress
              value={progressValue}
              color={perkUnlocked ? 'success' : 'primary'}
              size="sm"
              label={`Volume discount progress: ${Math.round(progressValue)}%`}
            />
          </div>

          <ul className={styles.list}>
            {lines.map(({ item, product }) => {
              const unitPrice = product.discountPrice ?? product.price;
              return (
                <li key={item.productId} className={styles.item}>
                  <Link
                    href={`/products/${product.slug}`}
                    className={styles.thumbLink}
                    onClick={closeCart}
                    aria-label={product.name}
                  >
                    <Image
                      src={product.coverImage}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className={styles.thumb}
                    />
                  </Link>

                  <div className={styles.itemMain}>
                    <Link
                      href={`/products/${product.slug}`}
                      className={styles.itemName}
                      onClick={closeCart}
                    >
                      {product.name}
                    </Link>
                    <span className={styles.itemPrice}>{formatCurrency(unitPrice)} each</span>

                    <div className={styles.itemControls}>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.productId, value)}
                        min={1}
                        max={MAX_QUANTITY}
                        step={1}
                        locale="en-US"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeItem(item.productId)}
                        leftIcon={<Trash2 size={16} aria-hidden />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <span className={styles.itemLineTotal}>
                    {formatCurrency(unitPrice * item.quantity)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
