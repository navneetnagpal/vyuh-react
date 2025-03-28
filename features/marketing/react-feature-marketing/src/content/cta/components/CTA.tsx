import { CTA as CTAItem } from '@/content/cta/cta';
import { DefaultCTALayout } from '@/content/cta/default-cta-layout';
import { cn } from '@/content/shared/utils';
import { Action, useVyuh } from '@vyuh/react-core';
import React from 'react';

interface CTAProps {
  content: CTAItem;
  layout: DefaultCTALayout;
  className?: string;
}

export const CTA: React.FC<CTAProps> = ({ content, layout, className }) => {
  const { plugins } = useVyuh();
  const variant = layout.variant || 'simple-centered';
  const background = layout.background || 'light';

  // Background color classes based on the background type
  const backgroundClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    brand: 'bg-indigo-600 text-white',
    'light-brand': 'bg-indigo-50',
  };

  // Button classes based on the background type
  const primaryButtonClasses = {
    light: 'bg-indigo-600 text-white hover:bg-indigo-700',
    dark: 'bg-white text-gray-900 hover:bg-gray-100',
    brand: 'bg-white text-indigo-600 hover:bg-gray-100',
    'light-brand': 'bg-indigo-600 text-white hover:bg-indigo-700',
  };

  const secondaryButtonClasses = {
    light: 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50',
    dark: 'text-white border border-white hover:bg-gray-800',
    brand: 'text-white border border-white hover:bg-indigo-500',
    'light-brand':
      'text-indigo-600 border border-indigo-600 hover:bg-indigo-50',
  };

  // Render the primary action button
  const renderPrimaryButton = () => {
    if (!content.primaryAction) return null;

    return (
      <button
        className={cn(
          'rounded-md px-5 py-2.5 font-medium cursor-pointer',
          primaryButtonClasses[background as keyof typeof primaryButtonClasses],
        )}
        onClick={() => new Action(content.primaryAction).execute()}
      >
        {content.primaryAction.title}
      </button>
    );
  };

  // Render the secondary action button
  const renderSecondaryButton = () => {
    if (!content.secondaryAction) return null;

    return (
      <button
        className={cn(
          'rounded-md px-5 py-2.5 font-medium cursor-pointer',
          secondaryButtonClasses[
            background as keyof typeof secondaryButtonClasses
          ],
        )}
        onClick={() => new Action(content.secondaryAction!).execute()}
      >
        {content.secondaryAction.title}
      </button>
    );
  };

  // Render image if available
  const renderImage = () => {
    if (!content.image) return null;

    const imageUrl = plugins.content.provider.image(content.image, {
      width: 600,
      height: 400,
    });

    return (
      <div className="overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={content.title}
          className="h-full w-full object-cover"
        />
      </div>
    );
  };

  // Render image tiles if available
  const renderImageTiles = () => {
    if (!content.imageTiles || content.imageTiles.length === 0) return null;

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {content.imageTiles.map((image, index) => {
          const imageUrl = plugins.content.provider.image(image, {
            width: 300,
            height: 200,
          });

          return (
            <div key={index} className="overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={`${content.title} - ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
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
            <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
            {content.subtitle && (
              <p className="mb-8 text-lg">{content.subtitle}</p>
            )}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {renderPrimaryButton()}
              {renderSecondaryButton()}
            </div>
            {content.additionalInfo && (
              <p className="mt-4 text-sm opacity-80">
                {content.additionalInfo}
              </p>
            )}
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
            <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
            {content.subtitle && (
              <p className="mb-8 text-lg">{content.subtitle}</p>
            )}
            <div className="flex flex-col gap-4">
              {renderPrimaryButton()}
              {renderSecondaryButton()}
            </div>
            {content.additionalInfo && (
              <p className="mt-4 text-sm opacity-80">
                {content.additionalInfo}
              </p>
            )}
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
            <h2 className="mb-4 text-center text-3xl font-bold">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="mb-8 text-center text-lg">{content.subtitle}</p>
            )}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {renderPrimaryButton()}
              {renderSecondaryButton()}
            </div>
            {content.additionalInfo && (
              <p className="mt-4 text-center text-sm opacity-80">
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
              <h2 className="mb-2 text-3xl font-bold">{content.title}</h2>
              {content.subtitle && (
                <p className="text-lg">{content.subtitle}</p>
              )}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              {renderPrimaryButton()}
              {renderSecondaryButton()}
            </div>
          </div>
          {content.additionalInfo && (
            <div className="mx-auto mt-4 max-w-6xl">
              <p className="text-sm opacity-80">{content.additionalInfo}</p>
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
            <div>{renderImage()}</div>
            <div>
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.subtitle && (
                <p className="mb-8 text-lg">{content.subtitle}</p>
              )}
              <div className="flex flex-col gap-4 sm:flex-row">
                {renderPrimaryButton()}
                {renderSecondaryButton()}
              </div>
              {content.additionalInfo && (
                <p className="mt-4 text-sm opacity-80">
                  {content.additionalInfo}
                </p>
              )}
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
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.subtitle && (
                <p className="mb-8 text-lg">{content.subtitle}</p>
              )}
              <div className="flex flex-col gap-4 sm:flex-row">
                {renderPrimaryButton()}
                {renderSecondaryButton()}
              </div>
              {content.additionalInfo && (
                <p className="mt-4 text-sm opacity-80">
                  {content.additionalInfo}
                </p>
              )}
            </div>
            <div>{renderImage()}</div>
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
              <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
              {content.subtitle && (
                <p className="mb-8 text-lg">{content.subtitle}</p>
              )}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                {renderPrimaryButton()}
                {renderSecondaryButton()}
              </div>
              {content.additionalInfo && (
                <p className="mt-4 text-sm opacity-80">
                  {content.additionalInfo}
                </p>
              )}
            </div>
            {renderImageTiles()}
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
            <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
            {content.subtitle && (
              <p className="mb-8 text-lg">{content.subtitle}</p>
            )}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              {renderPrimaryButton()}
              {renderSecondaryButton()}
            </div>
            {content.additionalInfo && (
              <p className="mt-4 text-sm opacity-80">
                {content.additionalInfo}
              </p>
            )}
          </div>
        </div>
      );
  }
};
