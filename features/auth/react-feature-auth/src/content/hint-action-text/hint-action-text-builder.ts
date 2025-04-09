import { ContentBuilder } from '@vyuh/react-extension-content';
import { HintActionText, HINT_ACTION_TEXT_SCHEMA_TYPE } from './hint-action-text';
import { DefaultHintActionTextLayout } from './default-hint-action-text-layout';

/**
 * Content builder for the Hint Action Text
 */
export class HintActionTextContentBuilder extends ContentBuilder<HintActionText> {
  constructor() {
    super({
      schemaType: HINT_ACTION_TEXT_SCHEMA_TYPE,
      defaultLayout: new DefaultHintActionTextLayout(),
      defaultLayoutDescriptor: DefaultHintActionTextLayout.typeDescriptor,
    });
  }
}
