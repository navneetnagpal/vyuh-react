import {
  Testimonials,
  TESTIMONIALS_SCHEMA_TYPE,
} from '@/content/testimonials/testimonials';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Testimonials content items
 */
export class TestimonialsDescriptor extends ContentDescriptor<Testimonials> {
  constructor(props?: Partial<TestimonialsDescriptor>) {
    super({
      schemaType: TESTIMONIALS_SCHEMA_TYPE,
      title: 'Testimonials',
      layouts: props?.layouts,
    });
  }
}
