import React from 'react';

interface BlogPostTagsProps {
  tags: string[];
}

export const BlogPostTags: React.FC<BlogPostTagsProps> = ({ tags }) => {
  return (
    <div className="border-base-300 mt-10 border-t pt-6">
      <h3 className="mb-2 text-lg font-semibold text-primary">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="badge badge-secondary transition-all duration-300 hover:scale-105 hover:shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
