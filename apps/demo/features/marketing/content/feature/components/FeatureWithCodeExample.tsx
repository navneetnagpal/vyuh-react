import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import { FeatureActions, FeatureDescription, FeatureItem, FeatureTitle } from './FeatureUtils';

/**
 * Feature section with code example panel
 */
export const FeatureWithCodeExample: React.FC<FeatureComponentProps> = ({ content, layout }) => {
  const { title, description, features, media, actions } = content;

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <FeatureTitle title={title} />
              <FeatureDescription description={description} />
              
              {features && features.length > 0 && (
                <div className="mt-10 max-w-xl space-y-8">
                  {features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                    />
                  ))}
                </div>
              )}
              
              <FeatureActions actions={actions} />
            </div>
          </div>
          
          {media && media.type === 'code-example' && media.codeExample && (
            <div className="w-full overflow-hidden rounded-xl bg-gray-900 shadow-xl ring-1 ring-inset ring-white/10">
              <div className="flex bg-gray-800/40 px-4 py-2">
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                  <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                </div>
              </div>
              <div className="px-6 py-6">
                <pre className="text-sm text-gray-300">
                  <code>{media.codeExample.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
