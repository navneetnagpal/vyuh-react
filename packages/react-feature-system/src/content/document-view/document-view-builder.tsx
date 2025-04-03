import { ContentBuilder } from '@vyuh/react-extension-content';
import { DocumentView, DOCUMENT_VIEW_SCHEMA_TYPE } from './document-view';
import { DefaultDocumentViewLayout } from './default-document-view-layout';

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