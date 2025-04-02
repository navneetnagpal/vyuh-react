import { type ContentItem } from '@/content/content-item';

export const CATEGORY_SCHEMA_TYPE = 'vyuh.category';

/**
 * Category for organizing routes
 *
 * Categories provide a way to group related routes and apply
 * common configuration like layouts and modifiers.
 */
export interface Category extends ContentItem {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
}
