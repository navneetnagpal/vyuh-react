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
   * Whether to use dark mode styling
   */
  darkMode?: boolean;

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
  darkMode = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  trailingIcon,
}) => {
  // Base button classes
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Variant classes
  const variantClasses = {
    primary: darkMode
      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
      : 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: darkMode
      ? 'bg-white text-gray-900 hover:bg-gray-100'
      : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: darkMode
      ? 'border border-gray-600 text-white hover:bg-gray-800'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: darkMode
      ? 'text-white hover:bg-gray-800'
      : 'text-gray-700 hover:bg-gray-100',
    link: darkMode
      ? 'text-indigo-400 hover:text-indigo-300 shadow-none'
      : 'text-indigo-600 hover:text-indigo-500 shadow-none',
  };

  return (
    <button
      onClick={() => action.execute()}
      className={cn(
        baseClasses,
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
