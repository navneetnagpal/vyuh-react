import { Newsletter } from '@/content/newsletter/newsletter';
import { ContentHeader } from '@/shared/components';
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
    <ContentHeader
      title={content.title}
      subtitle={content.subtitle}
      className={className}
      centered={centered}
    />
  );
};
