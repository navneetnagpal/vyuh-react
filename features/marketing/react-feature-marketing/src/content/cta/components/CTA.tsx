import { CTA as CTAContent } from '@/content/cta/cta';
import { DefaultCTALayout } from '@/content/cta/default-cta-layout';
import { useMediaUtils } from '@/shared/MediaUtils';
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
  const background = layout.background || 'light';
  const { getImageUrl } = useMediaUtils();

  // Background color classes based on the background type
  const backgroundClasses = {
    light: 'bg-base-100',
    brand: 'bg-primary text-primary-content',
    'light-brand': 'bg-primary-content',
  };

  // Helper function for rendering additional info text with appropriate styling
  const renderAdditionalInfo = (
    additionalInfo: string | undefined,
    background: string,
  ) => {
    if (!additionalInfo) return null;

    return (
      <p
        className={cn(
          'mt-4 text-sm',
          background === 'light'
            ? 'opacity-70'
            : background === 'brand'
              ? 'opacity-80'
              : 'opacity-70',
        )}
      >
        {additionalInfo}
      </p>
    );
  };

  // Get the background class for the section
  const bgClass =
    backgroundClasses[background as keyof typeof backgroundClasses];

  return (
    <Section className={cn(bgClass, className)}>
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

          {renderAdditionalInfo(content.additionalInfo, background)}
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

            {renderAdditionalInfo(content.additionalInfo, background)}
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

          {renderAdditionalInfo(content.additionalInfo, background)}
        </div>
      )}
    </Section>
  );
};
