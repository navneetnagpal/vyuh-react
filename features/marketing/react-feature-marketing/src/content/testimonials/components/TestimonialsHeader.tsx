import { Testimonials } from '@/content/testimonials/testimonials';
import { cn } from '@/shared/utils';
import React from 'react';

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
    <div className={cn('text-center', className)}>
      {content.title && (
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h2>
      )}
      {content.subtitle && (
        <p className="mt-4 text-lg text-gray-600">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
