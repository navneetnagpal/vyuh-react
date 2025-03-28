import { Testimonials as TestimonialsContent } from '@/content/testimonials/testimonials';
import { DefaultTestimonialsLayout } from '@/content/testimonials/default-testimonials-layout';
import { cn } from '@/shared/utils';
import React from 'react';
import { TestimonialsHeader } from './TestimonialsHeader';
import { TestimonialItem } from './TestimonialItem';
import { useMediaUtils } from '@/shared/MediaUtils';

interface TestimonialsProps {
  content: TestimonialsContent;
  layout: DefaultTestimonialsLayout;
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple-centered';
  const darkMode = layout.darkMode || false;

  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  const renderAction = () => {
    if (!content.action) return null;

    const buttonClasses = darkMode
      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
      : 'bg-indigo-600 text-white hover:bg-indigo-500';

    return (
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => content.action?.execute()}
          className={cn(
            'rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm',
            buttonClasses,
          )}
        >
          {content.action.title || 'Learn more'}
        </button>
      </div>
    );
  };

  switch (variant) {
    case 'simple-centered':
      return (
        <div className={cn('px-6 py-16', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl">
            <TestimonialsHeader content={content} />

            <div className="mx-auto mt-10 max-w-2xl">
              {content.testimonials &&
                content.testimonials.length > 0 &&
                content.testimonials.map((testimonial, index) => (
                  <TestimonialItem
                    key={index}
                    testimonial={testimonial}
                    darkMode={darkMode}
                    variant={variant}
                    className={index > 0 ? 'mt-8' : ''}
                  />
                ))}
            </div>

            {renderAction()}
          </div>
        </div>
      );

    case 'side-by-side':
      return (
        <div className={cn(backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl">
            <TestimonialsHeader content={content} />

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-16 md:max-w-none md:grid-cols-2 lg:mx-0">
              {content.testimonials &&
                content.testimonials.length > 0 &&
                content.testimonials.map((testimonial, index) => (
                  <TestimonialItem
                    key={index}
                    testimonial={testimonial}
                    darkMode={darkMode}
                    variant={variant}
                  />
                ))}
            </div>

            {renderAction()}
          </div>
        </div>
      );

    case 'with-large-avatar':
      // Same layout as side-by-side, but the variant is passed to TestimonialItem
      // which will render the avatar differently
      return (
        <div className={cn(backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl">
            <TestimonialsHeader content={content} />

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none">
              {content.testimonials &&
                content.testimonials.length > 0 &&
                content.testimonials.map((testimonial, index) => (
                  <TestimonialItem
                    key={index}
                    testimonial={testimonial}
                    darkMode={darkMode}
                    variant={variant}
                  />
                ))}
            </div>

            {renderAction()}
          </div>
        </div>
      );

    case 'card-grid':
      return (
        <div
          className={cn(
            'px-6 py-16',
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900',
            className,
          )}
        >
          <div className="mx-auto max-w-7xl">
            <TestimonialsHeader content={content} />

            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {content.testimonials &&
                content.testimonials.length > 0 &&
                content.testimonials.map((testimonial, index) => (
                  <TestimonialItem
                    key={index}
                    testimonial={testimonial}
                    darkMode={darkMode}
                    variant={variant}
                  />
                ))}
            </div>

            {renderAction()}
          </div>
        </div>
      );

    default:
      // Default to simple-centered layout
      return (
        <div className={cn('px-6 py-16', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl">
            <TestimonialsHeader content={content} />

            <div className="mx-auto mt-10 max-w-2xl">
              {content.testimonials &&
                content.testimonials.length > 0 &&
                content.testimonials.map((testimonial, index) => (
                  <TestimonialItem
                    key={index}
                    testimonial={testimonial}
                    darkMode={darkMode}
                    variant={'simple-centered'}
                    className={index > 0 ? 'mt-8' : ''}
                  />
                ))}
            </div>

            {renderAction()}
          </div>
        </div>
      );
  }
};
