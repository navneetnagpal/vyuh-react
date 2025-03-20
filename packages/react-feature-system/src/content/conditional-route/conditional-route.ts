import {
  Condition,
  ObjectReference,
  RouteBase,
  useVyuhStore,
} from '@vyuh/react-core';

/**
 * A case item that pairs a condition value with its corresponding route reference.
 *
 * Used within ConditionalRoute to define what route should be shown for each
 * condition value.
 *
 * Example:
 * ```typescript
 * const caseItem = new CaseRouteItem({
 *   value: 'mobile',
 *   item: { type: 'reference', ref: 'route-123' },
 * });
 * ```
 */
export interface CaseRouteItem {
  /**
   * The value to match against the condition result
   */
  readonly value?: string;

  /**
   * Reference to the route to display when this case matches
   */
  readonly item?: ObjectReference;
}

export const CONDITIONAL_ROUTE_SCHEMA_TYPE = 'vyuh.conditionalRoute';

/**
 * A route that conditionally displays different routes based on a condition.
 *
 * ConditionalRoute evaluates a condition and then displays the appropriate
 * route based on the result. This allows for dynamic routing based on
 * user state, device characteristics, or other runtime conditions.
 *
 * Example:
 * ```typescript
 * const route = new ConditionalRoute({
 *   id: 'route-123',
 *   title: 'Conditional Route',
 *   path: '/conditional',
 *   condition: new Condition({
 *     configuration: new DeviceTypeCondition(),
 *   }),
 *   cases: [
 *     new CaseRouteItem({
 *       value: 'mobile',
 *       item: { type: 'reference', ref: 'mobile-route' },
 *     }),
 *     new CaseRouteItem({
 *       value: 'desktop',
 *       item: { type: 'reference', ref: 'desktop-route' },
 *     }),
 *   ],
 *   defaultCase: 'desktop',
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 * });
 * ```
 */
export interface ConditionalRoute extends RouteBase {
  /**
   * The condition to evaluate
   */
  readonly condition?: Condition;

  /**
   * The cases to match against the condition result
   */
  readonly cases?: CaseRouteItem[];

  /**
   * The default case to use if no cases match
   */
  readonly defaultCase?: string;
}

/**
 * Evaluate the condition and return the appropriate route
 */
async function evaluate(route: ConditionalRoute): Promise<RouteBase | null> {
  const value =
    (await route.condition?.configuration?.execute()) || route.defaultCase;
  const caseItem = route.cases?.find((x) => x.value === value);

  const ref = caseItem?.item;
  let leafRoute: RouteBase | null = null;

  if (ref) {
    const { plugins } = useVyuhStore.getState();
    return plugins.content.provider.fetchRoute({
      routeId: ref.ref,
    });
  }

  return null;
}
