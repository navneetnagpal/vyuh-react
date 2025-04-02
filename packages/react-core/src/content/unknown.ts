import { ContentItem } from '@/content/content-item';

export const UNKNOWN_SCHEMA_TYPE = 'vyuh.unknown';

/**
 * Unknown content item that provides a fallback for missing content types.
 *
 * This is used when the system encounters a content type that:
 * - Has no registered type descriptor
 * - Is missing from the content registry
 * - Has an invalid schema type
 */
export interface Unknown extends ContentItem {
  readonly schemaType: string;

  /**
   * The schema type that was missing or invalid
   */
  readonly missingSchemaType: string;

  /**
   * Description of the issue
   */
  readonly description: string;
}

export function createUnknown(
  missingSchemaType: string,
  description: string,
): Unknown {
  return {
    schemaType: UNKNOWN_SCHEMA_TYPE,
    missingSchemaType,
    description,
  };
}
