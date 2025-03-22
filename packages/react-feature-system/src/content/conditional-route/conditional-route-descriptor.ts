import {
  CONDITIONAL_ROUTE_SCHEMA_TYPE,
  ConditionalRoute,
} from '@/content/conditional-route/conditional-route';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for configuring conditional route content type in the system.
 *
 * Allows configuring:
 * - Available layouts for conditional routes
 * - Custom layouts for specific use cases
 *
 * Example:
 * ```typescript
 * const descriptor = new ConditionalRouteDescriptor({
 *   layouts: [
 *     DefaultConditionalRouteLayout.typeDescriptor,
 *   ],
 * });
 * ```
 */
export class ConditionalRouteDescriptor extends ContentDescriptor<ConditionalRoute> {
  /**
   * Creates a new conditional route descriptor
   */
  constructor(props?: Partial<ConditionalRouteDescriptor>) {
    super({
      schemaType: CONDITIONAL_ROUTE_SCHEMA_TYPE,
      title: 'Conditional Route',
      layouts: props?.layouts,
    });
  }
}
