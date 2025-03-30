import { Testimonials } from '@/content/testimonials/testimonials';
import React from 'react';
import { TestimonialHeader } from './TestimonialHeader';

interface TestimonialsHeaderProps {
  content: Testimonials;
  className?: string;
}

export const TestimonialsHeader: React.FC<TestimonialsHeaderProps> = ({
  content,
  className,
}) => {
  if (!content.title && !content.subtitle) {
    return null;
  }

  return (
    <TestimonialHeader
      title={content.title}
      subtitle={content.subtitle}
      className={className}
    />
  );
};
