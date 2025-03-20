import { Divider } from '@/content/divider/divider';
import { LayoutConfiguration } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import React from 'react';

/**
 * Content builder for Divider content items
 */
export class DividerContentBuilder extends ContentBuilder<Divider> {
  static readonly schemaName: string = Divider.schemaName;

  constructor() {
    super({
      schemaType: DividerContentBuilder.schemaName,
      defaultLayout: new DefaultDividerLayout(),
    });
  }
}

/**
 * Default layout for divider content items
 *
 * Features:
 * - Configurable thickness
 * - Customizable indentation
 */
class DefaultDividerLayout extends LayoutConfiguration<Divider> {
  static readonly schemaName = `${Divider.schemaName}.layout.default`;

  constructor() {
    super({
      schemaType: DefaultDividerLayout.schemaName,
      title: 'Default Divider Layout',
    });
  }

  /**
   * Render the divider content with the specified properties
   */
  render(content: Divider): React.ReactNode {
    const style: React.CSSProperties = {
      height: content.thickness ?? 1,
      marginLeft: content.indent ?? 0,
      marginRight: content.indent ?? 0,
      width: 'auto',
    };

    return (
      <div
        className="bg-neutral-300"
        style={style}
        role="separator"
        aria-orientation="horizontal"
      />
    );
  }
}
