# Marble

**Marble** is a storefront for premium digital design assets — UI kits, templates,
icon sets, and fonts. It's built as a polished, end-to-end portfolio project: a
realistic e-commerce experience powered by mock data, with a homepage, a
filterable catalog, product detail pages, a persistent cart, and a full checkout
flow — all statically generated and ready to deploy.

## Features

- **Home** — hero, featured products, and a "shop by category" grid.
- **Catalog (`/products`)** — category, price-range, and keyword filters plus
  pagination, with the **URL as the single source of truth** so every filtered
  view is shareable and back/forward just works.
- **Product detail (`/products/[slug]`)** — image gallery with thumbnails, an
  Overview / Reviews / License tab set, an inline license explanation, and a
  sticky buy box. Every product route is pre-rendered at build time.
- **Cart** — a slide-in drawer backed by a persisted [Zustand](https://zustand-demo.pmnd.rs)
  store, a live item-count badge, quantity controls, and a volume-discount
  progress meter.
- **Checkout (`/checkout`)** — contact / billing / payment form with lightweight
  validation, an optional proof-of-purchase file upload, an order summary, and a
  confirmation modal. Transactional, so it's `noindex`.
- **Polish** — light/dark theming, loading skeletons, tooltips, per-route
  metadata with Open Graph, a generated `robots.txt` and `sitemap.xml`, and a
  keyboard-accessible, responsive UI down to ~320px.

## Design system

The entire UI is built on [**chiselui**](https://www.npmjs.com/package/chiselui),
a CSS-variable-driven React design system.

- **Package:** [`chiselui`](https://www.npmjs.com/package/chiselui) (`v0.6.3`)
- **Documentation:** https://ikergoncalves.github.io/chiselui
- **Source:** https://github.com/ikergoncalves/chiselui

chiselui is the single source of visual truth — colors, spacing, typography, and
radii all come from its design tokens, and light/dark theming is handled natively
by its `ThemeToggle`. No other UI library or utility CSS framework is used; all
custom styling is done with CSS Modules that consume chiselui's tokens.

## Stack

| Concern        | Choice                                                     |
| -------------- | ---------------------------------------------------------- |
| Framework      | [Next.js 14](https://nextjs.org) (App Router)              |
| Language       | TypeScript (`strict`, `noUncheckedIndexedAccess`)          |
| UI / theming   | [chiselui](https://github.com/ikergoncalves/chiselui)      |
| Icons          | [lucide-react](https://lucide.dev)                         |
| Client state   | [Zustand](https://zustand-demo.pmnd.rs) (cart + UI stores) |
| Data           | Mocked in-repo (no backend)                                |
| Deployment     | [Vercel](https://vercel.com)                               |

## Project structure

```
app/                    App Router: routes, layout, providers, global CSS
  page.tsx              Home
  products/             Catalog listing + loading skeleton
  products/[slug]/      Product detail + loading skeleton
  checkout/             Checkout flow
  robots.ts sitemap.ts  Generated robots.txt and sitemap.xml
  icon.svg              Brand favicon
components/
  layout/               Header (with cart) and Footer
  home/                 Hero, FeaturedProducts, CategoryGrid
  product/              ProductCard, ProductGrid, StarRating
  products/             Gallery, PurchaseCard, Tabs, Filters, Browser
  cart/                 CartDrawer
  checkout/             CheckoutView, CheckoutForm, OrderSummary
data/                   Mock catalog: products, categories, reviews
lib/                    Types, formatting, filtering, license copy,
                        site constants, and the Zustand stores
```

## Architecture notes

A few decisions that shaped the codebase:

- **URL-driven filtering.** The `/products` listing keeps all filter and page
  state in the query string (`ProductsBrowser`), not in component state. The URL
  is the single source of truth, so every view is shareable, deep-linkable, and
  fully compatible with the browser's back/forward buttons.
- **Cart hydration.** The cart is a Zustand store persisted to `localStorage`.
  To avoid a server/client hydration mismatch, components gate cart-dependent UI
  (the header badge, the checkout body) behind a `hasHydrated` flag — they render
  a neutral state on the server and first client paint, then reveal the real
  contents after mount.
- **Theming without a flash.** The root layout injects a tiny inline script that
  applies the persisted theme to `<html>` before first paint, so there's no flash
  of the wrong color scheme on load.
- **Client boundaries around chiselui.** chiselui ships without `"use client"`
  directives, so anything importing from its barrel must live in a client tree.
  Server Components (page shells, metadata) stay on the server and hand off to
  thin client "islands" (`CheckoutView`, `ProductsBrowser`, the header) for
  everything interactive — keeping as much as possible static and server-rendered.
- **Static generation everywhere.** With mock data and `generateStaticParams`,
  every route — including all 20 product pages — is pre-rendered at build time.

## Getting started

Requires Node.js 18.17+. No environment variables are needed — the catalog is
mocked in-repo.

```bash
# install dependencies
npm install

# start the dev server at http://localhost:3000
npm run dev
```

Other scripts:

```bash
npm run build   # production build (statically generates every route)
npm run start   # serve the production build
npm run lint    # ESLint (next/core-web-vitals)
```

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for
details. The `chiselui` design system it's built on is published separately,
also under the MIT license.
