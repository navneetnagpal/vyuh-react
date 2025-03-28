import { Header as HeaderItem } from '@/content/header/header';
import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { cn } from '@/shared/utils';
import { Action, useVyuh } from '@vyuh/react-core';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ActionButtons } from './ActionButtons';

interface HeaderProps {
  content: HeaderItem;
  layout: DefaultHeaderLayout;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple';
  const darkMode = layout.darkMode || false;
  const sticky = layout.sticky || false;

  // Background color classes based on dark mode

  // Render the header content based on the variant
  const renderHeaderContent = () => {
    switch (variant) {
      case 'simple':
        return (
          <div className="flex items-center justify-between">
            <Logo content={content} />
          </div>
        );

      case 'with-navigation':
        return (
          <div className="flex items-center justify-between">
            <Logo content={content} />
            <div className="hidden items-center space-x-6 md:flex">
              <Navigation items={content.navigationItems} darkMode={darkMode} />
              <ActionButtons actions={content.actions} darkMode={darkMode} />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-between">
            <Logo content={content} />
          </div>
        );
    }
  };

  return (
    <header
      data-theme={darkMode ? 'dark' : 'light'}
      className={cn('navbar', sticky && 'sticky top-0 z-50', className)}
    >
      <div className="container mx-auto">{renderHeaderContent()}</div>
    </header>
  );
};
