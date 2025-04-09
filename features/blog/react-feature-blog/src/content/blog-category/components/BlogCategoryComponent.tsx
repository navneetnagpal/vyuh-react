import { BlogCategory } from '../blog-category';
import { DefaultBlogCategoryLayout } from '../default-blog-category-layout';
import { useMediaUtils } from '@/shared/MediaUtils';
import { cn } from '@/shared/utils';
import React from 'react';

interface BlogCategoryComponentProps {
  content: BlogCategory;
  layout: DefaultBlogCategoryLayout;
  className?: string;
}

export const BlogCategoryComponent: React.FC<BlogCategoryComponentProps> = ({
  content,
  layout,
  className,
}) => {
  const { getImageUrl } = useMediaUtils();
  const variant = layout.variant || 'standard';

  // Determine if we're using the badge variant
  const isBadgeVariant = variant === 'badge';
  const isCompactVariant = variant === 'compact';

  // Get category color or use default
  const categoryColor = content.color || '#6366f1'; // Default to indigo

  if (isBadgeVariant) {
    return (
      <span
        className={cn(
          'badge',
          content.featured ? 'badge-primary' : 'badge-outline',
          className
        )}
        style={content.color ? { backgroundColor: content.color, color: '#fff' } : undefined}
      >
        {content.title}
      </span>
    );
  }

  return (
    <div
      className={cn(
        'flex',
        isCompactVariant ? 'items-center' : 'flex-col',
        content.featured && 'border-l-2 pl-3',
        className
      )}
      style={content.featured && content.color ? { borderColor: categoryColor } : undefined}
    >
      {/* Icon */}
      {layout.showIcon && content.icon && (
        <div className={cn(
          'flex items-center justify-center',
          isCompactVariant ? 'mr-3' : 'mb-3'
        )}>
          <div
            className="h-10 w-10 rounded-full p-2"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <img
              src={getImageUrl(content.icon)}
              alt={content.title}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Category Info */}
      <div>
        <h3
          className={cn(
            'font-semibold',
            isCompactVariant ? 'text-base' : 'text-lg'
          )}
          style={content.color ? { color: categoryColor } : undefined}
        >
          {content.title}
        </h3>

        {layout.showDescription && content.description && (
          <p className="text-base-content/70 text-sm">
            {content.description}
          </p>
        )}
      </div>
    </div>
  );
};
