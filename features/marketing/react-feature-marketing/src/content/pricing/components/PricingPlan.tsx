import { Pricing } from '@/content/pricing/pricing';
import { cn } from '@/content/shared/utils';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface PricingPlanProps {
  plan: Pricing['plans'][0];
  className?: string;
  darkMode?: boolean;
  showAnnual?: boolean;
}

export const PricingPlan: React.FC<PricingPlanProps> = ({
  plan,
  className,
  darkMode = false,
  showAnnual = false,
}) => {
  const price = showAnnual && plan.priceAnnually ? plan.priceAnnually : plan.priceMonthly;
  const period = showAnnual ? '/mo, billed annually' : '/month';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: plan.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const ringColor = plan.featured ? 'ring-indigo-600' : darkMode ? 'ring-gray-700' : 'ring-gray-200';
  const bgColor = plan.featured ? 'bg-indigo-600' : darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = plan.featured ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900';
  const featureColor = plan.featured ? 'text-indigo-200' : darkMode ? 'text-gray-300' : 'text-gray-600';
  const checkColor = plan.featured ? 'text-indigo-300' : darkMode ? 'text-indigo-400' : 'text-indigo-600';
  const buttonColor = plan.featured
    ? 'bg-white text-indigo-600 hover:bg-gray-50'
    : 'bg-indigo-600 text-white hover:bg-indigo-500';

  return (
    <div
      className={cn(
        'rounded-3xl p-8 ring-1 xl:p-10',
        ringColor,
        bgColor,
        className
      )}
    >
      <h3 className={cn('text-lg font-semibold leading-8', textColor)}>{plan.name}</h3>
      {plan.description && (
        <p className={cn('mt-4 text-sm leading-6', featureColor)}>{plan.description}</p>
      )}
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className={cn('text-4xl font-bold tracking-tight', textColor)}>
          {formatPrice(price)}
        </span>
        <span className={cn('text-sm font-semibold leading-6', featureColor)}>{period}</span>
      </p>
      <a
        href={plan.action.url}
        className={cn(
          'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm',
          buttonColor
        )}
      >
        {plan.action.label}
      </a>
      <ul className="mt-8 space-y-3 text-sm leading-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex gap-x-3">
            <CheckIcon className={cn('h-6 w-5 flex-none', checkColor)} aria-hidden="true" />
            <span className={featureColor}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
