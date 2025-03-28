import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { Action } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';

interface ActionButtonsProps {
  actions?: Header['actions'];
  darkMode?: boolean;
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actions,
  darkMode = false,
  className,
}) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      {actions.map((actionItem, index) => (
        <button
          key={index}
          className={cn('btn btn-xs')}
          onClick={() => new Action(actionItem.action).execute()}
        >
          <div className="flex items-center">
            {actionItem.icon && (
              <DynamicIcon
                className={cn(
                  'h-4 w-4',
                  actionItem.action?.title ? 'mr-2' : '',
                )}
                name={actionItem.icon as IconName}
              />
            )}
            {actionItem.action?.title && <span>{actionItem.action.title}</span>}
          </div>
        </button>
      ))}
    </div>
  );
};
