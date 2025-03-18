import {
  ContentItem,
  ContentModifierConfiguration,
  LayoutConfiguration,
} from '@vyuh/react';

/**
 * Portable Text content item for rendering rich text content
 */
export class PortableText extends ContentItem {
  static readonly schemaName: string = 'vyuh.portableText';

  readonly blocks: any[];

  constructor(data: {
    blocks: any[];
    layout?: LayoutConfiguration;
    modifiers?: ContentModifierConfiguration[];
  }) {
    super({
      schemaType: PortableText.schemaName,
      layout: data.layout,
      modifiers: data.modifiers,
    });

    this.blocks = data.blocks || [];
  }
}
