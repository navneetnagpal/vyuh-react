import { Pricing } from '@/content/pricing/pricing';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import { CheckIcon } from 'lucide-react';
import React from 'react';

interface PricingPlanProps {
  plan: Pricing['plans'][0];
  className?: string;
  showAnnual?: boolean;
}

export const PricingPlan: React.FC<PricingPlanProps> = ({
  plan,
  className,
  showAnnual = false,
}) => {
  const price =
    showAnnual && plan.priceAnnually ? plan.priceAnnually : plan.priceMonthly;
  const period = showAnnual ? '/mo, billed annually' : '/month';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: plan.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Determine theme based on featured status
  const cardTheme = plan.featured ? 'primary' : 'base-100';

  return (
    <div
      className={cn(
        'card rounded-3xl shadow-sm border row-span-5 grid grid-rows-subgrid gap-y-4 p-8 xl:p-10',
        plan.featured ? 'bg-primary text-primary-content border-primary border-2' : 'bg-base-100 border-base-300',
        className,
      )}
      data-theme={cardTheme}
    >
      {/* Title - Row 1 */}
      <h3 className="text-lg font-semibold">
        {plan.name}
      </h3>

      {/* Description - Row 2 */}
      <div>
        {plan.description && (
          <p className="text-sm opacity-80">
            {plan.description}
          </p>
        )}
      </div>

      {/* Price - Row 3 */}
      <div className="flex items-baseline gap-x-1">
        <span className="text-4xl font-bold">
          {formatPrice(price)}
        </span>
        <span className="text-sm font-semibold opacity-80">
          {period}
        </span>
      </div>

      {/* Button - Row 4 */}
      <div>
        <button
          onClick={() => new Action(plan.action).execute()}
          className={cn(
            'btn w-full',
            plan.featured ? 'bg-white text-primary hover:bg-gray-100' : 'btn-primary',
          )}
        >
          {plan.action.title || 'Get started'}
        </button>
      </div>

      {/* Features - Row 5 */}
      <div>
        <ul className="space-y-3 text-sm">
          {plan.features &&
            plan.features.length > 0 &&
            plan.features.map((feature, index) => (
              <li key={index} className="flex gap-x-3">
                <CheckIcon
                  className={cn('h-6 w-5 flex-none', plan.featured ? 'text-primary-content' : 'text-primary')}
                  aria-hidden="true"
                />
                <span className="opacity-80">{feature}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
