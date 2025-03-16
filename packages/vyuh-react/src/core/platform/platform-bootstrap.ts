import { PluginDescriptor } from '../plugins/plugin-descriptor';
import { FeatureDescriptor } from '../feature-descriptor';
import { useVyuhStore } from '../vyuh-provider';
import { PlatformComponentBuilder } from '../platform-component-builder';
import { InitState } from './platform-init-tracker';

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
  
  // Initialize store with components and plugins
  store.init({ plugins, components });
  
  try {
    // Start telemetry trace for platform initialization
    const telemetry = plugins.telemetry;
    const trace = await telemetry.startTrace('Platform', 'Bootstrap');
    
    try {
      // Initialize plugins
      store.setInitState(InitState.plugins);
      const pluginsTrace = await trace.startChild('Plugins', 'Init');
      try {
        await initPlugins(plugins);
      } finally {
        await pluginsTrace.stop();
      }
      
      // Load features
      store.setInitState(InitState.features);
      const featuresTrace = await trace.startChild('Features', 'Load');
      try {
        const loadedFeatures = await loadFeatures(features);
        store.setFeatures(loadedFeatures);
      } finally {
        await featuresTrace.stop();
      }
      
      // Mark as ready
      store.setInitState(InitState.ready);
      
      // Emit ready event if we have an event system
      if (plugins.event) {
        plugins.event.emit('system:ready');
      }
    } finally {
      await trace.stop();
    }
  } catch (error) {
    console.error('Bootstrap failed:', error);
    store.setError(error instanceof Error ? error : new Error(String(error)));
    
    // Report error to telemetry
    if (plugins.telemetry) {
      plugins.telemetry.reportError(error);
    }
  }
}

/**
 * Initialize all plugins
 */
async function initPlugins(plugins: PluginDescriptor): Promise<void> {
  const telemetry = plugins.telemetry;
  
  // First dispose any existing plugins
  await Promise.all(plugins.plugins.map(plugin => plugin.dispose()));
  
  // First initialize preloaded plugins
  const preloadedPlugins = plugins.plugins.filter(plugin => plugin.isPreloaded);
  for (const plugin of preloadedPlugins) {
    const pluginTrace = await telemetry.startTrace(`Plugin: ${plugin.name}`, 'Init');
    try {
      await plugin.init();
      telemetry.log(`Plugin initialized: ${plugin.name}`, 'info');
    } catch (error) {
      telemetry.reportError(error, {
        params: { plugin: plugin.name },
        fatal: false
      });
      throw error;
    } finally {
      await pluginTrace.stop();
    }
  }
  
  // Then initialize non-preloaded plugins
  const regularPlugins = plugins.plugins.filter(plugin => !plugin.isPreloaded);
  for (const plugin of regularPlugins) {
    const pluginTrace = await telemetry.startTrace(`Plugin: ${plugin.name}`, 'Init');
    try {
      await plugin.init();
      telemetry.log(`Plugin initialized: ${plugin.name}`, 'info');
    } catch (error) {
      telemetry.reportError(error, {
        params: { plugin: plugin.name },
        fatal: false
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
  featuresBuilder: () => FeatureDescriptor[] | Promise<FeatureDescriptor[]>
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
      featureNames: features.map(f => f.name).join(', ')
    });
    
    return features;
  } catch (error) {
    telemetry.reportError(error, {
      params: { context: 'loadFeatures' },
      fatal: true
    });
    throw error;
  } finally {
    await featuresTrace.stop();
  }
}