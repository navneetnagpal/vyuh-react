import { Button } from '@/ui/components/button';
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
    <div className="vfs:container vfs:mx-auto vfs:p-4">
      {(title || actions?.length) && (
        <h1 className="vfs:mb-16 vfs:flex vfs:items-center vfs:justify-between vfs:border-b vfs:border-neutral-200 vfs:py-2">
          {title && (
            <span className="vfs:inline-block vfs:bg-gradient-to-r vfs:from-purple-600 vfs:to-indigo-500 vfs:bg-clip-text vfs:text-xl vfs:font-bold vfs:text-transparent md:vfs:text-3xl">
              {title}
            </span>
          )}

          {actions?.length && (
            <div className="vfs:flex vfs:space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  disabled={!action.action}
                  variant={'outline'}
                  size={'icon'}
                  onClick={() => {
                    new Action(action.action).execute();
                  }}
                  className={'vfs:cursor-pointer'}
                >
                  {iconMap[action.icon] || iconMap.fallback}
                </Button>
              ))}
            </div>
          )}
        </h1>
      )}

      <main>{children}</main>

      <div className={'vfs:flex vfs:justify-center'}>
        <PoweredByVyuh className={'vfs:bg-neutral-200'} />
      </div>
    </div>
  );
};
