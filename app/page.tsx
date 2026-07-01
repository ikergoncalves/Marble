import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryGrid } from '@/components/home/CategoryGrid';

/**
 * Marble homepage. A Server Component that composes the three marketing
 * sections; each section owns its own layout and consistent vertical rhythm via
 * the global `.section` utility.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
    </>
  );
}
