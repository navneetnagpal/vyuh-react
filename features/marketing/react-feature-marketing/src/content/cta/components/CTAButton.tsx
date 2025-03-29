import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
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
    light: 'btn-primary',
    brand: 'btn-outline btn-primary-content',
    'light-brand': 'btn-primary',
  };

  const secondaryButtonClasses = {
    light: 'btn-outline btn-primary',
    brand: 'btn-outline btn-primary-content',
    'light-brand': 'btn-outline btn-primary',
  };

  const buttonClasses = isPrimary
    ? primaryButtonClasses[background as keyof typeof primaryButtonClasses]
    : secondaryButtonClasses[background as keyof typeof secondaryButtonClasses];

  return (
    <button
      className={cn(
        'btn',
        buttonClasses,
        className,
      )}
      onClick={() => action.execute()}
    >
      {action.title || 'Click here'}
    </button>
  );
};
