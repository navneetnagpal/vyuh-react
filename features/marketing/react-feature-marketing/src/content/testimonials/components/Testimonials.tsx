import { DefaultTestimonialsLayout } from '@/content/testimonials/default-testimonials-layout';
import { Testimonials as TestimonialsContent } from '@/content/testimonials/testimonials';
import { Section } from '@/shared/components/Section';
import React from 'react';
import { TestimonialAction } from './TestimonialAction';
import { TestimonialsHeader } from './TestimonialsHeader';
import { TestimonialSideBySide } from './TestimonialSideBySide';
import { TestimonialSimpleCentered } from './TestimonialSimpleCentered';

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
  // Ensure content and layout are defined
  if (!content || !layout) {
    return null;
  }

  // Ensure testimonials array is present
  if (!content.testimonials || content.testimonials.length === 0) {
    console.warn('Testimonials component missing testimonials array');
    return null;
  }

  const variant = layout.variant || 'simple-centered';

  const renderAction = () => {
    if (!content.action) return null;
    return <TestimonialAction action={content.action} />;
  };

  const renderTestimonials = () => {
    switch (variant) {
      case 'simple-centered':
        return (
          <TestimonialSimpleCentered testimonials={content.testimonials} />
        );
      case 'side-by-side':
        return <TestimonialSideBySide testimonials={content.testimonials} />;
      default:
        return (
          <TestimonialSimpleCentered testimonials={content.testimonials} />
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
