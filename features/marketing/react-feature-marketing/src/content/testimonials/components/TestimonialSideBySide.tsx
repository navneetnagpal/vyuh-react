import { Testimonials } from '@/content/testimonials/testimonials';
import React from 'react';
import { TestimonialItem } from './TestimonialItem';

interface TestimonialSideBySideProps {
  testimonials: Testimonials['testimonials'];
}

export const TestimonialSideBySide: React.FC<TestimonialSideBySideProps> = ({
  testimonials,
}) => {
  // Ensure testimonials array is defined
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-16 md:max-w-none md:grid-cols-2 lg:mx-0">
      {testimonials.map(
        (testimonial, index) =>
          testimonial && (
            <TestimonialItem
              key={index}
              testimonial={testimonial}
              variant="side-by-side"
            />
          ),
      )}
    </div>
  );
};
