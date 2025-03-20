import { Route } from '@/content/route/route';
import { LayoutConfiguration, useVyuh } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import React from 'react';

/**
 * Content builder for Route content items
 */
export class RouteContentBuilder extends ContentBuilder<Route> {
  static readonly schemaName: string = 'vyuh.route';

  constructor() {
    super({
      schemaType: RouteContentBuilder.schemaName,
      defaultLayout: new DefaultRouteLayout(),
    });
  }

  /**
   * Render a Route content item
   *
   * This uses the route's layout configuration or falls back to the category layout.
   * If no layout is found, it uses the default layout.
   */
  override getLayout(content: Route): LayoutConfiguration | undefined {
    const contentLayout = super.getLayout(content);
    const categoryLayout = Array.isArray(content.category?.layout)
      ? content.category?.layout[0]
      : undefined;

    return contentLayout || categoryLayout;
  }
}

/**
 * Default layout for routes when no specific layout is configured
 */
class DefaultRouteLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = 'vyuh.route.layout.default';

  constructor() {
    super({
      schemaType: DefaultRouteLayout.schemaName,
      title: 'Default Route Layout',
    });
  }

  /**
   * Renders the route with the default layout
   */
  render(content: Route): React.ReactNode {
    return <DefaultRouteComponent route={content} />;
  }
}

/**
 * Default route component used by the DefaultRouteLayout
 */
function DefaultRouteComponent({ route }: { route: Route }) {
  const { plugins } = useVyuh();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">
        {route.title}
      </h1>
      {route.regions.map((region, index) => (
        <div key={region.identifier || index} className="mb-8">
          {region.title && (
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">
              {region.title}
            </h2>
          )}
          <div className="flex flex-col gap-6">
            {region.items.map((item, itemIndex) => (
              <div key={itemIndex} className="">
                {plugins.content.render(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
