import {
  ActionConfiguration,
  TypeDescriptor,
  useVyuhStore,
} from '@vyuh/react-core';

/**
 * Enum for URL launch modes
 */
export enum UrlLaunchMode {
  inAppWebView = 'inAppWebView',
  externalApplication = 'externalApplication',
  platformDefault = 'platformDefault',
}

/**
 * Action configuration for opening URLs in various ways.
 *
 * Features:
 * * Open in new tab
 * * Open in current tab
 * * Open in background tab
 * * URL validation
 * * Error handling
 *
 * Example usage:
 * ```typescript
 * // Open in new tab
 * const action = new OpenUrlAction({
 *   url: 'https://example.com',
 *   mode: UrlLaunchMode.NewTab,
 * });
 *
 * // Open in current tab
 * const action = new OpenUrlAction({
 *   url: 'https://example.com',
 *   mode: UrlLaunchMode.CurrentTab,
 * });
 * ```
 */
export class OpenUrlAction extends ActionConfiguration {
  /**
   * Schema type for the open URL action
   */
  static readonly schemaType = 'vyuh.action.openUrl';

  /**
   * Type descriptor for the open URL action
   */
  static readonly typeDescriptor = new TypeDescriptor(this.schemaType, this);

  /**
   * The URL to open
   */
  readonly url?: string;

  /**
   * The mode to use when launching the URL
   */
  readonly mode: UrlLaunchMode;

  /**
   * Creates a new open URL action
   */
  constructor(data?: Partial<OpenUrlAction>) {
    super({
      schemaType: OpenUrlAction.schemaType,
      title: 'Open URL',
      isAwaited: data?.isAwaited,
    });

    this.url = data?.url;
    this.mode = data?.mode ?? UrlLaunchMode.platformDefault;
  }

  /**
   * Executes the open URL action
   */
  async execute(): Promise<void> {
    const { plugins } = useVyuhStore.getState();

    if (!this.url) {
      plugins.telemetry?.log('No URL provided to open', 'warning');
      return;
    }

    try {
      // Validate URL
      new URL(this.url);

      // Open URL based on mode
      switch (this.mode) {
        case UrlLaunchMode.inAppWebView:
          window.location.href = this.url;
          break;

        default:
          window.open(this.url, '_blank', 'noopener,noreferrer');
          break;
      }
    } catch (error) {
      plugins.telemetry?.log(`Invalid URL: ${this.url}`, 'error');
    }
  }
}
