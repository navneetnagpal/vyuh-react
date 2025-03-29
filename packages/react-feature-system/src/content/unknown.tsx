import { LayoutConfiguration, TypeDescriptor, Unknown, UNKNOWN_SCHEMA_TYPE } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import { TriangleAlert } from 'lucide-react';
import React from 'react';

/**
 * Default layout for unknown content that displays an error message.
 *
 * Features:
 * - Visual error indicator
 * - Display of missing schema type
 * - Description of the issue
 * - Themed error presentation
 */
class DefaultUnknownLayout extends LayoutConfiguration<Unknown> {
  static readonly schemaName = `${UNKNOWN_SCHEMA_TYPE}.layout.default`;
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultUnknownLayout.schemaName,
      title: 'Default Unknown Layout',
    });
  }

  /**
   * Render the unknown content with an error message
   */
  render(content: Unknown): React.ReactNode {
    return (
      <div className="vfs:bg-red-100 vfs:p-3 vfs:rounded vfs:border vfs:border-red-300 vfs:text-red-800 vfs:my-2">
        <div className="vfs:flex vfs:items-center vfs:mb-2">
          <TriangleAlert className="vfs:mr-2" />
          <h3 className="vfs:m-0 vfs:text-base vfs:font-semibold">Missing Content Type</h3>
        </div>
        <div className="vfs:font-bold vfs:font-mono vfs:mb-1">
          {content.missingSchemaType}
        </div>
        <div className="vfs:text-sm">{content.description}</div>
      </div>
    );
  }
}

/**
 * Builder for unknown content that provides a visual indicator for missing content types.
 */
export class UnknownContentBuilder extends ContentBuilder {
  constructor() {
    super({
      schemaType: UNKNOWN_SCHEMA_TYPE,
      defaultLayout: new DefaultUnknownLayout(),
      defaultLayoutDescriptor: DefaultUnknownLayout.typeDescriptor,
    });
  }
}
