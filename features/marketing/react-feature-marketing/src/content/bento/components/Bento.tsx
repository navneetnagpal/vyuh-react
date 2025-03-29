import { Bento as BentoContent } from '@/content/bento/bento';
import { DefaultBentoLayout } from '@/content/bento/default-bento-layout';
import { cn } from '@/shared/utils';
import React from 'react';
import { BentoGrid } from './BentoGrid';
import { BentoHeader } from './BentoHeader';

interface BentoProps {
  content: BentoContent;
  layout: DefaultBentoLayout;
  className?: string;
}

export const Bento: React.FC<BentoProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'three-column';
  const gap = layout.gap || 'small';

  // Background color classes
  const backgroundClasses = 'bg-white text-gray-900';

  // Gap classes based on the gap size
  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-16',
    large: 'gap-16',
  }[gap];

  return (
    <section className={cn('px-6 py-12', backgroundClasses, className)}>
      <div className="container mx-auto">
        {/* Section header */}
        <BentoHeader content={content} className="mb-10" />

        {/* Bento grid */}
        <BentoGrid
          items={content.items}
          variant={variant}

          gapClasses={gapClasses}
        />
      </div>
    </section>
  );
};
