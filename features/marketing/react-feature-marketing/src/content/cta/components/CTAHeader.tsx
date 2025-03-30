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
  // Text color classes - using base-content for all backgrounds since we're using transparent primary
  // Using Daisy UI theme-compatible classes
  const textClasses = {
    light: 'text-base-content',
    brand: 'text-base-content',
    neutral: 'text-base-content',
    accent: 'text-base-content',
    // Add default case for any other background
    default: 'text-base-content',
  };

  // Subtitle color classes - using base-content with opacity for all backgrounds
  // Using Daisy UI theme-compatible classes with consistent opacity
  const subtitleClasses = {
    light: 'text-base-content/70',
    brand: 'text-base-content/70',
    neutral: 'text-base-content/70',
    accent: 'text-base-content/70',
    // Add default case for any other background
    default: 'text-base-content/70',
  };

  return (
    <div className={cn('text-center', className)}>
      <h2
        className={cn(
          'text-3xl font-bold sm:text-4xl',
          textClasses[background as keyof typeof textClasses] ||
            textClasses.default,
        )}
      >
        {content.title}
      </h2>
      {content.subtitle && (
        <p
          className={cn(
            'mx-auto mt-4 max-w-2xl text-lg',
            subtitleClasses[background as keyof typeof subtitleClasses] ||
              subtitleClasses.default,
          )}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
