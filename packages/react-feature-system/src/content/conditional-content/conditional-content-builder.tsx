import { ContentBuilder } from '@vyuh/react-extension-content';
import { CONDITIONAL_CONTENT_SCHEMA_TYPE, ConditionalContent } from './conditional-content';
import { DefaultConditionalContentLayout } from './default-layout';

/**
 * Content builder for ConditionalContent content items
 */
export class ConditionalContentBuilder extends ContentBuilder<ConditionalContent> {
  /**
   * Creates a new conditional content builder
   */
  constructor() {
    super({
      schemaType: CONDITIONAL_CONTENT_SCHEMA_TYPE,
      defaultLayout: new DefaultConditionalContentLayout(),
      defaultLayoutDescriptor: DefaultConditionalContentLayout.typeDescriptor,
    });
  }
}
