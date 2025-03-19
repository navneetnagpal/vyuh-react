/**
 * The base interface for all schema-driven content items.
 *
 * Schema items are the foundation of Vyuh's content system. They represent
 * any content that is defined by a schema in the CMS (Content Management System).
 * All content items must implement this interface to be compatible with the
 * content system.
 */
export interface SchemaItem {
  /**
   * The schema type of the content item.
   *
   * This should match the type name defined in the CMS schema.
   * For example: 'blog.post', 'product.detail', etc.
   */
  readonly schemaType: string;
}