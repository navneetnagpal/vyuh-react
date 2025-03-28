import { Action, ContentItem, ImageReference } from '@vyuh/react-core';

export const HEADER_SCHEMA_TYPE = 'marketing.header';

/**
 * Header content item for displaying navigation headers
 *
 * Headers can include:
 * - Logo and logo text
 * - Navigation items
 * - Action buttons
 */
export interface Header extends ContentItem {
  /**
   * The logo to display in the header
   */
  readonly logo?: ImageReference;

  /**
   * Text to display alongside or instead of the logo
   */
  readonly logoText?: string;

  /**
   * Navigation items to display in the header
   */
  readonly navigationItems?: {
    /**
     * The navigation link
     */
    readonly action: Action;

    /**
     * Whether this item should be highlighted as active
     */
    readonly isActive?: boolean;

    /**
     * Submenu items for flyout/dropdown menus
     */
    readonly children?: {
      /**
       * The dropdown link
       */
      readonly action: Action;

      /**
       * Optional description for flyout menu items
       */
      readonly description?: string;

      /**
       * Optional icon name from your icon library
       */
      readonly icon?: string;
    }[];
  }[];

  /**
   * Action buttons to display in the header
   */
  readonly actions?: Action[];
}
