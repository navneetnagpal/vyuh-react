import { DefaultNewsletterLayout } from '@/content/newsletter/default-newsletter-layout';
import { Newsletter as NewsletterContent } from '@/content/newsletter/newsletter';
import { Section } from '@/shared/components';
import { cn } from '@/shared/utils';
import React from 'react';
import { NewsletterForm } from './NewsletterForm';
import { NewsletterHeader } from './NewsletterHeader';
import { NewsletterImage } from './NewsletterImage';

interface NewsletterProps {
  content: NewsletterContent;
  layout: DefaultNewsletterLayout;
  className?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  content,
  layout,
  className,
}) => {
  // Ensure content and layout are defined
  if (!content || !layout) {
    return null;
  }

  // Ensure required fields are present
  if (!content.title || !content.formAction || !content.buttonText) {
    console.warn('Newsletter component missing required fields');
    return null;
  }

  const variant = layout.variant || 'simple-centered';

  switch (variant) {
    case 'simple-centered':
      return (
        <Section className={className}>
          <NewsletterHeader content={content} />
          <NewsletterForm content={content} className="mt-6" />
        </Section>
      );

    case 'split-with-image':
      return (
        <Section className={cn('overflow-hidden', className)}>
          <div className="mx-auto justify-center gap-0 lg:flex lg:items-center lg:gap-x-10">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <NewsletterHeader content={content} centered={false} />
              <NewsletterForm content={content} className="mt-6" />
            </div>
            {content.image && (
              <div className="mt-16 lg:mt-0 lg:flex-shrink-0">
                <NewsletterImage
                  image={content.image}
                  className="h-64 max-w-full rounded-xl"
                />
              </div>
            )}
          </div>
        </Section>
      );

    default:
      return (
        <Section className={className}>
          <NewsletterHeader content={content} />
          <NewsletterForm content={content} className="mt-6" />
        </Section>
      );
  }
};
