import { ContentItem } from '@/core/content/content-item';
import { ItemType } from '@/core/extensions/content/types';
import { ExtensionBuilder } from '@/core/extensions/extension-builder';
import { ContentProvider } from '@/core/plugins/content/content-provider';
import { Plugin } from '@/core/plugins/plugin';
import React from 'react';

/**
 * Plugin for managing content
 */
export abstract class ContentPlugin extends Plugin {
  /**
   * The content provider
   */
  readonly provider: ContentProvider;

  /**
   * Creates a new content plugin
   */
  protected constructor(
    name: string,
    title: string,
    provider: ContentProvider,
  ) {
    super(name, title);
    this.provider = provider;
  }

  /**
   * Build content from a JSON object
   */
  abstract render(json: ContentItem): React.ReactNode;

  /**
   * Attach an extension builder to this plugin
   */
  abstract attach(extBuilder: ExtensionBuilder): void;

  /**
   * Get an item by its component type and schema type
   *
   * @param itemType The component type
   * @param schemaType The schema type to get the item for
   * @returns The item for the schema type, or undefined if not found
   */
  abstract getItem<T>(itemType: ItemType<T>, schemaType: string): T | undefined;
}
