import { cn } from '@/shared/utils';
import { Action, executeAction } from '@vyuh/react-core';
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
  // Using Daisy UI theme-compatible classes
  // Using consistent button styles for all backgrounds since we're using transparent primary
  const primaryButtonClasses = {
    light: 'btn-primary',
    brand: 'btn-primary',
    neutral: 'btn-neutral',
    accent: 'btn-accent',
    // Add default case for any other background
    default: 'btn-primary',
  };

  const secondaryButtonClasses = {
    light: 'btn-outline btn-primary',
    brand: 'btn-outline btn-primary',
    neutral: 'btn-outline btn-neutral',
    accent: 'btn-outline btn-accent',
    // Add default case for any other background
    default: 'btn-outline btn-primary',
  };

  // Get button classes based on background, with fallback to default if not found
  const buttonClasses = isPrimary
    ? primaryButtonClasses[background as keyof typeof primaryButtonClasses] ||
      primaryButtonClasses.default
    : secondaryButtonClasses[
        background as keyof typeof secondaryButtonClasses
      ] || secondaryButtonClasses.default;

  return (
    <button
      className={cn(
        'btn transition-all duration-200 hover:scale-[1.02] hover:shadow-md',
        buttonClasses,
        className,
      )}
      onClick={() => executeAction(action)}
    >
      {action.title || 'Click here'}
    </button>
  );
};
