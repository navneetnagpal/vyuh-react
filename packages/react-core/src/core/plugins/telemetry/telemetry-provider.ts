/**
 * Interface for telemetry providers that handle logging, error reporting,
 * and performance tracing.
 */
export interface TelemetryProvider {
  /**
   * Unique identifier for the provider
   */
  readonly name: string;
  
  /**
   * Human-readable title for the provider
   */
  readonly title: string;
  
  /**
   * Initialize the provider
   */
  init(): Promise<void>;
  
  /**
   * Clean up resources when the provider is no longer needed
   */
  dispose(): Promise<void>;
  
  /**
   * Report an error to the telemetry system
   */
  reportError(
    error: Error | string,
    options?: {
      stackTrace?: string;
      params?: Record<string, any>;
      fatal?: boolean;
    }
  ): Promise<void>;
  
  /**
   * Start a trace for performance monitoring
   */
  startTrace(
    name: string,
    operation: string,
    options?: {
      level?: 'info' | 'warning' | 'error';
    }
  ): Promise<any>;
  
  /**
   * Log a message at the specified level
   */
  log(
    message: string,
    level: 'debug' | 'info' | 'warning' | 'error',
    params?: Record<string, any>
  ): void;
}