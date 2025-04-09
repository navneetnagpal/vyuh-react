import { LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';
import { HintActionText, HINT_ACTION_TEXT_SCHEMA_TYPE } from './hint-action-text';

/**
 * Default layout for the Hint Action Text
 */
export class DefaultHintActionTextLayout extends LayoutConfiguration<HintActionText> {
  static readonly schemaName = `${HINT_ACTION_TEXT_SCHEMA_TYPE}.layout.default`;
  static readonly typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultHintActionTextLayout.schemaName,
      title: 'Default Hint Action Text Layout',
    });
  }

  render(content: HintActionText): React.ReactNode {
  const { plugins } = useVyuh();

  const handleActionClick = () => {
    if (content.action) {
      plugins.content.executeAction(content.action);
    }
  };

  return (
    <div className="text-center my-4">
      <span className="text-gray-600">{content.hintText}</span>{' '}
      <button
        onClick={handleActionClick}
        className="text-blue-500 hover:text-blue-700 font-medium"
      >
        {content.actionText}
      </button>
    </div>
  );
  }
}
