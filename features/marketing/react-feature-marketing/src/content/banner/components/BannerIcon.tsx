import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface BannerIconProps {
  icon: string;
  className?: string;
}

export const BannerIcon: React.FC<BannerIconProps> = ({
  icon,
  className,
}) => {
  if (!icon) {
    return null;
  }

  return (
    <div className={className}>
      <DynamicIcon className="h-6 w-6" name={icon as IconName} />
    </div>
  );
};
