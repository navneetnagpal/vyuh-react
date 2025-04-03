import { ContentItem } from '@vyuh/react-core';

/**
 * Schema type for Document content
 */
export const DOCUMENT_SCHEMA_TYPE = 'vyuh.document';

/**
 * Document content type
 * 
 * Represents a document with title, description, and a list of content items
 */
export interface Document extends ContentItem {
  schemaType: typeof DOCUMENT_SCHEMA_TYPE;
  
  /**
   * Document title
   */
  title?: string;
  
  /**
   * Document description
   */
  description?: string;
  
  /**
   * List of content items in the document
   */
  items?: ContentItem[];
}