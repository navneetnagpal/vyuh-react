import { CTA as CTAContent } from '@/content/cta/cta';
import { DefaultCTALayout } from '@/content/cta/default-cta-layout';
import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import React from 'react';
import { CTAButtonGroup } from './CTAButtonGroup';
import { CTAHeader } from './CTAHeader';
import { CTAImage } from './CTAImage';

interface CTAProps {
  content: CTAContent;
  layout: DefaultCTALayout;
  className?: string;
}

export const CTA: React.FC<CTAProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'simple-centered';
  const background = layout.background || 'default';

  // Background color classes based on the background type
  // Using Daisy UI theme-compatible classes with slight transparency
  const backgroundClasses = {
    light: 'bg-primary/25 backdrop-blur-sm text-base-content shadow-md',
    brand: 'bg-primary/25 backdrop-blur-sm text-base-content shadow-md',
    neutral: 'bg-neutral/25 backdrop-blur-sm text-neutral-content shadow-md',
    accent: 'bg-accent/25 backdrop-blur-sm text-accent-content shadow-md',
    // Add default case for any other background
    default: 'bg-primary/25 backdrop-blur-sm text-base-content shadow-md',
  };

  /**
   * CTAAdditionalInfo component for rendering additional information text
   */
  const CTAAdditionalInfo: React.FC<{
    additionalInfo?: string;
    background: string;
  }> = ({ additionalInfo, background }) => {
    if (!additionalInfo) return null;

    return (
      <p className={cn('mt-4 text-sm', 'text-base-content/70')}>
        {additionalInfo}
      </p>
    );
  };

  // Get the background class for the section with fallback to default
  const bgClass =
    backgroundClasses[background as keyof typeof backgroundClasses] ||
    backgroundClasses.default;

  return (
    <Section
      className={cn(
        bgClass,
        'border-base-300 md:hover:border-base-300/70 to-primary/25 rounded-none border-none bg-gradient-to-br from-transparent transition-all duration-300 hover:shadow-xl md:rounded-xl md:border',
        className,
      )}
    >
      {variant === 'simple-centered' && (
        <div className="mx-auto max-w-3xl text-center">
          <CTAHeader content={content} background={background} />

          <div className="mt-8 flex justify-center">
            <CTAButtonGroup
              primaryAction={content.primaryAction}
              secondaryAction={content.secondaryAction}
              background={background}
            />
          </div>

          <CTAAdditionalInfo
            additionalInfo={content.additionalInfo}
            background={background}
          />
        </div>
      )}

      {variant === 'split-image-right' && (
        <div className="mx-auto grid items-center gap-16 md:grid-cols-2">
          <div>
            <CTAHeader
              content={content}
              background={background}
              className="text-left"
            />

            <div className="mt-8">
              <CTAButtonGroup
                primaryAction={content.primaryAction}
                secondaryAction={content.secondaryAction}
                background={background}
              />
            </div>

            <CTAAdditionalInfo
              additionalInfo={content.additionalInfo}
              background={background}
            />
          </div>

          {content.image && (
            <CTAImage image={content.image} alt={content.title} />
          )}
        </div>
      )}

      {!['simple-centered', 'split-image-right'].includes(variant) && (
        <div className="mx-auto max-w-3xl text-center">
          <CTAHeader content={content} background={background} />

          <div className="mt-8 flex justify-center">
            <CTAButtonGroup
              primaryAction={content.primaryAction}
              secondaryAction={content.secondaryAction}
              background={background}
            />
          </div>

          <CTAAdditionalInfo
            additionalInfo={content.additionalInfo}
            background={background}
          />
        </div>
      )}
    </Section>
  );
};
