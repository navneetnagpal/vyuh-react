import { DefaultPricingLayout } from '@/content/pricing/default-pricing-layout';
import { Pricing as PricingContent } from '@/content/pricing/pricing';
import { cn } from '@/shared/utils';
// Import at the top of the file
import { CheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import { PricingHeader } from './PricingHeader';
import { PricingPlan } from './PricingPlan';
import { PricingToggle } from './PricingToggle';

interface PricingProps {
  content: PricingContent;
  layout: DefaultPricingLayout;
  className?: string;
}

export const Pricing: React.FC<PricingProps> = ({
  content,
  layout,
  className,
}) => {
  const [showAnnual, setShowAnnual] = useState(false);
  const variant = layout.variant || 'simple-three-tiers';
  const darkMode = layout.darkMode || false;

  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  // Check if any plan has annual pricing
  const hasAnnualPricing = content.plans.some(
    (plan) => plan.priceAnnually !== undefined,
  );

  switch (variant) {
    case 'simple-three-tiers':
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            {hasAnnualPricing && (
              <PricingToggle
                showAnnual={showAnnual}
                onChange={setShowAnnual}
                className="mt-8"
                darkMode={darkMode}
              />
            )}

            <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
              {content.plans.map((plan, index) => (
                <PricingPlan
                  key={index}
                  plan={plan}
                  showAnnual={showAnnual}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );

    case 'two-tiers-highlighted':
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            {hasAnnualPricing && (
              <PricingToggle
                showAnnual={showAnnual}
                onChange={setShowAnnual}
                className="mt-8"
                darkMode={darkMode}
              />
            )}

            <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {content.plans &&
                content.plans.length > 0 &&
                content.plans.map((plan, index) => (
                  <PricingPlan
                    key={index}
                    plan={plan}
                    showAnnual={showAnnual}
                    darkMode={darkMode}
                  />
                ))}
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );

    case 'three-tiers-emphasized':
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            {hasAnnualPricing && (
              <PricingToggle
                showAnnual={showAnnual}
                onChange={setShowAnnual}
                className="mt-8"
                darkMode={darkMode}
              />
            )}

            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {content.plans &&
                content.plans.length > 0 &&
                content.plans.map((plan, index) => (
                  <PricingPlan
                    key={index}
                    plan={plan}
                    showAnnual={showAnnual}
                    darkMode={darkMode}
                    className={plan.featured ? 'ring-2 ring-indigo-600' : ''}
                  />
                ))}
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );

    case 'single-tier-features':
      // Assuming the first plan is the one to display
      const singlePlan = content.plans[0];
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            <div className="mx-auto mt-10 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none dark:ring-gray-700">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3
                  className={cn(
                    'text-2xl font-bold tracking-tight',
                    darkMode ? 'text-white' : 'text-gray-900',
                  )}
                >
                  {singlePlan.name}
                </h3>
                {singlePlan.description && (
                  <p
                    className={cn(
                      'mt-6 text-base leading-7',
                      darkMode ? 'text-gray-300' : 'text-gray-600',
                    )}
                  >
                    {singlePlan.description}
                  </p>
                )}
                <div className="mt-10 flex items-center gap-x-4">
                  <h4
                    className={cn(
                      'flex-none text-sm font-semibold leading-6',
                      darkMode ? 'text-indigo-400' : 'text-indigo-600',
                    )}
                  >
                    What's included
                  </h4>
                  <div className="h-px flex-auto bg-gray-100 dark:bg-gray-700" />
                </div>
                <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2">
                  {singlePlan.features &&
                    singlePlan.features.length > 0 &&
                    singlePlan.features.map((feature, index) => (
                      <li key={index} className="flex gap-x-3">
                        <CheckIcon
                          className={cn(
                            'h-6 w-5 flex-none',
                            darkMode ? 'text-indigo-400' : 'text-indigo-600',
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div
                  className={cn(
                    'rounded-2xl py-10 text-center ring-1 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16',
                    darkMode
                      ? 'bg-gray-800 ring-gray-700'
                      : 'bg-gray-50 ring-gray-900/5',
                  )}
                >
                  <div className="mx-auto max-w-xs px-8">
                    <p
                      className={cn(
                        'text-base font-semibold',
                        darkMode ? 'text-white' : 'text-gray-600',
                      )}
                    >
                      {showAnnual && singlePlan.priceAnnually
                        ? 'Annual subscription'
                        : 'Monthly subscription'}
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span
                        className={cn(
                          'text-5xl font-bold tracking-tight',
                          darkMode ? 'text-white' : 'text-gray-900',
                        )}
                      >
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: singlePlan.currency,
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(
                          showAnnual && singlePlan.priceAnnually
                            ? singlePlan.priceAnnually
                            : singlePlan.priceMonthly,
                        )}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          darkMode ? 'text-gray-300' : 'text-gray-600',
                        )}
                      >
                        {showAnnual && singlePlan.priceAnnually
                          ? '/month, billed annually'
                          : '/month'}
                      </span>
                    </p>
                    <a
                      href={singlePlan.action.url}
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {singlePlan.action.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );

    case 'two-tiers-comparison':
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            {hasAnnualPricing && (
              <PricingToggle
                showAnnual={showAnnual}
                onChange={setShowAnnual}
                className="mt-8"
                darkMode={darkMode}
              />
            )}

            <div className="mx-auto mt-10 max-w-md lg:max-w-5xl">
              <div className="flex flex-col gap-8 lg:flex-row">
                {content.plans &&
                  content.plans.length > 0 &&
                  content.plans.slice(0, 2).map((plan, index) => (
                    <div key={index} className="flex-1">
                      <PricingPlan
                        plan={plan}
                        showAnnual={showAnnual}
                        darkMode={darkMode}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className={cn('py-16 sm:py-24', backgroundClasses, className)}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingHeader content={content} />

            {hasAnnualPricing && (
              <PricingToggle
                showAnnual={showAnnual}
                onChange={setShowAnnual}
                className="mt-8"
                darkMode={darkMode}
              />
            )}

            <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
              {content.plans.map((plan, index) => (
                <PricingPlan
                  key={index}
                  plan={plan}
                  showAnnual={showAnnual}
                  darkMode={darkMode}
                />
              ))}
            </div>

            {content.disclaimer && (
              <p
                className={cn(
                  'mt-10 text-center text-sm',
                  darkMode ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {content.disclaimer}
              </p>
            )}
          </div>
        </div>
      );
  }
};
