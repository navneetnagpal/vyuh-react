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

  // Primary button classes
  const primaryButtonClasses = darkMode
    ? 'bg-white text-gray-900 hover:bg-gray-100'
    : 'bg-indigo-600 text-white hover:bg-indigo-700';

  // Secondary button classes
  const secondaryButtonClasses = darkMode
    ? 'bg-gray-800 text-white hover:bg-gray-700'
    : 'bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50';

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      {actions.map((actionItem, index) => (
        <button
          key={index}
          className={cn(
            'cursor-pointer rounded-md px-4 py-2 text-sm font-medium',
            index === 0 ? primaryButtonClasses : secondaryButtonClasses,
          )}
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
