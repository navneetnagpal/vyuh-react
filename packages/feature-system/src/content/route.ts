import { Category } from '@/content/category';
import {
  ContentItem,
  ContentModifierConfiguration,
  LayoutConfiguration,
  RouteBase,
} from '@vyuh/react';

/**
 * Route content item implementation for Vyuh React
 *
 * Routes represent navigable content in a Vyuh application. They combine
 * content from the CMS with routing configuration to create dynamic,
 * content-driven navigation.
 */
export class Route extends RouteBase {
  /**
   * Schema type identifier for routes
   */
  static readonly schemaName: string = 'vyuh.route';

  readonly regions: Region[] = [];

  constructor(data: {
    id: string;
    title: string;
    path: string;
    category?: Category;
    updatedAt: Date | string;
    createdAt: Date | string;
    regions?: Region[];
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: Route.schemaName,
      title: data.title,
      path: data.path,
      id: data.id,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
      category: data.category,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.regions = data.regions || [];
  }

  /**
   * Initialize the route when it becomes active.
   */
  async init(): Promise<RouteBase | null> {
    // Perform any initialization logic here
    return this;
  }

  /**
   * Clean up the route when it is no longer active.
   */
  async dispose(): Promise<void> {
    // Perform any cleanup logic here
    return Promise.resolve();
  }
}

/**
 * Interface for content regions in a route
 *
 * Regions are named sections of a route that can contain content items.
 * They allow for organizing content into logical sections that can be
 * targeted by layouts and styling.
 */
export interface Region {
  /**
   * Unique identifier for the region
   */
  readonly identifier: string;

  /**
   * Display title for the region
   */
  readonly title: string;

  /**
   * Content items contained in this region
   */
  readonly items: ContentItem[];
}
