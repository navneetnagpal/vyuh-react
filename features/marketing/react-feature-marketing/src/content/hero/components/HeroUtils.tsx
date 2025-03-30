import { Hero } from '@/content/hero';
import { HeroComponentProps } from '@/content/hero/components/HeroTypes';
import { DefaultHeroLayout } from '@/content/hero/default-hero-layout';
import { MediaImage } from '@/shared/components';
import { MediaVideo, useMediaUtils } from '@/shared/MediaUtils';
import { Action } from '@vyuh/react-core';
import React from 'react';

export function HeroTitle({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) {
  return (
    <h1
      className={`text-base-content text-4xl font-bold tracking-tight sm:text-6xl ${className}`}
    >
      {title}
    </h1>
  );
}

export function HeroSubtitle({
  subtitle,
  className = '',
}: {
  subtitle?: string;
  className?: string;
}) {
  if (!subtitle) return null;
  return (
    <p className={`text-base-content/70 mt-6 text-lg leading-8 ${className}`}>
      {subtitle}
    </p>
  );
}

type ActionVariant = 'primary' | 'secondary' | 'tertiary' | 'link';

export function HeroActions({
  actions,
  className = '',
  centered = false,
}: {
  actions?: Array<{ variant: ActionVariant; action: Action }>;
  className?: string;
  centered?: boolean;
}) {
  if (!actions || actions.length === 0) return null;

  const handleActionClick = (e: React.MouseEvent, action: Action) => {
    e.preventDefault();
    if (action) {
      // Create a new instance of the action and execute it
      const actionInstance = new Action(action);
      actionInstance.execute();
    }
  };

  /**
   * HeroActionButton component for rendering a single action button
   */
  const HeroActionButton: React.FC<{
    actionItem: { variant: ActionVariant; action: Action };
    index: number;
    handleActionClick: (e: React.MouseEvent, action: Action) => void;
  }> = ({ actionItem, index, handleActionClick }) => {
    const { variant, action } = actionItem;

    // Get the title from the first configuration if available
    const actionTitle =
      action.title || action?.configurations?.[0]?.title || 'Learn more';

    if (variant === 'primary') {
      return (
        <button
          key={index}
          onClick={(e) => handleActionClick(e, action)}
          className="btn btn-primary w-full sm:w-auto"
        >
          {actionTitle}
        </button>
      );
    }

    if (variant === 'secondary') {
      return (
        <button
          key={index}
          onClick={(e) => handleActionClick(e, action)}
          className="btn btn-secondary w-full sm:w-auto"
        >
          {actionTitle}
        </button>
      );
    }

    if (variant === 'link') {
      return (
        <button
          key={index}
          onClick={(e) => handleActionClick(e, action)}
          className="btn btn-link text-primary group w-full no-underline hover:underline sm:w-auto"
        >
          {actionTitle}{' '}
          <span
            aria-hidden="true"
            className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      );
    }

    // Default button style (tertiary)
    return (
      <button
        key={index}
        onClick={(e) => handleActionClick(e, action)}
        className="btn btn-outline btn-primary group w-full sm:w-auto"
      >
        {actionTitle}{' '}
        <span
          aria-hidden="true"
          className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    );
  };

  return (
    <div
      className={`mt-10 flex flex-col items-center sm:flex-row ${centered ? 'justify-center' : 'justify-start'} gap-4 ${className}`}
    >
      {actions.map((actionItem, index) => (
        <HeroActionButton
          key={index}
          actionItem={actionItem}
          index={index}
          handleActionClick={handleActionClick}
        />
      ))}
    </div>
  );
}

type HeroMediaProps = {
  media?: Hero['media'];
  className?: string;
  containerClassName?: string;
};

export function HeroMedia({
  media,
  className = '',
  containerClassName = '',
}: HeroMediaProps) {
  if (!media || media.type === 'none') {
    return null;
  }

  // Wrapper with optional styling
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={`${containerClassName}`}>{children}</div>
  );

  // Render based on media type
  switch (media.type) {
    case 'image':
      if (!media.image) return null;

      return (
        <Wrapper>
          <MediaImage
            image={media.image}
            alt="Hero Image"
            fill={true}
            rounded={'md'}
            shadow={'2xl'}
            className={`border-base-300 border ${className}`}
          />
        </Wrapper>
      );

    case 'video':
      if (!media.video) return null;

      return (
        <Wrapper>
          <div
            className={`border-base-300 relative overflow-hidden rounded-md border shadow-lg ${className}`}
          >
            <MediaVideo
              video={media.video}
              autoPlay
              muted
              loop
              controls={false}
              className="h-full w-full object-cover"
            />
          </div>
        </Wrapper>
      );

    default:
      return null;
  }
}
