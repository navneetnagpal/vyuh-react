import { Testimonials } from '@/content/testimonials/testimonials';
import React from 'react';
import { TestimonialItem } from './TestimonialItem';

interface TestimonialSimpleCenteredProps {
  testimonials: Testimonials['testimonials'];
}

export const TestimonialSimpleCentered: React.FC<TestimonialSimpleCenteredProps> = ({
  testimonials,
}) => {
  // Ensure testimonials array is defined
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl">
      {testimonials.map((testimonial, index) => (
        testimonial && <TestimonialItem
          key={index}
          testimonial={testimonial}
          variant="simple-centered"
          className={index > 0 ? 'mt-8' : ''}
        />
      ))}
    </div>
  );
};
