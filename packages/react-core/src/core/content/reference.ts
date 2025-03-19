/**
 * A reference to any content object in the content management system.
 * 
 * This interface represents a generic reference to any content item. It is used
 * to establish relationships between content items, such as references to
 * images, files, or other content types.
 * 
 * The `type` field indicates the type of reference (e.g., 'reference', 'image').
 * The `ref` field contains the unique identifier of the referenced content.
 * 
 * Example:
 * ```typescript
 * const ref: ObjectReference = {
 *   type: 'reference',
 *   ref: 'content-abc123',
 * };
 * ```
 */
export interface ObjectReference {
  type: string;
  ref: string;
}

/**
 * A reference to an image asset in the content management system.
 * 
 * This interface represents an image reference that can be used in content models.
 * It supports both direct asset references and Sanity-specific image assets.
 * 
 * Example:
 * ```typescript
 * const imageRef: ImageReference = {
 *   type: 'image',
 *   asset: { type: 'reference', ref: 'image-abc123' },
 * };
 * ```
 */
export interface ImageReference {
  type: string;
  asset?: ObjectReference;
  _sanityAsset?: string;
}

/**
 * A reference to a file asset in the content management system.
 * 
 * This interface represents a file reference that can be used in content models.
 * It supports file assets like PDFs, documents, or other binary files.
 * 
 * Example:
 * ```typescript
 * const fileRef: FileReference = {
 *   type: 'file',
 *   asset: { type: 'reference', ref: 'file-abc123' },
 * };
 * ```
 */
export interface FileReference {
  type: string;
  asset?: ObjectReference;
}