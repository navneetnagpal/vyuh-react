import { DefaultStatsLayout } from '@/content/stats/default-stats-layout';
import { Stats as StatsContent } from '@/content/stats/stats';
import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import React from 'react';
import { StatItem } from './StatItem';
import { StatsHeader } from './StatsHeader';

interface StatsProps {
  content: StatsContent;
  layout: DefaultStatsLayout;
}

export const Stats: React.FC<StatsProps> = ({ content, layout }) => {
  const variant = layout.variant || 'simple';

  const renderAction = () => {
    if (!content.action) return null;

    const buttonClasses = 'bg-indigo-600 text-white hover:bg-indigo-500';

    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => content.action?.execute()}
          className={cn(
            'rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm',
            buttonClasses,
          )}
        >
          {content.action.title || 'Learn more'}
        </button>
      </div>
    );
  };

  return (
    <Section maxWidth="5xl" padding="lg">
      {variant === 'simple' && (
        <>
          <StatsHeader content={content} />

          <dl className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant={variant}
                />
              ))}
          </dl>

          {renderAction()}
        </>
      )}

      {variant === 'with-description' && (
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="max-w-2xl">
            <StatsHeader content={content} centered={false} />
            {content.description && (
              <p
                className="mt-6 text-base leading-7 text-gray-600"
              >
                {content.description}
              </p>
            )}
            {renderAction()}
          </div>
          <dl className="grid grid-cols-1 gap-16 sm:grid-cols-2">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant={variant}
                />
              ))}
          </dl>
        </div>
      )}

      {!['simple', 'with-description'].includes(variant) && (
        <>
          <StatsHeader content={content} />

          <dl className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant="simple"
                />
              ))}
          </dl>

          {renderAction()}
        </>
      )}
    </Section>
  );
};
