import { cn } from '@/shared/utils';
import React from 'react';

export interface ContentHeaderProps {
  /**
   * The main title text
   */
  title: string;

  /**
   * Optional subtitle or description text
   */
  subtitle?: string;

  /**
   * Additional CSS classes to apply to the header
   */
  className?: string;

  /**
   * Whether to center the header text
   */
  centered?: boolean;

  /**
   * Optional eyebrow/overline text that appears above the title
   */
  eyebrow?: string;

  /**
   * CSS classes for the title element
   */
  titleClassName?: string;

  /**
   * CSS classes for the subtitle element
   */
  subtitleClassName?: string;

  /**
   * CSS classes for the eyebrow element
   */
  eyebrowClassName?: string;
}

/**
 * A reusable header component for content sections with title and optional subtitle
 */
export const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  subtitle,
  className,
  centered = true,
  eyebrow,
  titleClassName,
  subtitleClassName,
  eyebrowClassName,
}) => {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400',
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg text-gray-600 dark:text-gray-300',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
