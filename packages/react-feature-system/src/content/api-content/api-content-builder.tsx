import { useVyuhStore } from '@vyuh/react-core';
import { ContentBuilder } from '@vyuh/react-extension-content';
import {
  API_CONTENT_SCHEMA_TYPE,
  APIConfiguration,
  APIContent,
  APIContentDescriptor,
} from './api-content';
import { DefaultAPIContentLayout } from './default-api-content-layout';

/**
 * Content builder for API Content items
 */
export class APIContentBuilder extends ContentBuilder<APIContent> {
  constructor() {
    super({
      schemaType: API_CONTENT_SCHEMA_TYPE,
      defaultLayout: new DefaultAPIContentLayout(),
      defaultLayoutDescriptor: DefaultAPIContentLayout.typeDescriptor,
    });
  }

  init(descriptors: any[]) {
    super.init(descriptors);

    // Filter for API content descriptors
    const apiContentDescriptors = descriptors as APIContentDescriptor[];

    // Extract all configurations from the descriptors
    const configs = apiContentDescriptors.flatMap(
      (desc) => desc.configurations || [],
    );

    const { content } = useVyuhStore.getState().plugins;
    for (const config of configs) {
      content.registerItem(APIConfiguration, config);
    }
  }
}
