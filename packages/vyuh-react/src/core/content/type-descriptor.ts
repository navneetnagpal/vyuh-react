import { z } from 'zod';

/**
 * TypeDescriptor defines a schema type and its validation/conversion behavior.
 *
 * Similar to the Dart implementation, it provides:
 * - Schema type identification
 * - JSON validation and conversion
 * - Human-readable title
 * - Optional preview generation
 */
export class TypeDescriptor<T> {
  /**
   * Human-readable name for this type.
   * Used in UI components and error messages.
   */
  readonly title: string;

  /**
   * Schema type identifier from the CMS.
   * Must match the type name defined in the CMS schema.
   */
  readonly schemaType: string;

  /**
   * Zod schema for validating JSON data.
   */
  readonly schema: z.ZodType<T>;

  /**
   * Function to convert validated JSON data to an instance.
   */
  readonly fromJson: (json: any) => T | null;

  /**
   * Optional function to create a preview instance.
   * Used by design tools to show sample content.
   */
  readonly preview?: () => T;

  constructor({
    schemaType,
    title,
    schema,
    preview,
  }: {
    schemaType: string;
    title: string;
    schema: z.ZodType<T>;
    preview?: () => T;
  }) {
    this.schemaType = schemaType;
    this.title = title;
    this.schema = schema;
    this.fromJson = (json: any): T | null => {
      try {
        // Validate and transform with Zod
        const validatedData = this.schema.parse(json);
        // Use the validated data directly
        return validatedData as T;
      } catch (error) {
        console.error(`Validation error for ${this.schemaType}:`, error);
        return null;
      }
    };
    this.preview = preview;
  }
}
