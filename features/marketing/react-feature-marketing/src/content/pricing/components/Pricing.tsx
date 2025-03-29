import { DefaultPricingLayout } from '@/content/pricing/default-pricing-layout';
import { Pricing as PricingContent } from '@/content/pricing/pricing';
import { cn } from '@/shared/utils';
import { Section } from '@/shared/components/Section';
import { Action } from '@vyuh/react-core';
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

/**
 * Renders the disclaimer text if present
 */
const PricingDisclaimer: React.FC<{ disclaimer?: string }> = ({
  disclaimer
}) => {
  if (!disclaimer) return null;

  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {disclaimer}
    </p>
  );
};

/**
 * Renders a single tier with detailed features
 */
const SingleTierFeatures: React.FC<{
  plan: PricingContent['plans'][0];
  showAnnual: boolean;
}> = ({ plan, showAnnual }) => {
  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
      <div className="p-8 sm:p-10 lg:flex-auto">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {plan.name}
        </h3>
        {plan.description && (
          <p className="mt-6 text-base leading-7 text-gray-600">
            {plan.description}
          </p>
        )}
        <div className="mt-10 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
            What's included
          </h4>
          <div className="h-px flex-auto bg-gray-100" />
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex gap-x-3">
              <CheckIcon
                className="h-6 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span className="text-gray-600">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div className="rounded-2xl py-10 text-center ring-1 ring-inset ring-gray-900/5 bg-gray-50 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">
              {showAnnual && plan.priceAnnually
                ? 'Annual subscription'
                : 'Monthly subscription'}
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: plan.currency,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(
                  showAnnual && plan.priceAnnually
                    ? plan.priceAnnually
                    : plan.priceMonthly,
                )}
              </span>
              <span className="text-sm font-semibold text-gray-600">
                {showAnnual && plan.priceAnnually
                  ? '/month, billed annually'
                  : '/month'}
              </span>
            </p>
            <button
              onClick={() => new Action(plan.action).execute()}
              className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {plan.action.title || 'Get started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Pricing component that renders different pricing layouts based on the variant
 */
export const Pricing: React.FC<PricingProps> = ({
  content,
  layout,
  className,
}) => {
  const [showAnnual, setShowAnnual] = useState(false);
  const variant = layout.variant || 'simple-three-tiers';

  // Check if any plan has annual pricing
  const hasAnnualPricing = content.plans.some(
    (plan) => plan.priceAnnually !== undefined,
  );

  // Common header and toggle components
  const headerAndToggle = (
    <>
      <PricingHeader content={content} />
      {hasAnnualPricing && (
        <PricingToggle
          showAnnual={showAnnual}
          onChange={setShowAnnual}
          className="mt-8"
        />
      )}
    </>
  );

  // Render the appropriate grid layout based on the variant
  const renderPricingGrid = () => {
    switch (variant) {
      case 'two-tiers-highlighted':
        return (
          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {content.plans.map((plan, index) => (
              <PricingPlan
                key={index}
                plan={plan}
                showAnnual={showAnnual}
              />
            ))}
          </div>
        );

      case 'three-tiers-emphasized':
        return (
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {content.plans.map((plan, index) => (
              <PricingPlan
                key={index}
                plan={plan}
                showAnnual={showAnnual}
                className={plan.featured ? 'ring-2 ring-indigo-600' : ''}
              />
            ))}
          </div>
        );

      case 'single-tier-features':
        return <SingleTierFeatures plan={content.plans[0]} showAnnual={showAnnual} />;

      case 'two-tiers-comparison':
        return (
          <div className="mx-auto mt-10 max-w-md lg:max-w-5xl">
            <div className="flex flex-col gap-8 lg:flex-row">
              {content.plans.slice(0, 2).map((plan, index) => (
                <div key={index} className="flex-1">
                  <PricingPlan
                    plan={plan}
                    showAnnual={showAnnual}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      // Default to simple-three-tiers
      default:
        return (
          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-3">
            {content.plans.map((plan, index) => (
              <PricingPlan
                key={index}
                plan={plan}
                showAnnual={showAnnual}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <Section className={className}>
      {headerAndToggle}
      {renderPricingGrid()}
      <PricingDisclaimer disclaimer={content.disclaimer} />
    </Section>
  );
};
