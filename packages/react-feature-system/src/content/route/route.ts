import { ContentItem, RouteBase } from '@vyuh/react-core';

export const ROUTE_SCHEMA_TYPE = 'vyuh.route';

/**
 * Route content item implementation for Vyuh React
 *
 * Routes represent navigable content in a Vyuh application. They combine
 * content from the CMS with routing configuration to create dynamic,
 * content-driven navigation.
 */
export interface Route extends RouteBase {
  readonly regions: Region[];
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
