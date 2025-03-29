import { CTA } from '@/content/cta/cta';
import { cn } from '@/shared/utils';
import React from 'react';

interface CTAHeaderProps {
  content: Pick<CTA, 'title' | 'subtitle'>;
  background: string;
  className?: string;
}

export const CTAHeader: React.FC<CTAHeaderProps> = ({
  content,
  background,
  className,
}) => {
  // Text color classes based on the background type
  const textClasses = {
    light: 'text-gray-900',
    brand: 'text-white',
    'light-brand': 'text-gray-900',
  };

  // Subtitle color classes based on the background type
  const subtitleClasses = {
    light: 'text-gray-600',
    brand: 'text-indigo-200',
    'light-brand': 'text-gray-600',
  };

  return (
    <div className={cn('text-center', className)}>
      <h2
        className={cn(
          'text-3xl font-bold sm:text-4xl',
          textClasses[background as keyof typeof textClasses],
        )}
      >
        {content.title}
      </h2>
      {content.subtitle && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-lg',
            subtitleClasses[background as keyof typeof subtitleClasses],
          )}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
