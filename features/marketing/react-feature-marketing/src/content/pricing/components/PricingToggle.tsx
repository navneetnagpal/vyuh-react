import { cn } from '@/shared/utils';
import React from 'react';

interface PricingToggleProps {
  showAnnual: boolean;
  onChange: (showAnnual: boolean) => void;
  className?: string;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({
  showAnnual,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <div className="relative flex rounded-full bg-gray-100 p-1">
        <button
          type="button"
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold',
            !showAnnual ? 'bg-white shadow' : 'bg-transparent',
            !showAnnual ? 'text-gray-900' : 'text-gray-600',
          )}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold',
            showAnnual ? 'bg-white shadow' : 'bg-transparent',
            showAnnual ? 'text-gray-900' : 'text-gray-600',
          )}
          onClick={() => onChange(true)}
        >
          Annually
        </button>
      </div>
    </div>
  );
};
