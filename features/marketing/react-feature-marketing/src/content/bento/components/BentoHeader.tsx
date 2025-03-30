import { Bento } from '@/content/bento/bento';
import { cn } from '@/shared/utils';
import React from 'react';

interface BentoHeaderProps {
  content: Pick<Bento, 'title' | 'subtitle'>;
  className?: string;
}

export const BentoHeader: React.FC<BentoHeaderProps> = ({
  content,
  className,
}) => {
  return (
    <div className={cn('text-center', className)}>
      <h2 className="mb-4 text-3xl font-bold text-base-content">{content.title}</h2>
      {content.subtitle && (
        <p
          className={cn(
            'mx-auto max-w-2xl text-lg',
            'text-base-content/70',
          )}
        >
          {content.subtitle}
        </p>
      )}
    </div>
  );
};
