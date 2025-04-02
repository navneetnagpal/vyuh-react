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
    <div
      className={cn(
        'card bg-base-100 border-base-300 h-full border p-6 shadow-sm transition-all duration-200 hover:shadow-md',
        className,
      )}
    >
      <div className="stat bg-transparent p-0">
        {stat.icon && (
          <div className="stat-figure text-primary md:absolute md:right-4 md:top-4">
            <DynamicIcon
              name={stat.icon as IconName}
              className="h-8 w-8"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="stat-value break-words text-3xl md:text-4xl">
          {stat.value}
        </div>
        <div className="stat-title whitespace-normal break-words">
          {stat.label}
        </div>
        {stat.description && (
          <div className="stat-desc whitespace-normal break-words">
            {stat.description}
          </div>
        )}
      </div>
    </div>
  );
};
