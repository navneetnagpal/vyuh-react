import {
  PortableText as SanityPortableText,
  PortableTextBlockComponent,
  PortableTextComponents,
  PortableTextListComponent,
  PortableTextListItemComponent,
  PortableTextMarkComponent,
  PortableTextTypeComponent,
} from '@portabletext/react';
import { ContentBuilder, ContentDescriptor } from '@vyuh/extension-content';
import {
  LayoutConfiguration,
  Unknown,
  useVyuh,
  useVyuhStore,
} from '@vyuh/react';
import React from 'react';
import { PortableText } from './portable-text';

/**
 * Descriptor for a block type component
 */
export interface BlockTypeDescriptor {
  type: string;
  component: PortableTextTypeComponent;
}

/**
 * Descriptor for a mark component
 */
export interface MarkDescriptor {
  type: string;
  component: PortableTextMarkComponent;
}

/**
 * Descriptor for a block style component
 */
export interface BlockStyleDescriptor {
  style: string;
  component: PortableTextBlockComponent;
}

/**
 * Descriptor for a list component
 */
export interface ListDescriptor {
  type: string;
  component: PortableTextListComponent;
}

/**
 * Descriptor for a list item component
 */
export interface ListItemDescriptor {
  type: string;
  component: PortableTextListItemComponent;
}

/**
 * Descriptor for configuring portable text content type in the system
 */
export class PortableTextDescriptor extends ContentDescriptor {
  readonly blockTypes?: BlockTypeDescriptor[];
  readonly marks?: MarkDescriptor[];
  readonly blockStyles?: BlockStyleDescriptor[];
  readonly lists?: ListDescriptor[];
  readonly listItems?: ListItemDescriptor[];

  constructor({
    blockTypes,
    marks,
    blockStyles,
    lists,
    listItems,
    layouts,
  }: {
    blockTypes?: BlockTypeDescriptor[];
    marks?: MarkDescriptor[];
    blockStyles?: BlockStyleDescriptor[];
    lists?: ListDescriptor[];
    listItems?: ListItemDescriptor[];
    layouts?: LayoutConfiguration[];
  }) {
    super({
      schemaType: PortableText.schemaName,
      title: 'Portable Text',
      layouts,
    });

    this.blockTypes = blockTypes;
    this.marks = marks;
    this.blockStyles = blockStyles;
    this.lists = lists;
    this.listItems = listItems;
  }
}

/**
 * Configuration for Portable Text rendering
 */
export class PortableTextConfig {
  private static _instance: PortableTextConfig;

  // Default components
  private readonly _defaultTypes: Record<string, PortableTextTypeComponent> = {
    image: ({ value }) => {
      const { plugins } = useVyuh();
      const imageUrl = plugins.content.getImageUrl(value);
      return (
        <img
          src={imageUrl}
          alt={value.alt || ''}
          className="my-4 rounded-md max-w-full"
        />
      );
    },
    // Handle nested content items
    _contentItem: ({ value }) => {
      const { plugins } = useVyuh();
      return plugins.content.render(value);
    },
  };

  private readonly _defaultMarks: Record<string, PortableTextMarkComponent> = {
    link: ({ children, value }) => {
      const rel = value.href.startsWith('/')
        ? undefined
        : 'noreferrer noopener';
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="bg-gray-100 p-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
  };

  private readonly _defaultBlockStyles: Record<
    string,
    PortableTextBlockComponent
  > = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-3 mb-1">{children}</h4>
    ),
    normal: ({ children }) => <div className="mb-4">{children}</div>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  };

  private readonly _defaultLists: Record<string, PortableTextListComponent> = {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4">{children}</ol>
    ),
  };

  private readonly _defaultListItems: Record<
    string,
    PortableTextListItemComponent
  > = {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  };

  // Custom component registries
  private _types: Record<string, PortableTextTypeComponent> = {};
  private _marks: Record<string, PortableTextMarkComponent> = {};
  private _blockStyles: Record<string, PortableTextBlockComponent> = {};
  private _lists: Record<string, PortableTextListComponent> = {};
  private _listItems: Record<string, PortableTextListItemComponent> = {};

  private _unknownMark: PortableTextMarkComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(new Unknown(value._type, 'Unknown Mark'));
  };

  private _unknownType: PortableTextTypeComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(new Unknown(value._type, 'Unknown Type'));
  };

  private _unknownList: PortableTextListComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(new Unknown(value._type, 'Unknown List'));
  };

  private _unknownListItem: PortableTextListItemComponent = ({ value }) => {
    const { plugins } = useVyuh();

    return plugins.content.render(new Unknown(value._type, 'Unknown ListItem'));
  };

  /**
   * Get the shared instance
   */
  static get shared(): PortableTextConfig {
    if (!this._instance) {
      this._instance = new PortableTextConfig();
    }
    return this._instance;
  }

  /**
   * Register a custom block type component
   */
  registerType(type: string, component: PortableTextTypeComponent): void {
    this._types[type] = component;
  }

  /**
   * Register a custom mark component
   */
  registerMark(mark: string, component: PortableTextMarkComponent): void {
    this._marks[mark] = component;
  }

  /**
   * Register a custom block style component
   */
  registerBlockStyle(
    style: string,
    component: PortableTextBlockComponent,
  ): void {
    this._blockStyles[style] = component;
  }

  /**
   * Register a custom list component
   */
  registerList(type: string, component: PortableTextListComponent): void {
    this._lists[type] = component;
  }

  /**
   * Register a custom list item component
   */
  registerListItem(
    type: string,
    component: PortableTextListItemComponent,
  ): void {
    this._listItems[type] = component;
  }

  /**
   * Get all components (default + custom)
   */
  get components(): PortableTextComponents {
    return {
      types: { ...this._defaultTypes, ...this._types },
      marks: { ...this._defaultMarks, ...this._marks },
      block: { ...this._defaultBlockStyles, ...this._blockStyles },
      list: { ...this._defaultLists, ...this._lists },
      listItem: { ...this._defaultListItems, ...this._listItems },
      unknownMark: this._unknownMark,
      unknownType: this._unknownType,
      unknownList: this._unknownList,
      unknownListItem: this._unknownListItem,
    };
  }

  /**
   * Reset all custom components
   */
  reset(): void {
    this._types = {};
    this._marks = {};
    this._blockStyles = {};
    this._lists = {};
    this._listItems = {};
  }
}

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
export class DefaultPortableTextLayout extends LayoutConfiguration<PortableText> {
  static readonly schemaName: string = 'vyuh.portableText.layout.default';

  constructor() {
    super({
      schemaType: DefaultPortableTextLayout.schemaName,
      title: 'Default Portable Text Layout',
      contentType: PortableText.schemaName,
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
