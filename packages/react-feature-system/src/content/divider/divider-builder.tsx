import { Divider, DIVIDER_SCHEMA_TYPE } from '@/content/divider/divider';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import React from 'react';

/**
 * Content builder for Divider content items
 */
export class DividerContentBuilder extends ContentBuilder<Divider> {
  constructor() {
    super({
      schemaType: DIVIDER_SCHEMA_TYPE,
      defaultLayout: new DefaultDividerLayout(),
      defaultLayoutDescriptor: DefaultDividerLayout.typeDescriptor,
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
  static readonly schemaName = `${DIVIDER_SCHEMA_TYPE}.layout.default`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

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
    return <DividerView content={content} />;
  }
}

/**
 * Functional component for rendering divider content
 */
const DividerView: React.FC<{ content: Divider }> = ({ content }) => {
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
};
