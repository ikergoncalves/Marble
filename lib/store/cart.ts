import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem } from '@/lib/types';
import { getProductById } from '@/data/products';

/**
 * Cart store (Zustand + `persist`).
 *
 * Line items are keyed on {@link import('@/lib/types').Product.id} — the stable
 * catalog id (`p01`), not the slug — because `CartItem.productId` is an id and
 * `ProductPurchaseCard` adds via `product.id`. The cart only stores `{ productId,
 * quantity }`; product details (price, image, name) are always looked up live
 * from the catalog so the cart never holds a stale copy of a product.
 *
 * `items` starts empty on the server and is rehydrated from localStorage on the
 * client. Rendering of persisted values must be gated behind {@link useHasHydrated}
 * so the first client render matches the server's empty markup — see that hook
 * for why an `onRehydrateStorage` flag isn't enough here.
 */
interface CartState {
  items: CartItem[];
  /** Add `quantity` (default 1) of a product, merging with any existing line. */
  addItem: (productId: string, quantity?: number) => void;
  /** Remove a product's line item entirely. */
  removeItem: (productId: string) => void;
  /** Set the exact quantity; a value `<= 0` removes the line (like removeItem). */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Empty the cart. */
  clearCart: () => void;
}

/** localStorage key for the persisted cart. */
const STORAGE_KEY = 'marble-cart';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (productId, quantity = 1) =>
        set((state) => {
          if (quantity <= 0) return state;
          const existing = state.items.find((item) => item.productId === productId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.productId !== productId) };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only the line items are persisted.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

/**
 * Returns `false` on the server and on the first client render, then `true` after
 * mount. Gate any rendering of persisted cart values (e.g. the Header count
 * badge) on this.
 *
 * A store-side `onRehydrateStorage` flag is insufficient: with synchronous
 * `localStorage`, `persist` rehydrates during module evaluation — before React's
 * first client render — so the flag would already be `true` and the badge would
 * mismatch the server's empty markup. A mount effect is guaranteed to run only
 * after that first render, so it reliably lines the two up.
 */
export function useHasHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/**
 * Sum of `effective price × quantity` across the cart. Line items whose product
 * is no longer in the catalog are skipped so a stale persisted id can't crash
 * the total.
 */
export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const product = getProductById(item.productId);
    if (!product) return total;
    const unitPrice = product.discountPrice ?? product.price;
    return total + unitPrice * item.quantity;
  }, 0);
}

/** Total number of copies in the cart — the number shown on the Header badge. */
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
