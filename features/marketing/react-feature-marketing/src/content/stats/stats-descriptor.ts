import { Stats, STATS_SCHEMA_TYPE } from '@/content/stats/stats';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Stats content items
 */
export class StatsDescriptor extends ContentDescriptor<Stats> {
  constructor(props?: Partial<StatsDescriptor>) {
    super({
      schemaType: STATS_SCHEMA_TYPE,
      title: 'Stats',
      layouts: props?.layouts,
    });
  }
}
