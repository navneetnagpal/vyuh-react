import { Logo } from '@/content/logo/logo';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface LogoItemProps {
  item: Logo['items'][0];
  variant: string;
  className?: string;
}

export const LogoItem: React.FC<LogoItemProps> = ({
  item,
  variant,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  const logoElement = (
    <img
      src={getImageUrl(item.image)}
      alt={item.alt}
      className={cn('h-12 w-auto object-contain', {
        'grayscale transition-all duration-300 hover:grayscale-0':
          variant === 'grayscale',
      })}
    />
  );

  // Wrap in a button if there's an action
  if (item.action) {
    return (
      <button
        onClick={() => new Action(item.action!).execute()}
        className={cn(
          'flex items-center justify-center p-4',
          variant === 'with-borders' && 'border border-gray-200',
          'rounded-lg transition-all hover:opacity-80',
          className,
        )}
      >
        {logoElement}
      </button>
    );
  }

  // Otherwise just return the logo in a div
  return (
    <div
      className={cn(
        'flex items-center justify-center p-4',
        variant === 'with-borders' && 'border border-gray-200',
        'rounded-lg',
        className,
      )}
    >
      {logoElement}
    </div>
  );
};
