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
      className={cn("group btn btn-ghost btn-sm px-2 rounded-full transition-colors duration-200 hover:bg-base-300/50", className)}
      onClick={onDismiss}
    >
      <XCircleIcon className="h-5 w-5 transition-opacity duration-200 group-hover:opacity-80" />
    </button>
  );
};
