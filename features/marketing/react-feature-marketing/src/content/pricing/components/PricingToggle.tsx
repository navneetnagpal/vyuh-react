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
      <div className="join">
        <button
          type="button"
          className={cn('join-item btn', !showAnnual ? 'btn-active' : '')}
          onClick={() => onChange(false)}
        >
          Monthly
        </button>
        <button
          type="button"
          className={cn('join-item btn', showAnnual ? 'btn-active' : '')}
          onClick={() => onChange(true)}
        >
          Annually
        </button>
      </div>
    </div>
  );
};
