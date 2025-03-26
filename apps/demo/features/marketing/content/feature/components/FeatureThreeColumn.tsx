import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import { FeatureActions, FeatureDescription, FeatureTitle } from './FeatureUtils';

/**
 * Feature section with three columns and small icons
 */
export const FeatureThreeColumn: React.FC<FeatureComponentProps> = ({ content, layout }) => {
  const { title, description, features, actions } = content;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <FeatureTitle title={title} className="text-center" />
          <FeatureDescription description={description} className="text-center" />
        </div>
        
        {features && features.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  {feature.icon && (
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <span className="h-6 w-6 text-white">{feature.icon}</span>
                    </div>
                  )}
                  <dt className="text-base font-semibold leading-7 text-gray-900">{feature.title}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
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
