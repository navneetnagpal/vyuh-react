import { TelemetryProvider } from '@/plugins/telemetry/telemetry-provider';

/**
 * A simple console-based telemetry provider that logs
 * telemetry events, errors, and messages to the console.
 */
export class ConsoleProvider implements TelemetryProvider {
  readonly name = 'vyuh.plugin.telemetry.provider.console';
  readonly title = 'Console Logger Telemetry Provider';

  constructor() {}

  async init(): Promise<void> {
    console.log(`[${this.name}] Initialized`);
    return Promise.resolve();
  }

  async dispose(): Promise<void> {
    console.log(`[${this.name}] Disposed`);
    return Promise.resolve();
  }

  async reportError(
    error: Error | string,
    options?: {
      stackTrace?: string;
      params?: Record<string, any>;
      fatal?: boolean;
    },
  ): Promise<void> {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const stackTrace =
      options?.stackTrace || (error instanceof Error ? error.stack : '');

    console.error(
      `[ERROR] ${errorMessage}`,
      options?.params ? { params: options.params } : '',
      stackTrace ? `\nStack: ${stackTrace}` : '',
    );

    return Promise.resolve();
  }

  async startTrace(
    name: string,
    operation: string,
    options?: {
      level?: 'info' | 'warning' | 'error';
    },
  ): Promise<any> {
    const level = options?.level || 'info';
    const startTime = performance.now();
    console.log(`[TRACE:START] ${name} - ${operation} (${level})`);

    return {
      stop: async () => {
        const duration = performance.now() - startTime;
        console.log(
          `[TRACE:END] ${name} - ${operation} (${duration.toFixed(2)}ms)`,
        );
      },
      startChild: async (
        childName: string,
        childOperation: string,
        childOptions?: any,
      ) => {
        const childLevel = childOptions?.level || 'info';
        const childStartTime = performance.now();
        console.log(
          `[TRACE:CHILD:START] ${childName} - ${childOperation} (${childLevel})`,
        );

        return {
          stop: async () => {
            const childDuration = performance.now() - childStartTime;
            console.log(
              `[TRACE:CHILD:END] ${childName} - ${childOperation} (${childDuration.toFixed(2)}ms)`,
            );
          },
        };
      },
    };
  }

  static logMethod = {
    debug: console.debug,
    info: console.info,
    warning: console.warn,
    error: console.error,
  };

  log(
    message: string,
    level: 'debug' | 'info' | 'warning' | 'error' = 'info',
    params?: Record<string, any>,
  ): void {
    const logMethod = ConsoleProvider.logMethod[level] ?? console.log;
    logMethod(`[${level.toUpperCase()}] ${message}`, params || '');
  }
}
