import { ContentDescriptor } from '@vyuh/react-extension-content';
import { OAUTH_SIGNIN_SCHEMA_TYPE } from './oauth-signin';

/**
 * Descriptor for the OAuth Sign-in content item
 */
export class OAuthSignInDescriptor extends ContentDescriptor {
  static readonly schemaType = OAUTH_SIGNIN_SCHEMA_TYPE;

  constructor(props?: Partial<OAuthSignInDescriptor>) {
    super({
      schemaType: OAuthSignInDescriptor.schemaType,
      title: 'OAuth Sign-in',
      layouts: props?.layouts,
    });
  }
}
