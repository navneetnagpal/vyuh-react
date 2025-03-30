import { DefaultTestimonialsLayout } from '@/content/testimonials/default-testimonials-layout';
import { Testimonials as TestimonialsContent } from '@/content/testimonials/testimonials';
import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import React from 'react';
import { TestimonialItem } from './TestimonialItem';
import { TestimonialsHeader } from './TestimonialsHeader';

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

  const renderAction = () => {
    if (!content.action) return null;

    return (
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => content.action?.execute()}
          className="btn btn-primary"
        >
          {content.action.title || 'Learn more'}
        </button>
      </div>
    );
  };

  const renderTestimonials = () => {
    switch (variant) {
      case 'simple-centered':
        return (
          <div className="mx-auto mt-10 max-w-2xl">
            {content.testimonials?.map((testimonial, index) => (
              <TestimonialItem
                key={index}
                testimonial={testimonial}
                variant={variant}
                className={index > 0 ? 'mt-8' : ''}
              />
            ))}
          </div>
        );

      case 'side-by-side':
        return (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-16 md:max-w-none md:grid-cols-2 lg:mx-0">
            {content.testimonials?.map((testimonial, index) => (
              <TestimonialItem
                key={index}
                testimonial={testimonial}
                variant={variant}
              />
            ))}
          </div>
        );

      default:
        return (
          <div className="mx-auto mt-10 max-w-2xl">
            {content.testimonials?.map((testimonial, index) => (
              <TestimonialItem
                key={index}
                testimonial={testimonial}
                variant="simple-centered"
                className={index > 0 ? 'mt-8' : ''}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <Section className={className}>
      <TestimonialsHeader content={content} />
      {renderTestimonials()}
      {renderAction()}
    </Section>
  );
};
