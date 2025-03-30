import { Bento } from '@/content/bento/bento';
import { MediaImage } from '@/shared/components';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface BentoItemProps {
  item: Bento['items'][0];
  variant: 'three-column' | 'two-row';
  className?: string;
}

export const BentoItem: React.FC<BentoItemProps> = ({
  item,
  variant,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();

  // Determine span classes based on the item's span property and the current variant
  let spanClasses = '';

  if (variant === 'two-row') {
    spanClasses = {
      normal: 'col-span-1 row-span-1',
      wide: 'col-span-2 row-span-1',
      tall: 'col-span-1 row-span-2',
      large: 'col-span-2 row-span-2',
    }[item.span || 'normal'];
  } else {
    // For three-column layout
    spanClasses = {
      normal: 'col-span-1',
      wide: 'col-span-2',
      tall: 'col-span-1 row-span-2',
      large: 'col-span-2 row-span-2',
    }[item.span || 'normal'];
  }

  // Background color for the item
  const itemBgColor = item.color || 'bg-base-200';

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-xl p-6 transition-all hover:shadow-md',
        spanClasses,
        itemBgColor,
        item.action && 'cursor-pointer',
        className,
      )}
      onClick={() => item.action && new Action(item.action).execute()}
    >
      {/* Icon or Image */}
      {item.icon && (
        <div className="mb-4 text-2xl">
          <span className="bg-primary inline-block rounded-full p-2 text-primary-content">
            <DynamicIcon className="h-6 w-6" name={item.icon as IconName} />
          </span>
        </div>
      )}

      {item.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <MediaImage
            image={item.image}
            alt={item.title}
            fill={true}
            rounded="lg"
            className="w-full"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

      {/* Description */}
      <p className="text-sm text-base-content/70">{item.description}</p>
    </div>
  );
};
