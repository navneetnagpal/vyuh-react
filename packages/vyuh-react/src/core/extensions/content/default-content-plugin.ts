import { ContentItem } from '@/core/content/content-item';
import { Unknown } from '@/core/content/unknown';
import { ContentBuilder } from '@/core/extensions/content/content-builder';
import { ContentExtensionBuilder } from '@/core/extensions/content/content-extension-builder';
import { ItemType } from '@/core/extensions/content/types';
import { ExtensionBuilder } from '@/core/extensions/extension-builder';
import { ContentPlugin } from '@/core/plugins/content/content-plugin';
import { ContentProvider } from '@/core/plugins/content/content-provider';
import { useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';

/**
 * Default implementation of ContentPlugin.
 */
export class DefaultContentPlugin extends ContentPlugin {
  private extensionBuilder?: ContentExtensionBuilder;
  constructor(provider: ContentProvider) {
    super('vyuh.plugin.content.default', 'Default Content Plugin', provider);
  }

  getItem<T>(itemType: ItemType<T>, schemaType: string): T | undefined {
    return this.extensionBuilder?.getItemBySchemaType(itemType, schemaType);
  }

  /**
   * Build content from a JSON object
   */
  render(json: Record<string, any> | ContentItem): React.ReactNode {
    const schemaType =
      json instanceof ContentItem
        ? json.schemaType
        : this.provider.schemaType(json);
    const builder = this.getItem(ContentBuilder, schemaType);
    const telemetry = useVyuhStore.getState().plugins.telemetry;

    if (!builder) {
      telemetry?.log(
        `No builder found for schema type: ${schemaType}`,
        'warning',
      );

      // Create an Unknown content item to handle the missing builder
      const unknownContent = new Unknown(
        schemaType,
        `No content builder registered for schema type: ${schemaType}`,
      );

      // Render the Unknown content directly
      return this.render(unknownContent);
    }

    return builder.render(json as ContentItem);
  }

  /**
   * Attach an extension builder to this plugin
   */
  attach(extBuilder: ExtensionBuilder): void {
    const telemetry = useVyuhStore.getState().plugins.telemetry;

    if (!(extBuilder instanceof ContentExtensionBuilder)) {
      telemetry?.log(
        `For the ${this.constructor.name} to work, there must be one ContentExtensionBuilder in your extension builders. However, you have provided a ${extBuilder.constructor.name}`,
        'warning',
      );
      return;
    }

    this.extensionBuilder = extBuilder as ContentExtensionBuilder;
  }

  async dispose(): Promise<void> {
    // Dispose the content provider
    return this.provider.dispose();
  }

  async init(): Promise<void> {
    // Initialize the content provider
    return this.provider.init();
  }
}
