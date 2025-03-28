import {
  Team as TeamContent,
  TEAM_SCHEMA_TYPE,
} from '@/content/team/team';
import { Team } from '@/content/team/components/Team';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Team layout variant type
 */
export type TeamVariant =
  | 'simple-grid'
  | 'with-large-images'
  | 'with-roles-social'
  | 'card-grid'
  | 'with-background';

/**
 * Default layout for team content items
 */
export class DefaultTeamLayout extends LayoutConfiguration<TeamContent> {
  static readonly schemaName = `${TEAM_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: TeamVariant;
  readonly darkMode?: boolean;

  constructor(props?: Partial<DefaultTeamLayout>) {
    super({
      schemaType: DefaultTeamLayout.schemaName,
      title: 'Default Team Layout',
    });

    this.variant = props?.variant || 'simple-grid';
    this.darkMode = props?.darkMode || false;
  }

  render(content: TeamContent): React.ReactNode {
    return <Team content={content} layout={this} />;
  }
}
