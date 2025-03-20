import { ContentItem } from '@vyuh/react-core';

export const PORTABLE_TEXT_SCHEMA_TYPE = 'vyuh.portableText';

/**
 * Portable Text content item for rendering rich text content
 */
export interface PortableText extends ContentItem {
  readonly blocks: any[];
}
