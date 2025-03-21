import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import React from 'react';
import {
  API_CONTENT_SCHEMA_TYPE,
  ApiConfiguration,
  APIContent,
} from '@/content/api-content/api-content';

/**
 * Default layout for API Content
 */
export class DefaultAPIContentLayout extends LayoutConfiguration<APIContent> {
  static readonly schemaType = `${API_CONTENT_SCHEMA_TYPE}.layout.default`;

  static readonly typeDescriptor = new TypeDescriptor(this.schemaType, this);

  constructor() {
    super({
      schemaType: DefaultAPIContentLayout.schemaType,
      title: 'Default API Content Layout',
    });
  }

  render(content: APIContent, children?: React.ReactNode): React.ReactNode {
    const config = ApiConfiguration.fromJson(content);

    return (
      <APIContentLayoutView content={content} config={config}>
        {children}
      </APIContentLayoutView>
    );
  }
}

/**
 * Component for rendering API content with async data fetching
 */
function APIContentLayoutView({
  content,
  config,
  children,
}: {
  content: APIContent;
  config?: ApiConfiguration;
  children?: React.ReactNode;
}) {
  // Function to load the API data
  const loadContent = async () => {
    if (!config) {
      throw new Error('Missing API Configuration');
    }

    return await config.invoke();
  };

  // Function to render the API data
  const renderContent = (data: any) => {
    if (!data) {
      return null;
    }
    return config?.build(data);
  };

  return (
    <div className="api-content">
      <AsyncContentContainer
        loadContent={loadContent}
        renderContent={renderContent}
        errorTitle={`API Error${content.configuration?.title ? `: ${content.configuration.title}` : ''}`}
        contentKey={content.configuration?.schemaType || 'api-content'}
      />
      {children}
    </div>
  );
}
