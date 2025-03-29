import { Pricing } from '@/content/pricing/pricing';
import { cn } from '@/shared/utils';
import React from 'react';

interface PricingHeaderProps {
  content: Pricing;
  className?: string;
}

export const PricingHeader: React.FC<PricingHeaderProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {content.title}
      </h2>
      {content.subtitle && (
        <p className="mt-4 text-lg opacity-70">{content.subtitle}</p>
      )}
    </div>
  );
};
