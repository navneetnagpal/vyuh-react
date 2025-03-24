import { PortableText } from '@/content/portable-text/portable-text';
import { PortableTextConfig } from '@/content/portable-text/portable-text-config';
import { PortableText as SanityPortableText } from '@portabletext/react';
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import React from 'react';

/**
 * Default layout for Portable Text content
 */
export class DefaultPortableTextLayout extends LayoutConfiguration<PortableText> {
  static readonly schemaName: string = 'vyuh.portableText.layout.default';
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: DefaultPortableTextLayout.schemaName,
      title: 'Default Portable Text Layout',
    });
  }

  render(content: PortableText): React.ReactNode {
    return <DefaultPortableTextComponent portableText={content} />;
  }
}

/**
 * Default component used by the DefaultPortableTextLayout
 */
function DefaultPortableTextComponent({
  portableText,
}: {
  portableText: PortableText;
}) {
  if (!portableText.blocks || portableText.blocks.length === 0) {
    return null;
  }

  // Use the singleton components object
  const components = PortableTextConfig.shared.components;

  return (
    <SanityPortableText
      value={portableText.blocks}
      components={components}
      onMissingComponent={false}
    />
  );
}
