import { Newsletter as NewsletterContent } from '@/content/newsletter/newsletter';
import { DefaultNewsletterLayout } from '@/content/newsletter/default-newsletter-layout';
import { Section, Container, Card, MediaImage } from '@/shared/components';
import React from 'react';
import { NewsletterHeader } from './NewsletterHeader';
import { NewsletterForm } from './NewsletterForm';
import { NewsletterFeatures } from './NewsletterFeatures';
import { NewsletterImage } from './NewsletterImage';
import { cn } from '@/shared/utils';

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
  const darkMode = layout.darkMode || false;

  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  switch (variant) {
    case 'simple-centered':
      return (
        <Section
          darkMode={darkMode}
          className={className}
          maxWidth="2xl"
          centered
        >
          <NewsletterHeader content={content} />
          <NewsletterForm
            content={content}
            className="mt-6"
            darkMode={darkMode}
          />
        </Section>
      );

    case 'simple-card':
      return (
        <Section className={cn('bg-gray-50', className)} darkMode={false}>
          <Container maxWidth="2xl">
            <Card padding="lg" className="shadow-md">
              <NewsletterHeader content={content} />
              <NewsletterForm
                content={content}
                className="mt-6"
                darkMode={false}
              />
            </Card>
          </Container>
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
                className={`absolute inset-0 ${darkMode ? 'bg-gray-900/90' : 'bg-white/80'}`}
              />
            </div>
          )}
          <Container maxWidth="2xl" centered className="px-6 py-16">
            <NewsletterHeader
              content={content}
              className={darkMode ? 'text-white' : 'text-gray-900'}
            />
            <NewsletterForm
              content={content}
              className="mt-6"
              darkMode={darkMode}
            />
          </Container>
        </div>
      );

    case 'split-with-image':
      return (
        <Section
          darkMode={darkMode}
          className={cn('overflow-hidden', className)}
          constrained={false}
        >
          <Container
            maxWidth="7xl"
            className="lg:flex lg:items-center lg:gap-x-10"
          >
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <NewsletterHeader content={content} centered={false} />
              <NewsletterForm
                content={content}
                className="mt-6"
                darkMode={darkMode}
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
          </Container>
        </Section>
      );

    case 'with-description':
      return (
        <Section darkMode={darkMode} className={className}>
          <Container maxWidth="7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <div>
                <NewsletterHeader content={content} centered={false} />
                {content.features && content.features.length > 0 && (
                  <NewsletterFeatures
                    features={content.features}
                    darkMode={darkMode}
                  />
                )}
              </div>
              <div className="lg:flex lg:flex-col lg:justify-center">
                <NewsletterForm content={content} darkMode={darkMode} />
              </div>
            </div>
          </Container>
        </Section>
      );

    default:
      return (
        <Section
          darkMode={darkMode}
          className={className}
          maxWidth="2xl"
          centered
        >
          <NewsletterHeader content={content} />
          <NewsletterForm
            content={content}
            className="mt-6"
            darkMode={darkMode}
          />
        </Section>
      );
  }
};
