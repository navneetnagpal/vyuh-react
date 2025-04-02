import { Action, executeAction } from '@vyuh/react-core';
import React from 'react';

interface TestimonialActionProps {
  action?: Action;
}

export const TestimonialAction: React.FC<TestimonialActionProps> = ({
  action,
}) => {
  if (!action) return null;

  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => executeAction(action)}
        className="btn btn-primary transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
      >
        {action.title || 'Learn more'}
      </button>
    </div>
  );
};
