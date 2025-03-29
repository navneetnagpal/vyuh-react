import { Hero } from '@/content/hero';
import { DefaultHeroLayout } from '@/content/hero/default-hero-layout';

/**
 * Common interface for all hero components
 */
export interface HeroComponentProps {
  content: Hero;
  layout: {
    variant: string;
    background?: DefaultHeroLayout['background'];
  };
}
