'use client';

import { useVyuh, useVyuhStore } from '@/hooks/use-vyuh';
import React from 'react';

export function LoadingOverlay() {
  const { isVisible } = useVyuhStore((state) => state.loader);
  const { components } = useVyuh();

  if (!isVisible) return null;

  return (
    <div className="vc:fixed vc:inset-0 vc:z-50 vc:flex vc:items-center vc:justify-center vc:bg-black/50 vc:backdrop-grayscale">
      <div className="vc:overflow-hidden vc:rounded-lg vc:shadow-md">
        {components.renderRouteLoader()}
      </div>
    </div>
  );
}
