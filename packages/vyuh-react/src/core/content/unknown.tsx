import { ContentItem } from '@/core/content/content-item';

/**
 * Unknown content item that provides a fallback for missing content types.
 *
 * This is used when the system encounters a content type that:
 * - Has no registered type descriptor
 * - Is missing from the content registry
 * - Has an invalid schema type
 */
export class Unknown extends ContentItem {
  static readonly schemaName = 'vyuh.unknown';

  /**
   * The schema type that was missing or invalid
   */
  readonly missingSchemaType: string;

  /**
   * Description of the issue
   */
  readonly description: string;

  constructor(missingSchemaType: string, description: string) {
    super({
      schemaType: Unknown.schemaName,
      layout: undefined,
      modifiers: [],
    });
    this.missingSchemaType = missingSchemaType;
    this.description = description;
  }
}
