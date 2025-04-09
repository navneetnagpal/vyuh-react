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

  readonly gap: 'none' | 'small' | 'medium' | 'large';

  constructor(props?: Partial<DefaultRouteLayout>) {
    super({
      schemaType: DefaultRouteLayout.schemaName,
      title: 'Default Route Layout',
    });

    this.gap = props?.gap ?? 'small';
  }

  /**
   * Renders the route with the default layout
   */
  render(content: Route): React.ReactNode {
    return <DefaultRouteComponent route={content} layout={this} />;
  }
}

const gapClasses = {
  none: 'vfs:gap-0',
  small: 'vfs:gap-4',
  medium: 'vfs:gap-8',
  large: 'vfs:gap-16',
};

/**
 * Default route component used by the DefaultRouteLayout
 */
function DefaultRouteComponent({
  route,
  layout,
}: {
  route: Route;
  layout: DefaultRouteLayout;
}) {
  const { plugins } = useVyuh();

  const gapClass: string = gapClasses[layout.gap || 'medium'];

  return (
    <DefaultRouteContainer title={route.title}>
      {route.regions.map((region) => (
        <div key={region.identifier} className="vfs:mb-8">
          <div className={`vfs:flex vfs:flex-col ${gapClass}`}>
            {region.items.map((item, itemIndex) => {
              const type = plugins.content.provider.schemaType(item);
              return (
                <div key={`${type}-${itemIndex}`}>
                  {plugins.content.render(item)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </DefaultRouteContainer>
  );
}
