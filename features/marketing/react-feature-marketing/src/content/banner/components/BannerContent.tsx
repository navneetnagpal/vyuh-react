import React from 'react';

interface BannerContentProps {
  text: string;
  className?: string;
}

export const BannerContent: React.FC<BannerContentProps> = ({
  text,
  className,
}) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};
