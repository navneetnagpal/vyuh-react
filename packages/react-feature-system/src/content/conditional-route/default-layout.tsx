import {
  CONDITIONAL_ROUTE_SCHEMA_TYPE,
  ConditionalRoute,
  evaluateConditionalRoute,
} from '@/content/conditional-route/conditional-route';
import {
  Condition,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import React, { useState, useCallback } from 'react';

/**
 * Default layout for conditional routes
 *
 * Features:
 * - Handles condition evaluation
 * - Shows loading state during evaluation
 * - Renders the selected route
 * - Handles error states
 */
export class DefaultConditionalRouteLayout extends LayoutConfiguration<ConditionalRoute> {
  /**
   * Schema type for the default conditional route layout
   */
  static readonly schemaName: string = `${CONDITIONAL_ROUTE_SCHEMA_TYPE}.layout.default`;

  /**
   * Type descriptor for the default conditional route layout
   */
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  /**
   * Creates a new default conditional route layout
   */
  constructor() {
    super({
      schemaType: DefaultConditionalRouteLayout.schemaName,
      title: 'Default Conditional Route Layout',
    });
  }

  /**
   * Renders the conditional route with the default layout
   */
  render(content: ConditionalRoute): React.ReactNode {
    return <ConditionalRouteLayoutView content={content} />;
  }
}

/**
 * Component for rendering a conditional route
 */
function ConditionalRouteLayoutView({
  content,
}: {
  content: ConditionalRoute;
}) {
  const { plugins } = useVyuh();

  // Function to load the conditional route
  const loadContent = useCallback(async () => {
    return evaluateConditionalRoute(content);
  }, [content]);

  // Function to render the resolved route
  const renderContent = useCallback(
    (resolvedRoute: any) => {
      return plugins.content.render(resolvedRoute);
    },
    [plugins.content],
  );

  return (
    <AsyncContentContainer
      loadContent={loadContent}
      renderContent={renderContent}
      errorTitle="Failed to load Conditional Route"
    />
  );
}
