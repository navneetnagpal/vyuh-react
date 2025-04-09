import { ContentBuilder } from '@vyuh/react-extension-content';
import { OAuthSignIn, OAUTH_SIGNIN_SCHEMA_TYPE } from './oauth-signin';
import { DefaultOAuthSignInLayout } from './default-oauth-signin-layout';

/**
 * Content builder for the OAuth Sign-in component
 */
export class OAuthSignInContentBuilder extends ContentBuilder<OAuthSignIn> {
  constructor() {
    super({
      schemaType: OAUTH_SIGNIN_SCHEMA_TYPE,
      defaultLayout: new DefaultOAuthSignInLayout(),
      defaultLayoutDescriptor: DefaultOAuthSignInLayout.typeDescriptor,
    });
  }
}
