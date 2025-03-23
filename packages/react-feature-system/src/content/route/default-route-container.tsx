import { Button } from '@ui/components/button';
import { Action, PoweredByVyuh } from '@vyuh/react-core';
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
    <div className="container mx-auto max-w-5xl p-4">
      {(title || actions?.length) && (
        <h1 className="mb-16 flex items-center justify-between rounded border border-neutral-200 px-4 py-2 text-neutral-800 shadow-lg">
          {title && (
            <span className={'inline-block text-xl font-bold md:text-3xl'}>
              {title}
            </span>
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

      <div className={'flex justify-center'}>
        <PoweredByVyuh className={'bg-neutral-200'} />
      </div>
    </div>
  );
};
