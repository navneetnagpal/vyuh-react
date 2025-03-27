import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureMedia,
  FeatureTitle,
} from './FeatureUtils';

/**
 * Feature section with product screenshot on dark background
 */
export const FeatureWithScreenshotDark: React.FC<FeatureComponentProps> = ({
  content,
  layout,
}) => {
  const { title, description, features, media, actions } = content;

  return (
    <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 place-content-stretch gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <FeatureTitle title={title} className="text-white" />
              <FeatureDescription
                description={description}
                className="text-gray-300"
              />

              {features && features.length > 0 && (
                <div className="mt-10 max-w-xl space-y-8">
                  {features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      className="text-white"
                      dark={true}
                    />
                  ))}
                </div>
              )}

              <FeatureActions actions={actions} />
            </div>
          </div>

          <FeatureMedia
            media={media}
            className="max-w-none rounded-xl shadow-xl ring-1 ring-white/10 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
};
