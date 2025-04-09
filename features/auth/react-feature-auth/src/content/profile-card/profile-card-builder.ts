import { ContentBuilder } from '@vyuh/react-extension-content';
import { ProfileCard, PROFILE_CARD_SCHEMA_TYPE } from './profile-card';
import { DefaultProfileCardLayout } from './default-profile-card-layout';

/**
 * Content builder for the Profile Card
 */
export class ProfileCardContentBuilder extends ContentBuilder<ProfileCard> {
  constructor() {
    super({
      schemaType: PROFILE_CARD_SCHEMA_TYPE,
      defaultLayout: new DefaultProfileCardLayout(),
      defaultLayoutDescriptor: DefaultProfileCardLayout.typeDescriptor,
    });
  }
}
