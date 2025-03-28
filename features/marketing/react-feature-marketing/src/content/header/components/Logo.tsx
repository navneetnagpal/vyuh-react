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
  
  return (
    <div className={cn("flex items-center", className)}>
      {content.logo && (
        <img
          src={plugins.content.provider.image(content.logo, {
            width: 200,
            height: 50,
          })}
          alt={content.logoText || 'Logo'}
          className="h-8 w-auto"
        />
      )}
      {content.logoText && (
        <span
          className={cn('ml-2 text-lg font-semibold', {
            'ml-0': !content.logo,
          })}
        >
          {content.logoText}
        </span>
      )}
    </div>
  );
};
