import { Pricing } from '@/content/pricing/pricing';
import { cn } from '@/content/shared/utils';
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
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h2>
      {content.subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{content.subtitle}</p>
      )}
    </div>
  );
};
