import { ContentItem } from '@/content/content-item';
import { SchemaItem } from '@/content/schema-item';
import React from 'react';

/**
 * Configuration for modifying content presentation.
 *
 * Content modifiers allow you to wrap content items with additional
 * functionality or styling. They can be used to add:
 * - Animation effects
 * - Layout modifications
 * - Interaction handlers
 * - Debug overlays
 *
 * Modifiers are applied in order, wrapping the content item's component
 * tree from inside out.
 */
export abstract class ContentModifierConfiguration implements SchemaItem {
  /**
   * The schema type identifier for this modifier
   */
  readonly schemaType: string;

  /**
   * Optional title for this modifier
   */
  readonly title?: string;

  /**
   * Creates a new content modifier configuration
   *
   * @param data
   */
  protected constructor(data: { schemaType: string; title?: string }) {
    this.schemaType = data.schemaType;
    this.title = data.title;
  }

  /**
   * Builds the modified component for the given content.
   *
   * This method wraps the child component with additional functionality
   * or styling based on the modifier's configuration.
   *
   * @param child The child component to modify
   * @param content The content item being modified
   * @param key Optional React key
   * @returns A React component with the modification applied
   */
  abstract apply(
    child: React.ReactNode,
    content: ContentItem,
    key?: React.Key,
  ): React.ReactElement;
}
