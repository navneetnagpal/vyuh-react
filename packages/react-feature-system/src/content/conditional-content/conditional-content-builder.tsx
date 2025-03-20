import { ContentBuilder } from '@vyuh/react-extension-content';
import {
  CONDITIONAL_CONTENT_SCHEMA_TYPE,
  ConditionalContent,
} from './conditional-content';
import { DefaultConditionalContentLayout } from './default-layout';

/**
 * Content builder for ConditionalContent content items
 */
export class ConditionalContentBuilder extends ContentBuilder<ConditionalContent> {
  /**
   * Schema type for the conditional content builder
   */
  static readonly schemaName: string = CONDITIONAL_CONTENT_SCHEMA_TYPE;

  /**
   * Creates a new conditional content builder
   */
  constructor() {
    super({
      schemaType: ConditionalContentBuilder.schemaName,
      defaultLayout: new DefaultConditionalContentLayout(),
      defaultLayoutDescriptor: DefaultConditionalContentLayout.typeDescriptor,
    });
  }
}
