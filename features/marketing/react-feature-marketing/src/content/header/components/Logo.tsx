import { Header } from '@/content/header/header';
import { cn } from '@/shared/utils';
import { useVyuh } from '@vyuh/react-core';
import React from 'react';

interface LogoProps {
  content: Pick<Header, 'logo' | 'logoText'>;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ content, className }) => {
  const { plugins } = useVyuh();

  // Ensure content is defined
  if (!content) {
    return null;
  }

  return (
    <div className={cn('flex items-center', className)}>
      <a
        href="/"
        className="btn btn-ghost px-2 text-base normal-case md:text-lg"
      >
        {content.logo && (
          <img
            src={plugins.content.provider.image(content.logo, {
              width: 48,
              height: 48,
            })}
            alt={content.logoText || 'Logo'}
            className="mr-2 h-[24px] w-auto md:h-[32px]"
          />
        )}
        {content.logoText && <span>{content.logoText}</span>}
      </a>
    </div>
  );
};
