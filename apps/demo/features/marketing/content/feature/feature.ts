import {
  Action,
  ContentItem,
  ImageReference,
  ObjectReference,
} from '@vyuh/react-core';

export const FEATURE_SCHEMA_TYPE = 'marketing.feature';

/**
 * Feature content item for displaying feature sections
 *
 * Features can include:
 * - Title and description
 * - List of features with icons
 * - Media content (images, videos, code examples)
 * - Call-to-action buttons
 */
export interface Feature extends ContentItem {
  /**
   * The main title for the feature section
   */
  readonly title: string;

  /**
   * A supporting description that explains the features
   */
  readonly description?: string;

  /**
   * List of individual features to highlight
   */
  readonly features?: Array<{
    title: string;
    description?: string;
    icon?: string;
  }>;

  /**
   * Media content for the feature section
   */
  readonly media?: {
    type: 'none' | 'image' | 'video' | 'code-example';
    image?: ImageReference;
    video?: ObjectReference;
    codeExample?: {
      code: string;
      language: string;
    };
  };

  /**
   * Call-to-action buttons for the feature section
   */
  readonly actions?: Array<{
    variant: 'primary' | 'secondary' | 'tertiary' | 'link';
    action: Action;
  }>;
}
