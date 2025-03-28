import React from 'react';
import { Section } from '@/shared/components/Section';
import { Container } from '@/shared/components/Container';
import { FeatureComponentProps } from './FeatureTypes';
import {
  FeatureActions,
  FeatureDescription,
  FeatureItem,
  FeatureMedia,
  FeatureTitle,
  useBackgroundStyles,
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
  const darkMode = layout.darkMode || false;
  const bgStyles = useBackgroundStyles(layout.background);

  // Determine order classes based on media position
  const contentOrderClass = mediaPosition === 'left' ? 'order-2' : 'order-1';
  const mediaOrderClass = mediaPosition === 'left' ? 'order-1' : 'order-2';

  return (
    <Section
      darkMode={darkMode}
      className="overflow-hidden"
      style={bgStyles}
    >
      <Container padding="lg">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:mx-0 lg:max-w-none">
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
            {media && media.type === 'code-example' && media.codeExample ? (
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
            ) : (
              <FeatureMedia
                media={media}
                className={`max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 md:-ml-4 lg:-ml-0`}
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
