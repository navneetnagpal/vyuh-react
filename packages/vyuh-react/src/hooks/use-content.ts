import { useState, useEffect } from 'react';
import { useVyuhPlatform } from '../core/VyuhProvider';
import { ContentItem } from '../core/plugins/content/ContentItem';

/**
 * Hook for fetching content by ID
 */
export function useContentById<T extends ContentItem>(
  id: string, 
  options?: { useCache?: boolean }
) {
  const { plugins } = useVyuhPlatform();
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const result = await plugins.content.fetchById<T>(id, options);
        if (isMounted) {
          setContent(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [id, JSON.stringify(options)]);

  return { content, loading, error };
}

/**
 * Hook for fetching content by query
 */
export function useContentByQuery<T extends ContentItem>(
  query: string,
  params?: Record<string, any>,
  options?: { useCache?: boolean }
) {
  const { plugins } = useVyuhPlatform();
  const [content, setContent] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const result = await plugins.content.fetchByQuery<T>(query, params, options);
        if (isMounted) {
          setContent(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [query, JSON.stringify(params), JSON.stringify(options)]);

  return { content, loading, error };
}