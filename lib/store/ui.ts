import { create } from 'zustand';

/**
 * Ephemeral UI store for transient, non-persisted interface state.
 *
 * Right now it only tracks whether the cart drawer is open. Keeping this in a
 * tiny dedicated store lets the Header trigger, the ProductPurchaseCard's
 * "add to cart" action, and the CartDrawer coordinate open/close without prop
 * drilling. It is intentionally *not* persisted — the drawer always starts
 * closed on both server and client, so there's no hydration mismatch to guard.
 */
interface UiState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
