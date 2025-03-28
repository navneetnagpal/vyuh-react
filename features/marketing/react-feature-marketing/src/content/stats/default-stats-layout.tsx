import {
  Stats as StatsContent,
  STATS_SCHEMA_TYPE,
} from '@/content/stats/stats';
import { Stats } from '@/content/stats/components/Stats';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Stats layout variant type
 */
export type StatsVariant =
  | 'simple'
  | 'with-description'
  | 'grid-with-heading'
  | 'with-image'
  | 'card-grid';

/**
 * Default layout for stats content items
 */
export class DefaultStatsLayout extends LayoutConfiguration<StatsContent> {
  static readonly schemaName = `${STATS_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: StatsVariant;
  readonly darkMode?: boolean;

  constructor(props?: Partial<DefaultStatsLayout>) {
    super({
      schemaType: DefaultStatsLayout.schemaName,
      title: 'Default Stats Layout',
    });

    this.variant = props?.variant || 'simple';
    this.darkMode = props?.darkMode || false;
  }

  render(content: StatsContent): React.ReactNode {
    return <Stats content={content} layout={this} />;
  }
}
