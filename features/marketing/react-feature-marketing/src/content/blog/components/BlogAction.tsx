import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
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
        'btn btn-primary',
        className,
      )}
      onClick={() => new Action(action).execute()}
    >
      {action.title || 'Read more'}
    </button>
  );
};
