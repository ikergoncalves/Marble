/**
 * Domain model for the Marble storefront.
 *
 * These types describe the shape of the (currently mocked) catalog data and are
 * the single source of truth consumed across the app. They are intentionally
 * backend-agnostic so a real API can be swapped in later without touching the UI.
 */

/** The four kinds of digital assets Marble sells. */
export type ProductCategory = 'ui-kit' | 'template' | 'icon-set' | 'font';

/** Licensing tier a product can be purchased under. */
export type License = 'personal' | 'commercial' | 'extended';

/** A single sellable digital asset. */
export interface Product {
  id: string;
  /** URL-friendly unique identifier, e.g. `nova-dashboard-ui-kit`. */
  slug: string;
  name: string;
  /** One-line summary shown on cards and listings. */
  description: string;
  /** Full marketing copy shown on the product detail page. */
  longDescription: string;
  category: ProductCategory;
  /** List price in USD. */
  price: number;
  /** Optional promotional price in USD; when set it is lower than `price`. */
  discountPrice?: number;
  coverImage: string;
  previewImages: string[];
  tags: string[];
  license: License;
  /** File formats included in the download, e.g. `Figma`, `Sketch`, `PNG`. */
  fileFormats: string[];
  /** Total download size in megabytes. */
  fileSizeMb: number;
  /** Average rating on a 0–5 scale. */
  rating: number;
  reviewCount: number;
  downloadCount: number;
  /** ISO 8601 date the product was published. */
  createdAt: string;
  featured: boolean;
}

/** A customer review left on a product. */
export interface Review {
  id: string;
  productId: string;
  author: string;
  /** Rating on a 0–5 scale. */
  rating: number;
  comment: string;
  /** ISO 8601 date the review was submitted. */
  createdAt: string;
}

/** A line item in the shopping cart (wired up from Phase 5 onward). */
export interface CartItem {
  productId: string;
  quantity: number;
}
