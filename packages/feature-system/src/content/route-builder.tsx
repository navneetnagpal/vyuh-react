import { ContentBuilder, LayoutConfiguration, useVyuh } from '@vyuh/react';
import React from 'react';
import { Route } from './route';

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
   * Create a Route instance from JSON data
   */
  fromJson(json: Record<string, any>): Route {
    return Route.fromJson(json);
  }

  /**
   * Render a Route content item
   *
   * This uses the route's layout configuration or falls back to the category layout.
   * If no layout is found, it uses the default layout.
   */
  render(content: Route): React.ReactNode {
    // Get the layout from the content or use default
    const layout = content.getLayout();

    if (!layout) {
      console.debug(
        `No layout found for ${content.schemaType}. Using default.`,
      );
      return this.defaultLayout.render(content);
    }

    return layout.render(content);
  }
}

/**
 * Default layout for routes when no specific layout is configured
 */
export class DefaultRouteLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = 'vyuh.route.layout.default';

  constructor() {
    super({
      schemaType: DefaultRouteLayout.schemaName,
      title: 'Default Route Layout',
      contentType: Route.schemaName,
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
    <div className="default-route">
      <h1>{route.title}</h1>
      {route.regions.map((region, index) => (
        <div key={region.identifier || index} className="region">
          <h2>{region.title}</h2>
          <div className="region-content">
            {region.items.map((item, itemIndex) => (
              <div key={itemIndex} className="region-item">
                {plugins.content.render(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
