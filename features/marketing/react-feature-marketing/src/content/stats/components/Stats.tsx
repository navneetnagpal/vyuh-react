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

    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => content.action?.execute()}
          className="btn btn-primary"
        >
          {content.action.title || 'Learn more'}
        </button>
      </div>
    );
  };

  return (
    <Section>
      {variant === 'simple' && (
        <>
          <StatsHeader content={content} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant={variant}
                />
              ))}
          </div>

          {renderAction()}
        </>
      )}

      {variant === 'with-description' && (
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="max-w-2xl">
            <StatsHeader content={content} centered={false} />
            {content.description && (
              <p
                className="mt-6 text-base leading-7 text-base-content/70"
              >
                {content.description}
              </p>
            )}
            {renderAction()}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant={variant}
                />
              ))}
          </div>
        </div>
      )}

      {!['simple', 'with-description'].includes(variant) && (
        <>
          <StatsHeader content={content} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  variant="simple"
                />
              ))}
          </div>

          {renderAction()}
        </>
      )}
    </Section>
  );
};
