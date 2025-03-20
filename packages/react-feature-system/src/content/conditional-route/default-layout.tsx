import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React, { useEffect, useState } from 'react';
import {
  CONDITIONAL_ROUTE_SCHEMA_TYPE,
  ConditionalRoute,
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
  static readonly typeDescriptor =
    new TypeDescriptor<DefaultConditionalRouteLayout>(
      DefaultConditionalRouteLayout.schemaName,
      DefaultConditionalRouteLayout,
    );

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
  const [route, setRoute] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const evaluateRoute = async () => {
      try {
        const result = await content.evaluate({ plugins });

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
    return (
      <div className="p-4 flex items-center justify-center min-h-[200px]">
        <div className="animate-pulse text-center">
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading route...</p>
        </div>
      </div>
    );
  }

  if (error || !route) {
    return (
      <div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-800">
        <h3 className="font-medium">Failed to load Conditional Route</h3>
        <p className="text-sm mt-1">{error?.message || 'Route not found'}</p>
      </div>
    );
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
  return (
    <div className="p-4 border border-blue-200 rounded-md bg-blue-50">
      <h3 className="font-medium text-blue-800">Conditional Route</h3>
      <div className="mt-2">
        <div className="text-sm text-blue-600">
          <p>Title: {content.title}</p>
          <p>Path: {content.path}</p>
          <p>
            Condition: {content.condition?.configuration?.schemaType || 'None'}
          </p>
          <p>Default Case: {content.defaultCase || 'None'}</p>
          <p>Cases: {content.cases?.length || 0}</p>
        </div>
        <div className="mt-2">
          <div className="w-full h-1 bg-blue-200 animate-pulse rounded"></div>
          <p className="text-xs text-blue-500 mt-1">Evaluating condition...</p>
        </div>
      </div>
    </div>
  );
}
