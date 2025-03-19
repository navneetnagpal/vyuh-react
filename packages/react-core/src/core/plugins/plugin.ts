/**
 * Base class for all plugins in the Vyuh platform.
 * Plugins provide extended functionality to the platform.
 */
export abstract class Plugin {
  /**
   * Unique name of the plugin
   */
  readonly name: string;
  
  /**
   * Display title of the plugin
   */
  readonly title: string;
  
  /**
   * Indicates whether this plugin should be loaded before the platform initialization
   * When true, the plugin will be initialized early in the bootstrap process
   */
  readonly isPreloaded: boolean;
  
  /**
   * Creates a new plugin instance
   * 
   * @param name Unique identifier for the plugin
   * @param title Human-readable title for the plugin
   * @param isPreloaded Whether this plugin should be loaded before platform initialization
   */
  constructor(name: string, title: string, isPreloaded: boolean = false) {
    this.name = name;
    this.title = title;
    this.isPreloaded = isPreloaded;
  }
  
  /**
   * Initialize the plugin
   * This is called during platform initialization
   */
  abstract init(): Promise<void>;
  
  /**
   * Clean up resources when the plugin is no longer needed
   * This is called during platform shutdown
   */
  abstract dispose(): Promise<void>;
}