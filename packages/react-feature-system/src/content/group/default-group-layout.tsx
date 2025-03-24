import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

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
    return <GroupView content={content} />;
  }
}

/**
 * Functional component for rendering group content
 */
const GroupView: React.FC<{ content: Group }> = ({ content }) => {
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
            <p className="text-muted-foreground text-sm">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Items */}
      <div className="grid snap-x grid-flow-col grid-cols-none gap-4 overflow-x-auto pb-4">
        {content.items.map((item, index) => (
          <div key={index} className="w-80 snap-start">
            {plugins.content.render(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
