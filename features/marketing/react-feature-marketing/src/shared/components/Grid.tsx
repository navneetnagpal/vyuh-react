import { cn } from '@/shared/utils';
import React from 'react';

export interface GridProps {
  /**
   * The content to render inside the grid
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply to the grid
   */
  className?: string;

  /**
   * The number of columns at different breakpoints
   */
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };

  /**
   * The gap between grid items
   */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * A reusable grid component for displaying items in a grid layout
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className,
  columns = { default: 1 },
  gap = 'md',
}) => {
  const { default: defaultCols, sm, md, lg, xl, '2xl': xxl } = columns;

  const colClasses = [
    `grid-cols-${defaultCols}`,
    sm && `sm:grid-cols-${sm}`,
    md && `md:grid-cols-${md}`,
    lg && `lg:grid-cols-${lg}`,
    xl && `xl:grid-cols-${xl}`,
    xxl && `2xl:grid-cols-${xxl}`,
  ].filter(Boolean);

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-16',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  return (
    <div
      className={cn(
        'grid',
        colClasses,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};
