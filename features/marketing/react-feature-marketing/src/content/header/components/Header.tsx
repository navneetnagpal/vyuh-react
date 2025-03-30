import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { Header as HeaderItem } from '@/content/header/header';
import { cn } from '@/shared/utils';
import React from 'react';
import { DesktopNavigation } from './DesktopNavigation';
import { Logo } from './Logo';
import { MobileMenu, MobileMenuButton } from './MobileMenu';

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
  const showThemeSwitch = layout.showThemeSwitch ?? true; // Default to true if not specified
  const mobileMenuId = 'mobile-menu-drawer';

  return (
    <header className={cn('drawer', className)}>
      <input id={mobileMenuId} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="container mx-auto px-4">
          <div className="navbar bg-base-100 px-0">
            {/* Logo section - always visible */}
            <div className="navbar-start">
              <Logo content={content} className="navbar-item" />
            </div>

            {variant === 'with-navigation' && (
              <>
                {/* Mobile menu button */}
                <div className="navbar-end lg:hidden">
                  <MobileMenuButton id={mobileMenuId} />
                </div>

                {/* Desktop navigation and actions */}
                <DesktopNavigation
                  navigationItems={content.navigationItems}
                  actions={content.actions}
                  showThemeSwitch={showThemeSwitch}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        id={mobileMenuId}
        navigationItems={content.navigationItems}
        actions={content.actions}
        showThemeSwitch={showThemeSwitch}
      />
    </header>
  );
};
