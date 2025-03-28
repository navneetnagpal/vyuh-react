import { CTA as CTAContent } from '@/content/cta/cta';
import { DefaultCTALayout } from '@/content/cta/default-cta-layout';
import { cn } from '@/shared/utils';
import React from 'react';
import { CTAHeader } from './CTAHeader';
import { CTAButtonGroup } from './CTAButtonGroup';
import { CTAImage } from './CTAImage';
import { useMediaUtils } from '@/shared/MediaUtils';

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
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    brand: 'bg-indigo-600 text-white',
    'light-brand': 'bg-indigo-50',
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
            ? 'text-gray-600'
            : background === 'dark'
              ? 'text-gray-300'
              : background === 'brand'
                ? 'text-indigo-200'
                : 'text-gray-600',
        )}
      >
        {additionalInfo}
      </p>
    );
  };

  // Render the CTA based on the variant
  switch (variant) {
    case 'simple-centered':
      return (
        <div
          className={cn(
            'px-6 py-12 text-center',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto max-w-3xl">
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
        </div>
      );

    case 'simple-stacked':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto max-w-3xl">
            <CTAHeader content={content} background={background} />

            <div className="mt-8 flex flex-col gap-4">
              <CTAButtonGroup
                primaryAction={content.primaryAction}
                secondaryAction={content.secondaryAction}
                background={background}
              />
            </div>

            {renderAdditionalInfo(content.additionalInfo, background)}
          </div>
        </div>
      );

    case 'centered-panel':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-gray-900 shadow-lg">
            <CTAHeader
              content={content}
              background="light"
              className="text-center"
            />

            <div className="mt-8 flex justify-center">
              <CTAButtonGroup
                primaryAction={content.primaryAction}
                secondaryAction={content.secondaryAction}
                background="light"
              />
            </div>

            {content.additionalInfo && (
              <p className="mt-4 text-center text-sm text-gray-600">
                {content.additionalInfo}
              </p>
            )}
          </div>
        </div>
      );

    case 'simple-justified':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <CTAHeader
                content={content}
                background={background}
                className="text-left"
              />
            </div>

            <div>
              <CTAButtonGroup
                primaryAction={content.primaryAction}
                secondaryAction={content.secondaryAction}
                background={background}
              />
            </div>
          </div>

          {content.additionalInfo && (
            <div className="mx-auto mt-4 max-w-6xl">
              {renderAdditionalInfo(content.additionalInfo, background)}
            </div>
          )}
        </div>
      );

    case 'split-image-left':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            {content.image && (
              <CTAImage image={content.image} alt={content.title} />
            )}

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
          </div>
        </div>
      );

    case 'split-image-right':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
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
        </div>
      );

    case 'image-tiles':
      return (
        <div
          className={cn(
            'px-6 py-12',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
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

            {content.imageTiles && content.imageTiles.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {content.imageTiles.map((image, index) => (
                  <CTAImage
                    key={index}
                    image={image}
                    alt={`${content.title} - ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div
          className={cn(
            'px-6 py-12 text-center',
            backgroundClasses[background as keyof typeof backgroundClasses],
            className,
          )}
        >
          <div className="mx-auto max-w-3xl">
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
        </div>
      );
  }
};
