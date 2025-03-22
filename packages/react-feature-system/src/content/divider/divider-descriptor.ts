import { Divider, DIVIDER_SCHEMA_TYPE } from '@/content/divider/divider';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for the Divider content type
 *
 * This descriptor configures:
 * - The schema type for dividers
 * - Available layouts for dividers
 * - Default configuration
 */
export class DividerDescriptor extends ContentDescriptor<Divider> {
  /**
   * Creates a new Divider descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: Partial<DividerDescriptor>) {
    super({
      schemaType: DIVIDER_SCHEMA_TYPE,
      title: 'Divider',
      layouts: options?.layouts,
    });
  }
}
