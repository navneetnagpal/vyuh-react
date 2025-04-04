import { ContentBuilder } from '@vyuh/react-extension-content';
import { DefaultDocumentViewLayout } from './default-document-view-layout';
import { DOCUMENT_VIEW_SCHEMA_TYPE, DocumentView } from './document-view';

/**
 * Content builder for DocumentView content items
 */
export class DocumentViewContentBuilder extends ContentBuilder<DocumentView> {
  constructor() {
    super({
      schemaType: DOCUMENT_VIEW_SCHEMA_TYPE,
      defaultLayout: new DefaultDocumentViewLayout(),
      defaultLayoutDescriptor: DefaultDocumentViewLayout.typeDescriptor,
    });
  }
}