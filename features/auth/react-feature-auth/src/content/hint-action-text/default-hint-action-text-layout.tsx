import { executeAction, LayoutConfiguration, TypeDescriptor, useVyuh } from '@vyuh/react-core';
import React from 'react';
import { HintActionText, HINT_ACTION_TEXT_SCHEMA_TYPE, TextAlignment } from './hint-action-text';

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
      executeAction(content.action);
    }
  };

  // Determine text alignment class
  const getAlignmentClass = () => {
    switch (content.alignment) {
      case TextAlignment.Start:
        return 'text-start';
      case TextAlignment.End:
        return 'text-end';
      case TextAlignment.Center:
      default:
        return 'text-center';
    }
  };

  return (
    <div className={`${getAlignmentClass()} my-4`}>
      <span className="opacity-70">{content.hint}</span>{' '}
      {content.action && (
        <button
          onClick={handleActionClick}
          className="btn btn-link btn-sm p-0 h-auto min-h-0"
        >
          {content.action.title || 'Action'}
        </button>
      )}
    </div>
  );
  }
}
