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
  const variant = layout.variant || 'simple-centered';

  const backgroundClasses = 'bg-white text-gray-900';

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
          <div className="mx-auto max-w-7xl gap-0 lg:flex lg:items-center lg:gap-x-10">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <NewsletterHeader content={content} centered={false} />
              <NewsletterForm content={content} className="mt-6" />
            </div>
            {content.image && (
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0">
                <NewsletterImage
                  image={content.image}
                  className="w-[40rem] max-w-full rounded-xl"
                />
              </div>
            )}
          </div>
        </Section>
      );

    default:
      return (
        <Section className={className} maxWidth="2xl" centered>
          <NewsletterHeader content={content} />
          <NewsletterForm content={content} className="mt-6" />
        </Section>
      );
  }
};
