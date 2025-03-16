import { useVyuhPlatform } from '../core/VyuhProvider';

/**
 * Hook for tracking analytics events
 */
export function useAnalytics() {
  const { plugins } = useVyuhPlatform();

  return {
    /**
     * Track a page view
     */
    trackPageView: (pageName: string, properties?: Record<string, any>) => {
      plugins.analytics.trackPageView(pageName, properties);
    },

    /**
     * Track a custom event
     */
    trackEvent: (eventName: string, properties?: Record<string, any>) => {
      plugins.analytics.trackEvent(eventName, properties);
    },

    /**
     * Identify a user
     */
    identifyUser: (userId: string, traits?: Record<string, any>) => {
      plugins.analytics.identifyUser(userId, traits);
    },
  };
}
