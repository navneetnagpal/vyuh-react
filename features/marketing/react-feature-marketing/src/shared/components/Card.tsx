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
  highlighted = false,
  padding = 'md',
  hoverable = false,
  onClick,
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'card bg-base-100',
        highlighted ? 'border-primary border-2' : 'border-base-300 border',
        paddingClasses[padding],
        hoverable ? 'cursor-pointer hover:shadow-lg' : '',
        className,
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
