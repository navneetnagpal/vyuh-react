import { Hero } from '../hero';
import { DefaultHeroLayout } from '../default-hero-layout';

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
