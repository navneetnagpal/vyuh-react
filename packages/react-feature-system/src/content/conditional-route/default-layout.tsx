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
import React from 'react';

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
  const loadContent = async () => {
    const result = await evaluateConditionalRoute(content);
    if (!result) {
      throw new Error('No matching route found');
    }
    return result;
  };

  // Function to render the resolved route
  const renderContent = (resolvedRoute: any) => {
    return plugins.content.render(resolvedRoute);
  };

  return (
    <AsyncContentContainer
      loadContent={loadContent}
      renderContent={renderContent}
      errorTitle="Failed to load Conditional Route"
    />
  );
}

/**
 * Debug view for conditional routes (shown in development mode)
 */
export function ConditionalRouteDebugView({
  content,
}: {
  content: ConditionalRoute;
}) {
  const condition = new Condition(content.condition);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="m-4 rounded-md border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-medium text-blue-800">Conditional Route</h3>
        <div className="mt-2">
          <div className="text-sm text-blue-600">
            <p>Title: {content.title}</p>
            <p>Path: {content.path}</p>
            <p>Condition: {condition.configuration?.schemaType || 'None'}</p>
            <p>Default Case: {content.defaultCase || 'None'}</p>
            <p>Cases: {content.cases?.length || 0}</p>
          </div>
          <div className="mt-2">
            <div className="h-1 w-full animate-pulse rounded bg-blue-200"></div>
            <p className="mt-1 text-xs text-blue-500">
              Evaluating condition...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
