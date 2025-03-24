# @vyuh/react-core

<p align="center">
  <img src="https://github.com/vyuh-tech.png" alt="Vyuh Logo" width="200" />
</p>

<p align="center">
  <strong>The core foundation for building modular, CMS-driven React applications</strong>
</p>

<p align="center">
  <a href="https://vyuh.tech">Website</a> •
  <a href="https://docs.vyuh.tech">Documentation</a> •
  <a href="https://github.com/vyuh-tech/vyuh">GitHub</a>
</p>

## Overview

`@vyuh/react-core` is the foundation of the Vyuh platform for CMS-driven React
applications. It provides a robust architecture for building modular,
feature-rich applications with a focus on:

- **Feature-based architecture**: Organize your application into self-contained
  features
- **Plugin system**: Extend functionality through a flexible plugin system
- **Content management**: Seamlessly integrate with headless CMS platforms
- **Type safety**: Built with TypeScript for enhanced developer experience

## Installation

```bash
# Using npm
npm install @vyuh/react-core

# Using yarn
yarn add @vyuh/react-core

# Using pnpm
pnpm add @vyuh/react-core
```

## Core Concepts

### Features

Features are the building blocks of your application. Each feature is a
self-contained module that can:

- Define its own UI components
- Register content types
- Provide extensions for other features
- Handle its own initialization and cleanup

### Plugins

Plugins extend the core functionality of the platform:

- **Content Plugin**: Connects to your CMS and renders content
- **Navigation Plugin**: Handles routing and navigation
- **Telemetry Plugin**: Collects analytics and logs
- **Event Plugin**: Manages application-wide events

### Content System

The content system provides a structured way to:

- Define content types with schemas
- Render content from various sources
- Configure layouts and styling
- Handle content-driven navigation

## Allied Packages

The Vyuh ecosystem includes several packages that work together:

| Package                                      | Description                          |
| -------------------------------------------- | ------------------------------------ |
| `@vyuh/react-core`                           | Core platform and architecture       |
| `@vyuh/react-extension-content`              | Content management system            |
| `@vyuh/react-feature-system`                 | System-level features and components |
| `@vyuh/react-plugin-content-provider-sanity` | Sanity.io content provider           |

## Getting Started

### Basic Setup

```tsx
import { VyuhProvider, PluginDescriptor } from '@vyuh/react-core';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { feature as systemFeature } from '@vyuh/react-feature-system';

// Configure your content provider
const contentProvider = SanityContentProvider.withConfig({
  config: {
    projectId: 'your-project-id',
    dataset: 'production',
    perspective: 'published',
    useCdn: true,
  },
  cacheDuration: 300000, // 5 minutes
});

// Configure plugins
const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(contentProvider),
});

// Define your features
const getFeatures = () => [
  systemFeature,
  // Your custom features
];

// Set up your application
function App() {
  return (
    <VyuhProvider features={getFeatures} plugins={plugins}>
      <YourApp />
    </VyuhProvider>
  );
}
```

### Router Integration

Vyuh works with your preferred routing solution. Here's an example with Next.js:

```tsx
import { RouterProvider } from './components/router-provider';
import { VyuhProvider } from '@vyuh/react-core';
import { NextNavigationPlugin } from './plugins/next-navigation-plugin';

// Configure plugins with navigation
const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(contentProvider),
  navigation: new NextNavigationPlugin(),
});

function App({ children }) {
  return (
    <VyuhProvider features={getFeatures} plugins={plugins}>
      <RouterProvider>{children}</RouterProvider>
    </VyuhProvider>
  );
}
```

And the router provider component:

```tsx
import { NextNavigationPlugin } from './plugins/next-navigation-plugin';
import { useVyuh } from '@vyuh/react-core';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function RouterProvider({ children }) {
  const router = useRouter();
  const { plugins } = useVyuh();
  const routerInitialized = useRef(false);

  useEffect(() => {
    if (
      plugins.navigation instanceof NextNavigationPlugin &&
      !routerInitialized.current
    ) {
      (plugins.navigation as NextNavigationPlugin).setRouter(router);
      routerInitialized.current = true;
    }
  }, [router, plugins.navigation]);

  return <>{children}</>;
}
```

### Creating a Feature

Features are the building blocks of your application:

```tsx
import { FeatureDescriptor } from '@vyuh/react-core';
import {
  ContentExtensionBuilder,
  ContentExtensionDescriptor,
} from '@vyuh/react-extension-content';
import { Command } from 'lucide-react';
import React from 'react';

// Import your content descriptors and builders
import { MyCardDescriptor } from './content/card/card-descriptor';
import { MyCardContentBuilder } from './content/card/card-builder';

export const myFeature = new FeatureDescriptor({
  name: 'my-feature',
  title: 'My Feature',
  description: 'A custom feature for my application',
  icon: <Command />, // Using Lucide icon

  // Extensions provided by this feature
  extensions: [
    new ContentExtensionDescriptor({
      contents: [
        new MyCardDescriptor(),
        // Other content descriptors
      ],
      contentBuilders: [
        new MyCardContentBuilder(),
        // Other content builders
      ],
      // Optional: register actions and conditions
      actions: [
        // Action type descriptors
      ],
      conditions: [
        // Condition type descriptors
      ],
    }),
    // Other extension descriptors
  ],

  // Initialization logic
  init: async () => {
    console.log('My feature initialized');
  },
});
```

### Using the Vyuh Hook

Access platform features and plugins from anywhere in your application:

```tsx
import { useVyuh } from '@vyuh/react-core';

function MyComponent() {
  const { features, plugins } = useVyuh();

  // Access content plugin
  const contentPlugin = plugins.content;

  // Render content
  return (
    <div>
      {contentPlugin.render({
        _type: 'myContentType',
        title: 'Hello World',
        // ...other content properties
      })}
    </div>
  );
}
```

## Contributing

We welcome contributions to the Vyuh platform! Please see our
[contributing guidelines](https://github.com/vyuh-tech/vyuh/blob/main/CONTRIBUTING.md)
for more information.

## License

MIT © [Vyuh Technologies](https://vyuh.tech)
