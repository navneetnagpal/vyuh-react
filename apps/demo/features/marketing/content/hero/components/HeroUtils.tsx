import { DefaultHeroLayout } from '@/features/marketing/content/hero/default-hero-layout';
import { Hero } from '@/features/marketing/content/hero/hero';
import { Action } from '@vyuh/react-core';
import { useVyuh } from '@vyuh/react-core';
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
  const { plugins } = useVyuh();
  const { content } = plugins;

  if (!background) return {};

  switch (background.type) {
    case 'color':
      return { backgroundColor: background.color };
    case 'gradient':
      return { backgroundImage: background.gradient };
    case 'image':
      // Use Vyuh's Content Provider to get the image URL
      if (!background.image) return {};

      const imageUrl = content.provider.image(background.image);
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
