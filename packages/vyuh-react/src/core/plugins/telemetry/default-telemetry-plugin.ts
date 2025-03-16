import { ConsoleProvider } from './providers/console-provider';
import { TelemetryPlugin } from './telemetry-plugin';

/**
 * Default implementation of TelemetryPlugin that uses console logging
 */
export class DefaultTelemetryPlugin extends TelemetryPlugin {
  constructor() {
    super(
      'vyuh.plugin.telemetry.default',
      'Default Telemetry Plugin',
      [new ConsoleProvider()],
      true, // Telemetry should be preloaded
    );
  }

  async init(): Promise<void> {
    // Initialize all providers
    await Promise.all(this.providers.map((provider) => provider.init()));
    console.log(`[${this.name}] Initialized`);
  }

  async dispose(): Promise<void> {
    // Dispose all providers
    await Promise.all(this.providers.map((provider) => provider.dispose()));
    console.log(`[${this.name}] Disposed`);
  }

  async reportError(
    error: Error | string,
    options?: {
      stackTrace?: string;
      params?: Record<string, any>;
      fatal?: boolean;
    }
  ): Promise<void> {
    await Promise.all(
      this.providers.map((provider) => provider.reportError(error, options))
    );
  }

  async startTrace(
    name: string,
    operation: string,
    options?: {
      level?: 'info' | 'warning' | 'error';
    }
  ): Promise<any> {
    const traces = await Promise.all(
      this.providers.map((provider) =>
        provider.startTrace(name, operation, options),
      ),
    );

    return {
      stop: async () => {
        await Promise.all(traces.map((trace) => trace.stop()));
      },
      startChild: async (
        childName: string,
        childOperation: string,
        childOptions?: any
      ) => {
        const childTraces = await Promise.all(
          traces.map((trace) =>
            trace.startChild(childName, childOperation, childOptions),
          ),
        );
        return {
          stop: async () => {
            await Promise.all(
              childTraces.map((childTrace) => childTrace.stop()),
            );
          },
        };
      },
    };
  }

  log(
    message: string,
    level: 'debug' | 'info' | 'warning' | 'error' = 'info',
    params?: Record<string, any>,
  ): void {
    this.providers.forEach((provider) => provider.log(message, level, params));
  }
}