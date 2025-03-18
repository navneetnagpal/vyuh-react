import { ConditionConfiguration } from '@/core/extensions/content/condition-configuration';
import { ItemType } from '@/core/extensions/content/types';
import { ExtensionDescriptor } from '@/core/extensions/extension-descriptor';
import { useVyuhStore } from '@/hooks/use-vyuh';
import { ExtensionBuilder } from '../extension-builder';
import { ActionConfiguration } from './action-configuration';
import { ContentBuilder } from './content-builder';
import { ContentDescriptor } from './content-descriptor';
import { ContentExtensionDescriptor } from './content-extension-descriptor';
import { ContentModifierConfiguration } from './content-modifier-configuration';
import { LayoutConfiguration } from './layout-configuration';

/**
 * Builder for content extensions
 */
export class ContentExtensionBuilder extends ExtensionBuilder {
  private typeMap = new Map<ItemType<any>, Map<string, any>>();

  constructor() {
    super({ type: ContentExtensionDescriptor.extensionType });
  }

  /**
   * Build the content extension
   */
  build(descriptors: ExtensionDescriptor[]): void {
    const extensionDescriptors = descriptors as ContentExtensionDescriptor[];
    const store = useVyuhStore.getState();
    const telemetry = store.plugins.telemetry;

    // First attach to the content plugin
    this.findAndAttachToContentPlugin();

    // Initialize type maps for each item type
    this.initTypeMap(ContentBuilder);
    this.initTypeMap(ContentModifierConfiguration);
    this.initTypeMap(ActionConfiguration);
    this.initTypeMap(ConditionConfiguration);
    this.initTypeMap(LayoutConfiguration);

    // Collect all content builders
    this.collectItems(
      extensionDescriptors,
      (descriptor) => descriptor.contentBuilders || [],
      ContentBuilder,
      'ContentBuilder',
    );

    // Collect all content modifiers
    this.collectItems(
      extensionDescriptors,
      (descriptor) => descriptor.contentModifiers || [],
      ContentModifierConfiguration,
      'ContentModifier',
    );

    // Collect all actions
    this.collectItems(
      extensionDescriptors,
      (descriptor) => descriptor.actions || [],
      ActionConfiguration,
      'Action',
    );

    // Collect all conditions
    this.collectItems(
      extensionDescriptors,
      (descriptor) => descriptor.conditions || [],
      ConditionConfiguration,
      'Condition',
    );

    // Collect all layouts
    this.collectItems(
      extensionDescriptors,
      (descriptor) =>
        (descriptor.contents || []).flatMap((layout) => layout.layouts || []),
      LayoutConfiguration,
      'Layout',
    );

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
      if (!this.getItemBySchemaType(ContentBuilder, schemaType)) {
        telemetry?.reportError(
          new Error(
            `Missing ContentBuilder for ContentDescriptor of schemaType: ${schemaType}`,
          ),
          { params: { descriptors: descriptors.length } },
        );
      }
    }

    // Initialize content builders with their descriptors
    const contentBuilderMap = this.typeMap.get(ContentBuilder) || new Map();
    for (const [schemaType, builder] of contentBuilderMap.entries()) {
      const descriptors = contentDescriptorsByType.get(schemaType) || [];
      builder.init(descriptors);
    }
  }

  /**
   * Get a item by its schema type
   */
  getItemBySchemaType<T>(
    itemType: ItemType<T>,
    schemaType: string,
  ): T | undefined {
    const itemMap = this.typeMap.get(itemType);
    return itemMap?.get(schemaType);
  }

  /**
   * Find the content plugin from the Vyuh store and attach to it
   */
  private findAndAttachToContentPlugin(): void {
    const store = useVyuhStore.getState();
    const telemetry = store.plugins.telemetry;

    if (!store) {
      telemetry?.reportError(
        new Error(
          'Vyuh store not found, cannot attach ContentExtensionBuilder to ContentPlugin',
        ),
      );
      return;
    }

    const plugins = store.plugins;
    if (!plugins) {
      telemetry?.reportError(new Error('No plugins found in Vyuh store'));
      return;
    }

    // Find the content plugin
    const contentPlugin = plugins.content;
    if (!contentPlugin) {
      telemetry?.reportError(
        new Error('ContentPlugin not found in Vyuh store'),
      );
      return;
    }

    // Simply attach this extension builder to the plugin
    contentPlugin.attach(this);
  }

  /**
   * Collect items of a specific type from extension descriptors
   */
  private collectItems<T extends { schemaType: string }>(
    descriptors: ContentExtensionDescriptor[],
    extractor: (descriptor: ContentExtensionDescriptor) => T[],
    itemType: ItemType<T>,
    itemTypeName: string,
  ): void {
    const telemetry = useVyuhStore.getState().plugins.telemetry;
    const itemMap = this.typeMap.get(itemType) || new Map<string, T>();

    descriptors.flatMap(extractor).forEach((item) => {
      const schemaType = item.schemaType;
      if (!schemaType) {
        telemetry?.log(
          `${itemTypeName} without schema type found and will be ignored`,
          'warning',
        );
        return;
      }

      if (itemMap.has(schemaType)) {
        telemetry?.log(
          `Duplicate ${itemTypeName} for schema type: ${schemaType}. The later definition will override the earlier one.`,
          'warning',
        );
      }
      itemMap.set(schemaType, item);
    });

    this.typeMap.set(itemType, itemMap);
  }

  /**
   * Initialize a type map for a specific item type
   */
  private initTypeMap<T>(itemType: ItemType<T>): void {
    if (!this.typeMap.has(itemType)) {
      this.typeMap.set(itemType, new Map<string, T>());
    }
  }
}
