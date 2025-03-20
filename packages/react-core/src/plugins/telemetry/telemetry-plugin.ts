import { Plugin } from '@/core/plugin';
import { TelemetryProvider } from '@/plugins/telemetry/telemetry-provider';

/**
 * Plugin for application telemetry and logging
 */
export abstract class TelemetryPlugin extends Plugin {
  /**
   * The telemetry providers used by this plugin
   */
  readonly providers: TelemetryProvider[];

  /**
   * Creates a new TelemetryPlugin instance
   *
   * @param name Unique identifier for the plugin
   * @param title Human-readable title for the plugin
   * @param providers Array of telemetry providers
   * @param isPreloaded Whether this plugin should be loaded before platform initialization
   */
  constructor(
    name: string,
    title: string,
    providers: TelemetryProvider[],
    isPreloaded: boolean = true,
  ) {
    super(name, title, isPreloaded);
    this.providers = providers;
  }

  /**
   * Report an error to all telemetry providers
   */
  abstract reportError(
    error: Error | string,
    options?: {
      stackTrace?: string;
      params?: Record<string, any>;
      fatal?: boolean;
    },
  ): Promise<void>;

  /**
   * Start a trace for performance monitoring
   */
  abstract startTrace(
    name: string,
    operation: string,
    options?: {
      level?: 'info' | 'warning' | 'error';
    },
  ): Promise<any>;

  /**
   * Log a message at the specified level
   */
  abstract log(
    message: string,
    level: 'debug' | 'info' | 'warning' | 'error',
    params?: Record<string, any>,
  ): void;
}
