import { Accordion, ACCORDION_SCHEMA_TYPE } from '@/content/accordion/accordion';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Descriptor for the Accordion content type
 *
 * This descriptor configures:
 * - The schema type for accordions
 * - Available layouts for accordions
 * - Default configuration
 *
 * Example:
 * ```tsx
 * const descriptor = new AccordionDescriptor({
 *   layouts: [new TypeDescriptor<CustomAccordionLayout>()],
 * });
 * ```
 */
export class AccordionDescriptor extends ContentDescriptor<Accordion> {
  /**
   * Creates a new Accordion descriptor
   *
   * @param options Configuration options for the descriptor
   */
  constructor(options?: Partial<AccordionDescriptor>) {
    super({
      schemaType: ACCORDION_SCHEMA_TYPE,
      title: 'Accordion',
      layouts: options?.layouts,
    });
  }
}
