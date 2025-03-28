import { Footer } from '@/content/footer/footer';
import { cn } from '@/content/shared/utils';
import { Action } from '@vyuh/react-core';
import React from 'react';

interface FooterSocialLinksProps {
  socialLinks: NonNullable<Footer['socialLinks']>;
  linkClasses: string;
  className?: string;
}

export const FooterSocialLinks: React.FC<FooterSocialLinksProps> = ({
  socialLinks,
  linkClasses,
  className,
}) => {
  if (socialLinks.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex space-x-6', className)}>
      {socialLinks.map((link, index) => (
        <button
          key={index}
          className={linkClasses}
          onClick={() => new Action(link.action).execute()}
          aria-label={link.action.title}
        >
          {/* This would be replaced with your icon component */}
          <span className="text-xl">{link.icon}</span>
        </button>
      ))}
    </div>
  );
};
