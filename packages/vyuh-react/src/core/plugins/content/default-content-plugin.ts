import { ContentItem } from '@/core/content/content-item';
import { ContentExtensionBuilder } from '@/core/extensions/content/content-extension-builder';
import { ExtensionBuilder } from '@/core/extensions/extension-builder';
import { ContentBuilder } from '../../extensions/content/content-builder';
import { ContentPlugin } from './content-plugin';
import { ContentProvider } from './content-provider';
import React from 'react';

/**
 * Default implementation of ContentPlugin.
 */
export class DefaultContentPlugin extends ContentPlugin {
  private extensionBuilder?: ContentExtensionBuilder;

  constructor(provider: ContentProvider) {
    super('vyuh.plugin.content.default', 'Default Content Plugin', provider);
  }

  /**
   * Get a content builder by schema type
   */
  getBuilder(schemaType: string): ContentBuilder | undefined {
    return this.extensionBuilder?.getContentBuilder(schemaType);
  }

  /**
   * Get all registered content builders
   */
  getAllBuilders(): ContentBuilder[] {
    return Array.from(this.extensionBuilder?.getAllContentBuilders() ?? []);
  }

  /**
   * Build content from a JSON object
   */
  render(json: Record<string, any>): React.ReactNode {
    const schemaType = this.provider.schemaType(json);
    const builder = this.getBuilder(schemaType);

    if (!builder) {
      console.warn(`No builder found for schema type: ${schemaType}`);
      return null;
    }

    return builder.render(json as ContentItem);
  }

  /**
   * Attach an extension builder to this plugin
   */
  attach(extBuilder: ExtensionBuilder): void {
    if (!(extBuilder instanceof ContentExtensionBuilder)) {
      console.warn(
        `For the ${this.constructor.name} to work, there must be one ContentExtensionBuilder in your extension builders. However, you have provided a ${extBuilder.constructor.name}`,
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
