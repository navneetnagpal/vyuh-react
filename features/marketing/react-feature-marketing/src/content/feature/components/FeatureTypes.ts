import { DefaultFeatureLayout } from '@/content/feature/default-feature-layout';
import { Feature } from '@/content/feature/feature';

/**
 * Common interface for all feature components
 */
export interface FeatureComponentProps {
  content: Feature;
  layout: {
    variant: string;
    background?: DefaultFeatureLayout['background'];
  };
}
