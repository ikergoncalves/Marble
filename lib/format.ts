/**
 * Presentation helpers. Marble targets an international audience, so all money
 * is formatted as US dollars regardless of the visitor's locale.
 */

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/** Format a USD amount, e.g. `formatCurrency(29)` → `"$29.00"`. */
export function formatCurrency(amount: number): string {
  return usdFormatter.format(amount);
}

const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

/** Format large counts compactly, e.g. `formatCompactNumber(12800)` → `"12.8K"`. */
export function formatCompactNumber(value: number): string {
  return compactNumberFormatter.format(value);
}
