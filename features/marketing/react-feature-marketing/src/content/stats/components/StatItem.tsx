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
  const valueColor = 'text-base-content';
  const labelColor = 'text-base-content/70';
  const descriptionColor = 'text-base-content/60';
  const iconColor = 'text-primary';

  const isCardVariant = variant === 'card-grid';

  return (
    <div
      className={cn(
        isCardVariant && 'card p-6',
        isCardVariant && 'bg-base-100 border border-base-300',
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
