# @vyuh/react-feature-system

<p align="center">
  <img src="https://github.com/vyuh-tech.png" alt="Vyuh Logo" width="200" />
</p>

<p align="center">
  <strong>Core building blocks for creating content-driven React applications</strong>
</p>

<p align="center">
  <a href="https://vyuh.tech">Website</a> •
  <a href="https://docs.vyuh.tech">Documentation</a> •
  <a href="https://github.com/vyuh-tech/vyuh">GitHub</a>
</p>

[![npm version](https://img.shields.io/npm/v/@vyuh/react-feature-system.svg?style=for-the-badge)](https://www.npmjs.com/package/@vyuh/react-feature-system)

## Overview ✨

`@vyuh/react-feature-system` provides a comprehensive set of content components
and layouts for building content-driven applications with the Vyuh framework. It
includes:

- **Content Components**: Ready-to-use components for common content types
- **Layout System**: Flexible layouts for different content presentation needs
- **Conditional Logic**: Components for conditional rendering based on rules
- **Rich Text Support**: Portable text rendering with customizable components

## Installation 📦

```bash
npm install @vyuh/react-feature-system
# or
yarn add @vyuh/react-feature-system
# or
pnpm add @vyuh/react-feature-system
```

## Usage 💡

### Basic Setup

Include the system feature in your Vyuh application:

```tsx
import { VyuhProvider } from '@vyuh/react-core';
import { feature as systemFeature } from '@vyuh/react-feature-system';

function App() {
  return (
    <VyuhProvider features={() => [systemFeature]} plugins={yourPlugins}>
      <YourApp />
    </VyuhProvider>
  );
}
```

### Using Content Components

The content components can be used directly or through the content system:

```tsx
import { Card, Group, PortableText } from '@vyuh/react-feature-system';
import { useVyuh } from '@vyuh/react-core';

function MyComponent() {
  const { plugins } = useVyuh();

  // Render content from CMS
  return plugins.content.render({
    _type: 'vyuh.card',
    title: 'My Card',
    description: 'This is a card component',
    image: {
      /* image reference */
    },
  });
}
```

### Creating Custom Layouts

You can extend the system with custom layouts:

```tsx
import { LayoutConfiguration, TypeDescriptor } from '@vyuh/react-core';
import { Card } from '@vyuh/react-feature-system';

class MyCustomCardLayout extends LayoutConfiguration<Card> {
  static readonly schemaName = 'my-feature.card.layout.custom';
  static typeDescriptor = new TypeDescriptor(this.schemaName, this);

  constructor() {
    super({
      schemaType: MyCustomCardLayout.schemaName,
      title: 'Custom Card Layout',
    });
  }

  render(content: Card) {
    return (
      <div className="my-custom-card">
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        {/* Custom rendering logic */}
      </div>
    );
  }
}
```

Then include your custom layout in your feature descriptor:

```tsx
import { FeatureDescriptor } from '@vyuh/react-core';
import { ContentExtensionDescriptor } from '@vyuh/react-extension-content';
import { CardDescriptor } from '@vyuh/react-feature-system';
import { Command } from 'lucide-react';
import React from 'react';

// Import your custom layout
import { MyCustomCardLayout } from './layouts/my-custom-card-layout';

export const myFeature = new FeatureDescriptor({
  name: 'my-feature',
  title: 'My Feature',
  description: 'A custom feature with custom layouts',
  icon: <Command />,

  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        // Include your custom layout in the CardDescriptor
        new CardDescriptor({
          layouts: [MyCustomCardLayout.typeDescriptor],
        }),
        // Other content descriptors
      ],
      contentBuilders: [
        // Your content builders
      ],
    }),
  ],

  // Initialization logic
  init: async () => {
    console.log('My feature with custom layouts initialized');
  },
});
```

## Core Components 🧩

### Content Types

The package includes the following content types:

| Component            | Description                                     |
| -------------------- | ----------------------------------------------- |
| `Route`              | Page-level content container with regions       |
| `Card`               | Versatile content card with various layouts     |
| `Group`              | Container for organizing multiple content items |
| `Accordion`          | Collapsible content sections                    |
| `PortableText`       | Rich text content with embedded blocks          |
| `Divider`            | Visual separator between content sections       |
| `VideoPlayer`        | Video playback component                        |
| `APIContent`         | Dynamic content from API endpoints              |
| `ConditionalContent` | Content that renders based on conditions        |
| `ConditionalRoute`   | Routes that render based on conditions          |

### Layouts

Each content type supports multiple layouts:

- **Card Layouts**: Different card presentations (basic, featured, etc.)
- **Group Layouts**: Various ways to organize groups (grid, carousel, etc.)
- **Route Layouts**: Page layouts with different region configurations

## Styling 🎨

The package includes built-in styles using Tailwind CSS:

```tsx
// Import the styles in your application
import '@vyuh/react-feature-system/styles.css';
```

You can customize the appearance by:

1. Using the provided CSS variables
2. Overriding the Tailwind classes
3. Creating custom layouts with your own styling

## Documentation 📚

For more detailed documentation, visit [docs.vyuh.tech](https://docs.vyuh.tech).

## Contributing 🤝

We welcome contributions to the Vyuh platform! Please see our
[contributing guidelines](https://github.com/vyuh-tech/vyuh/blob/main/CONTRIBUTING.md)
for more information.

## License 📄

MIT © [Vyuh Technologies](https://vyuh.tech)
