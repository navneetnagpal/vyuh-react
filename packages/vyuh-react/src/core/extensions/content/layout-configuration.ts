import { ContentItem } from '@/core/content/content-item';
import React from 'react';

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
   * The content type this layout is designed for
   */
  readonly contentType: string;

  /**
   * The feature that registered this layout
   */
  private _sourceFeature?: string;

  /**
   * Get the source feature
   */
  get sourceFeature(): string | undefined {
    return this._sourceFeature;
  }

  /**
   * Creates a new layout configuration
   */
  protected constructor({
    schemaType,
    title,
    contentType,
  }: {
    schemaType: string;
    title: string;
    contentType: string;
  }) {
    this.schemaType = schemaType;
    this.title = title;
    this.contentType = contentType;
  }

  /**
   * Set the source feature
   */
  setSourceFeature(featureName?: string): void {
    this._sourceFeature = featureName;
  }

  /**
   * Builds the layout component for the given content item
   *
   * @param content The content item to render
   * @returns A React component representing the content with this layout
   */
  abstract render(content: TContent): React.ReactNode;
}
