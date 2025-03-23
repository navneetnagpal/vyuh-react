import { DefaultRouteContainer } from '@/content/route/default-route-container';
import { Route, ROUTE_SCHEMA_TYPE } from '@/content/route/route';
import { Action, LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Single Item Layout for routes that displays only the first item from the body region
 *
 * This layout is useful for simple pages that need to display a single content item
 * with an optional app bar.
 */
export class SingleItemLayout extends LayoutConfiguration<Route> {
  static readonly schemaName: string = `${ROUTE_SCHEMA_TYPE}.layout.single`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly showAppBar: boolean;
  readonly actions?: Array<{ icon: string; action?: Action }>;

  constructor(config?: {
    showAppBar?: boolean;
    actions?: Array<{ icon: string; action?: Action }>;
  }) {
    super({
      schemaType: SingleItemLayout.schemaName,
      title: 'Single Item Layout',
    });

    this.showAppBar = config?.showAppBar ?? false;
    this.actions = config?.actions;
  }

  /**
   * Renders the route with only the first item from the body region
   */
  render(content: Route): React.ReactNode {
    return (
      <SingleItemComponent
        route={content}
        showAppBar={this.showAppBar}
        actions={this.actions}
      />
    );
  }
}

/**
 * Component that renders only the first item from the body region of a route
 */
function SingleItemComponent({
  route,
  showAppBar,
  actions,
}: {
  route: Route;
  showAppBar: boolean;
  actions?: Array<{ icon: string; action?: Action }>;
}) {
  const { plugins } = useVyuh();

  // Find the first item from the body region
  const bodyRegion = route.regions.find(
    (region) => region.identifier === 'body',
  );

  const firstItem =
    bodyRegion?.items && bodyRegion.items.length > 0
      ? bodyRegion.items[0]
      : undefined;

  // Render the content or empty state
  const content = firstItem ? plugins.content.render(firstItem) : null;

  return (
    <DefaultRouteContainer title={route.title} actions={actions}>
      {content}
    </DefaultRouteContainer>
  );
}
