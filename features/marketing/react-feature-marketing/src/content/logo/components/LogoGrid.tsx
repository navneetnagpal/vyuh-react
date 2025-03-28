import { Logo } from '@/content/logo/logo';
import { cn } from '@/shared/utils';
import React from 'react';
import { LogoItem } from './LogoItem';

interface LogoGridProps {
  items: Logo['items'];
  variant: string;
  darkMode: boolean;
  columns: number;
  className?: string;
}

export const LogoGrid: React.FC<LogoGridProps> = ({
  items,
  variant,
  darkMode,
  columns,
  className,
}) => {
  if (variant === 'carousel') {
    // For carousel, we'll create a simple auto-scrolling container
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <div className="animate-marquee flex space-x-8 py-4">
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              <LogoItem item={item} variant={variant} darkMode={darkMode} />
            </div>
          ))}
          {/* Duplicate items for continuous scrolling effect */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex-shrink-0">
              <LogoItem item={item} variant={variant} darkMode={darkMode} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // For grid layouts
  return (
    <div
      className={cn(
        'grid gap-6',
        {
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': columns === 4,
          'grid-cols-2 md:grid-cols-3': columns === 3,
          'grid-cols-1 md:grid-cols-2': columns === 2,
          'grid-cols-1': columns === 1,
        },
        className,
      )}
    >
      {items.map((item, index) => (
        <LogoItem
          key={index}
          item={item}
          variant={variant}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};
