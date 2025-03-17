import { ConditionConfiguration } from '@/core/extensions/content/condition-configuration';
import { ExtensionDescriptor } from '@/core/extensions/extension-descriptor';

import { useVyuhStore } from '@/hooks/use-vyuh';
import { ContentPlugin } from '../../plugins/content/content-plugin';
import { ExtensionBuilder } from '../extension-builder';
import { ContentBuilder } from './content-builder';
import { ContentDescriptor } from './content-descriptor';
import { ContentExtensionDescriptor } from './content-extension-descriptor';
import { LayoutConfiguration } from './layout-configuration';
import { ContentModifierConfiguration } from './content-modifier-configuration';
import { ActionConfiguration } from './action-configuration';

/**
 * Builder for content extensions
 */
export class ContentExtensionBuilder extends ExtensionBuilder {
  private contentBuilders: Map<string, ContentBuilder> = new Map();
  private contentModifiers: Map<string, ContentModifierConfiguration> =
    new Map();
  private actions: Map<string, ActionConfiguration> = new Map();
  private conditions: Map<string, ConditionConfiguration> = new Map();
  private layouts: Map<string, LayoutConfiguration> = new Map();

  constructor() {
    super({ type: ContentExtensionDescriptor.type });
  }

  /**
   * Build the content extension
   */
  build(descriptors: ExtensionDescriptor[]): void {
    const extensionDescriptors = descriptors as ContentExtensionDescriptor[];

    // First attach to the content plugin
    this.findAndAttachToContentPlugin();

    // Collect all content builders
    this.contentBuilders = extensionDescriptors
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

    // Collect all content modifiers
    this.contentModifiers = extensionDescriptors
      .flatMap((descriptor) => descriptor.contentModifiers || [])
      .reduce((map, modifier) => {
        const schemaType = modifier.schemaType;
        if (map.has(schemaType)) {
          console.warn(
            `Duplicate ContentModifier for schema type: ${schemaType}`,
          );
        }
        map.set(schemaType, modifier);
        return map;
      }, new Map<string, ContentModifierConfiguration>());

    // Collect all actions
    this.actions = extensionDescriptors
      .flatMap((descriptor) => descriptor.actions || [])
      .reduce((map, action) => {
        const schemaType = action.schemaType;
        if (map.has(schemaType)) {
          console.warn(`Duplicate Action for schema type: ${schemaType}`);
        }
        map.set(schemaType, action);
        return map;
      }, new Map<string, ActionConfiguration>());

    // Collect all conditions
    this.conditions = extensionDescriptors
      .flatMap((descriptor) => descriptor.conditions || [])
      .reduce((map, condition) => {
        const schemaType = condition.schemaType;
        if (map.has(schemaType)) {
          console.warn(`Duplicate Condition for schema type: ${schemaType}`);
        }
        map.set(schemaType, condition);
        return map;
      }, new Map<string, ConditionConfiguration>());

    // Group content descriptors by schema type
    const contentDescriptorsByType = extensionDescriptors
      .flatMap((descriptor) => descriptor.contents || [])
      .reduce((map, descriptor) => {
        const list = map.get(descriptor.schemaType) || [];
        list.push(descriptor);
        map.set(descriptor.schemaType, list);
        return map;
      }, new Map<string, ContentDescriptor[]>());

    // Validate that every ContentDescriptor has a ContentBuilder
    for (const [
      schemaType,
      descriptors,
    ] of contentDescriptorsByType.entries()) {
      if (!this.contentBuilders.has(schemaType)) {
        console.error(
          `Missing ContentBuilder for ContentDescriptor of schemaType: ${schemaType}`,
        );
      }
    }

    // Initialize content builders with their descriptors
    for (const [schemaType, builder] of this.contentBuilders.entries()) {
      const descriptors = contentDescriptorsByType.get(schemaType) || [];
      builder.init(descriptors);
    }

    // Process layouts from all descriptors
    this.processLayouts(extensionDescriptors);
  }

  /**
   * Process layouts from all descriptors
   */
  private processLayouts(descriptors: ContentExtensionDescriptor[]): void {
    // Extract all layouts from all content descriptors
    const allLayouts = descriptors
      .flatMap((descriptor) => descriptor.contents || [])
      .flatMap((content) => content.layouts || []);

    // Store layouts by schema type
    for (const layout of allLayouts) {
      if (layout.schemaType) {
        this.layouts.set(layout.schemaType, layout);
      }
    }
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
    // Simply attach this extension builder to the plugin
    plugin.attach(this);
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

  /**
   * Get a content modifier by schema type
   */
  getContentModifier(
    schemaType: string,
  ): ContentModifierConfiguration | undefined {
    return this.contentModifiers.get(schemaType);
  }

  /**
   * Get all content modifiers
   */
  getAllContentModifiers(): ContentModifierConfiguration[] {
    return Array.from(this.contentModifiers.values());
  }

  /**
   * Get an action by schema type
   */
  getAction(schemaType: string): ActionConfiguration | undefined {
    return this.actions.get(schemaType);
  }

  /**
   * Get all actions
   */
  getAllActions(): ActionConfiguration[] {
    return Array.from(this.actions.values());
  }

  /**
   * Get a condition by schema type
   */
  getCondition(schemaType: string): ConditionConfiguration | undefined {
    return this.conditions.get(schemaType);
  }

  /**
   * Get all conditions
   */
  getAllConditions(): ConditionConfiguration[] {
    return Array.from(this.conditions.values());
  }
}
