# @vyuh/react-plugin-content-provider-sanity

<p align="center">
  <img src="https://github.com/vyuh-tech.png" alt="Vyuh Logo" width="200" />
</p>

<p align="center">
  <strong>Sanity.io content provider for the Vyuh React framework</strong>
</p>

<p align="center">
  <a href="https://vyuh.tech">Website</a> •
  <a href="https://docs.vyuh.tech">Documentation</a> •
  <a href="https://github.com/vyuh-tech/vyuh">GitHub</a>
</p>

[![npm version](https://img.shields.io/npm/v/@vyuh/react-plugin-content-provider-sanity.svg?style=for-the-badge)](https://www.npmjs.com/package/@vyuh/react-plugin-content-provider-sanity)

## Overview ✨

`@vyuh/react-plugin-content-provider-sanity` connects your Vyuh application to
Sanity.io, enabling you to fetch and display content from your Sanity CMS. This
package provides:

- **Content Fetching**: Retrieve content from Sanity using GROQ queries
- **Live Updates**: Real-time content updates with Sanity's Live Content API
- **Asset Handling**: Simplified image and file URL generation
- **Type Safety**: TypeScript support for content models

## Installation 📦

```bash
# Using npm
npm install @vyuh/react-plugin-content-provider-sanity

# Using yarn
yarn add @vyuh/react-plugin-content-provider-sanity

# Using pnpm
pnpm add @vyuh/react-plugin-content-provider-sanity
```

## Basic Usage 💡

### Configuration

```tsx
import { SanityContentProvider } from '@vyuh/react-plugin-content-provider-sanity';
import { DefaultContentPlugin } from '@vyuh/react-extension-content';
import { VyuhProvider, PluginDescriptor } from '@vyuh/react-core';

// Configure Sanity provider
const contentProvider = SanityContentProvider.withConfig({
  config: {
    projectId: 'your-project-id',
    dataset: 'production',
    perspective: 'published', // or 'drafts' for preview mode
    useCdn: true, // Set to false for real-time preview
    token: 'your-sanity-token', // Optional: for authenticated requests
  },
  cacheDuration: 300000, // 5 minutes cache (in milliseconds)
});

// Create content plugin with Sanity provider
const plugins = new PluginDescriptor({
  content: new DefaultContentPlugin(contentProvider),
  // Other plugins...
});

// Set up your application
function App() {
  return (
    <VyuhProvider features={getFeatures} plugins={plugins}>
      <YourApp />
    </VyuhProvider>
  );
}
```

### Fetching Content

The provider handles content fetching through the ContentPlugin interface:

```tsx
import { useVyuh } from '@vyuh/react-core';

function MyComponent() {
  const { plugins } = useVyuh();
  const { content } = plugins;

  // Fetch a single item by ID
  const fetchById = async () => {
    const item = await content.provider.fetchById('document-id');
    // Use the item...
  };

  // Fetch using a GROQ query
  const fetchWithQuery = async () => {
    const item = await content.provider.fetchSingle(
      '*[_type == "page" && slug.current == $slug][0]',
      { params: { slug: 'home' } },
    );
    // Use the item...
  };

  // Fetch multiple items
  const fetchMultiple = async () => {
    const items = await content.provider.fetchMultiple(
      '*[_type == "post"] | order(publishedAt desc)[0...10]',
    );
    // Use the items...
  };

  // Fetch a route by path
  const fetchRoute = async () => {
    const route = await content.provider.fetchRoute({ path: '/about' });
    // Use the route...
  };
}
```

### Live Updates

The Sanity provider includes support for real-time content updates using
Sanity's Live Content API. This allows your application to automatically update
when content changes in the Sanity studio without requiring a page refresh:

```tsx
import { AsyncContentContainer } from '@vyuh/react-extension-content';
import { useVyuh } from '@vyuh/react-core';
import { Observable } from 'rxjs';

function LiveContent() {
  const { plugins } = useVyuh();
  const { content } = plugins;

  // Check if live updates are supported
  if (!content.provider.supportsLive) {
    return <div>Live updates not supported</div>;
  }

  // Create a function that returns an Observable
  // This Observable will emit new values whenever the content changes in Sanity
  const fetchLiveContent = (): Observable<any> => {
    return content.provider.live.fetchSingle('*[_type == "settings"][0]');
  };

  return (
    <AsyncContentContainer
      fetchContent={fetchLiveContent}
      renderContent={(data) => <SettingsDisplay data={data} />}
      live={true} // Enable live updates mode
    />
  );
}
```

When using live updates:

- Content changes are pushed from Sanity in real-time
- No polling or manual refreshing is needed
- Updates are efficient, only sending the changed data
- Perfect for preview environments and collaborative editing

> **Tip:** The
> [`@vyuh/react-extension-content`](https://github.com/vyuh-tech/vyuh/tree/main/packages/react-extension-content)
> package provides a `RouteLoader` component that simplifies working with live
> routes. Simply set the `live` prop to `true`:
>
> ```tsx
> import { RouteLoader } from '@vyuh/react-extension-content';
>
> function LiveRoutePage() {
>   return (
>     <RouteLoader
>       path="/about"
>       live={true} // Enable live updates for this route
>     />
>   );
> }
> ```

## Advanced Features ⚙️

### Image URL Generation

Generate image URLs for rendering images from Sanity:

```tsx
function ImageComponent({ imageRef }) {
  const { plugins } = useVyuh();

  // imageRef is a Sanity image reference object from your content
  // Example: { _type: 'image', asset: { _ref: 'image-abc123-1200x800-jpg' } }
  const imageUrl = plugins.content.provider.image(imageRef);

  return (
    <img
      src={imageUrl}
      alt="My image"
      loading="lazy"
    />
  );
}
```

### File URL Generation

Generate file URLs for videos and other files stored in Sanity:

```tsx
function VideoPlayer({ videoRef }) {
  const { plugins } = useVyuh();

  // videoRef is a Sanity file reference object from your content
  // Example: { _type: 'file', asset: { _ref: 'file-abc123-mp4' } }
  const videoUrl = plugins.content.provider.fileUrl(videoRef);

  return (
    <video controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

// For other file types like PDFs
function DocumentViewer({ fileRef }) {
  const { plugins } = useVyuh();
  const fileUrl = plugins.content.provider.fileUrl(fileRef);

  return (
    <div>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        View Document
      </a>
    </div>
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
