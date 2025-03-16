import { Plugin } from './Plugin';
import { ContentPlugin } from './content/content-plugin';
import { AnalyticsPlugin } from './analytics/AnalyticsPlugin';
import { TelemetryPlugin } from './telemetry/TelemetryPlugin';
import { EventPlugin } from './event/event-plugin';
import { DefaultContentPlugin } from './content/default-content-plugin';
import { DefaultAnalyticsPlugin } from './analytics/DefaultAnalyticsPlugin';
import { DefaultTelemetryPlugin } from './telemetry/DefaultTelemetryPlugin';
import { DefaultEventPlugin } from './event/default-event-plugin';

/**
 * Describes the plugins available to the Vyuh platform.
 */
export class PluginDescriptor {
  readonly content: ContentPlugin;
  readonly analytics: AnalyticsPlugin;
  readonly telemetry: TelemetryPlugin;
  readonly event: EventPlugin;

  constructor({
    content = new DefaultContentPlugin(),
    analytics = new DefaultAnalyticsPlugin(),
    telemetry = new DefaultTelemetryPlugin(),
    event = new DefaultEventPlugin(),
  } = {}) {
    this.content = content;
    this.analytics = analytics;
    this.telemetry = telemetry;
    this.event = event;
  }

  /**
   * Get all plugins as an array
   */
  get plugins(): Plugin[] {
    return [this.content, this.analytics, this.telemetry, this.event];
  }

  /**
   * Get a plugin by type
   */
  get<T extends Plugin>(type: new (...args: any[]) => T): T | undefined {
    return this.plugins.find((plugin) => plugin instanceof type) as
      | T
      | undefined;
  }

  /**
   * Default system plugins
   */
  static get system(): PluginDescriptor {
    return new PluginDescriptor();
  }
}
