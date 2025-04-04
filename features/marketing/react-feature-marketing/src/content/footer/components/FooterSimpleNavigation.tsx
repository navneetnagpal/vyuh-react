import { Footer } from '@/content/footer/footer';
import { cn } from '@/shared/utils';
import { executeAction } from '@vyuh/react-core';
import React from 'react';

interface FooterSimpleNavigationProps {
  navigationGroups: NonNullable<Footer['navigationGroups']>;
  linkClasses: string;
  className?: string;
}

export const FooterSimpleNavigation: React.FC<FooterSimpleNavigationProps> = ({
  navigationGroups,
  linkClasses,
  className,
}) => {
  if (
    navigationGroups.length === 0 ||
    (navigationGroups[0].links || []).length === 0
  ) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap justify-center gap-6', className)}>
      {navigationGroups[0].links!.map((link, index) => (
        <button
          key={index}
          className={cn('text-sm', linkClasses)}
          onClick={() => executeAction(link.action)}
        >
          {link.action && link.action.title && link.action.title}
        </button>
      ))}
    </div>
  );
};
