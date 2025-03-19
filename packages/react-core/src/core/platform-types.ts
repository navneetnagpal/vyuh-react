export enum InitState {
  notStarted = 'not_started',
  plugins = 'plugins',
  features = 'features',
  ready = 'ready',
  error = 'error',
}

// Helper type that works with protected constructors and abstract classes
export type ItemType<T> = Function & { prototype: T };
