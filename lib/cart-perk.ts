/**
 * The "volume perk" — a purely *visual* incentive shown in the cart and on the
 * checkout order summary. Spending past {@link VOLUME_DISCOUNT_THRESHOLD} unlocks
 * a discount badge, but nothing is actually deducted from the subtotal (there's
 * no real payment); the progress bar just nudges the shopper toward the goal.
 *
 * Extracted here so the {@link import('@/components/cart/CartDrawer').CartDrawer}
 * and the checkout {@link import('@/components/checkout/OrderSummary').OrderSummary}
 * share a single threshold, label and calculation instead of drifting apart.
 */

/** Subtotal (USD) at which the volume perk is considered unlocked. */
export const VOLUME_DISCOUNT_THRESHOLD = 150;

/** Human label for the perk, shown once unlocked. */
export const VOLUME_DISCOUNT_LABEL = '10% off';

export interface VolumePerk {
  /** USD still needed to reach the threshold (0 once unlocked). */
  remaining: number;
  /** Progress toward the threshold as a 0–100 percentage. */
  progressValue: number;
  /** Whether the subtotal has reached the threshold. */
  unlocked: boolean;
}

/** Compute the volume-perk state for a given cart subtotal. */
export function getVolumePerk(subtotal: number): VolumePerk {
  const remaining = Math.max(0, VOLUME_DISCOUNT_THRESHOLD - subtotal);
  const progressValue = Math.min(100, (subtotal / VOLUME_DISCOUNT_THRESHOLD) * 100);
  return { remaining, progressValue, unlocked: remaining === 0 };
}
