import { Newsletter } from '@/content/newsletter/components/Newsletter';
import {
  Newsletter as NewsletterContent,
  NEWSLETTER_SCHEMA_TYPE,
} from '@/content/newsletter/newsletter';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Newsletter layout variant type
 */
export type NewsletterVariant =
  | 'simple-centered'
  | 'split-with-image';

/**
 * Default layout for newsletter content items
 */
export class DefaultNewsletterLayout extends LayoutConfiguration<NewsletterContent> {
  static readonly schemaName = `${NEWSLETTER_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: NewsletterVariant;

  constructor(props?: Partial<DefaultNewsletterLayout>) {
    super({
      schemaType: DefaultNewsletterLayout.schemaName,
      title: 'Default Newsletter Layout',
    });

    this.variant = props?.variant || 'simple-centered';
  }

  render(content: NewsletterContent): React.ReactNode {
    return <Newsletter content={content} layout={this} />;
  }
}
