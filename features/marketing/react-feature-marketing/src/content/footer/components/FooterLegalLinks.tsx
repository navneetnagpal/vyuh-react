import { Footer } from '@/content/footer/footer';
import { cn } from '@/shared/utils';
import { executeAction } from '@vyuh/react-core';
import React from 'react';

interface FooterLegalLinksProps {
  legalLinks: NonNullable<Footer['legalLinks']>;
  linkClasses: string;
  className?: string;
}

export const FooterLegalLinks: React.FC<FooterLegalLinksProps> = ({
  legalLinks,
  linkClasses,
  className,
}) => {
  if (legalLinks.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {legalLinks.map((link, index) => (
        <button
          key={index}
          className={cn('text-sm', linkClasses)}
          onClick={() => executeAction(link.action)}
        >
          {link.action.title}
        </button>
      ))}
    </div>
  );
};
