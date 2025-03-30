import { Header } from '@/content/header/header';
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';

// Desktop Navigation Component
interface DesktopNavigationProps {
  navigationItems?: Header['navigationItems'];
  actions?: Header['actions'];
  showThemeSwitch?: boolean;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navigationItems,
  actions,
  showThemeSwitch = true,
}) => {
  return (
    <>
      <div className="navbar-center hidden lg:flex ml-6">
        <Navigation items={navigationItems} className="px-2" />
      </div>
      <div className="navbar-end hidden lg:flex items-center ml-6">
        <ActionButtons actions={actions} />
        {showThemeSwitch && <ThemeToggle className="ml-2" />}
      </div>
    </>
  );
};
