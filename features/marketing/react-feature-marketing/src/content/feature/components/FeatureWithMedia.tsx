import { Section } from '@/shared/components/Section';
import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import { FeatureActions, FeatureDescription, FeatureItem, FeatureMedia, FeatureTitle } from './FeatureUtils';

/**
 * Feature section with product screenshot
 */
export const FeatureWithMedia: React.FC<FeatureComponentProps> = ({
  content,
  layout,
}) => {
  // Ensure content is defined
  if (!content) {
    return null;
  }

  const { title, description, features, media, actions } = content;

  return (
    <Section>
      <div className="grid grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            <FeatureTitle title={title} />
            <FeatureDescription description={description} />

            {features && features.length > 0 && (
              <div className="mt-10 max-w-xl space-y-8">
                {features.map((feature, index) => (
                  feature && <FeatureItem
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

        <FeatureMedia
          media={media}
          className="max-w-none rounded-xl shadow-xl md:-ml-4 lg:-ml-0"
        />
      </div>
    </Section>
  );
};
