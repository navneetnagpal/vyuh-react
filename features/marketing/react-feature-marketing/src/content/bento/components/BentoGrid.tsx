import { Bento } from '@/content/bento/bento';
import { cn } from '@/shared/utils';
import React from 'react';
import { BentoItem } from './BentoItem';

interface BentoGridProps {
  items: Bento['items'];
  variant: 'three-column' | 'two-row';
  gapClasses: string;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  items,
  variant,
  gapClasses,
  className,
}) => {
  if (variant === 'three-column') {
    return (
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
          gapClasses,
          className,
        )}
      >
        {items.map((item, index) => (
          <BentoItem key={index} item={item} variant={variant} />
        ))}
      </div>
    );
  }

  // two-row variant
  return (
    <div
      className={cn('grid grid-cols-2 md:grid-cols-4', gapClasses, className)}
    >
      {items.map((item, index) => (
        <BentoItem key={index} item={item} variant={variant} />
      ))}
    </div>
  );
};
