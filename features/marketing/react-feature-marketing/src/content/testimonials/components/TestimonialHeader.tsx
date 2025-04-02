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
        <h2 className="text-base-content text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-base-content/70 mt-4 text-lg">{subtitle}</p>
      )}
    </div>
  );
};
