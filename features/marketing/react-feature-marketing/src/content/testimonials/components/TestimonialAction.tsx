import { Action } from '@vyuh/react-core';
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
        onClick={() => new Action(action).execute()}
        className="btn btn-primary"
      >
        {action.title || 'Learn more'}
      </button>
    </div>
  );
};
