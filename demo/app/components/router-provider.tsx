'use client';

import { useVyuhStore } from '@vyuh/react-core';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { NextNavigationPlugin } from '../plugins/next-navigation-plugin';

/**
 * Component that initializes the Next.js router for the NavigationPlugin
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const plugins = useVyuhStore(state => state.plugins);
  
  useEffect(() => {
    // Check if the navigation plugin is a NextNavigationPlugin
    if (plugins.navigation instanceof NextNavigationPlugin) {
      // Set the router instance
      (plugins.navigation as NextNavigationPlugin).setRouter(router);
    }
  }, [router, plugins.navigation]);
  
  return <>{children}</>;
}