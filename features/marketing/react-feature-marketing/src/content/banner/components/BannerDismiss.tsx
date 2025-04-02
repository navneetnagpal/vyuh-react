import { cn } from '@/shared/utils';
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
    <button
      type="button"
      aria-label={dismissText}
      title={dismissText}
      className={cn(
        'btn btn-ghost btn-sm hover:bg-base-300/50 group rounded-full px-2 transition-colors duration-200',
        className,
      )}
      onClick={onDismiss}
    >
      <XCircleIcon className="h-5 w-5 transition-opacity duration-200 group-hover:opacity-80" />
    </button>
  );
};
