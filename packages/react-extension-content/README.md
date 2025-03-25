# @vyuh/react-extension-content

<p align="center">
  <img src="https://github.com/vyuh-tech.png" alt="Vyuh Logo" width="200" />
</p>

<p align="center">
  <strong>Content management extension for the Vyuh React framework</strong>
</p>

<p align="center">
  <a href="https://vyuh.tech">Website</a> •
  <a href="https://docs.vyuh.tech">Documentation</a> •
  <a href="https://github.com/vyuh-tech/vyuh">GitHub</a>
</p>

An extension for integrating CMS content into Vyuh applications. This package
provides the core building blocks that can be leveraged by specific CMS
integrations.

[![npm version](https://img.shields.io/npm/v/@vyuh/react-extension-content.svg?style=for-the-badge)](https://www.npmjs.com/package/@vyuh/react-extension-content)

## Overview ✨

The content extension provides a flexible architecture for managing CMS-driven
content in your application:

1. **Content Types** define the structure of your content

   - Schema-based type definitions
   - Type-safe content models
   - Serialization support

2. **Content Builders**️ handle the creation and configuration of content
   instances

   - Map CMS data to React components
   - Configure default and custom layouts
   - Handle content validation and transformation

3. **Layout System** manages how content is rendered
   - Layouts are configured per content type
   - Default layouts handle common use cases
   - Custom layouts provide full control over rendering

## Installation 📦

```bash
npm install @vyuh/react-extension-content
# or
yarn add @vyuh/react-extension-content
# or
pnpm add @vyuh/react-extension-content
```

## Usage 💡

```tsx
import { ContentProvider, useContent } from '@vyuh/react-extension-content';

// In your app setup
function App() {
  return (
    <ContentProvider source={yourContentSource}>
      <YourApp />
    </ContentProvider>
  );
}

// In your components
function ContentDisplay() {
  const { content, isLoading, error } = useContent('your-content-id');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <YourContentRenderer content={content} />;
}
```

## Key Components 🔍

### ContentDescriptor

Defines the structure and available layouts for a content type:

```tsx
import { ContentDescriptor } from '@vyuh/react-extension-content';
import { TypeDescriptor } from '@vyuh/react-core';

const cardDescriptor = new ContentDescriptor({
  schemaType: 'my-feature.card',
  title: 'Card',
  layouts: [MyCardLayout.typeDescriptor],
});
```

### ContentBuilder

Handles the creation and rendering of content instances:

```tsx
import { ContentBuilder } from '@vyuh/react-extension-content';

class CardContentBuilder extends ContentBuilder {
  constructor() {
    super({
      schemaType: 'my-feature.card',
      defaultLayout: DefaultCardLayout,
    });
  }

  // Custom rendering logic if needed
}
```

### DefaultContentPlugin

Provides a ready-to-use implementation of the ContentPlugin interface:

```tsx
import { DefaultContentPlugin } from '@vyuh/react-extension-content';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';

const contentProvider = new SanityContentProvider(
  // Sanity configuration
  {
    projectId: 'your-project-id',
    dataset: 'production'
  }
);

const contentPlugin = new DefaultContentPlugin(contentProvider);
```

### AsyncContentContainer

Handles loading states and error boundaries for async content:

```tsx
import { AsyncContentContainer } from '@vyuh/react-extension-content';

function MyComponent() {
  return (
    <AsyncContentContainer
      fetchContent={() => api.fetchData()}
      renderContent={(data) => <MyRenderer data={data} />}
      errorTitle="Failed to load content"
    />
  );
}
```

## Integration with Vyuh Core 🔗

This package integrates with `@vyuh/react-core` to provide a complete content
management solution:

```tsx
import { VyuhProvider, PluginDescriptor } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';

function App() {
  return (
    <VyuhProvider
      features={getFeatures}
      plugins={
        new PluginDescriptor({
          content: new DefaultContentPlugin(yourContentProvider),
        })
      }
    >
      <YourApp />
    </VyuhProvider>
  );
}
```

## Documentation 📚

For more detailed documentation, visit [docs.vyuh.tech](https://docs.vyuh.tech).

## Contributing 🤝

We welcome contributions to the Vyuh platform! Please see our
[contributing guidelines](https://github.com/vyuh-tech/vyuh/blob/main/CONTRIBUTING.md)
for more information.

## License 📄

MIT © [Vyuh Technologies](https://vyuh.tech)
