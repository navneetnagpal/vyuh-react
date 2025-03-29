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
      className={`text-4xl font-bold tracking-tight sm:text-6xl ${className}`}
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
  return <p className={`mt-6 text-lg leading-8 ${className}`}>{subtitle}</p>;
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

  const renderActionButton = (
    actionItem: { variant: ActionVariant; action: Action },
    index: number,
  ) => {
    const { variant, action } = actionItem;

    // Get the title from the first configuration if available
    const actionTitle =
      action.title || action?.configurations?.[0]?.title || 'Learn more';

    if (variant === 'primary') {
      return (
        <button
          key={index}
          onClick={(e) => handleActionClick(e, action)}
          className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          className="cursor-pointer rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2.5 text-sm font-semibold text-indigo-800 shadow-sm transition-all duration-200 hover:from-indigo-200 hover:to-purple-200 hover:shadow-md"
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
          className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-indigo-600 underline-offset-2 hover:text-indigo-800 hover:underline"
        >
          {actionTitle} <span aria-hidden="true">→</span>
        </button>
      );
    }

    // Default button style (tertiary)
    return (
      <button
        key={index}
        onClick={(e) => handleActionClick(e, action)}
        className="cursor-pointer rounded-md border-2 border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800 hover:shadow-md"
      >
        {actionTitle} <span aria-hidden="true">→</span>
      </button>
    );
  };

  return (
    <div
      className={`mt-10 flex items-center ${centered ? 'justify-center' : 'justify-start'} gap-x-6 ${className}`}
    >
      {actions.map((actionItem, index) =>
        renderActionButton(actionItem, index),
      )}
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
          <HeroTitle title={title} className="text-white" />
          <HeroSubtitle subtitle={subtitle} className="text-gray-300" />
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

  // Container with optional styling
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div className={`${containerClassName}`}>{children}</div>
  );

  // Render based on media type
  switch (media.type) {
    case 'image':
      if (!media.image) return null;

      return (
        <Container>
          <MediaImage
            image={media.image}
            alt="Hero Image"
            fill={true}
            rounded={'md'}
            shadow={'2xl'}
            className={`ring-1 ring-gray-900/10 ${className}`}
          />
        </Container>
      );

    case 'video':
      if (!media.video) return null;

      return (
        <Container>
          <div
            className={`relative overflow-hidden rounded-md shadow-2xl ring-1 ring-gray-900/10 ${className}`}
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
        </Container>
      );

    default:
      return null;
  }
}
