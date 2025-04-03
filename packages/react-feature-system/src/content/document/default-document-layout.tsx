import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';
import { Document, DOCUMENT_SCHEMA_TYPE } from './document';

/**
 * Render mode for documents
 */
export enum DocumentRenderMode {
  single = 'single',
  list = 'list',
}

/**
 * Default layout for Document content items
 */
export class DefaultDocumentLayout extends LayoutConfiguration<Document> {
  static readonly schemaName = `${DOCUMENT_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  /**
   * The render mode for the document
   */
  mode: DocumentRenderMode;

  constructor(props?: Partial<DefaultDocumentLayout>) {
    super({
      schemaType: DefaultDocumentLayout.schemaName,
      title: 'Default Document Layout',
    });

    this.mode = props?.mode || DocumentRenderMode.single;
  }

  /**
   * Render the document content
   */
  render(content: Document): React.ReactNode {
    return <DocumentView content={content} layout={this} />;
  }
}

/**
 * Document view component
 */
interface DocumentViewProps {
  content: Document;
  layout: DefaultDocumentLayout;
}

const DocumentView: React.FC<DocumentViewProps> = ({ content, layout }) => {
  const { plugins } = useVyuh();

  return (
    <div className="vfs:flex vfs:flex-col vfs:gap-4 vfs:w-full">
      {/* Document header */}
      {(content.title || content.description) && (
        <div className="vfs:flex vfs:flex-col vfs:gap-2">
          {content.title && (
            <h2 className="vfs:text-xl vfs:font-medium">{content.title}</h2>
          )}

          {content.description && <p>{content.description}</p>}
        </div>
      )}

      {/* Document items */}
      {content.items && content.items.length > 0 && (
        <div className="vfs:flex-1">
          {layout.mode === DocumentRenderMode.single ? (
            // Single item mode - render only the first item
            plugins.content.render(content.items[0])
          ) : (
            // List mode - render all items in a scrollable list
            <div className="vfs:flex vfs:flex-col vfs:gap-4 vfs:overflow-auto">
              {content.items.map((item, index) => (
                <div key={index} className="vfs:w-full">
                  {plugins.content.render(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
