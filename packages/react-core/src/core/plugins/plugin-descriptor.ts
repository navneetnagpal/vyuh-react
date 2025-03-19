import { ContentPlugin } from '@/core/plugins/content/content-plugin';
import { NoOpContentPlugin } from '@/core/plugins/content/noop-content-plugin';
import { DefaultEventPlugin } from '@/core/plugins/event/default-event-plugin';
import { EventPlugin } from '@/core/plugins/event/event-plugin';
import { Plugin } from '@/core/plugins/plugin';
import { DefaultTelemetryPlugin } from '@/core/plugins/telemetry/default-telemetry-plugin';
import { TelemetryPlugin } from '@/core/plugins/telemetry/telemetry-plugin';

/**
 * Describes the plugins available to the Vyuh platform.
 */
export class PluginDescriptor {
  readonly content: ContentPlugin;
  readonly telemetry: TelemetryPlugin;
  readonly event: EventPlugin;

  constructor(props: Partial<PluginDescriptor> = {}) {
    this.content = props.content ?? PluginDescriptor.system.content;
    this.telemetry = props.telemetry ?? PluginDescriptor.system.telemetry;
    this.event = props.event ?? PluginDescriptor.system.event;
  }

  /**
   * Get all plugins as an array
   */
  get plugins(): Plugin[] {
    return [this.content, this.telemetry, this.event];
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
  static readonly system = new PluginDescriptor({
    content: new NoOpContentPlugin(),
    telemetry: new DefaultTelemetryPlugin(),
    event: new DefaultEventPlugin(),
  });
}
