'use client';

import { useVyuh, useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';

export function LoadingOverlay() {
  const { isVisible } = useVyuhStore((state) => state.loader);
  const { components } = useVyuh();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-grayscale">
      <div className="overflow-hidden rounded-lg shadow-md">
        {components.renderRouteLoader()}
      </div>
    </div>
  );
}
