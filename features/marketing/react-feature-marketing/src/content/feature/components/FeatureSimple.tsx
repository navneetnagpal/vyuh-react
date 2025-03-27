import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureTitle,
} from './FeatureUtils';

/**
 * Simple feature section
 */
export const FeatureSimple: React.FC<FeatureComponentProps> = ({
  content,
  layout,
}) => {
  const { title, description, features, actions } = content;

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center bg-white py-24 sm:py-32">
      <div className="mx-auto">
        <FeatureTitle title={title} />
        <FeatureDescription description={description} />

        {features && features.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <dl className="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-16">
              {features.map((feature, index) => (
                <FeatureItem
                  title={feature.title}
                  description={feature.description}
                  key={index}
                  icon={feature.icon}
                />
              ))}
            </dl>
          </div>
        )}

        <FeatureActions actions={actions} />
      </div>
    </div>
  );
};
