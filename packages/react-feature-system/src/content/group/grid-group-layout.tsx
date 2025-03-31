import { Group, GROUP_SCHEMA_TYPE } from '@/content/group/group';
import { cn } from '@ui/lib/utils';
import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';

/**
 * Grid layout for group content items using Tailwind CSS
 *
 * Features:
 * - Responsive grid display
 * - Support for title and description
 * - Configurable columns based on screen size
 */
export class GridGroupLayout extends LayoutConfiguration<Group> {
  static readonly schemaName = `${GROUP_SCHEMA_TYPE}.layout.grid`;

  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly columns: number;
  readonly aspectRatio: number;
  readonly scrollable: boolean;

  constructor(props?: Partial<GridGroupLayout>) {
    super({
      schemaType: GridGroupLayout.schemaName,
      title: 'Grid Group Layout',
    });

    this.columns = props?.columns ?? 2;
    this.aspectRatio = props?.aspectRatio ?? 1;
    this.scrollable = props?.scrollable ?? false;
  }

  /**
   * Render the group content as a responsive grid using Tailwind CSS
   */
  render(content: Group): React.ReactNode {
    return <GridGroupView content={content} columns={this.columns} />;
  }
}

/**
 * Props for the GridGroupView component
 */
interface GridGroupViewProps {
  content: Group;
  columns: number;
}

/**
 * Functional component for rendering grid group content
 */
const GridGroupView: React.FC<GridGroupViewProps> = ({ content, columns }) => {
  const { plugins } = useVyuh();

  return (
    <div className="vfs:w-full vfs:space-y-4">
      {/* Header */}
      {(content.title || content.description) && (
        <div className="vfs:mb-4">
          {content.title && (
            <h3 className="vfs:text-xl vfs:font-semibold">{content.title}</h3>
          )}
          {content.description && (
            <p className="vfs:text-muted-foreground vfs:text-sm">
              {content.description}
            </p>
          )}
        </div>
      )}

      {/* Grid Layout */}
      <div
        className={cn(
          'vfs:grid vfs:grid-cols-1 vfs:gap-4',
          {
            'vfs:sm:grid-cols-2': columns === 2,
          },
          {
            'vfs:sm:grid-cols-3': columns === 3,
          },
          {
            'vfs:sm:grid-cols-4': columns === 4,
          },
        )}
      >
        {content.items.map((item, index) => (
          <div key={index} className="vfs:p-1">
            {plugins.content.render(item)}
          </div>
        ))}
      </div>
    </div>
  );
};
