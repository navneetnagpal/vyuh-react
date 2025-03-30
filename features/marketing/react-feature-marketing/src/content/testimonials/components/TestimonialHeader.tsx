import { Testimonials } from '@/content/testimonials/testimonials';
import { cn } from '@/shared/utils';
import React from 'react';

interface TestimonialHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const TestimonialHeader: React.FC<TestimonialHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className={cn('text-center', className)}>
      {title && (
        <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-4 text-lg text-base-content/70">
          {subtitle}
        </p>
      )}
    </div>
  );
};
