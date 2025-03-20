import {
  Condition,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import React, { useEffect, useState } from 'react';
import {
  CONDITIONAL_ROUTE_SCHEMA_TYPE,
  ConditionalRoute,
  evaluateConditionalRoute,
} from '@/content/conditional-route/conditional-route';

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
  const { plugins, components } = useVyuh();
  const [route, setRoute] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const evaluateRoute = async () => {
      try {
        const result = await evaluateConditionalRoute(content);

        if (mounted) {
          setRoute(result);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error ? err : new Error('Failed to evaluate route'),
          );
          setLoading(false);
        }
      }
    };

    evaluateRoute();

    return () => {
      mounted = false;
    };
  }, [content, plugins]);

  if (loading) {
    return process.env.NODE_ENV === 'development' ? (
      <ConditionalRouteDebugView content={content} />
    ) : (
      components.renderRouteLoader()
    );
  }

  if (error || !route) {
    return components.renderError({
      title: 'Failed to load Conditional Route',
      error,
    });
  }

  return plugins.content.render(route);
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
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 border border-blue-200 rounded-md bg-blue-50 m-4">
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
            <div className="w-full h-1 bg-blue-200 animate-pulse rounded"></div>
            <p className="text-xs text-blue-500 mt-1">
              Evaluating condition...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
