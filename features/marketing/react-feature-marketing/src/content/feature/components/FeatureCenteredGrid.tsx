import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureTitle,
} from './FeatureUtils';

/**
 * Feature section with centered 2x2 grid
 */
export const FeatureCenteredGrid: React.FC<FeatureComponentProps> = ({
  content,
  layout,
}) => {
  const { title, description, features, actions } = content;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <FeatureTitle title={title} className="text-center" />
          <FeatureDescription
            description={description}
            className="text-center"
          />
        </div>

        {features && features.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <FeatureItem
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  key={index}
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
