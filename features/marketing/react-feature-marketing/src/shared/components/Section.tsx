import { cn } from '@/shared/utils';
import React from 'react';

export interface SectionProps {
  /**
   * The content to render inside the section
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply to the section
   */
  className?: string;
}

/**
 * A simple section component with fixed sizing for consistent layout
 *
 * This component provides a consistent container for content with:
 * - Fixed maximum width
 * - Responsive padding
 * - Automatic horizontal centering
 */
export const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section className={cn('container mx-auto px-4 py-8 md:py-16', className)}>
      {children}
    </section>
  );
};
