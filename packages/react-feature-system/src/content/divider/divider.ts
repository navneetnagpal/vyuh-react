import { ContentItem } from '@vyuh/react-core';

export const DIVIDER_SCHEMA_TYPE = 'vyuh.divider';

/**
 * Divider content item
 *
 * A visual separator that can be used between content sections
 * with configurable thickness and indentation.
 */
export interface Divider extends ContentItem {
  /**
   * The thickness of the divider in pixels
   */
  readonly thickness: number;

  /**
   * Indent from the edges (in pixels or CSS units)
   */
  readonly indent?: string | number;
}
