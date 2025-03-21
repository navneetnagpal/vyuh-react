import { SchemaItem } from '@/content/schema-item';
import { TypeDescriptor } from '@/core/type-descriptor';
import React from 'react';
import { ContentItem } from '@/content/content-item';
import { ExtensionBuilder } from '@/core/extension-builder';
import { ItemType } from '@/core/platform-types';
import { Plugin } from '@/core/plugin';
import { ContentProvider } from '@/plugins/content/content-provider';

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
  abstract render(json: Record<string, any> | ContentItem): React.ReactNode;

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
  abstract getItem<T extends SchemaItem>(
    itemType: ItemType<T>,
    schemaType: string | undefined,
  ): TypeDescriptor<T> | undefined;

  /**
   * Register an item with the given schema type
   *
   * @param itemType The component type
   * @param descriptor The descriptor for the item
   */
  abstract registerItem<T extends SchemaItem>(
    itemType: ItemType<T>,
    descriptor: TypeDescriptor<T>,
  ): void;
}
