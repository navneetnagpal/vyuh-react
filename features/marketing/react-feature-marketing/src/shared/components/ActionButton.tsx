import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

export interface ActionButtonProps {
  /**
   * The action to execute when the button is clicked
   */
  action: Action;

  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;



  /**
   * The variant of the button
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean;

  /**
   * Optional icon to display before the button text
   */
  icon?: React.ReactNode;

  /**
   * Optional icon to display after the button text
   */
  trailingIcon?: React.ReactNode;
}

/**
 * A reusable button component for actions
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  trailingIcon,
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'btn-link',
  };

  return (
    <button
      onClick={() => action.execute()}
      className={cn(
        'btn',
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {action.title || 'Learn more'}
      {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
    </button>
  );
};
