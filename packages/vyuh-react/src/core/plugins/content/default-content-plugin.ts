import React from 'react';
import { ContentBuilder } from '@/core/content/content-builder';
import { ContentPlugin } from '@/core/plugins/content/content-plugin';
import { ContentProvider } from '@/core/content/content-provider';

/**
 * Default implementation of ContentPlugin.
 */
export class DefaultContentPlugin extends ContentPlugin {
  private builders: Map<string, ContentBuilder> = new Map();

  constructor(provider: ContentProvider) {
    super('vyuh.plugin.content.default', 'Default Content Plugin', provider);
  }

  /**
   * Register a content builder
   */
  registerBuilder(builder: ContentBuilder): void {
    this.builders.set(builder.schemaType, builder);
  }

  /**
   * Get a content builder by schema type
   */
  getBuilder(schemaType: string): ContentBuilder | undefined {
    return this.builders.get(schemaType);
  }

  /**
   * Get all registered content builders
   */
  getAllBuilders(): ContentBuilder[] {
    return Array.from(this.builders.values());
  }

  /**
   * Check if a content builder is registered
   */
  isRegistered(schemaType: string): boolean {
    return this.builders.has(schemaType);
  }

  /**
   * Build content from a JSON object
   */
  render(json: Record<string, any>): React.ReactNode {
    const schemaType = this.provider.schemaType(json);
    const builder = this.builders.get(schemaType);

    if (!builder) {
      console.warn(`No builder found for schema type: ${schemaType}`);
      return null;
    }

    return builder.render(json);
  }

  async dispose(): Promise<void> {
    // Dispose the content provider
    await this.provider.dispose();
    return Promise.resolve();
  }

  async init(): Promise<void> {
    // Initialize the content provider
    await this.provider.init();
    return Promise.resolve();
  }
}
