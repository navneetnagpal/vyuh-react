import { Bento as BentoContent } from '@/content/bento/bento';
import { DefaultBentoLayout } from '@/content/bento/default-bento-layout';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { BentoHeader } from './BentoHeader';
import { BentoGrid } from './BentoGrid';

interface BentoProps {
  content: BentoContent;
  layout: DefaultBentoLayout;
  className?: string;
}

export const Bento: React.FC<BentoProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'three-column';
  const darkMode = layout.darkMode || false;
  const gap = layout.gap || 'medium';

  // Background color classes based on dark mode
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  // Gap classes based on the gap size
  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
  }[gap];

  return (
    <section className={cn('px-6 py-12', backgroundClasses, className)}>
      <div className="container mx-auto">
        {/* Section header */}
        <BentoHeader
          content={content}
          darkMode={darkMode}
          className="mb-10"
        />

        {/* Bento grid */}
        <BentoGrid
          items={content.items}
          variant={variant}
          darkMode={darkMode}
          gapClasses={gapClasses}
        />
      </div>
    </section>
  );
};
