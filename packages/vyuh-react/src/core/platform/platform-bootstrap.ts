import { PluginDescriptor } from '../plugins/plugin-descriptor';
import { FeatureDescriptor } from '../feature-descriptor';
import { useVyuhStore } from '../vyuh-provider';
import { PlatformComponentBuilder } from '../platform-component-builder';
import { InitState } from './platform-init-tracker';
import { systemReadyEvent } from '../plugins/event/default-event-plugin';

/**
 * Bootstrap options for the Vyuh platform
 */
interface BootstrapOptions {
  /**
   * Plugin descriptor containing all plugins to be loaded
   */
  plugins: PluginDescriptor;

  /**
   * Function that returns a list of features or a promise that resolves to a list of features
   */
  features: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>;

  /**
   * Platform component builder
   */
  components: PlatformComponentBuilder;

  /**
   * Optional initial location for the router
   */
  initialLocation?: string;
}

/**
 * Bootstrap the Vyuh platform
 * This is the entry point for initializing the platform
 */
export async function bootstrap(options: BootstrapOptions): Promise<void> {
  const { plugins, features, components, initialLocation } = options;
  const store = useVyuhStore.getState();

  store.init({ plugins, components });

  try {
    const telemetry = plugins.telemetry;
    const trace = await telemetry.startTrace('Platform', 'Bootstrap');

    try {
      const pluginsTrace = await trace.startChild('Plugins', 'Init');
      try {
        await initPlugins(plugins);
        store.setInitState(InitState.plugins);
      } finally {
        await pluginsTrace.stop();
      }

      // Load features (set state AFTER loading)
      const featuresTrace = await trace.startChild('Features', 'Load');
      try {
        const loadedFeatures = await loadFeatures(features);
        store.setFeatures(loadedFeatures);
        store.setInitState(InitState.features);
      } finally {
        await featuresTrace.stop();
      }

      // Mark as ready
      store.setInitState(InitState.ready);

      // Emit ready event if we have an event system
      if (plugins.event) {
        plugins.event.emit(systemReadyEvent);
      }
    } finally {
      await trace.stop();
    }
  } catch (error) {
    const finalError =
      error instanceof Error ? error : new Error(String(error));

    console.error('Bootstrap failed:', finalError);
    store.setError(finalError);

    // Report error to telemetry
    if (plugins.telemetry) {
      await plugins.telemetry.reportError(finalError);
    }
  }
}

/**
 * Initialize all plugins
 */
async function initPlugins(plugins: PluginDescriptor): Promise<void> {
  const telemetry = plugins.telemetry;

  // First dispose any existing plugins
  await Promise.all(plugins.plugins.map((plugin) => plugin.dispose()));

  // First initialize preloaded plugins
  const preloadedPlugins = plugins.plugins.filter(
    (plugin) => plugin.isPreloaded,
  );
  for (const plugin of preloadedPlugins) {
    const pluginTrace = await telemetry.startTrace(
      `Plugin: ${plugin.name}`,
      'Init',
    );
    try {
      await plugin.init();
      telemetry.log(`Plugin initialized: ${plugin.name}`, 'info');
    } catch (error) {
      const finalError =
        error instanceof Error ? error : new Error(String(error));

      telemetry.reportError(finalError, {
        params: { plugin: plugin.name },
        fatal: false,
      });
      throw error;
    } finally {
      await pluginTrace.stop();
    }
  }

  // Then initialize non-preloaded plugins
  const regularPlugins = plugins.plugins.filter(
    (plugin) => !plugin.isPreloaded,
  );
  for (const plugin of regularPlugins) {
    const pluginTrace = await telemetry.startTrace(
      `Plugin: ${plugin.name}`,
      'Init',
    );
    try {
      await plugin.init();
      telemetry.log(`Plugin initialized: ${plugin.name}`, 'info');
    } catch (error) {
      const finalError =
        error instanceof Error ? error : new Error(String(error));

      await telemetry.reportError(finalError, {
        params: { plugin: plugin.name },
        fatal: false,
      });
      throw error;
    } finally {
      await pluginTrace.stop();
    }
  }
}

/**
 * Load all features
 */
async function loadFeatures(
  featuresBuilder: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>,
): Promise<FeatureDescriptor[]> {
  const store = useVyuhStore.getState();
  const telemetry = store.plugins.telemetry;

  const featuresTrace = await telemetry.startTrace('Features', 'Load');
  try {
    const features = await featuresBuilder();

    // Validate feature names are unique
    const featureNames = new Set<string>();
    for (const feature of features) {
      if (featureNames.has(feature.name)) {
        throw new Error(`Feature name "${feature.name}" is not unique`);
      }
      featureNames.add(feature.name);
    }

    // Log loaded features
    telemetry.log(`Loaded ${features.length} features`, 'info', {
      featureNames: features.map((f) => f.name).join(', '),
    });

    return features;
  } catch (error) {
    const finalError =
      error instanceof Error ? error : new Error(String(error));

    telemetry.reportError(finalError, {
      params: { context: 'loadFeatures' },
      fatal: true,
    });
    throw error;
  } finally {
    await featuresTrace.stop();
  }
}
