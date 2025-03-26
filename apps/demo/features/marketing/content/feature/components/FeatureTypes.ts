import { Feature } from '../feature';
import { DefaultFeatureLayout } from '../default-feature-layout';

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
