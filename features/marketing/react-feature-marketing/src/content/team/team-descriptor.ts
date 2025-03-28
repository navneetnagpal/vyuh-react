import { Team, TEAM_SCHEMA_TYPE } from '@/content/team/team';
import { ContentDescriptor } from '@vyuh/react-extension-content';

/**
 * Content type descriptor for Team content items
 */
export class TeamDescriptor extends ContentDescriptor<Team> {
  constructor(props?: Partial<TeamDescriptor>) {
    super({
      schemaType: TEAM_SCHEMA_TYPE,
      title: 'Team',
      layouts: props?.layouts,
    });
  }
}
