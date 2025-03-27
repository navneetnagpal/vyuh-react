import {
  MediaImage,
  MediaVideo,
  useMediaUtils,
} from '@/content/shared/MediaUtils';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { DefaultFeatureLayout } from '@/content/feature/default-feature-layout';
import { FeatureComponentProps } from './FeatureTypes';

/**
 * Renders the feature section title
 */
export const FeatureTitle: React.FC<{ title: string; className?: string }> = ({
  title,
  className = '',
}) => (
  <h2
    className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${className}`}
  >
    {title}
  </h2>
);

/**
 * Renders the feature section description
 */
export const FeatureDescription: React.FC<{
  description?: string;
  className?: string;
}> = ({ description, className = '' }) => {
  if (!description) return null;
  return (
    <p className={`mt-4 text-lg text-gray-500 ${className}`}>{description}</p>
  );
};

/**
 * Renders a feature item with title, description and optional icon
 */
export const FeatureItem: React.FC<{
  title: string;
  description?: string;
  icon?: string;
  className?: string;
  dark?: boolean;
}> = ({ title, description, icon, className = '', dark = false }) => (
  <div className={`relative ${className}`}>
    {icon && (
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
        <span className="h-6 w-6">{icon}</span>
      </div>
    )}
    <div className={icon ? 'ml-16' : ''}>
      <h3
        className={cn('text-lg font-medium text-gray-900', {
          'text-white': dark,
        })}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn('mt-2 text-base text-gray-500', {
            'text-gray-300': dark,
          })}
        >
          {description}
        </p>
      )}
    </div>
  </div>
);

/**
 * Renders the feature section actions/buttons
 */
export const FeatureActions: React.FC<{
  actions?: FeatureComponentProps['content']['actions'];
  className?: string;
}> = ({ actions, className = '' }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className={`mt-8 ${className}`}>
      {actions.map((action, index) => {
        const baseClasses =
          'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
        let variantClasses = '';

        switch (action.variant) {
          case 'primary':
            variantClasses = 'bg-indigo-600 text-white hover:bg-indigo-700';
            break;
          case 'secondary':
            variantClasses =
              'bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
            break;
          case 'tertiary':
            variantClasses = 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100';
            break;
          case 'link':
            variantClasses =
              'text-indigo-600 hover:text-indigo-500 shadow-none';
            break;
        }

        return (
          <button
            key={index}
            className={`${baseClasses} ${variantClasses} ${index > 0 ? 'ml-4' : ''}`}
            onClick={() => {
              // Handle action
            }}
          >
            {action.action.title}
          </button>
        );
      })}
    </div>
  );
};

/**
 * Renders the feature section media content
 */
export const FeatureMedia: React.FC<{
  media?: FeatureComponentProps['content']['media'];
  className?: string;
}> = ({ media, className = '' }) => {
  if (!media || media.type === 'none') return null;

  switch (media.type) {
    case 'image':
      return (
        <div className={`overflow-hidden rounded-lg ${className}`}>
          <MediaImage
            image={media.image}
            fallback="https://via.placeholder.com/1200x800?text=Feature+Image"
            alt="Feature illustration"
            className="h-screen w-full"
          />
        </div>
      );
    case 'video':
      return (
        <div className={`overflow-hidden rounded-lg ${className}`}>
          <MediaVideo video={media.video} className="h-auto w-full" controls />
        </div>
      );
    case 'code-example':
      return (
        <div
          className={`overflow-hidden rounded-lg bg-gray-800 p-4 ${className}`}
        >
          <pre className="text-sm text-gray-100">
            <code>{media.codeExample?.code || ''}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
};

/**
 * Hook for generating background styles based on layout configuration
 */
export function useBackgroundStyles(
  background?: DefaultFeatureLayout['background'],
) {
  const { getImageUrl } = useMediaUtils();

  if (!background) return {};

  switch (background.type) {
    case 'color':
      return { backgroundColor: background.color };
    case 'gradient':
      return { backgroundImage: background.gradient };
    case 'image':
      // Use MediaUtils to get the image URL
      if (!background.image) return {};

      const imageUrl = getImageUrl(background.image);
      if (!imageUrl) return {};

      return {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    default:
      return {};
  }
}
