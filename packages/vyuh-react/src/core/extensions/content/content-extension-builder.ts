import { ExtensionDescriptor } from '@/core/extensions/extension-descriptor';

import { useVyuhStore } from '@/hooks/use-vyuh';
import { ContentBuilder } from '../../content/content-builder';
import { ContentDescriptor } from '../../content/content-descriptor';
import { LayoutConfiguration } from '../../content/layout-configuration';
import { ContentPlugin } from '../../plugins/content/content-plugin';
import { ExtensionBuilder } from '../extension-builder';
import { ContentExtensionDescriptor } from './content-extension-descriptor';

/**
 * Builder for content extensions
 */
export class ContentExtensionBuilder extends ExtensionBuilder {
  private contentBuilders: Map<string, ContentBuilder> = new Map();
  private layouts: Map<string, LayoutConfiguration> = new Map();

  /**
   * Build the content extension
   */
  build(descriptors: ExtensionDescriptor[]): void {
    const contentDescriptors = descriptors as ContentExtensionDescriptor[];

    // Collect all content builders
    const contentBuilders = contentDescriptors
      .flatMap((descriptor) => descriptor.contentBuilders || [])
      .reduce((map, builder) => {
        const schemaType = builder.schemaType;
        if (map.has(schemaType)) {
          console.warn(
            `Duplicate ContentBuilder for schema type: ${schemaType}`,
          );
        }
        map.set(schemaType, builder);
        return map;
      }, new Map<string, ContentBuilder>());

    // Store content builders
    this.contentBuilders = contentBuilders;

    // Collect all layouts
    const layouts = contentDescriptors
      .flatMap((descriptor) => descriptor.layouts || [])
      .reduce((map, layout) => {
        map.set(layout.schemaType, layout);
        return map;
      }, new Map<string, LayoutConfiguration>());

    // Store layouts
    this.layouts = layouts;

    // Group content descriptors by schema type
    const contentDescriptorsByType = contentDescriptors
      .flatMap((descriptor) => descriptor.contents || [])
      .reduce((map, descriptor) => {
        const list = map.get(descriptor.schemaType) || [];
        list.push(descriptor);
        map.set(descriptor.schemaType, list);
        return map;
      }, new Map<string, ContentDescriptor[]>());

    // Initialize content builders with their descriptors
    for (const [schemaType, builder] of this.contentBuilders.entries()) {
      const descriptors = contentDescriptorsByType.get(schemaType) || [];
      builder.init(descriptors);
    }

    // Find and attach to the content plugin from the Vyuh store
    this.findAndAttachToContentPlugin();
  }

  /**
   * Find the content plugin from the Vyuh store and attach to it
   */
  private findAndAttachToContentPlugin(): void {
    const store = useVyuhStore;
    if (!store) {
      console.warn(
        'Vyuh store not found, cannot attach ContentExtensionBuilder to ContentPlugin',
      );
      return;
    }

    const plugins = store.getState().plugins;
    if (!plugins) {
      console.warn('No plugins found in Vyuh store');
      return;
    }

    // Find the content plugin
    const contentPlugin = plugins.content;
    if (!contentPlugin) {
      console.warn('ContentPlugin not found in Vyuh store');
      return;
    }

    // Attach to the content plugin
    this.attachToPlugin(contentPlugin);
  }

  /**
   * Attach to a content plugin
   */
  attachToPlugin(plugin: ContentPlugin): void {
    // Register existing builders
    if (this.contentBuilders.size > 0) {
      for (const builder of this.contentBuilders.values()) {
        plugin.registerBuilder(builder);
      }
    }
  }

  /**
   * Get a layout by schema type
   */
  getLayout(schemaType: string): LayoutConfiguration | undefined {
    return this.layouts.get(schemaType);
  }

  /**
   * Get a content builder by schema type
   */
  getContentBuilder(schemaType: string): ContentBuilder | undefined {
    return this.contentBuilders.get(schemaType);
  }

  /**
   * Get all content builders
   */
  getAllContentBuilders(): ContentBuilder[] {
    return Array.from(this.contentBuilders.values());
  }
}
