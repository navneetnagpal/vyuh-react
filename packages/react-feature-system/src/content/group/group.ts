import {
  ContentItem,
  ContentModifierConfiguration,
  LayoutConfiguration,
} from '@vyuh/react-core';

/**
 * Group content item for displaying a collection of content items
 * 
 * Groups can include:
 * - Title and description
 * - A collection of content items
 * - Display options for how items are presented (carousel, grid, etc.)
 */
export class Group extends ContentItem {
  /**
   * Schema type identifier for groups
   */
  static readonly schemaName: string = 'vyuh.group';

  /**
   * The title of the group
   */
  readonly title?: string;

  /**
   * The description or subtitle of the group
   */
  readonly description?: string;

  /**
   * The items contained in this group
   */
  readonly items: ContentItem[];

  /**
   * Display mode for the group (carousel, grid, list, etc.)
   */
  readonly displayMode?: 'carousel' | 'grid' | 'list';

  constructor(data: {
    title?: string;
    description?: string;
    items: ContentItem[];
    displayMode?: 'carousel' | 'grid' | 'list';
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: Group.schemaName,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.title = data.title;
    this.description = data.description;
    this.items = data.items;
    this.displayMode = data.displayMode || 'carousel';
  }
}