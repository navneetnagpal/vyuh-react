import { ContentItem } from '@vyuh/react-core';

export const ACCORDION_SCHEMA_TYPE = 'vyuh.accordion';

/**
 * Accordion item for individual sections within an accordion
 *
 * Each accordion item has:
 * - A title that serves as the trigger/header
 * - Optional icon identifier
 * - Content to be displayed when expanded
 */
export interface AccordionItem {
  /**
   * The title of the accordion item (displayed in the header)
   */
  readonly title: string;

  /**
   * Optional icon identifier for the accordion item
   */
  readonly iconIdentifier?: string;

  /**
   * The content to display when the accordion item is expanded
   */
  readonly content?: ContentItem;
}

/**
 * Accordion content item for displaying collapsible content sections
 *
 * Accordions can include:
 * - Header and items for the overall accordion
 * - Multiple accordion items, each with their own header and description
 * - Configurable expand/collapse behavior
 */
export interface Accordion extends ContentItem {
  /**
   * The title of the accordion
   */
  readonly title?: string;

  /**
   * The description or subtitle of the accordion
   */
  readonly description?: string;

  /**
   * The accordion items to display
   */
  readonly items: AccordionItem[];
}
