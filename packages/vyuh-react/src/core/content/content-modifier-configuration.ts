import React from 'react';
import { SchemaItem } from './schema-item';
import { ContentItem } from './content-item';

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
export interface ContentModifierConfiguration extends SchemaItem {
  /**
   * Optional title for this modifier
   */
  readonly title?: string;

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
  build(
    child: React.ReactNode,
    content: ContentItem,
    key?: React.Key
  ): React.ReactElement;
}