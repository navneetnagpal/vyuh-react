import {
  ContentItem,
  ContentModifierConfiguration,
  LayoutConfiguration,
} from '@vyuh/react-core';

/**
 * Divider content item
 *
 * A visual separator that can be used between content sections
 * with configurable thickness and indentation.
 */
export class Divider extends ContentItem {
  static readonly schemaName = 'vyuh.divider';

  /**
   * The thickness of the divider in pixels
   */
  readonly thickness: number;

  /**
   * Indent from the edges (in pixels or CSS units)
   */
  readonly indent?: string | number;

  /**
   * Creates a new divider content item
   */
  constructor(props?: Partial<Divider>) {
    super({
      schemaType: Divider.schemaName,
      layout: props?.layout,
      modifiers: props?.modifiers,
    });

    this.thickness = props?.thickness ?? 1;
    this.indent = props?.indent;
  }
}
