import { Hero } from '@/features/marketing/content/hero/hero';
import { Action, ImageReference } from '@vyuh/react-core';
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
}: {
  actions?: Array<{ variant: ActionVariant; action: Action }>;
  className?: string;
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
          className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
          className="cursor-pointer rounded-md border border-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
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
          className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
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
        className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
      >
        {actionTitle} <span aria-hidden="true">→</span>
      </button>
    );
  };

  return (
    <div className={`mt-10 flex items-center gap-x-6 ${className}`}>
      {actions.map((actionItem, index) =>
        renderActionButton(actionItem, index),
      )}
    </div>
  );
}

export function getBackgroundStyles(background?: Hero['background']) {
  if (!background) return {};

  switch (background.type) {
    case 'color':
      return { backgroundColor: background.color };
    case 'gradient':
      return { backgroundImage: background.gradient };
    case 'image':
      // Use Vyuh's ImageReference to get the URL
      return background.image
        ? {
            backgroundImage: `url(${background.image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {};
    default:
      return {};
  }
}

// Helper function to get image URL from ImageReference
export function getImageUrl(image?: ImageReference, fallback?: string): string {
  if (!image) return fallback || '';
  return image.url || fallback || '';
}
