import {
  ContentItem,
  ContentModifierConfiguration,
  LayoutConfiguration,
} from '@/index';

/**
 * Category for organizing routes
 *
 * Categories provide a way to group related routes and apply
 * common configuration like layouts and modifiers.
 */
export class Category extends ContentItem {
  /**
   * Schema type identifier for categories
   */
  static readonly schemaName: string = 'vyuh.category';

  readonly id: string;
  readonly title: string;
  readonly slug: string;

  constructor(data: {
    id: string;
    title: string;
    slug: string;
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: Category.schemaName,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
  }
}
