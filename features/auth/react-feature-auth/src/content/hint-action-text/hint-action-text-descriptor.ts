import { ContentDescriptor } from '@vyuh/react-extension-content';
import { HINT_ACTION_TEXT_SCHEMA_TYPE } from './hint-action-text';

/**
 * Descriptor for the Hint Action Text content item
 */
export class HintActionTextDescriptor extends ContentDescriptor {
  static readonly schemaType = HINT_ACTION_TEXT_SCHEMA_TYPE;

  constructor(props?: Partial<HintActionTextDescriptor>) {
    super({
      schemaType: HintActionTextDescriptor.schemaType,
      title: 'Hint Action Text',
      layouts: props?.layouts,
    });
  }
}
