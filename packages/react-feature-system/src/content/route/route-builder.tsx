import { DefaultRouteLayout } from '@/content/route/default-route-layout';
import { Route, ROUTE_SCHEMA_TYPE } from '@/content/route/route';
import { LayoutConfiguration } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Route content items
 */
export class RouteContentBuilder extends ContentBuilder<Route> {
  constructor() {
    super({
      schemaType: ROUTE_SCHEMA_TYPE,
      defaultLayout: new DefaultRouteLayout(),
      defaultLayoutDescriptor: DefaultRouteLayout.typeDescriptor,
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
