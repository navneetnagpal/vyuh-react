// Helper type that works with protected constructors and abstract classes
export type ItemType<T> = Function & { prototype: T };
