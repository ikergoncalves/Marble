import {
  LayoutGrid,
  LayoutTemplate,
  Shapes,
  Type,
  Package,
  type LucideIcon,
} from 'lucide-react';

/**
 * Resolves the `icon` string stored on each catalog category (see
 * data/categories.ts) to a concrete lucide-react component.
 *
 * lucide-react offers no safe, type-checked way to import an icon by string at
 * runtime, so we keep an explicit lookup table instead. New categories only need
 * their icon added here.
 */
const iconsByName: Record<string, LucideIcon> = {
  LayoutGrid,
  LayoutTemplate,
  Shapes,
  Type,
};

/** Resolve a category icon by name, falling back to a neutral placeholder. */
export function getCategoryIcon(name: string): LucideIcon {
  return iconsByName[name] ?? Package;
}
