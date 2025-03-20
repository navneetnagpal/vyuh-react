import { PortableText } from '@/content/portable-text/portable-text';
import { PortableTextConfig } from '@/content/portable-text/portable-text-config';
import { PortableTextDescriptor } from '@/content/portable-text/portable-text-descriptor';
import {
  PortableText as SanityPortableText,
  PortableTextBlockComponent,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
import { LayoutConfiguration, useVyuhStore } from '@vyuh/react-core';
import {
  ContentBuilder,
  ContentDescriptor,
} from '@vyuh/react-extension-content';
import React from 'react';

/**
 * Content builder for Portable Text content items
 */
export class PortableTextContentBuilder extends ContentBuilder<PortableText> {
  constructor() {
    super({
      schemaType: PortableText.schemaName,
      defaultLayout: new DefaultPortableTextLayout(),
    });
  }

  /**
   * Initialize this content builder with the given descriptors
   *
   * This method:
   * 1. Collects all block types, marks, block styles, list and listItems from descriptors
   * 2. Registers them with the PortableTextConfig singleton
   */
  override init(descriptors: ContentDescriptor[]): void {
    super.init(descriptors);

    // Get telemetry from the store
    const telemetry = useVyuhStore.getState().plugins.telemetry;

    // Cast directly to PortableTextDescriptor since bootstrapping ensures correct types
    const portableTextDescriptors = descriptors as PortableTextDescriptor[];

    // Reset the config to start fresh
    PortableTextConfig.shared.reset();

    // Collect all registrations
    const blockTypes: Record<string, PortableTextTypeComponent> = {};
    const marks: Record<string, PortableTextMarkComponent> = {};
    const blockStyles: Record<string, PortableTextBlockComponent> = {};
    const lists: Record<string, PortableTextListComponent> = {};
    const listItems: Record<string, PortableTextListItemComponent> = {};

    // Process all descriptors to collect components
    portableTextDescriptors.forEach((descriptor) => {
      // Collect block types
      descriptor.blockTypes?.forEach((blockType) => {
        if (blockTypes[blockType.type]) {
          telemetry?.log(
            `Duplicate block type component for type: ${blockType.type}. The later definition will override the earlier one.`,
            'warning',
          );
        }
        blockTypes[blockType.type] = blockType.component;
      });

      // Collect marks
      descriptor.marks?.forEach((mark) => {
        if (marks[mark.type]) {
          telemetry?.log(
            `Duplicate mark component for type: ${mark.type}. The later definition will override the earlier one.`,
            'warning',
          );
        }
        marks[mark.type] = mark.component;
      });

      // Collect block styles
      descriptor.blockStyles?.forEach((blockStyle) => {
        if (blockStyles[blockStyle.style]) {
          telemetry?.log(
            `Duplicate block style component for style: ${blockStyle.style}. The later definition will override the earlier one.`,
            'warning',
          );
        }
        blockStyles[blockStyle.style] = blockStyle.component;
      });

      // Collect lists
      descriptor.lists?.forEach((list) => {
        if (lists[list.type]) {
          telemetry?.log(
            `Duplicate list component for type: ${list.type}. The later definition will override the earlier one.`,
            'warning',
          );
        }
        lists[list.type] = list.component;
      });

      // Collect list items
      descriptor.listItems?.forEach((listItem) => {
        if (listItems[listItem.type]) {
          telemetry?.log(
            `Duplicate list item component for type: ${listItem.type}. The later definition will override the earlier one.`,
            'warning',
          );
        }
        listItems[listItem.type] = listItem.component;
      });
    });

    // Register all collected components with PortableTextConfig
    Object.entries(blockTypes).forEach(([type, component]) => {
      PortableTextConfig.shared.registerType(type, component);
    });

    Object.entries(marks).forEach(([type, component]) => {
      PortableTextConfig.shared.registerMark(type, component);
    });

    Object.entries(blockStyles).forEach(([style, component]) => {
      PortableTextConfig.shared.registerBlockStyle(style, component);
    });

    Object.entries(lists).forEach(([type, component]) => {
      PortableTextConfig.shared.registerList(type, component);
    });

    Object.entries(listItems).forEach(([type, component]) => {
      PortableTextConfig.shared.registerListItem(type, component);
    });
  }
}

/**
 * Default layout for Portable Text content
 */
class DefaultPortableTextLayout extends LayoutConfiguration<PortableText> {
  static readonly schemaName: string = 'vyuh.portableText.layout.default';

  constructor() {
    super({
      schemaType: DefaultPortableTextLayout.schemaName,
      title: 'Default Portable Text Layout',
    });
  }

  render(content: PortableText): React.ReactNode {
    return <DefaultPortableTextComponent portableText={content} />;
  }
}

/**
 * Default component used by the DefaultPortableTextLayout
 */
function DefaultPortableTextComponent({
  portableText,
}: {
  portableText: PortableText;
}) {
  if (!portableText.blocks || portableText.blocks.length === 0) {
    return null;
  }

  // Use the singleton components object
  const components = PortableTextConfig.shared.components;

  return (
    <div className="portable-text-content">
      <SanityPortableText
        value={portableText.blocks}
        components={components}
        onMissingComponent={false}
      />
    </div>
  );
}
