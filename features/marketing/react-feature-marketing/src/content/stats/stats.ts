import { Action, ContentItem, ImageReference } from '@vyuh/react-core';
import { IconName } from 'lucide-react/dynamic';

export const STATS_SCHEMA_TYPE = 'marketing.stats';

/**
 * Stats content item for displaying statistics
 *
 * Stats sections can include:
 * - Title and subtitle
 * - Multiple statistics with values and descriptions
 * - Optional description and image
 * - Call-to-action button
 */
export interface Stats extends ContentItem {
  /**
   * The main title for the stats section
   */
  readonly title?: string;

  /**
   * A supporting text that appears with the title
   */
  readonly subtitle?: string;

  /**
   * Detailed description for variants that include descriptions
   */
  readonly description?: string;

  /**
   * Image for variants that include an image
   */
  readonly image?: ImageReference;

  /**
   * Statistics to display
   */
  readonly stats: Array<{
    /**
     * The statistic value (e.g., "35K" or "99.9%")
     */
    readonly value: string;

    /**
     * Label describing the statistic
     */
    readonly label: string;

    /**
     * Optional longer description of the statistic
     */
    readonly description?: string;

    /**
     * Optional icon name from your icon library
     */
    readonly icon?: IconName;
  }>;

  /**
   * Optional call-to-action button
   */
  readonly action?: Action;
}
