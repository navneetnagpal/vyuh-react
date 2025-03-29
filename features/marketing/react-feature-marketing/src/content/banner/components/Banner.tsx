import { Banner as BannerItem } from '@/content/banner/banner';
import { DefaultBannerLayout } from '@/content/banner/default-banner-layout';
import { cn } from '@/shared/utils';
import React from 'react';
import { BannerContent } from './BannerContent';
import { BannerDismiss } from './BannerDismiss';
import { BannerIcon } from './BannerIcon';

interface BannerProps {
  content: BannerItem;
  layout: DefaultBannerLayout;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({
  content,
  layout,
  className,
}) => {
  const colorScheme = layout.colorScheme || 'default';

  const colorClasses = {
    default: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    brand: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <div
      className={cn(
        `flex items-center justify-between rounded-md p-4`,
        colorClasses[colorScheme],
        className,
      )}
    >
      <div className="flex">
        {content.icon && (
          <BannerIcon icon={content.icon} className="mr-3 flex-shrink-0" />
        )}
        <BannerContent text={content.text} />
      </div>

      {content.dismissible && (
        <BannerDismiss
          dismissText={content.dismissText}
          className="ml-3 flex-shrink-0"
        />
      )}
    </div>
  );
};
