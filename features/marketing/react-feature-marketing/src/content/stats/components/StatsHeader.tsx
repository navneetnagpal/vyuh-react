import { Stats } from '@/content/stats/stats';
import { cn } from '@/shared/utils';
import React from 'react';

interface StatsHeaderProps {
  content: Stats;
  className?: string;
  centered?: boolean;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
  content,
  className,
  centered = true,
}) => {
  if (!content.title && !content.subtitle) {
    return null;
  }

  return (
    <div className={cn(centered && 'text-center', className)}>
      {content.title && (
        <h2 className="text-base-content text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h2>
      )}
      {content.subtitle && (
        <p className="text-base-content/70 mt-4 text-lg">{content.subtitle}</p>
      )}
    </div>
  );
};
