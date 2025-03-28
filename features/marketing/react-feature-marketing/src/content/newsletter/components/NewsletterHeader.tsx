import { Newsletter } from '@/content/newsletter/newsletter';
import { cn } from '@/content/shared/utils';
import React from 'react';

interface NewsletterHeaderProps {
  content: Newsletter;
  className?: string;
  centered?: boolean;
}

export const NewsletterHeader: React.FC<NewsletterHeaderProps> = ({
  content,
  className,
  centered = true,
}) => {
  return (
    <div className={cn(centered && 'text-center', className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h2>
      {content.subtitle && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{content.subtitle}</p>
      )}
    </div>
  );
};
