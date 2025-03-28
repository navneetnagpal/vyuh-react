import { Logo as LogoContent } from '@/content/logo/logo';
import { DefaultLogoLayout } from '@/content/logo/default-logo-layout';
import { cn } from '@/content/shared/utils';
import React from 'react';
import { LogoHeader } from './LogoHeader';
import { LogoGrid } from './LogoGrid';

interface LogoProps {
  content: LogoContent;
  layout: DefaultLogoLayout;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  content,
  layout,
  className,
}) => {
  const variant = layout.variant || 'simple-grid';
  const darkMode = layout.darkMode || false;
  const columns = layout.columns || 4;

  // Background color classes based on dark mode
  const backgroundClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  return (
    <section
      className={cn(
        'px-6 py-12',
        backgroundClasses,
        className
      )}
    >
      <div className="container mx-auto">
        {/* Section title */}
        <LogoHeader
          title={content.title}
          className="mb-8"
        />

        {/* Logo grid or carousel */}
        <LogoGrid
          items={content.items}
          variant={variant}
          darkMode={darkMode}
          columns={columns}
        />
      </div>
    </section>
  );
};
