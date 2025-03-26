import { CONDITIONAL_ROUTE_SCHEMA_TYPE, ConditionalRoute } from '@/content/conditional-route/conditional-route';
import { DefaultConditionalRouteLayout } from '@/content/conditional-route/default-layout';
import { LayoutConfiguration } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for ConditionalRoute content items
 */
export class ConditionalRouteBuilder extends ContentBuilder<ConditionalRoute> {
  /**
   * Creates a new conditional route builder
   */
  constructor() {
    super({
      schemaType: CONDITIONAL_ROUTE_SCHEMA_TYPE,
      defaultLayout: new DefaultConditionalRouteLayout(),
      defaultLayoutDescriptor: DefaultConditionalRouteLayout.typeDescriptor,
    });
  }

  /**
   * Get the layout for a conditional route
   *
   * This uses the route's layout configuration or falls back to the category layout.
   * If no layout is found, it uses the default layout.
   */
  override getLayout(
    content: ConditionalRoute,
  ): LayoutConfiguration | undefined {
    const contentLayout = super.getLayout(content);
    const categoryLayout = Array.isArray(content.category?.layout)
      ? content.category?.layout[0]
      : undefined;

    return contentLayout || categoryLayout;
  }
}
