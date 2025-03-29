import {
  Action,
  ContentItem,
  ImageReference,
  ObjectReference,
} from '@vyuh/react-core';

export const HERO_SCHEMA_TYPE = 'marketing.hero';

/**
 * Hero content item for displaying hero sections
 *
 * Heroes can include:
 * - Title and subtitle
 * - Background configuration
 * - Media content (images, videos)
 * - Call-to-action buttons
 */
export interface Hero extends ContentItem {
  /**
   * The main title for the hero section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Media content for the hero section
   */
  readonly media?: {
    type: 'none' | 'image' | 'video';
    image?: ImageReference;
    video?: ObjectReference;
  };

  /**
   * Call-to-action buttons for the hero section
   */
  readonly actions?: Array<{
    variant: 'primary' | 'secondary' | 'tertiary' | 'link';
    action: Action;
  }>;
}
