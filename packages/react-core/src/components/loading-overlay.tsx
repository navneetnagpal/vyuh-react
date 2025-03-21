'use client';

import React from 'react';
import { useVyuhStore } from '@/hooks/use-vyuh';

export function LoadingOverlay() {
  const { isVisible } = useVyuhStore((state) => state.loader);
  const componentBuilder = useVyuhStore((state) => state.componentBuilder);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-grayscale">
      <div className="rounded-lg overflow-hidden shadow-md">
        {componentBuilder.renderRouteLoader()}
      </div>
    </div>
  );
}
