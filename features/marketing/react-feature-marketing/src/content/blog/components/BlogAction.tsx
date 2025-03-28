import { Action } from '@vyuh/react-core';
import { cn } from '@/content/shared/utils';
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
        'rounded-md bg-primary px-4 py-2 text-white shadow-sm hover:bg-primary/90',
        className
      )}
      onClick={() => action.execute()}
    >
      {action.title || 'Read more'}
    </button>
  );
};
