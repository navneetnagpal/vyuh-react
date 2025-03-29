import { DefaultHeaderLayout } from '@/content/header/default-header-layout';
import { Header as HeaderItem } from '@/content/header/header';
import { Container } from '@/shared/components/Container';
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
  const darkMode = layout.darkMode || false;
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
    <Section
      as="header"
      darkMode={darkMode}
      className={cn('py-4', sticky && 'sticky top-0 z-50', className)}
      padding="none"
      constrained={false}
    >
      <Container padding="lg">{renderHeaderContent()}</Container>
    </Section>
  );
};
