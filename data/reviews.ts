import type { Review } from '@/lib/types';

/**
 * Mock customer reviews. Like {@link products}, this stands in for a real backend
 * and is written in English for Marble's international audience.
 *
 * Reviews are authored per product via {@link buildReviews}, which stamps a stable
 * `id` and the owning `productId` onto each seed so the literal below only has to
 * carry the parts that actually vary. Two conventions are upheld deliberately:
 *
 * - Every review's `createdAt` is later than its product's `createdAt`.
 * - The mean of a product's review ratings stays close (within ~0.2) to the
 *   `rating` already published on that product in data/products.ts, so the detail
 *   page's summary and its listed reviews tell a consistent story.
 */

/** A review without the fields {@link buildReviews} fills in automatically. */
type ReviewSeed = Omit<Review, 'id' | 'productId'>;

/** Attach a stable id and the owning product id to each seed for a product. */
function buildReviews(productId: string, seeds: ReviewSeed[]): Review[] {
  return seeds.map((seed, index) => ({
    id: `${productId}-r${index + 1}`,
    productId,
    ...seed,
  }));
}

export const reviews: Review[] = [
  // ─── p01 · Nova Dashboard UI Kit (avg 4.8) ─────────────────────────────────
  ...buildReviews('p01', [
    {
      author: 'Emma Carter',
      rating: 5,
      comment:
        'The component coverage is incredible — I built an entire analytics dashboard in a weekend. Every layer is named and everything sits on the grid.',
      createdAt: '2024-04-02',
    },
    {
      author: 'Liam Nguyen',
      rating: 5,
      comment:
        'Dark and light themes both look production-ready out of the box. Saved my team weeks of setup.',
      createdAt: '2024-05-18',
    },
    {
      author: 'Sofia Rossi',
      rating: 4,
      comment:
        'Great kit overall. A couple of the chart components needed tweaking for my data, but the token system made that painless.',
      createdAt: '2024-06-27',
    },
    {
      author: 'Noah Williams',
      rating: 5,
      comment:
        'Well worth the price. The documentation on the design tokens is better than most paid systems I have used.',
      createdAt: '2024-09-10',
    },
    {
      author: 'Ava Patel',
      rating: 5,
      comment:
        'Auto-layout is set up correctly on every single screen, which is rare. Resizing just works.',
      createdAt: '2025-01-14',
    },
  ]),

  // ─── p02 · Aurora Design System (avg 4.8) ──────────────────────────────────
  ...buildReviews('p02', [
    {
      author: 'Oliver Schmidt',
      rating: 5,
      comment:
        'This is a genuine design system, not just a sticker sheet. The variant structure scales beautifully across products.',
      createdAt: '2024-07-01',
    },
    {
      author: 'Chloé Dubois',
      rating: 5,
      comment:
        'Accessibility annotations on every component won me over. Handoff to engineering has never been smoother.',
      createdAt: '2024-08-15',
    },
    {
      author: 'Mateo Fernández',
      rating: 5,
      comment:
        'Pricey, but the living documentation justifies it. Our whole team aligned on it within days.',
      createdAt: '2024-10-05',
    },
    {
      author: 'Hannah Kim',
      rating: 4,
      comment:
        'Enormous and powerful. The learning curve is real, but once the token architecture clicks it is unbeatable.',
      createdAt: '2025-02-20',
    },
    {
      author: 'Daniel Okafor',
      rating: 5,
      comment:
        'The 200+ variants cover edge cases I did not even know I would need. Fantastic value for a full team license.',
      createdAt: '2025-04-11',
    },
  ]),

  // ─── p03 · Pulse Mobile UI Kit (avg 4.6) ───────────────────────────────────
  ...buildReviews('p03', [
    {
      author: 'Grace Lin',
      rating: 5,
      comment:
        'The iOS and Android variants actually respect each platform’s patterns. That level of attention is rare.',
      createdAt: '2024-02-20',
    },
    {
      author: 'Benjamin Cohen',
      rating: 4,
      comment:
        'Loads of screens to work from. I would have liked a few more empty states, but the commerce flow is excellent.',
      createdAt: '2024-03-15',
    },
    {
      author: 'Layla Hassan',
      rating: 5,
      comment:
        'Adaptive components made porting my prototype to Android trivial. Colors and spacing stayed consistent.',
      createdAt: '2024-06-08',
    },
    {
      author: 'Samuel Reyes',
      rating: 5,
      comment:
        '60 screens is not an exaggeration — onboarding, social, checkout, it is all here and it is all clean.',
      createdAt: '2024-09-22',
    },
    {
      author: 'Nina Petrova',
      rating: 4,
      comment:
        'Good value. A couple of the Adobe XD exports were slightly off, but the Figma source was flawless.',
      createdAt: '2025-03-02',
    },
  ]),

  // ─── p04 · Slate Components Library (avg 4.5) ──────────────────────────────
  ...buildReviews('p04', [
    {
      author: 'Thomas Becker',
      rating: 5,
      comment:
        'Exactly what I wanted for a content-heavy site — restrained, legible, and perfectly on the 8-point grid.',
      createdAt: '2023-12-10',
    },
    {
      author: 'Aisha Rahman',
      rating: 4,
      comment:
        'Minimal in the best way. If you need flashy components this is not it, but the typographic rhythm is gorgeous.',
      createdAt: '2024-02-01',
    },
    {
      author: 'Diego Morales',
      rating: 5,
      comment:
        'The editorial focus really shows. My long-form layouts came together fast and read beautifully.',
      createdAt: '2024-05-19',
    },
    {
      author: 'Freya Andersen',
      rating: 4,
      comment:
        'Solid and understated. I wish it had a few more form components, but what is here is impeccable.',
      createdAt: '2024-08-30',
    },
  ]),

  // ─── p05 · Beacon SaaS UI Kit (avg 4.8) ────────────────────────────────────
  ...buildReviews('p05', [
    {
      author: 'Marcus Bell',
      rating: 5,
      comment:
        'Marketing and product screens that finally feel like one brand. That alone saved our launch.',
      createdAt: '2024-09-12',
    },
    {
      author: 'Priya Sharma',
      rating: 5,
      comment:
        'The pricing pages and feature grids are conversion-ready. Dropped them in with minimal changes.',
      createdAt: '2024-11-03',
    },
    {
      author: 'Jonas Wagner',
      rating: 4,
      comment:
        'Great coverage of SaaS flows. The settings screens were a touch generic, but easy to extend.',
      createdAt: '2025-01-27',
    },
    {
      author: 'Camila Silva',
      rating: 5,
      comment:
        'Consistent tokens across marketing and app made theming a five-minute job. Excellent.',
      createdAt: '2025-03-19',
    },
    {
      author: 'Ryan Walsh',
      rating: 5,
      comment:
        'Best SaaS kit I have bought. The dashboards look like something a well-funded startup would ship.',
      createdAt: '2025-05-08',
    },
  ]),

  // ─── p06 · Horizon Landing Page (avg 4.6) ──────────────────────────────────
  ...buildReviews('p06', [
    {
      author: 'Yuki Tanaka',
      rating: 5,
      comment:
        'The HTML export is clean and responsive — I shipped it with almost no changes. The copy blocks are a nice touch.',
      createdAt: '2024-05-20',
    },
    {
      author: 'Elena Popescu',
      rating: 4,
      comment:
        'Beautiful hero and pricing sections. Had to nudge the mobile breakpoints slightly, but nothing major.',
      createdAt: '2024-07-14',
    },
    {
      author: 'Adrian Kowalski',
      rating: 5,
      comment:
        'Figma and HTML staying in sync made client edits painless. Great value at this price.',
      createdAt: '2024-10-01',
    },
    {
      author: 'Bianca Ferrari',
      rating: 5,
      comment:
        '“High-converting” is not marketing fluff here — our signups jumped after we switched to it.',
      createdAt: '2025-02-11',
    },
    {
      author: 'Kofi Mensah',
      rating: 4,
      comment:
        'Solid template. The social-proof section is well thought out; I would have liked a second hero variant.',
      createdAt: '2025-04-22',
    },
  ]),

  // ─── p07 · Meridian Portfolio Template (avg 4.5) ───────────────────────────
  ...buildReviews('p07', [
    {
      author: 'Hana Novak',
      rating: 5,
      comment:
        'The gallery-first layout lets my work speak for itself. The Framer version had me live in an afternoon.',
      createdAt: '2024-03-05',
    },
    {
      author: 'Leon Fischer',
      rating: 4,
      comment:
        'Elegant and understated. Perfect for a personal site — just do not expect a ton of layout variety.',
      createdAt: '2024-05-12',
    },
    {
      author: 'Amara Cole',
      rating: 5,
      comment:
        'The case-study pages are beautifully structured. Exactly the restrained aesthetic I was after.',
      createdAt: '2024-08-19',
    },
    {
      author: 'Viktor Ivanov',
      rating: 4,
      comment:
        'Clean typography and easy to customize. A couple of sections felt sparse, but that is the style.',
      createdAt: '2025-01-08',
    },
  ]),

  // ─── p08 · Cobalt Admin Template (avg 4.6) ─────────────────────────────────
  ...buildReviews('p08', [
    {
      author: 'Sara Lindqvist',
      rating: 5,
      comment:
        'Actual working React and TypeScript, not just screens. The data tables and auth flow saved me a month.',
      createdAt: '2024-08-02',
    },
    {
      author: 'Omar Farouk',
      rating: 4,
      comment:
        'Really strong starting point. Some dependencies were a little dated, but upgrading was straightforward.',
      createdAt: '2024-10-16',
    },
    {
      author: 'Julia Moreau',
      rating: 5,
      comment:
        'The theming layer is excellent — swapped our brand colors in minutes and everything followed.',
      createdAt: '2025-01-20',
    },
    {
      author: 'Nathan Price',
      rating: 4,
      comment:
        'Charts and tables are production quality. The docs could go deeper, but the code is very readable.',
      createdAt: '2025-03-30',
    },
    {
      author: 'Ingrid Halvorsen',
      rating: 5,
      comment:
        'Went from design to a running dashboard in days. Worth every cent for a fully coded template.',
      createdAt: '2025-05-15',
    },
  ]),

  // ─── p09 · Ember E-commerce Template (avg 4.2) ─────────────────────────────
  ...buildReviews('p09', [
    {
      author: 'Pablo Guerrero',
      rating: 5,
      comment:
        'Covers the whole funnel, and the empty and error states are actually designed. Refreshing to see.',
      createdAt: '2024-01-18',
    },
    {
      author: 'Mei Chen',
      rating: 4,
      comment:
        'Good storefront foundation. Checkout is clean; I did have to rework the cart for my own stack.',
      createdAt: '2024-04-09',
    },
    {
      author: 'Fabian Roth',
      rating: 4,
      comment:
        'Solid and complete. Nothing groundbreaking, but everything you need is here and consistent.',
      createdAt: '2024-07-25',
    },
    {
      author: 'Zara Ahmed',
      rating: 5,
      comment:
        'The product-detail and category pages are well thought out. Saved me a lot of groundwork.',
      createdAt: '2024-11-12',
    },
    {
      author: 'Tobias Klein',
      rating: 3,
      comment:
        'Decent, but the HTML felt a little dated in places. The Figma file is where the real value is.',
      createdAt: '2025-02-28',
    },
  ]),

  // ─── p10 · Drift Blog Template (avg 4.25) ──────────────────────────────────
  ...buildReviews('p10', [
    {
      author: 'Clara Weber',
      rating: 5,
      comment:
        'The reading measure and spacing are spot on. Long-form articles look effortless in it.',
      createdAt: '2024-06-10',
    },
    {
      author: 'Idris Bello',
      rating: 4,
      comment:
        'Calm and readable, exactly as advertised. Connecting it to my CMS in Framer took a little fiddling.',
      createdAt: '2024-08-22',
    },
    {
      author: 'Sofia Marín',
      rating: 4,
      comment:
        'Lovely quote and code styling. A bit minimal for my taste, but that is clearly the point.',
      createdAt: '2024-11-30',
    },
    {
      author: 'Henrik Sørensen',
      rating: 4,
      comment:
        'Understated but well made. I would have liked more layout options, yet what is here is polished and readable.',
      createdAt: '2025-03-14',
    },
  ]),

  // ─── p11 · Prism Icon Set (avg 4.8) ────────────────────────────────────────
  ...buildReviews('p11', [
    {
      author: 'Renata Alves',
      rating: 5,
      comment:
        '1,200 icons and every one sits perfectly on the 24px grid. The three weights cover everything I need.',
      createdAt: '2024-03-28',
    },
    {
      author: 'Kenji Watanabe',
      rating: 5,
      comment:
        'The SVGs are clean and optimized — no junk paths. Dropped straight into my icon pipeline.',
      createdAt: '2024-06-14',
    },
    {
      author: 'Lea Hoffmann',
      rating: 4,
      comment:
        'Huge, consistent set. Missing a couple of niche glyphs, but the Figma source let me draw them in-style.',
      createdAt: '2024-09-05',
    },
    {
      author: 'Musa Diallo',
      rating: 5,
      comment:
        'The bold weight is gorgeous for larger UI. Best value-per-icon I have found anywhere.',
      createdAt: '2025-01-19',
    },
    {
      author: 'Valentina Russo',
      rating: 5,
      comment:
        'Consistency across 1,200 icons is no small feat. This is my default set now.',
      createdAt: '2025-04-07',
    },
  ]),

  // ─── p12 · Lumen Line Icons (avg 4.6) ──────────────────────────────────────
  ...buildReviews('p12', [
    {
      author: 'Erik Johansson',
      rating: 5,
      comment:
        'The rounded style is so friendly — perfect for our consumer app. Consistent stroke widths throughout.',
      createdAt: '2024-02-04',
    },
    {
      author: 'Nadia Haddad',
      rating: 4,
      comment:
        'Lovely warm set. 640 icons is plenty for most apps; I just wanted a few more finance glyphs.',
      createdAt: '2024-05-21',
    },
    {
      author: 'Caleb Turner',
      rating: 5,
      comment:
        'Exactly the approachable tone our marketing site needed. Clean SVGs, easy to recolor.',
      createdAt: '2024-09-13',
    },
    {
      author: 'Sofia Jansen',
      rating: 5,
      comment:
        'Great line icons with real personality. The Figma library made adjusting weights trivial.',
      createdAt: '2025-02-06',
    },
    {
      author: 'Rahul Mehta',
      rating: 4,
      comment:
        'Solid and cohesive. Not the largest set, but the quality is high and the price is fair.',
      createdAt: '2025-04-25',
    },
  ]),

  // ─── p13 · Facet Duotone Icons (avg 4.5) ───────────────────────────────────
  ...buildReviews('p13', [
    {
      author: 'Dana Kovač',
      rating: 5,
      comment:
        'The two-layer setup makes matching our brand accent a five-second job. A really clever system.',
      createdAt: '2023-11-18',
    },
    {
      author: 'Anton Melnyk',
      rating: 4,
      comment:
        'Duotone done right. 480 icons is a good spread; a handful felt redundant, but overall strong.',
      createdAt: '2024-02-14',
    },
    {
      author: 'Priscilla Adeyemi',
      rating: 5,
      comment:
        'The adjustable accent color is a game changer for theming. Looks premium in our app.',
      createdAt: '2024-06-03',
    },
    {
      author: 'Marco Bianchi',
      rating: 4,
      comment:
        'Nice depth and consistency. The PNG exports were handy, though I mostly reached for the SVGs.',
      createdAt: '2024-10-27',
    },
  ]),

  // ─── p14 · Grain Hand-drawn Icons (avg 4.5) ────────────────────────────────
  ...buildReviews('p14', [
    {
      author: 'Joséphine Blanc',
      rating: 5,
      comment:
        'The paper texture gives our editorial layouts so much warmth. Nothing else feels this human.',
      createdAt: '2024-07-20',
    },
    {
      author: 'Tariq Nasser',
      rating: 4,
      comment:
        'Charming and distinctive. The style will not fit every brand, but it is exactly right for playful ones.',
      createdAt: '2024-10-09',
    },
    {
      author: 'Wendy Zhao',
      rating: 5,
      comment:
        'Loved using these in an illustration project. Each icon has character without feeling messy.',
      createdAt: '2025-01-15',
    },
    {
      author: 'Gustavo Lima',
      rating: 4,
      comment:
        'Fun set with a genuine hand-drawn feel. A few icons read better at large sizes than small.',
      createdAt: '2025-04-02',
    },
  ]),

  // ─── p15 · Vertex 3D Icon Pack (avg 4.8) ───────────────────────────────────
  ...buildReviews('p15', [
    {
      author: 'Astrid Nilsson',
      rating: 5,
      comment:
        'The renders are stunning, and the Blender files mean I can re-render at any angle. Worth every penny.',
      createdAt: '2024-09-30',
    },
    {
      author: 'Rohan Kapoor',
      rating: 5,
      comment:
        'The soft-shadow style looks premium in our hero sections. High-res exports scaled perfectly.',
      createdAt: '2024-12-12',
    },
    {
      author: 'Camille Laurent',
      rating: 5,
      comment:
        'Editable source files set this apart from every other 3D pack. Incredible flexibility.',
      createdAt: '2025-02-24',
    },
    {
      author: 'Sebastian Vogel',
      rating: 4,
      comment:
        'Beautiful icons, though the file size is hefty. Just be ready for the Blender learning curve.',
      createdAt: '2025-05-01',
    },
    {
      author: 'Olivia Grant',
      rating: 5,
      comment:
        'These elevated our landing page instantly. The extended license made it an easy call for client work.',
      createdAt: '2025-06-18',
    },
  ]),

  // ─── p16 · Marble Grotesk (avg 4.8) ────────────────────────────────────────
  ...buildReviews('p16', [
    {
      author: 'Felix Braun',
      rating: 5,
      comment:
        'A confident, versatile grotesque. The seven weights and matching italics cover an entire brand system.',
      createdAt: '2024-06-01',
    },
    {
      author: 'Inês Carvalho',
      rating: 5,
      comment:
        'Gorgeous in both headlines and body. The humanist details keep it from ever feeling cold.',
      createdAt: '2024-08-19',
    },
    {
      author: 'Dmitri Sokolov',
      rating: 5,
      comment:
        'The hinting is excellent — crisp on screen at every size. This has become our house typeface.',
      createdAt: '2024-11-07',
    },
    {
      author: 'Naomi Fletcher',
      rating: 4,
      comment:
        'Beautiful family. I would have loved a condensed cut, but what is here is impeccably drawn.',
      createdAt: '2025-02-15',
    },
    {
      author: 'Lucas Moreau',
      rating: 5,
      comment:
        'The variable range is smooth and the WOFF2 files are tiny. Perfect for performance-minded sites.',
      createdAt: '2025-05-20',
    },
  ]),

  // ─── p17 · Quartz Serif (avg 4.6) ──────────────────────────────────────────
  ...buildReviews('p17', [
    {
      author: 'Beatrix Halász',
      rating: 5,
      comment:
        'The high contrast sings at display sizes. Our magazine spreads have never looked sharper.',
      createdAt: '2024-03-19',
    },
    {
      author: 'Karim Aziz',
      rating: 4,
      comment:
        'Elegant editorial serif. The text cut keeps body copy readable; the display cut is the real star.',
      createdAt: '2024-06-11',
    },
    {
      author: 'Sofia Bergström',
      rating: 5,
      comment:
        'Sharp terminals and beautiful proportions. Exactly the sophistication our brand needed.',
      createdAt: '2024-10-02',
    },
    {
      author: 'Ravi Nair',
      rating: 4,
      comment:
        'Lovely typeface. I only wish it shipped WOFF2 as well, but the OTF and TTF were flawless.',
      createdAt: '2025-01-28',
    },
    {
      author: 'Geneviève Roy',
      rating: 5,
      comment:
        'Pairs wonderfully with a clean sans. The display weight makes headlines feel intentional.',
      createdAt: '2025-04-16',
    },
  ]),

  // ─── p18 · Onyx Mono (avg 4.5) ─────────────────────────────────────────────
  ...buildReviews('p18', [
    {
      author: 'Aleksander Nowak',
      rating: 5,
      comment:
        'The coding ligatures and distinct zero make this my daily editor font. The tall x-height helps a lot.',
      createdAt: '2024-05-10',
    },
    {
      author: 'Hina Suzuki',
      rating: 4,
      comment:
        'Very legible in the terminal. Ligatures are a matter of taste, but they are easy to disable.',
      createdAt: '2024-08-03',
    },
    {
      author: 'Bruno Costa',
      rating: 5,
      comment:
        'Dense code stays comfortable to read for hours. Exactly what a mono should do.',
      createdAt: '2024-11-22',
    },
    {
      author: 'Elin Dahl',
      rating: 4,
      comment:
        'Clean and well-spaced. I preferred it over my previous mono, though the difference is subtle.',
      createdAt: '2025-03-09',
    },
  ]),

  // ─── p19 · Ivory Display (avg 4.75) ────────────────────────────────────────
  ...buildReviews('p19', [
    {
      author: 'Margaux Fontaine',
      rating: 5,
      comment:
        'The extreme contrast is breathtaking for luxury branding. Every ligature feels considered.',
      createdAt: '2024-08-25',
    },
    {
      author: 'Tomás Herrera',
      rating: 5,
      comment:
        'Used it on premium packaging and it elevated the whole product. Simply stunning at large sizes.',
      createdAt: '2024-11-14',
    },
    {
      author: 'Sunita Rao',
      rating: 4,
      comment:
        'Dramatic and beautiful, but very much a display face — do not try to set body text in it.',
      createdAt: '2025-02-08',
    },
    {
      author: 'Willem de Vries',
      rating: 5,
      comment:
        'Perfect for a fashion logo. The delicate details read as genuinely high-end.',
      createdAt: '2025-05-03',
    },
  ]),

  // ─── p20 · Pebble Sans (avg 4.5) ───────────────────────────────────────────
  ...buildReviews('p20', [
    {
      author: 'Cora Bishop',
      rating: 5,
      comment:
        'Warm and rounded without being childish — perfect for our onboarding flow. Really approachable.',
      createdAt: '2024-04-14',
    },
    {
      author: 'Hassan Ali',
      rating: 4,
      comment:
        'Friendly and even. Great for apps; maybe a touch soft for a corporate brand, but that is expected.',
      createdAt: '2024-07-06',
    },
    {
      author: 'Lotte Visser',
      rating: 4,
      comment:
        'Gentle curves that read well at UI sizes. A pleasant, unfussy sans for consumer products.',
      createdAt: '2024-10-19',
    },
    {
      author: 'Emilio Santos',
      rating: 5,
      comment:
        'Exactly the inviting tone we wanted. The WOFF2 files kept our load times low, too.',
      createdAt: '2025-02-12',
    },
  ]),
];

/** All reviews left on a given product, in the order they were authored. */
export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}
