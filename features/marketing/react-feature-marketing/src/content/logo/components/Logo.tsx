import { DefaultLogoLayout } from '@/content/logo/default-logo-layout';
import { Logo as LogoContent } from '@/content/logo/logo';
import { Container } from '@/shared/components/Container';
import { Section } from '@/shared/components/Section';
import React from 'react';
import { LogoGrid } from './LogoGrid';
import { LogoHeader } from './LogoHeader';

interface LogoProps {
  content: LogoContent;
  layout: DefaultLogoLayout;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ content, layout, className }) => {
  const variant = layout.variant || 'simple-grid';
  const darkMode = layout.darkMode || false;
  const columns = layout.columns || 4;

  return (
    <Section darkMode={darkMode} className={className} padding="lg">
      <Container padding="lg">
        {/* Section title */}
        <LogoHeader title={content.title} className="mb-8" />

        {/* Logo grid or carousel */}
        <LogoGrid
          items={content.items}
          variant={variant}
          darkMode={darkMode}
          columns={columns}
        />
      </Container>
    </Section>
  );
};
