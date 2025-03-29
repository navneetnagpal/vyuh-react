import { Logo } from '@/content/logo/logo';
import { cn } from '@/shared/utils';
import React from 'react';
import { LogoItem } from './LogoItem';

interface LogoGridProps {
  items: Logo['items'];
  variant: string;
  columns: number;
  className?: string;
}

export const LogoGrid: React.FC<LogoGridProps> = ({
  items,
  variant,
  columns,
  className,
}) => {
  // For grid layouts
  return (
    <div
      className={cn(
        'grid gap-6',
        {
          'grid-cols-3 md:grid-cols-4 lg:grid-cols-6': columns === 6,
          'grid-cols-3 md:grid-cols-4 lg:grid-cols-5': columns === 5,
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
          'grid-cols-2 md:grid-cols-3': columns === 3,
        },
        className,
      )}
    >
      {items.map((item, index) => (
        <LogoItem key={index} item={item} variant={variant} />
      ))}
    </div>
  );
};
