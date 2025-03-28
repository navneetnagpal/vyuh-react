import { Action } from '@vyuh/react-core';
import { cn } from '@/shared/utils';
import React from 'react';

interface BlogActionProps {
  action: Action;
  className?: string;
}

export const BlogAction: React.FC<BlogActionProps> = ({
  action,
  className,
}) => {
  if (!action) {
    return null;
  }

  return (
    <button
      className={cn(
        'bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-white shadow-sm',
        className,
      )}
      onClick={() => action.execute()}
    >
      {action.title || 'Read more'}
    </button>
  );
};
