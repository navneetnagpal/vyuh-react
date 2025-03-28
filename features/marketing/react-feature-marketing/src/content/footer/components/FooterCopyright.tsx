import { cn } from '@/shared/utils';
import React from 'react';

interface FooterCopyrightProps {
  copyright: string;
  textClasses: string;
  className?: string;
}

export const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  copyright,
  textClasses,
  className,
}) => {
  if (!copyright) {
    return null;
  }

  return (
    <div className={cn('text-sm', textClasses, className)}>{copyright}</div>
  );
};
