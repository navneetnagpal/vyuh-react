import { MediaImage } from '@/shared/components';
import { MediaVideo } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action, executeAction } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';

/**
 * Renders the feature section title
 */
export const FeatureTitle: React.FC<{ title?: string; className?: string }> = ({
  title,
  className = '',
}) => {
  if (!title) return null;

  return (
    <h2
      className={`text-base-content text-3xl font-bold tracking-tight sm:text-4xl ${className}`}
    >
      {title}
    </h2>
  );
};

/**
 * Renders the feature section description
 */
export const FeatureDescription: React.FC<{
  description?: string;
  className?: string;
}> = ({ description, className = '' }) => {
  if (!description) return null;
  return (
    <p className={`text-base-content/70 mt-4 text-lg ${className}`}>
      {description}
    </p>
  );
};

/**
 * Renders a feature item with title, description and optional icon
 */
export const FeatureItem: React.FC<{
  title?: string;
  description?: string;
  icon?: string;
  className?: string;
}> = ({ title, description, icon, className = '' }) => {
  if (!title) return null;

  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="bg-primary text-primary-content absolute flex h-12 w-12 items-center justify-center rounded-md">
          <DynamicIcon className="h-6 w-6" name={icon as IconName} />
        </div>
      )}
      <div className={icon ? 'ml-16' : ''}>
        <h3 className="text-base-content text-lg font-medium">{title}</h3>
        {description && (
          <p className="text-base-content/70 mt-2 text-base">{description}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Renders the feature section actions/buttons
 */
export const FeatureActions: React.FC<{
  actions?: FeatureComponentProps['content']['actions'];
  className?: string;
}> = ({ actions, className = '' }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className={cn('mt-8 flex gap-4', className)}>
      {actions.map((action, index) => {
        // Skip if action or action.action is undefined
        if (!action || !action.action) return null;

        let buttonClasses = '';

        switch (action.variant) {
          case 'primary':
            buttonClasses = 'btn-primary';
            break;
          case 'secondary':
            buttonClasses = 'btn-secondary';
            break;
          case 'tertiary':
            buttonClasses = 'btn-outline btn-primary';
            break;
          case 'link':
            buttonClasses = 'btn-link';
            break;
          default:
            buttonClasses = 'btn-primary';
        }

        return (
          <button
            key={index}
            className={cn('btn', buttonClasses)}
            onClick={() => executeAction(action.action)}
          >
            {action.action.title || 'Action'}
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
      // Check if image is defined
      if (!media.image) return null;
      return (
        <div className={`h-full overflow-hidden rounded-lg ${className}`}>
          <MediaImage
            image={media.image}
            alt="Feature illustration"
            className={'h-full w-full'}
            fill={true}
            objectFit="cover"
          />
        </div>
      );
    case 'video':
      // Check if video is defined
      if (!media.video) return null;
      return (
        <div
          className={`flex items-center overflow-hidden rounded-lg bg-black ${className}`}
        >
          <MediaVideo video={media.video} className="h-auto w-full" controls />
        </div>
      );
    case 'code-example':
      // Check if codeExample is defined
      if (!media.codeExample) return null;
      return (
        <div
          className={`bg-neutral overflow-hidden rounded-lg p-4 ${className}`}
        >
          <pre className="text-neutral-content text-sm">
            <code>{media.codeExample.code || ''}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
};
