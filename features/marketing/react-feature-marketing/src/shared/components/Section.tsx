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
  
  /**
   * Whether to use dark mode styling
   */
  darkMode?: boolean;
  
  /**
   * Whether to constrain the content to a maximum width
   */
  constrained?: boolean;
  
  /**
   * The maximum width of the content container
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max' | 'prose' | 'screen-sm' | 'screen-md' | 'screen-lg' | 'screen-xl' | 'screen-2xl';
  
  /**
   * Whether to center the content horizontally
   */
  centered?: boolean;
  
  /**
   * The amount of padding to apply to the section
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * The HTML element to use for the section
   */
  as?: React.ElementType;
}

/**
 * A reusable section component for consistent layout across marketing components
 */
export const Section: React.FC<SectionProps> = ({
  children,
  className,
  darkMode = false,
  constrained = true,
  maxWidth = '7xl',
  centered = false,
  padding = 'lg',
  as: Component = 'section',
}) => {
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';
    
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-8 sm:px-6 sm:py-12',
    md: 'px-6 py-12 sm:px-8 sm:py-16',
    lg: 'px-6 py-16 sm:px-8 sm:py-24',
    xl: 'px-8 py-24 sm:px-10 sm:py-32',
  };
  
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
  
  return (
    <Component
      className={cn(
        paddingClasses[padding],
        backgroundClasses,
        className
      )}
    >
      {constrained ? (
        <div
          className={cn(
            'mx-auto',
            maxWidthClasses[maxWidth],
            centered && 'text-center'
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
};
