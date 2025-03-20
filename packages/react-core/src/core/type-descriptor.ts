import { SchemaItem } from '@/content/schema-item';

export class TypeDescriptor<T extends SchemaItem> implements SchemaItem {
  private _sourceFeature?: string;

  get sourceFeature() {
    return this._sourceFeature;
  }

  setSourceFeature(feature?: string) {
    this._sourceFeature = feature;
  }

  constructor(
    public readonly schemaType: string,
    public readonly fromJson: new (props?: Partial<T>) => T,
  ) {}
}
