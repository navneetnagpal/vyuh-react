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

  /**
   * Create a Category instance from JSON data
   */
  static fromJson(json: Record<string, any>): Category {
    return new Category({
      id: json.id || json._id,
      title: json.title,
      slug: json.slug,
      layout: json.layout,
      modifiers: json.modifiers,
    });
  }
}
