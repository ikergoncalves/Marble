import type { License } from '@/lib/types';

/**
 * Plain-language explanation of what each license tier permits. Single source of
 * truth shared by the product detail page's License tab (full panel) and the
 * purchase card's inline license tooltip.
 */
export const LICENSE_COPY: Record<License, { title: string; description: string }> = {
  personal: {
    title: 'Personal',
    description:
      'For personal, non-commercial work — portfolios, learning, and side projects that are not sold or monetized.',
  },
  commercial: {
    title: 'Commercial',
    description:
      'For a single commercial project — one client site, product, or app that you or your company ships to end users.',
  },
  extended: {
    title: 'Extended',
    description:
      'Unrestricted commercial use across unlimited projects, including work intended for resale or redistribution.',
  },
};

/** Tiers ordered from most to least restrictive, for list rendering. */
export const LICENSE_ORDER: License[] = ['personal', 'commercial', 'extended'];
