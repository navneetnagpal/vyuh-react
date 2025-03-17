import { TypeDescriptor } from './type-descriptor';

/**
 * Registry for content type descriptors.
 *
 * Manages the registration and retrieval of type descriptors
 * for different schema types.
 */
export class TypeRegistry {
  private _typeMap = new Map<string, TypeDescriptor<any>>();

  /**
   * Register a type descriptor.
   */
  register<T>(descriptor: TypeDescriptor<T>): void {
    // Store in flat map for quick lookup by schema type
    this._typeMap.set(descriptor.schemaType, descriptor);
  }

  /**
   * Convert JSON data to a typed instance using the appropriate descriptor.
   */
  fromJson<T>(json: any): T | null {
    const schemaType = json._type || json.schemaType;
    if (!schemaType) {
      console.warn('JSON object has no schema type', json);
      return null;
    }

    const descriptor = this._typeMap.get(schemaType);
    if (!descriptor) {
      console.warn(`No type descriptor found for schema type: ${schemaType}`);
      return null;
    }

    return descriptor.fromJson(json) as T | null;
  }

  /**
   * Get a type descriptor by schema type.
   */
  getDescriptor(schemaType: string): TypeDescriptor<any> | undefined {
    return this._typeMap.get(schemaType);
  }

  /**
   * Check if a schema type is registered.
   */
  hasType(schemaType: string): boolean {
    return this._typeMap.has(schemaType);
  }
}
