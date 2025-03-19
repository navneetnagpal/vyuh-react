import { LayoutConfiguration, Unknown } from '@vyuh/react-core';
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
  static readonly schemaName = `${Unknown.schemaName}.layout.default`;

  constructor() {
    super({
      schemaType: DefaultUnknownLayout.schemaName,
      contentType: Unknown.schemaName,
      title: 'Default Unknown Layout',
    });
  }

  /**
   * Render the unknown content with an error message
   */
  render(content: Unknown): React.ReactNode {
    return (
      <div className="bg-red-100 p-3 rounded border border-red-300 text-red-800 my-2">
        <div className="flex items-center mb-2">
          <TriangleAlert className="mr-2" />
          <h3 className="m-0 text-base font-semibold">Missing Content Type</h3>
        </div>
        <div className="font-bold font-mono mb-1">
          {content.missingSchemaType}
        </div>
        <div className="text-sm">{content.description}</div>
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
      schemaType: Unknown.schemaName,
      defaultLayout: new DefaultUnknownLayout(),
    });
  }
}
