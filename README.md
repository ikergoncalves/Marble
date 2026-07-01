# Marble

**Marble** is a storefront for premium digital design assets — UI kits, templates,
icon sets, and fonts. It's built as a polished, end-to-end portfolio project: a
realistic e-commerce experience powered by mock data, with room to grow into
product listings, cart, and checkout across later phases.

> This repository is developed in phases. **Phase 1** establishes the foundation:
> the Next.js app, strict TypeScript, the design system, domain types, and mock
> catalog data.

## Design system

The entire UI is built on [**chiselui**](https://www.npmjs.com/package/chiselui),
a CSS-variable-driven React design system.

- **Package:** [`chiselui`](https://www.npmjs.com/package/chiselui) (`v0.6.3`)
- **Documentation:** https://ikergoncalves.github.io/chiselui
- **Source:** https://github.com/ikergoncalves/chiselui

chiselui is the single source of visual truth — colors, spacing, typography, and
radii all come from its design tokens, and light/dark theming is handled natively
by its `ThemeToggle`. No other UI library or utility CSS framework is used.

## Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | [Next.js 14](https://nextjs.org) (App Router)       |
| Language       | TypeScript (`strict`, `noUncheckedIndexedAccess`)   |
| UI / theming   | [chiselui](https://github.com/ikergoncalves/chiselui) |
| Icons          | [lucide-react](https://lucide.dev)                  |
| Client state   | [Zustand](https://zustand-demo.pmnd.rs) (used from Phase 5) |
| Data           | Mocked in-repo (no backend)                         |
| Deployment     | [Vercel](https://vercel.com) (planned)              |

## Project structure

```
app/                  App Router entry (root layout, home, providers, global CSS)
components/layout/    Header and Footer (site chrome)
data/                 Mock catalog: products.ts, categories.ts
lib/                  Domain types and formatting helpers
```

## Getting started

Requires Node.js 18.17+.

```bash
# install dependencies
npm install

# start the dev server at http://localhost:3000
npm run dev
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## License

This project is a portfolio piece. The `chiselui` design system is published
separately under the MIT license.
