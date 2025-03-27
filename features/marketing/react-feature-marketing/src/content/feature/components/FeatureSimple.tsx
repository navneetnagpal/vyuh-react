import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <FeatureTitle title={title} />
          <FeatureDescription description={description} />

          {features && features.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <dl className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature, index) => (
                  <div key={index} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-sm text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <FeatureActions actions={actions} />
        </div>
      </div>
    </div>
  );
};
