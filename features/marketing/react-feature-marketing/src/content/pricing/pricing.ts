import { Action, ContentItem } from '@vyuh/react-core';

export const PRICING_SCHEMA_TYPE = 'marketing.pricing';

/**
 * Pricing content item for displaying pricing plans
 *
 * Pricing sections can include:
 * - Title and subtitle
 * - Multiple pricing plans with features
 * - Optional disclaimer text
 */
export interface Pricing extends ContentItem {
  /**
   * The main title for the pricing section
   */
  readonly title: string;

  /**
   * A supporting text that appears below the title
   */
  readonly subtitle?: string;

  /**
   * Pricing plans to display
   */
  readonly plans: Array<{
    /**
     * Plan name
     */
    readonly name: string;

    /**
     * Plan description
     */
    readonly description?: string;

    /**
     * Monthly price in dollars
     */
    readonly priceMonthly: number;

    /**
     * Annual price in dollars (per month)
     */
    readonly priceAnnually?: number;

    /**
     * Currency code
     */
    readonly currency: string;

    /**
     * Whether this plan should be highlighted
     */
    readonly featured?: boolean;

    /**
     * List of features included in the plan
     */
    readonly features: string[];

    /**
     * Call-to-action button for the plan
     */
    readonly action: Action;
  }>;

  /**
   * Optional disclaimer text to display below the pricing plans
   */
  readonly disclaimer?: string;
}
