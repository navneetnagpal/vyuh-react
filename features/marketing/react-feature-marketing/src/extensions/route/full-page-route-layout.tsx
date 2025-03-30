import {
  Action,
  ContentItem,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import { Region, Route } from '@vyuh/react-feature-system';
import React from 'react';

/**
 * Gap size options for the full page layout
 */
export type GapSize = 'none' | 'small' | 'medium' | 'large';

/**
 * Full Page Route Layout for routes that display content in a full page layout
 *
 * This layout provides options for:
 * - Controlling the gap between content items
 * - Showing or hiding the route title
 * - Adding action buttons to the header
 */
export class FullPageRouteLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = `marketing.route.layout.fullPage`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly gap: GapSize;
  readonly showTitle: boolean;

  constructor(config?: { gap?: GapSize; showTitle?: boolean }) {
    super({
      schemaType: FullPageRouteLayout.schemaName,
      title: 'Full Page Route Layout',
    });

    this.gap = config?.gap ?? 'medium';
    this.showTitle = config?.showTitle ?? true;
  }

  /**
   * Renders the route with the full page layout
   */
  render(content: Route): React.ReactNode {
    return (
      <FullPageRouteComponent
        route={content}
        gap={this.gap}
        showTitle={this.showTitle}
      />
    );
  }
}

const gapClasses: Record<GapSize, string> = {
  none: 'gap-0',
  small: 'gap-4',
  medium: 'gap-8',
  large: 'gap-16',
};

/**
 * Component that renders a route with the full page layout
 */
function FullPageRouteComponent({
  route,
  gap,
  showTitle,
}: {
  route: Route;
  gap: GapSize;
  showTitle: boolean;
  actions?: Array<{ icon: string; action?: Action }>;
}) {
  const { plugins } = useVyuh();
  const gapClass = gapClasses[gap];

  return (
    <div className={`vfs:flex vfs:flex-col ${gapClass}`}>
      {showTitle && (
        <h1 className="vfs:text-3xl vfs:font-bold vfs:text-black vfs:mb-8">
          {route.title}
        </h1>
      )}

      {route.regions.map((region: Region) => (
        <div key={region.identifier} className="vfs:w-full">
          {region.items.map((item: ContentItem, itemIndex: number) => (
            <div key={itemIndex} className="vfs:w-full">
              {plugins.content.render(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
