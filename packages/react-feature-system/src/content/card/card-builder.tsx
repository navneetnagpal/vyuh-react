import { LayoutConfiguration, useVyuh } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import React from 'react';
import { Card, CARD_SCHEMA_TYPE } from '@/content/card/card';
import { Button } from '@ui/components/button';
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ui/components/card';

/**
 * Content builder for Card content items
 */
export class CardContentBuilder extends ContentBuilder<Card> {
  constructor() {
    super({
      schemaType: CARD_SCHEMA_TYPE,
      defaultLayout: new DefaultCardLayout(),
    });
  }
}

/**
 * Default layout for card content items using Shadcn UI components
 *
 * Features:
 * - Responsive design
 * - Support for title, description, and image
 * - Action handling
 * - Themed presentation
 */
class DefaultCardLayout extends LayoutConfiguration<Card> {
  static readonly schemaName = `${CARD_SCHEMA_TYPE}.layout.default`;

  constructor() {
    super({
      schemaType: DefaultCardLayout.schemaName,
      title: 'Default Card Layout',
    });
  }

  /**
   * Render the card content with Shadcn styling
   */
  render(content: Card): React.ReactNode {
    const { plugins } = useVyuh();

    // Get image URL from either direct URL or ImageReference
    let imageUrl = content.imageUrl;
    if (!imageUrl && content.image) {
      imageUrl = plugins.content.provider.image(content.image);
    }

    // Determine if we have an image to show
    const hasImage = !!imageUrl;

    return (
      <ShadcnCard className="border-neutral-300">
        <CardHeader>
          {hasImage && (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={imageUrl}
                alt={content.title || 'Card image'}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {content.title && <CardTitle>{content.title}</CardTitle>}
          {content.description && (
            <CardDescription>{content.description}</CardDescription>
          )}
        </CardHeader>

        {content.content && (
          <CardContent>{plugins.content.render(content.content)}</CardContent>
        )}

        {(content.action ||
          content.secondaryAction ||
          content.tertiaryAction) && (
          <CardFooter className="flex flex-wrap gap-2">
            {content.action && (
              <Button
                onClick={() =>
                  content.action.execute && content.action.execute()
                }
                variant="default"
              >
                {content.action.title || 'Primary'}
              </Button>
            )}

            {content.secondaryAction && (
              <Button
                onClick={() =>
                  content.secondaryAction.execute &&
                  content.secondaryAction.execute()
                }
                variant="outline"
              >
                {content.secondaryAction.label || 'Secondary'}
              </Button>
            )}

            {content.tertiaryAction && (
              <Button
                onClick={() =>
                  content.tertiaryAction.execute &&
                  content.tertiaryAction.execute()
                }
                variant="link"
              >
                {content.tertiaryAction.label || 'Tertiary'}
              </Button>
            )}
          </CardFooter>
        )}
      </ShadcnCard>
    );
  }
}
