import { cn } from '@/shared/utils';
import React from 'react';

interface PricingToggleProps {
  showAnnual: boolean;
  onChange: (showAnnual: boolean) => void;
  className?: string;
  darkMode?: boolean;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({
  showAnnual,
  onChange,
  className,
  darkMode = false,
}) => {
  const textColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const activeTextColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={cn('flex justify-center', className)}>
      <div className="relative flex rounded-full bg-gray-100 p-1 dark:bg-gray-800">
        <button
          type="button"
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold',
            !showAnnual ? 'bg-white shadow dark:bg-gray-700' : 'bg-transparent',
            !showAnnual ? activeTextColor : textColor,
          )}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold',
            showAnnual ? 'bg-white shadow dark:bg-gray-700' : 'bg-transparent',
            showAnnual ? activeTextColor : textColor,
          )}
          onClick={() => onChange(true)}
        >
          Annually
        </button>
      </div>
    </div>
  );
};
