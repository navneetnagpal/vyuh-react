import { ContentBuilder } from '@vyuh/react-extension-content';
import { DefaultDocumentLayout } from './default-document-layout';
import { Document, DOCUMENT_SCHEMA_TYPE } from './document';

/**
 * Content builder for Document content items
 */
export class DocumentContentBuilder extends ContentBuilder<Document> {
  constructor() {
    super({
      schemaType: DOCUMENT_SCHEMA_TYPE,
      defaultLayout: new DefaultDocumentLayout(),
      defaultLayoutDescriptor: DefaultDocumentLayout.typeDescriptor,
    });
  }
}
