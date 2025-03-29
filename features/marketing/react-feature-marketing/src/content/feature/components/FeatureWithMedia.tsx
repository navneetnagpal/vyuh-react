import { Container } from '@/shared/components/Container';
import { Section } from '@/shared/components/Section';
import React from 'react';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureMedia,
  FeatureTitle,
} from './FeatureUtils';

type MediaPosition = 'left' | 'right';

interface FeatureWithMediaProps extends FeatureComponentProps {
  mediaPosition?: MediaPosition;
}

/**
 * Feature section with media content on either left or right side
 */
export const FeatureWithMedia: React.FC<FeatureWithMediaProps> = ({
  content,
  layout,
  mediaPosition = 'right',
}) => {
  const { title, description, features, media, actions } = content;

  // Determine order classes based on media position
  const contentOrderClass = mediaPosition === 'left' ? 'order-2' : 'order-1';
  const mediaOrderClass = mediaPosition === 'left' ? 'order-1' : 'order-2';

  return (
    <Section className="overflow-hidden">
      <Container padding="lg">
        <div className="grid grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div
            className={`lg:pt-4 ${contentOrderClass} ${mediaPosition === 'left' ? 'lg:pl-8' : 'lg:pr-8'}`}
          >
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

          <div className={mediaOrderClass}>
            <FeatureMedia
              media={media}
              className={`max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0`}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
