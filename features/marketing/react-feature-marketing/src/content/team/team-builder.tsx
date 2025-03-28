import { DefaultTeamLayout } from '@/content/team/default-team-layout';
import { Team, TEAM_SCHEMA_TYPE } from '@/content/team/team';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Team content items
 */
export class TeamContentBuilder extends ContentBuilder<Team> {
  constructor() {
    super({
      schemaType: TEAM_SCHEMA_TYPE,
      defaultLayout: new DefaultTeamLayout(),
      defaultLayoutDescriptor: DefaultTeamLayout.typeDescriptor,
    });
  }
}
