import { Plugin } from '@/core/plugin';
import { ContentPlugin } from '@/plugins/content/content-plugin';
import { NoOpContentPlugin } from '@/plugins/content/noop-content-plugin';
import { DefaultEventPlugin } from '@/plugins/event/default-event-plugin';
import { EventPlugin } from '@/plugins/event/event-plugin';
import { NavigationPlugin } from '@/plugins/navigation/navigation-plugin';
import { NoOpNavigationPlugin } from '@/plugins/navigation/noop-navigation-plugin';
import { DefaultTelemetryPlugin } from '@/plugins/telemetry/default-telemetry-plugin';
import { TelemetryPlugin } from '@/plugins/telemetry/telemetry-plugin';

/**
 * Plugin descriptor for Vyuh platform
 */
export class PluginDescriptor {
  readonly content: ContentPlugin;
  readonly telemetry: TelemetryPlugin;
  readonly event: EventPlugin;
  readonly navigation: NavigationPlugin;

  constructor(props: Partial<PluginDescriptor> = {}) {
    this.content = props.content ?? PluginDescriptor.system.content;
    this.telemetry = props.telemetry ?? PluginDescriptor.system.telemetry;
    this.event = props.event ?? PluginDescriptor.system.event;
    this.navigation = props.navigation ?? PluginDescriptor.system.navigation;
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
    navigation: new NoOpNavigationPlugin(),
  });
}
