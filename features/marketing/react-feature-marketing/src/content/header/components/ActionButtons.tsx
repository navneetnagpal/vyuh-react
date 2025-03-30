import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface ActionButtonsProps {
  actions?: Header['actions'];
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actions,
  className,
}) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {actions.map((actionItem, index) => (
        <button
          key={index}
          className={cn('btn btn-ghost px-3 text-base')}
          onClick={() => new Action(actionItem.action).execute()}
        >
          {actionItem.icon && (
            <DynamicIcon
              className={cn('h-4 w-4', actionItem.action?.title ? 'mr-1' : '')}
              name={actionItem.icon as IconName}
            />
          )}
          {actionItem.action?.title && <span>{actionItem.action.title}</span>}
        </button>
      ))}
    </div>
  );
};
