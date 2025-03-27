import { Banner } from '@/content/banner/banner';
import { DefaultBannerLayout } from '@/content/banner/default-banner-layout';
import { XCircleIcon } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import React from 'react';

interface BannerSimpleProps {
  content: Banner;
  layout: DefaultBannerLayout;
}

export const BannerSimple: React.FC<BannerSimpleProps> = ({
  content,
  layout,
}) => {
  const colorClasses = {
    default: 'bg-gray-100 text-gray-800',
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    brand: 'bg-indigo-100 text-indigo-800',
  };

  const colorScheme = layout.colorScheme || 'default';

  return (
    <div
      className={`flex items-center justify-between p-4 ${colorClasses[colorScheme]} rounded-md`}
    >
      <div className="flex">
        {content.icon && (
          <div className="mr-3 flex-shrink-0">
            <DynamicIcon className="h-6 w-6" name={content.icon} />
          </div>
        )}
        <div>
          <p className="text-sm font-medium">{content.text}</p>
        </div>
      </div>

      {content.dismissible && (
        <span title={content.dismissText}>
          <XCircleIcon />
        </span>
      )}
    </div>
  );
};
