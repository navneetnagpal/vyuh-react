# Vyuh Extension Content 📦

An extension for integrating CMS content into Vyuh applications. This package provides the core building blocks that can be leveraged by specific CMS integrations.

## Overview ✨

The content extension provides a flexible architecture for managing CMS-driven content in your application:

1. **Content Types** 📝 define the structure of your content
   - Schema-based type definitions
   - Type-safe content models
   - Serialization support

2. **Content Builders** 🏗️ handle the creation and configuration of content instances
   - Map CMS data to React components
   - Configure default and custom layouts
   - Handle content validation and transformation

3. **Layout System** 🎨 manages how content is rendered
   - Layouts are configured per content type
   - Default layouts handle common use cases
   - Custom layouts provide full control over rendering

## Installation 📦

```bash
npm install @vyuh/extension-content
# or
yarn add @vyuh/extension-content
# or
pnpm add @vyuh/extension-content
```

## Usage 💡

```tsx
import { ContentProvider, useContent } from '@vyuh/extension-content';

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

## Learn More 📚

- Visit [docs.vyuh.tech](https://docs.vyuh.tech) for detailed documentation
- Check out the [GitHub repository](https://github.com/vyuh-tech/vyuh) for source code
- Report issues on the [issue tracker](https://github.com/vyuh-tech/vyuh/issues)

---

<p align="center">Made with ❤️ by <a href="https://vyuh.tech">Vyuh</a></p>