import { cn } from '@/shared/utils';
import React from 'react';

export interface ContainerProps {
  /**
   * The content to render inside the container
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;

  /**
   * The maximum width of the container
   */
  maxWidth?:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full'
    | 'min'
    | 'max'
    | 'prose'
    | 'screen-sm'
    | 'screen-md'
    | 'screen-lg'
    | 'screen-xl'
    | 'screen-2xl';

  /**
   * Whether to center the container horizontally
   */
  centered?: boolean;

  /**
   * The amount of horizontal padding to apply to the container
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * The HTML element to use for the container
   */
  as?: React.ElementType;
}

/**
 * A reusable container component for constraining content width
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = '7xl',
  centered = true,
  padding = 'none',
  as: Component = 'div',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    min: 'max-w-min',
    max: 'max-w-max',
    prose: 'max-w-prose',
    'screen-sm': 'max-w-screen-sm',
    'screen-md': 'max-w-screen-md',
    'screen-lg': 'max-w-screen-lg',
    'screen-xl': 'max-w-screen-xl',
    'screen-2xl': 'max-w-screen-2xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-6 md:px-8',
    lg: 'px-8 md:px-12',
  };

  return (
    <Component
      className={cn(
        centered && 'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
};
