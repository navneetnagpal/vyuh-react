import { Stats as StatsContent } from '@/content/stats/stats';
import { DefaultStatsLayout } from '@/content/stats/default-stats-layout';
import { cn } from '@/shared/utils';
import { Section } from '@/shared/components/Section';
import { Container } from '@/shared/components/Container';
import React from 'react';
import { StatsHeader } from './StatsHeader';
import { StatItem } from './StatItem';
import { StatsImage } from './StatsImage';

interface StatsProps {
  content: StatsContent;
  layout: DefaultStatsLayout;
}

export const Stats: React.FC<StatsProps> = ({ content, layout }) => {
  const variant = layout.variant || 'simple';
  const darkMode = layout.darkMode || false;

  const renderAction = () => {
    if (!content.action) return null;

    const buttonClasses = darkMode
      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
      : 'bg-indigo-600 text-white hover:bg-indigo-500';

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

  switch (variant) {
    case 'simple':
      return (
        <StatsContainer>
          <StatsHeader content={content} />

          <dl className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
          </dl>

          {renderAction()}
        </StatsContainer>
      );

    case 'with-description':
      return (
        <StatsContainer darkMode={darkMode}>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div className="max-w-2xl">
              <StatsHeader content={content} centered={false} />
              {content.description && (
                <p
                  className={cn(
                    'mt-6 text-base leading-7',
                    darkMode ? 'text-gray-300' : 'text-gray-600',
                  )}
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
                    darkMode={darkMode}
                    variant={variant}
                  />
                ))}
            </dl>
          </div>
        </StatsContainer>
      );

    case 'grid-with-heading':
      return (
        <StatsContainer darkMode={darkMode}>
          <div className="flex max-w-4xl flex-col items-center">
            <StatsHeader content={content} centered={true} />
            {content.description && (
              <p className={cn('mt-6 text-base leading-7')}>
                {content.description}
              </p>
            )}
          </div>
          <dl className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
          </dl>
          {renderAction()}
        </StatsContainer>
      );

    case 'with-image':
      return (
        <StatsContainer darkMode={darkMode}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {content.image && (
              <StatsImage
                image={content.image}
                className="mx-auto w-full max-w-md lg:mx-0"
              />
            )}
            <div>
              <StatsHeader content={content} centered={false} />
              <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                {content.stats &&
                  content.stats.length > 0 &&
                  content.stats.map((stat, index) => (
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
        </StatsContainer>
      );

    case 'card-grid':
      return (
        <StatsContainer darkMode={darkMode}>
          <StatsHeader content={content} />
          <StatsHeader content={content} />

          <dl className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
          </dl>

          {renderAction()}
        </StatsContainer>
      );

    default:
      return (
        <StatsContainer darkMode={darkMode}>
          <StatsHeader content={content} />

          <dl className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
            {content.stats &&
              content.stats.length > 0 &&
              content.stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  darkMode={darkMode}
                  variant={variant}
                />
              ))}
          </dl>

          {renderAction()}
        </StatsContainer>
      );
  }
};

function StatsContainer({
  darkMode,
  children,
}: {
  darkMode?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Section darkMode={darkMode} maxWidth="5xl">
      <Container padding="lg">
        {children}
      </Container>
    </Section>
  );
}
