import { DefaultNewsletterLayout } from '@/content/newsletter/default-newsletter-layout';
import { Newsletter as NewsletterContent } from '@/content/newsletter/newsletter';
import { Card, MediaImage, Section } from '@/shared/components';
import { cn } from '@/shared/utils';
import React from 'react';
import { NewsletterFeatures } from './NewsletterFeatures';
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
        <Section
          className={className}
          maxWidth="2xl"
          centered
        >
          <NewsletterHeader content={content} />
          <NewsletterForm
            content={content}
            className="mt-6"
          />
        </Section>
      );

    case 'simple-card':
      return (
        <Section className={cn('bg-gray-50', className)} maxWidth="2xl">
          <Card padding="lg" className="shadow-md">
            <NewsletterHeader content={content} />
            <NewsletterForm
              content={content}
              className="mt-6"
            />
          </Card>
        </Section>
      );

    case 'with-background-image':
      return (
        <div className={cn('relative isolate overflow-hidden', className)}>
          {content.image && (
            <div className="absolute inset-0 -z-10">
              <MediaImage
                image={content.image}
                alt=""
                fill
                objectFit="cover"
                imgClassName="opacity-20"
              />
              <div
                className="absolute inset-0 bg-white/80"
              />
            </div>
          )}
          <div className="mx-auto max-w-2xl px-6 py-16">
            <NewsletterHeader
              content={content}
              className="text-gray-900"
            />
            <NewsletterForm
              content={content}
              className="mt-6"
            />
          </div>
        </div>
      );

    case 'split-with-image':
      return (
        <Section
          className={cn('overflow-hidden', className)}
          constrained={false}
        >
          <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:gap-x-10">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <NewsletterHeader content={content} centered={false} />
              <NewsletterForm
                content={content}
                className="mt-6"
              />
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

    case 'with-description':
      return (
        <Section className={className} maxWidth="7xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            <div>
              <NewsletterHeader content={content} centered={false} />
              {content.features && content.features.length > 0 && (
                <NewsletterFeatures
                  features={content.features}
                />
              )}
            </div>
            <div className="lg:flex lg:flex-col lg:justify-center">
              <NewsletterForm content={content} />
            </div>
          </div>
        </Section>
      );

    default:
      return (
        <Section
          className={className}
          maxWidth="2xl"
          centered
        >
          <NewsletterHeader content={content} />
          <NewsletterForm
            content={content}
            className="mt-6"
          />
        </Section>
      );
  }
};
