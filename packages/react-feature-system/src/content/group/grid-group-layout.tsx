import { Group } from '@/content/group/group';
import { cn } from '@ui/lib/utils';
import { LayoutConfiguration, useVyuh } from '@vyuh/react-core';
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
  static readonly schemaName = `${Group.schemaName}.layout.grid`;

  readonly columns: number;
  readonly aspectRatio: number;
  readonly scrollable: boolean;

  constructor() {
    super({
      schemaType: GridGroupLayout.schemaName,
      title: 'Grid Group Layout',
    });

    this.columns = 3;
    this.aspectRatio = 1;
    this.scrollable = false;
  }

  /**
   * Render the group content as a responsive grid using Tailwind CSS
   */
  render(content: Group, layout: GridGroupLayout): React.ReactNode {
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

        {/* Grid Layout */}
        <div
          className={cn(
            'grid grid-cols-1 gap-4',
            {
              'sm:grid-cols-2': layout.columns === 2,
            },
            {
              'sm:grid-cols-3': layout.columns === 3,
            },
            {
              'sm:grid-cols-4': layout.columns === 4,
            },
          )}
        >
          {content.items.map((item, index) => (
            <div key={index} className="p-1">
              {plugins.content.render(item)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
