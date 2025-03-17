# Vyuh Feature System

[![npm version](https://img.shields.io/npm/v/@vyuh/feature-system.svg?style=flat-square)](https://www.npmjs.com/package/@vyuh/feature-system)

The system feature package for Vyuh React framework, providing essential content types, layouts, and utilities for building CMS-driven React applications.

## Features

- **Content Types**: Routes, Cards, Groups, etc.
- **Layouts**: Default and customizable layouts for content types
- **Utilities**: Helper functions for content management

## Installation

```bash
npm install @vyuh/feature-system
# or
yarn add @vyuh/feature-system
```

## Usage

### Register the Feature

```tsx
import { createVyuhApp } from '@vyuh/core';
import { feature as systemFeature } from '@vyuh/feature-system';

const app = createVyuhApp({
  features: [
    systemFeature,
    // other features...
  ]
});
```

### Use Route Components

```tsx
import { Route } from '@vyuh/feature-system';

// Create a route from JSON data
const route = Route.fromJson({
  _type: 'vyuh.route',
  path: '/home',
  title: 'Home Page',
  regions: [
    {
      title: 'Main Content',
      items: [
        // content items...
      ]
    }
  ]
});
```

## Documentation

For more detailed documentation, visit [docs.vyuh.tech](https://docs.vyuh.tech).

## License

MIT © Vyuh Tech