import { DefaultStatsLayout } from '@/content/stats/default-stats-layout';
import { Stats, STATS_SCHEMA_TYPE } from '@/content/stats/stats';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Stats content items
 */
export class StatsContentBuilder extends ContentBuilder<Stats> {
  constructor() {
    super({
      schemaType: STATS_SCHEMA_TYPE,
      defaultLayout: new DefaultStatsLayout(),
      defaultLayoutDescriptor: DefaultStatsLayout.typeDescriptor,
    });
  }
}
