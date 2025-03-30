import { Header } from '@/content/header/header';
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { Navigation } from './Navigation';

// Desktop Navigation Component
interface DesktopNavigationProps {
  navigationItems?: Header['navigationItems'];
  actions?: Header['actions'];
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navigationItems,
  actions,
}) => {
  return (
    <>
      <div className="navbar-center hidden lg:flex">
        <Navigation items={navigationItems} className="px-1" />
      </div>
      <div className="navbar-end hidden lg:flex">
        <ActionButtons actions={actions} />
      </div>
    </>
  );
};
