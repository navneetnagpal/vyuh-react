import { DefaultRouteContainer } from '@/content/route/default-route-container';
import { Route, ROUTE_SCHEMA_TYPE } from '@/content/route/route';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Default layout for routes when no specific layout is configured
 */
export class DefaultRouteLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = `${ROUTE_SCHEMA_TYPE}.layout.default`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

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
    <DefaultRouteContainer title={route.title}>
      {route.regions.map((region) => (
        <div key={region.identifier} className="mb-8">
          <div className="flex flex-col gap-6">
            {region.items.map((item, itemIndex) => (
              <div key={itemIndex}>{plugins.content.render(item)}</div>
            ))}
          </div>
        </div>
      ))}
    </DefaultRouteContainer>
  );
}
