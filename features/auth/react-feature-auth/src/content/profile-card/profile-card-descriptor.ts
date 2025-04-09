import { ContentDescriptor } from '@vyuh/react-extension-content';
import { PROFILE_CARD_SCHEMA_TYPE } from './profile-card';

/**
 * Descriptor for the Profile Card content item
 */
export class ProfileCardDescriptor extends ContentDescriptor {
  static readonly schemaType = PROFILE_CARD_SCHEMA_TYPE;

  constructor(props?: Partial<ProfileCardDescriptor>) {
    super({
      schemaType: ProfileCardDescriptor.schemaType,
      title: 'Profile Card',
      layouts: props?.layouts,
    });
  }
}
