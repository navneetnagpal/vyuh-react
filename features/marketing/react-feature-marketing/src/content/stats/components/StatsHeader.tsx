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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h2>
      )}
      {content.subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
