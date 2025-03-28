import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureTitle,
} from './FeatureUtils';

/**
 * Feature section with three columns and small icons
 */
export const FeatureThreeColumn: React.FC<FeatureComponentProps> = ({
  content,
  layout,
}) => {
  const { title, description, features, actions } = content;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <FeatureTitle title={title} className="text-center" />
          <FeatureDescription
            description={description}
            className="text-center"
          />
        </div>

        {features && features.length > 0 && (
          <div className="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
            <dl className="grid grid-cols-1 gap-16 lg:grid-cols-3">
              {features.map((feature, index) => (
                <FeatureItem
                  title={feature.title}
                  key={index}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </dl>
          </div>
        )}

        <div className="mt-10 flex items-center justify-center">
          <FeatureActions actions={actions} />
        </div>
      </div>
    </div>
  );
};
