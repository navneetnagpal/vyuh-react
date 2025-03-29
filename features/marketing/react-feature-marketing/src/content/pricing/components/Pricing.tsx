import { DefaultPricingLayout } from '@/content/pricing/default-pricing-layout';
import { Pricing as PricingContent } from '@/content/pricing/pricing';
import { cn } from '@/shared/utils';
import { Section } from '@/shared/components/Section';
import { Action } from '@vyuh/react-core';
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
