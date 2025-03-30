import { Banner as BannerItem } from '@/content/banner/banner';
import { DefaultBannerLayout } from '@/content/banner/default-banner-layout';
import { cn } from '@/shared/utils';
import React, { useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const colorScheme = layout.colorScheme || 'default';
  const cookieId =
    content.cookieId || `banner-${content.text.substring(0, 20)}`;

  // Check if banner has been dismissed before
  useEffect(() => {
    if (typeof window !== 'undefined' && content.dismissible) {
      const isDismissed = localStorage.getItem(cookieId) === 'dismissed';
      if (isDismissed) {
        setIsVisible(false);
      }
    }
  }, [cookieId, content.dismissible]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined' && content.dismissible) {
      localStorage.setItem(cookieId, 'dismissed');
    }
  };

  const colorClasses = {
    default: 'bg-base-200 text-base-content',
    info: 'bg-info/20 text-info',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
    brand: 'bg-primary/20 text-primary',
  };

  // If banner is not visible, don't render anything
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        `alert flex items-center justify-between rounded-none p-4 transition-all duration-300`,
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
          className="ml-2 flex-shrink-0"
          onDismiss={handleDismiss}
        />
      )}
    </div>
  );
};
