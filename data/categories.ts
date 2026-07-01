import type { ProductCategory } from '@/lib/types';

/**
 * A top-level catalog category. `icon` is the name of a `lucide-react` icon so
 * consumers can look it up dynamically or import it by name.
 */
export interface Category {
  slug: ProductCategory;
  label: string;
  description: string;
  /** Name of the corresponding `lucide-react` icon component. */
  icon: string;
}

export const categories: Category[] = [
  {
    slug: 'ui-kit',
    label: 'UI Kits',
    description: 'Component libraries and design systems to kickstart any product.',
    icon: 'LayoutGrid',
  },
  {
    slug: 'template',
    label: 'Templates',
    description: 'Ready-made layouts for websites, dashboards, and mobile apps.',
    icon: 'LayoutTemplate',
  },
  {
    slug: 'icon-set',
    label: 'Icon Sets',
    description: 'Pixel-perfect icon collections in every style and format.',
    icon: 'Shapes',
  },
  {
    slug: 'font',
    label: 'Fonts',
    description: 'Original typefaces and font families for brands and interfaces.',
    icon: 'Type',
  },
];

/** Look up a single category by its slug. */
export function getCategory(slug: ProductCategory): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
