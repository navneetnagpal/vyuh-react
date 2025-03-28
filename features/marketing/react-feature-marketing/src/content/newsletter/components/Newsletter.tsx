import { Newsletter as NewsletterContent } from '@/content/newsletter/newsletter';
import { DefaultNewsletterLayout } from '@/content/newsletter/default-newsletter-layout';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { NewsletterHeader } from './NewsletterHeader';
import { NewsletterForm } from './NewsletterForm';
import { NewsletterFeatures } from './NewsletterFeatures';
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
  const darkMode = layout.darkMode || false;

  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  switch (variant) {
    case 'simple-centered':
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-2xl text-center">
            <NewsletterHeader content={content} />
            <NewsletterForm
              content={content}
              className="mt-6"
              darkMode={darkMode}
            />
          </div>
        </div>
      );

    case 'simple-card':
      return (
        <div className={cn('px-6 py-16 bg-gray-50', className)}>
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
            <NewsletterHeader content={content} />
            <NewsletterForm
              content={content}
              className="mt-6"
              darkMode={false}
            />
          </div>
        </div>
      );

    case 'with-background-image':
      return (
        <div className={cn('relative isolate overflow-hidden', className)}>
          {content.image && (
            <div className="absolute inset-0 -z-10">
              <img
                src={content.image.url}
                alt=""
                className="h-full w-full object-cover opacity-20"
              />
              <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/90' : 'bg-white/80'}`} />
            </div>
          )}
          <div className="mx-auto max-w-2xl px-6 py-16 text-center">
            <NewsletterHeader
              content={content}
              className={darkMode ? 'text-white' : 'text-gray-900'}
            />
            <NewsletterForm
              content={content}
              className="mt-6"
              darkMode={darkMode}
            />
          </div>
        </div>
      );

    case 'split-with-image':
      return (
        <div className={cn('overflow-hidden', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:gap-x-10">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <NewsletterHeader
                content={content}
                centered={false}
              />
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
          </div>
        </div>
      );

    case 'with-description':
      return (
        <div className={cn('px-6 py-16', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
              <div>
                <NewsletterHeader
                  content={content}
                  centered={false}
                />
                {content.features && (
                  <NewsletterFeatures
                    features={content.features}
                    darkMode={darkMode}
                  />
                )}
              </div>
              <div className="lg:flex lg:flex-col lg:justify-center">
                <NewsletterForm
                  content={content}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={cn('px-6 py-16', backgroundClasses, className)}>
          <div className="mx-auto max-w-2xl text-center">
            <NewsletterHeader content={content} />
            <NewsletterForm
              content={content}
              className="mt-6"
              darkMode={darkMode}
            />
          </div>
        </div>
      );
  }
};
