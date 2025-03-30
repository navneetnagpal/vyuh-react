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
      className={`text-4xl font-bold tracking-tight sm:text-6xl text-base-content ${className}`}
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
  return <p className={`mt-6 text-lg leading-8 text-base-content/70 ${className}`}>{subtitle}</p>;
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
        className="btn btn-link text-primary no-underline hover:underline group w-full sm:w-auto"
      >
        {actionTitle} <span aria-hidden="true" className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
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
      {actionTitle} <span aria-hidden="true" className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
    </button>
  );
};

  return (
    <div
      className={`mt-10 flex flex-col sm:flex-row items-center ${centered ? 'justify-center' : 'justify-start'} gap-4 ${className}`}
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

// Convert to a hook so we can use the useVyuh hook
export function useBackgroundStyles(
  background?: DefaultHeroLayout['background'],
) {
  const { getImageUrl } = useMediaUtils();

  if (!background) return {};

  switch (background.type) {
    case 'color':
      return { backgroundColor: background.color };
    case 'gradient':
      return { backgroundImage: background.gradient };
    default:
      return {};
  }
}

export function HeroBackgroundImage({ content, layout }: HeroComponentProps) {
  const { title, subtitle, actions } = content;
  const { background } = layout;

  // Use a gradient background instead of an image
  const fallbackBackground = 'linear-gradient(to right, #4f46e5, #7c3aed)';

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 h-full w-full"
        style={{ background: fallbackBackground }}
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <HeroTitle title={title} className="text-primary-content" />
          <HeroSubtitle subtitle={subtitle} className="text-primary-content" />
          <HeroActions actions={actions} />
        </div>
      </div>
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
            className={`border border-base-300 ${className}`}
          />
        </Wrapper>
      );

    case 'video':
      if (!media.video) return null;

      return (
        <Wrapper>
          <div
            className={`relative overflow-hidden rounded-md shadow-lg border border-base-300 ${className}`}
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
