import {
  DisposeFunction,
  EventListener,
  EventPlugin,
  VyuhEvent,
} from '@/plugins/event/event-plugin';

/**
 * Default implementation of EventPlugin
 */
export class DefaultEventPlugin extends EventPlugin {
  private eventListeners: Map<string, Set<EventListener<any>>> = new Map();

  constructor() {
    super(
      'vyuh.plugin.event.default',
      'Default Event Plugin',
      true, // Event plugin should be preloaded
    );
  }

  async init(): Promise<void> {
    console.log(`[${this.name}] Initialized`);
  }

  async dispose(): Promise<void> {
    // Clear all event listeners
    this.eventListeners.clear();
    console.log(`[${this.name}] Disposed`);
  }

  /**
   * Subscribe to events of a specific type
   */
  on<T extends VyuhEvent>(listener: EventListener<T>): DisposeFunction {
    // We use the constructor name as the event type
    const eventType = this.getEventType<T>();

    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }

    const listeners = this.eventListeners.get(eventType)!;
    listeners.add(listener);

    // Return a dispose function
    return () => {
      const listeners = this.eventListeners.get(eventType);
      if (listeners) {
        listeners.delete(listener);
        if (listeners.size === 0) {
          this.eventListeners.delete(eventType);
        }
      }
    };
  }

  /**
   * Subscribe to a single occurrence of an event
   */
  once<T extends VyuhEvent>(listener: EventListener<T>): void {
    const dispose = this.on<T>((event: T) => {
      // Call the listener
      listener(event);

      // Unsubscribe after first call
      dispose();
    });
  }

  /**
   * Emit an event to all subscribers
   */
  emit<T extends VyuhEvent>(event: T): void {
    // If no timestamp is provided, add one
    if (!event.timestamp) {
      (event as any).timestamp = new Date();
    }

    // Get event type from the event's constructor
    const eventType = this.getEventTypeFromEvent(event);

    // Get listeners for this event type
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      // Call all listeners
      listeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
  }

  /**
   * Helper to get the event type string from a generic type parameter
   */
  private getEventType<T extends VyuhEvent>(): string {
    // For simplicity, we'll use the event name as the type
    // In a real implementation, you might use a more sophisticated approach
    return 'event';
  }

  /**
   * Helper to get the event type string from an event instance
   */
  private getEventTypeFromEvent(event: VyuhEvent): string {
    // Use the event name as the type
    return event.name;
  }
}

/**
 * Create a new event
 */
export function createEvent<T = void>(name: string, data?: T): VyuhEvent<T> {
  return new VyuhEvent<T>(name, data);
}

/**
 * System ready event
 */
export const systemReadyEvent = new VyuhEvent('vyuh.event.systemReady');
