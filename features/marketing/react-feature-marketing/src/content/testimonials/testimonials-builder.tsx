import { DefaultTestimonialsLayout } from '@/content/testimonials/default-testimonials-layout';
import {
  Testimonials,
  TESTIMONIALS_SCHEMA_TYPE,
} from '@/content/testimonials/testimonials';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Testimonials content items
 */
export class TestimonialsContentBuilder extends ContentBuilder<Testimonials> {
  constructor() {
    super({
      schemaType: TESTIMONIALS_SCHEMA_TYPE,
      defaultLayout: new DefaultTestimonialsLayout(),
      defaultLayoutDescriptor: DefaultTestimonialsLayout.typeDescriptor,
    });
  }
}
