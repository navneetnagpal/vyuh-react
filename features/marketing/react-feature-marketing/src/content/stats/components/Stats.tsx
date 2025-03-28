import { Stats as StatsContent } from '@/content/stats/stats';
import { DefaultStatsLayout } from '@/content/stats/default-stats-layout';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { StatsHeader } from './StatsHeader';
import { StatItem } from './StatItem';
import { StatsImage } from './StatsImage';

interface StatsProps {
  content: StatsContent;
  layout: DefaultStatsLayout;
  className?: string;
}

export const Stats: React.FC<StatsProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple';
  const darkMode = layout.darkMode || false;

  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  const renderAction = () => {
    if (!content.action) return null;

    const buttonClasses = darkMode
      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
      : 'bg-indigo-600 text-white hover:bg-indigo-500';

    return (
      <div className="mt-8 flex justify-center">
        <a
          href={content.action.url}
          className={cn(
            'rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm',
            buttonClasses
          )}
        >
          {content.action.label}
        </a>
      </div>
    );
  };

  switch (variant) {
    case 'simple':
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <StatsHeader content={content} />
            
            <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
            </dl>
            
            {renderAction()}
          </div>
        </div>
      );

    case 'with-description':
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="max-w-2xl">
                <StatsHeader
                  content={content}
                  centered={false}
                />
                {content.description && (
                  <p className={cn(
                    'mt-6 text-base leading-7',
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  )}>
                    {content.description}
                  </p>
                )}
                {renderAction()}
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                {content.stats.map((stat, index) => (
                  <StatItem
                    key={index}
                    stat={stat}
                    darkMode={darkMode}
                    variant={variant}
                  />
                ))}
              </dl>
            </div>
          </div>
        </div>
      );

    case 'grid-with-heading':
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <StatsHeader
                content={content}
                centered={false}
              />
              {content.description && (
                <p className={cn(
                  'mt-6 text-base leading-7',
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                )}>
                  {content.description}
                </p>
              )}
            </div>
            <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
            </dl>
            {renderAction()}
          </div>
        </div>
      );

    case 'with-image':
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {content.image && (
                <StatsImage
                  image={content.image}
                  className="mx-auto w-full max-w-md lg:mx-0"
                />
              )}
              <div>
                <StatsHeader
                  content={content}
                  centered={false}
                />
                <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                  {content.stats.map((stat, index) => (
                    <StatItem
                      key={index}
                      stat={stat}
                      darkMode={darkMode}
                      variant={variant}
                    />
                  ))}
                </dl>
                {renderAction()}
              </div>
            </div>
          </div>
        </div>
      );

    case 'card-grid':
      return (
        <div
          className={cn(
            'px-6 py-16',
            darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900',
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <StatsHeader content={content} />
            
            <dl className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
            </dl>
            
            {renderAction()}
          </div>
        </div>
      );

    default:
      return (
        <div
          className={cn(
            'px-6 py-16',
            backgroundClasses,
            className
          )}
        >
          <div className="mx-auto max-w-7xl">
            <StatsHeader content={content} />
            
            <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
            </dl>
            
            {renderAction()}
          </div>
        </div>
      );
  }
};
