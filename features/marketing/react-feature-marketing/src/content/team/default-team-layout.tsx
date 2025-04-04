import { Team } from '@/content/team/components/Team';
import { Team as TeamContent, TEAM_SCHEMA_TYPE } from '@/content/team/team';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Team layout variant type
 */
export type TeamVariant =
  | 'simple-grid'
  | 'with-large-images';

/**
 * Default layout for team content items
 */
export class DefaultTeamLayout extends LayoutConfiguration<TeamContent> {
  static readonly schemaName = `${TEAM_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  readonly variant?: TeamVariant;

  constructor(props?: Partial<DefaultTeamLayout>) {
    super({
      schemaType: DefaultTeamLayout.schemaName,
      title: 'Default Team Layout',
    });

    this.variant = props?.variant || 'simple-grid';
  }

  render(content: TeamContent): React.ReactNode {
    return <Team content={content} layout={this} />;
  }
}
