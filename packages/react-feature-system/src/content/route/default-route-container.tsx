import { Button } from '@ui/components/button';
import { Action } from '@vyuh/react-core';
import {
  Blocks,
  CircleUser,
  HelpCircle,
  Home,
  Menu,
  Settings,
} from 'lucide-react';
import React from 'react';

const iconMap: Record<string, React.ReactNode> = {
  home: <Home />,
  settings: <Settings />,
  category: <Blocks />,
  account: <CircleUser />,
  menu: <Menu />,
  fallback: <HelpCircle />,
};

export const DefaultRouteContainer = ({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: Array<{ icon: string; action?: Action }>;
  children: React.ReactNode;
}) => {
  return (
    <div className="container max-w-5xl mx-auto p-4">
      {(title || actions?.length) && (
        <h1 className="text-neutral-800 mb-6 px-4 py-2 border border-neutral-200 shadow-lg rounded flex items-center justify-between">
          {title && (
            <span className={'text-3xl font-bold inline-block'}>{title}</span>
          )}

          {actions?.length && (
            <div className="flex space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  disabled={!action.action}
                  variant={'outline'}
                  size={'icon'}
                  onClick={() => {
                    new Action(action.action).execute();
                  }}
                  className={'cursor-pointer'}
                >
                  {iconMap[action.icon] || iconMap.fallback}
                </Button>
              ))}
            </div>
          )}
        </h1>
      )}

      <main>{children}</main>
    </div>
  );
};
