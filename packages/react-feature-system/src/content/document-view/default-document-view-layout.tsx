import {
  ContentItem,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
  useVyuhStore,
} from '@vyuh/react-core';
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import React from 'react';
import {
  DOCUMENT_VIEW_SCHEMA_TYPE,
  DocumentLoadStrategy,
  DocumentView,
} from './document-view';

/**
 * Default layout for DocumentView content items
 */
export class DefaultDocumentViewLayout extends LayoutConfiguration<DocumentView> {
  static readonly schemaName = `${DOCUMENT_VIEW_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultDocumentViewLayout.schemaName,
      title: 'Default Document View Layout',
    });
  }

  /**
   * Render the document view content
   */
  render(content: DocumentView): React.ReactNode {
    return <DocumentViewComponent content={content} />;
  }
}

/**
 * Document view component props
 */
interface DocumentViewComponentProps {
  content: DocumentView;
}

/**
 * Document view component
 */
const DocumentViewComponent: React.FC<DocumentViewComponentProps> = ({
  content,
}) => {
  const { plugins } = useVyuh();

  // Function to fetch document data
  const fetchContent: () => Promise<
    ContentItem | ContentItem[] | undefined
  > = async () => {
    switch (content.loadStrategy) {
      case DocumentLoadStrategy.REFERENCE:
        const ref = content.reference
          ? plugins.content.provider.reference(content.reference)
          : undefined;

        const documentId = ref;
        if (!documentId) {
          return Promise.reject(
            new Error(`No valid Document ID set for ${content.schemaType}`),
          );
        }

        return plugins.content.provider.fetchById<DocumentView>(documentId);

      case DocumentLoadStrategy.QUERY:
        const query = content.query?.buildQuery({});
        if (!query) {
          return Promise.reject(
            new Error(
              `Document query is null for document type: ${content.schemaType}`,
            ),
          );
        }

        return plugins.content.provider.fetchSingle(query);

      default:
        return Promise.reject(
          new Error(`Unsupported load strategy: ${content.loadStrategy}`),
        );
    }
  };

  // Function to render the document content
  const renderContent = (document?: ContentItem | ContentItem[]) => {
    const { plugins } = useVyuhStore.getState();

    if (!document) {
      return <div className="vfs:p-4">No document found</div>;
    }

    return plugins.content.render(document);
  };

  return (
    <AsyncContentContainer
      fetchContent={fetchContent}
      renderContent={renderContent}
      errorTitle="No document found"
    />
  );
};
