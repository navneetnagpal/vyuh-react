import { XCircleIcon } from 'lucide-react';
import React from 'react';

interface BannerDismissProps {
  dismissText?: string;
  className?: string;
  onDismiss?: () => void;
}

export const BannerDismiss: React.FC<BannerDismissProps> = ({
  dismissText = 'Dismiss',
  className,
  onDismiss,
}) => {
  return (
    <span title={dismissText} className={className} onClick={onDismiss}>
      <XCircleIcon className="h-5 w-5 cursor-pointer" />
    </span>
  );
};
