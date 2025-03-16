import React from 'react';
import { SchemaItem } from './schema-item';
import { RouteBase } from './route-base';

/**
 * Configuration for how a route should be presented.
 *
 * Route type configurations define the visual and behavioral aspects
 * of route transitions. They control:
 * - Page transitions and animations
 * - Route presentation mode (full-screen, modal, etc.)
 * - Route-specific UI elements
 */
export interface RouteTypeConfiguration extends SchemaItem {
  /**
   * Optional title for this route type
   */
  readonly title?: string;

  /**
   * Creates a React component for this route
   *
   * @param child The child component to render within this route
   * @param route The route configuration
   * @param key Optional key for the component
   * @returns A React component representing the route
   */
  create(
    child: React.ReactNode,
    route: RouteBase,
    key?: React.Key,
  ): React.ReactElement;
}
