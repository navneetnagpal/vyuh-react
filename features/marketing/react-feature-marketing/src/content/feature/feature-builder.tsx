import { DefaultFeatureLayout } from '@/content/feature/default-feature-layout';
import { Feature, FEATURE_SCHEMA_TYPE } from '@/content/feature/feature';
import { ContentBuilder } from '@vyuh/react-extension-content';

/**
 * Content builder for Feature content items
 */
export class FeatureContentBuilder extends ContentBuilder<Feature> {
  constructor() {
    super({
      schemaType: FEATURE_SCHEMA_TYPE,
      defaultLayout: new DefaultFeatureLayout(),
      defaultLayoutDescriptor: DefaultFeatureLayout.typeDescriptor,
    });
  }
}
