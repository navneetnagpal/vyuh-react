import React from 'react';
import { ContentItem } from '@/content/content-item';

/**
 * Configuration for a content layout.
 *
 * Layout configurations define how a content item should be presented.
 * They handle:
 * - Visual structure and arrangement
 * - Responsive design
 * - Theme integration
 * - Content-specific styling
 *
 * Each content type can have multiple layout variants, allowing the
 * same content to be displayed differently in different contexts.
 */
export abstract class LayoutConfiguration<
  TContent extends ContentItem = ContentItem,
> {
  /**
   * The schema type identifier for this layout
   */
  readonly schemaType: string;

  /**
   * Human-readable title for this layout
   */
  readonly title: string;

  /**
   * Creates a new layout configuration
   */
  protected constructor({
    schemaType,
    title,
  }: {
    schemaType: string;
    title: string;
  }) {
    this.schemaType = schemaType;
    this.title = title;
  }

  /**
   * Builds the layout component for the given content item
   *
   * @param content The content item to render
   * @returns A React component representing the content with this layout
   */
  abstract render(content: TContent): React.ReactNode;
}
