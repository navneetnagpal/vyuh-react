import {
  Condition,
  LayoutConfiguration,
  TypeDescriptor,
  useVyuh,
} from '@vyuh/react-core';
import React from 'react';
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import {
  CONDITIONAL_CONTENT_SCHEMA_TYPE,
  ConditionalContent,
  evaluateConditionalContent,
} from './conditional-content';

/**
 * Default layout for conditional content
 */
export class DefaultConditionalContentLayout extends LayoutConfiguration<ConditionalContent> {
  /**
   * Schema type for the default conditional content layout
   */
  static readonly schemaName: string = `${CONDITIONAL_CONTENT_SCHEMA_TYPE}.layout.default`;

  /**
   * Type descriptor for the default conditional content layout
   */
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  /**
   * Creates a new default conditional content layout
   */
  constructor() {
    super({
      schemaType: DefaultConditionalContentLayout.schemaName,
      title: 'Default Conditional Content Layout',
    });
  }

  /**
   * Renders the conditional content with the default layout
   */
  render(content: ConditionalContent): React.ReactNode {
    return <ConditionalContentLayoutView content={content} />;
  }
}

/**
 * Component for rendering conditional content
 */
function ConditionalContentLayoutView({
  content,
}: {
  content: ConditionalContent;
}) {
  const { plugins } = useVyuh();

  // Function to load the conditional content
  const loadContent = async () => {
    const result = await evaluateConditionalContent(content);
    if (!result) {
      throw new Error('No matching content found');
    }
    return result;
  };

  // Function to render the resolved content
  const renderContent = (resolvedContent: any) => {
    return plugins.content.render(resolvedContent);
  };

  return (
    <AsyncContentContainer
      loadContent={loadContent}
      renderContent={renderContent}
      errorTitle="Failed to load Conditional Content"
      contentKey={JSON.stringify(content)}
    />
  );
}
