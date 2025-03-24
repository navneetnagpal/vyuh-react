import { Accordion, ACCORDION_SCHEMA_TYPE } from '@/content/accordion/accordion';
import { DefaultAccordionLayout } from '@/content/accordion/default-accordion-layout';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Accordion content items
 */
export class AccordionContentBuilder extends ContentBuilder<Accordion> {
  static readonly schemaName: string = ACCORDION_SCHEMA_TYPE;

  constructor() {
    super({
      schemaType: AccordionContentBuilder.schemaName,
      defaultLayout: new DefaultAccordionLayout(),
      defaultLayoutDescriptor: DefaultAccordionLayout.typeDescriptor,
    });
  }
}
