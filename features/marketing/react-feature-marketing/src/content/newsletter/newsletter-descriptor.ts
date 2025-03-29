import {
  Newsletter,
  NEWSLETTER_SCHEMA_TYPE,
} from '@/content/newsletter/newsletter';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Newsletter content items
 */
export class NewsletterDescriptor extends ContentDescriptor<Newsletter> {
  constructor(props?: Partial<NewsletterDescriptor>) {
    super({
      schemaType: NEWSLETTER_SCHEMA_TYPE,
      title: 'Newsletter',
      layouts: props?.layouts,
    });
  }
}
