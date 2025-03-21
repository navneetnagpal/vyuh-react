import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';
import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';

/**
 * Default layout for group content items
 *
 * Features:
 * - Simple vertical stack layout
 * - Support for title and description
 * - Minimal styling for maximum flexibility
 */
export class DefaultGroupLayout extends LayoutConfiguration<Group> {
  static readonly schemaName = `${GROUP_SCHEMA_TYPE}.layout.default`;

  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultGroupLayout.schemaName,
      title: 'Default Group Layout',
    });
  }

  /**
   * Render the group content as a simple vertical stack
   */
  render(content: Group): React.ReactNode {
    const { plugins } = useVyuh();

    return (
      <div className="w-full space-y-4">
        {/* Header */}
        {(content.title || content.description) && (
          <div className="mb-4">
            {content.title && (
              <h3 className="text-xl font-semibold">{content.title}</h3>
            )}
            {content.description && (
              <p className="text-sm text-muted-foreground">
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="grid grid-flow-col grid-cols-none gap-4 overflow-x-auto pb-4 snap-x">
          {content.items.map((item, index) => (
            <div key={index} className="w-80 snap-start">
              {plugins.content.render(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
