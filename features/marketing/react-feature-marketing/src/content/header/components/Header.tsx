import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { Header as HeaderItem } from '@/content/header/header';
import { Section } from '@/shared/components/Section';
import { cn } from '@/shared/utils';
import React from 'react';
import { ActionButtons } from './ActionButtons';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

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
  const sticky = layout.sticky || false;

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
              <Navigation items={content.navigationItems} />
              <ActionButtons actions={content.actions} />
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
    <Section className={cn(sticky && 'sticky top-0 z-50', className)}>
      {renderHeaderContent()}
    </Section>
  );
};
