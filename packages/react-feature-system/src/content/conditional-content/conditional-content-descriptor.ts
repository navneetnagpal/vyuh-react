import { ContentDescriptor } from '@vyuh/react-extension-content';
import { CONDITIONAL_CONTENT_SCHEMA_TYPE, ConditionalContent } from './conditional-content';

/**
 * Descriptor for configuring conditional content type in the system.
 */
export class ConditionalContentDescriptor extends ContentDescriptor<ConditionalContent> {
  /**
   * Creates a new conditional content descriptor
   */
  constructor(props?: Partial<ConditionalContentDescriptor>) {
    super({
      schemaType: CONDITIONAL_CONTENT_SCHEMA_TYPE,
      title: 'Conditional Content',
      layouts: props?.layouts,
    });
  }
}
