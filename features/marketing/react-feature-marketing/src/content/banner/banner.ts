import { Action, ContentItem } from '@vyuh/react-core';
import { IconName } from 'lucide-react/dynamic';

export const BANNER_SCHEMA_TYPE = 'marketing.banner';

/**
 * Banner content item for displaying banner elements
 *
 * Banners can include:
 * - Text message
 * - Optional icon
 * - Optional action button
 * - Dismissible functionality
 */
export interface Banner extends ContentItem {
  /**
   * The main text to display in the banner
   */
  readonly text: string;

  /**
   * Optional icon name from your icon library
   */
  readonly icon?: IconName;

  /**
   * Call-to-action button for the banner
   */
  readonly action?: Action;

  /**
   * Whether the banner can be dismissed by the user
   */
  readonly dismissible?: boolean;

  /**
   * Text for the dismiss button
   */
  readonly dismissText?: string;

  /**
   * Unique identifier for storing dismiss state in cookies
   */
  readonly cookieId?: string;
}
