import { Bento } from '@/content/bento/bento';
import { cn } from '@/content/shared/utils';
import React from 'react';

interface BentoHeaderProps {
  content: Pick<Bento, 'title' | 'subtitle'>;
  darkMode: boolean;
  className?: string;
}

export const BentoHeader: React.FC<BentoHeaderProps> = ({
  content,
  darkMode,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="mb-4 text-3xl font-bold">{content.title}</h2>
      {content.subtitle && (
        <p
          className={cn(
            'mx-auto max-w-2xl text-lg',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
