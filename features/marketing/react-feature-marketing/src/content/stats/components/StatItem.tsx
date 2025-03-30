import { Stats } from '@/content/stats/stats';
import { cn } from '@/shared/utils';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface StatItemProps {
  stat: Stats['stats'][0];
  className?: string;
  variant?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  stat,
  className,
  variant = 'simple',
}) => {
  const isCardVariant = variant === 'card-grid';

  return (
    <div className={cn(
      'card bg-base-100 border border-base-300 shadow-sm p-6 h-full',
      className
    )}>
      <div className="stat p-0 bg-transparent">
      {stat.icon && (
        <div className="stat-figure text-primary md:absolute md:top-4 md:right-4">
          <DynamicIcon
            name={stat.icon as IconName}
            className="h-8 w-8"
            aria-hidden="true"
          />
        </div>
      )}
      <div className="stat-value text-3xl md:text-4xl break-words">{stat.value}</div>
      <div className="stat-title whitespace-normal break-words">{stat.label}</div>
      {stat.description && (
        <div className="stat-desc whitespace-normal break-words">
          {stat.description}
        </div>
      )}
      </div>
    </div>
  );
};
