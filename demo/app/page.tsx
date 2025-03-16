'use client';

import { useVyuh } from '@vyuh/react';
import { useEffect, useState } from 'react';
import { RouteBase } from '@vyuh/react';

export default function Home() {
  const { plugins } = useVyuh();
  const [route, setRoute] = useState<RouteBase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoute() {
      try {
        setLoading(true);
        // Use the content plugin to fetch the route
        const contentPlugin = plugins.content;
        if (!contentPlugin) {
          throw new Error('Content plugin not available');
        }

        const routeData = await contentPlugin.provider.fetchRoute({
          path: '/home',
        });

        setRoute(routeData);
      } catch (err) {
        console.error('Error fetching route:', err);
        setError('Failed to load route data');
      } finally {
        setLoading(false);
      }
    }

    if (plugins.content) {
      fetchRoute();
    }
  }, [plugins.content]);

  if (loading) {
    return <div className="p-8">Loading route data...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!route) {
    return <div className="p-8">No route found for path "/home"</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{route.title || 'Home'}</h1>

      {route.content && (
        <div className="mb-6">
          {/* Use the content plugin to render the content */}
          {plugins.content?.render(route.content)}
        </div>
      )}

      {route.regions?.map((region, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{region.title}</h2>
          <div className="border p-4 rounded">
            {/* Use the content plugin to render each item */}
            {region.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-2">
                {plugins.content?.render(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
