import { DefaultNewsletterLayout } from '@/content/newsletter/default-newsletter-layout';
import { Newsletter, NEWSLETTER_SCHEMA_TYPE } from '@/content/newsletter/newsletter';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Newsletter content items
 */
export class NewsletterContentBuilder extends ContentBuilder<Newsletter> {
  constructor() {
    super({
      schemaType: NEWSLETTER_SCHEMA_TYPE,
      defaultLayout: new DefaultNewsletterLayout(),
      defaultLayoutDescriptor: DefaultNewsletterLayout.typeDescriptor,
    });
  }
}
