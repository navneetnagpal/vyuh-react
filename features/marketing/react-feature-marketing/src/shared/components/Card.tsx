import { cn } from '@/shared/utils';
import React from 'react';

export interface CardProps {
  /**
   * The content to render inside the card
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes to apply to the card
   */
  className?: string;
  
  /**
   * Whether to use dark mode styling
   */
  darkMode?: boolean;
  
  /**
   * Whether the card should be highlighted
   */
  highlighted?: boolean;
  
  /**
   * The padding size to apply to the card
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Whether to add a hover effect to the card
   */
  hoverable?: boolean;
  
  /**
   * Optional click handler for the card
   */
  onClick?: () => void;
}

/**
 * A reusable card component for displaying content in a contained box
 */
export const Card: React.FC<CardProps> = ({
  children,
  className,
  darkMode = false,
  highlighted = false,
  padding = 'md',
  hoverable = false,
  onClick,
}) => {
  const baseClasses = 'rounded-lg ring-1';
  
  const colorClasses = darkMode
    ? highlighted
      ? 'bg-gray-800 ring-indigo-500 ring-2'
      : 'bg-gray-800 ring-gray-700'
    : highlighted
      ? 'bg-white ring-indigo-500 ring-2'
      : 'bg-white ring-gray-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hoverable
    ? 'transition-shadow hover:shadow-md cursor-pointer'
    : '';
  
  return (
    <div
      className={cn(
        baseClasses,
        colorClasses,
        paddingClasses[padding],
        hoverClasses,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
