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

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // Catalog dates are bare `YYYY-MM-DD` strings parsed as UTC midnight; format in
  // UTC too so a viewer's timezone can never shift the displayed day.
  timeZone: 'UTC',
});

/** Format an ISO date for display, e.g. `formatDate('2024-03-12')` → `"March 12, 2024"`. */
export function formatDate(iso: string): string {
  return longDateFormatter.format(new Date(iso));
}
