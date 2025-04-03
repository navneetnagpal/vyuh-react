import {
  ContentItem,
  ObjectReference,
  SchemaItem,
  TypeDescriptor,
} from '@vyuh/react-core';

/**
 * Schema type for DocumentView content
 */
export const DOCUMENT_VIEW_SCHEMA_TYPE = 'vyuh.document.view';

/**
 * Document load strategy
 */
export enum DocumentLoadStrategy {
  REFERENCE = 'reference',
  QUERY = 'query',
}

/**
 * Query configuration interface
 */
export interface QueryConfiguration extends SchemaItem {
  /**
   * Build a query string from the configuration
   */
  buildQuery(context: any): string | null;
}

/**
 * DocumentView content type
 *
 * Represents a view that loads and displays a document
 */
export interface DocumentView extends ContentItem {
  schemaType: typeof DOCUMENT_VIEW_SCHEMA_TYPE;

  /**
   * Optional title for the document view
   */
  title?: string;

  /**
   * Reference to a document
   */
  reference?: ObjectReference;

  /**
   * Strategy for loading the document
   */
  loadStrategy: DocumentLoadStrategy;

  /**
   * Query configuration for loading documents
   */
  query?: QueryConfiguration;
}
