import { Action } from '@vyuh/react-core';
import { cn } from '@/content/shared/utils';
import React from 'react';

interface CTAButtonProps {
  action: Action;
  isPrimary?: boolean;
  background: string;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  action,
  isPrimary = true,
  background,
  className,
}) => {
  // Button classes based on the background type and whether it's primary or secondary
  const primaryButtonClasses = {
    light: 'bg-indigo-600 text-white hover:bg-indigo-700',
    dark: 'bg-white text-gray-900 hover:bg-gray-100',
    brand: 'bg-white text-indigo-600 hover:bg-gray-100',
    'light-brand': 'bg-indigo-600 text-white hover:bg-indigo-700',
  };

  const secondaryButtonClasses = {
    light: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
    dark: 'border border-white text-white hover:bg-gray-800',
    brand: 'border border-white text-white hover:bg-indigo-700',
    'light-brand': 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  };

  const buttonClasses = isPrimary
    ? primaryButtonClasses[background as keyof typeof primaryButtonClasses]
    : secondaryButtonClasses[background as keyof typeof secondaryButtonClasses];

  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 font-medium shadow-sm',
        buttonClasses,
        className
      )}
      onClick={() => action.execute()}
    >
      {action.title || 'Click here'}
    </button>
  );
};
