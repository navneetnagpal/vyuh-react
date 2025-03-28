import { Stats } from '@/content/stats/stats';
import { cn } from '@/shared/utils';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface StatItemProps {
  stat: Stats['stats'][0];
  className?: string;
  darkMode?: boolean;
  variant?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  stat,
  className,
  darkMode = false,
  variant = 'simple',
}) => {
  const valueColor = darkMode ? 'text-white' : 'text-gray-900';
  const labelColor = darkMode ? 'text-gray-300' : 'text-gray-600';
  const descriptionColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const iconColor = darkMode ? 'text-indigo-400' : 'text-indigo-600';

  const isCardVariant = variant === 'card-grid';

  return (
    <div
      className={cn(
        isCardVariant && 'rounded-lg p-6 ring-1',
        isCardVariant &&
          (darkMode ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-200'),
        className,
      )}
    >
      {stat.icon && (
        <div className="mb-4">
          <DynamicIcon
            name={stat.icon as IconName}
            className={cn('h-8 w-8', iconColor)}
            aria-hidden="true"
          />
        </div>
      )}
      <div className={cn('text-3xl font-bold', valueColor)}>{stat.value}</div>
      <div className={cn('text-sm font-medium', labelColor)}>{stat.label}</div>
      {stat.description && (
        <p className={cn('mt-2 text-sm', descriptionColor)}>
          {stat.description}
        </p>
      )}
    </div>
  );
};
