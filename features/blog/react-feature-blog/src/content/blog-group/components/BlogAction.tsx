import { Action, executeAction } from '@vyuh/react-core';
import React from 'react';
import { cn } from '../../../shared/utils';

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
        'btn btn-primary transition-all duration-200 hover:scale-[1.02] hover:shadow-md',
        className,
      )}
      onClick={() => executeAction(action)}
    >
      {action.title || 'Read more'}
    </button>
  );
};
