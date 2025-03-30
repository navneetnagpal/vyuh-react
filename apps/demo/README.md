# Vyuh Demo App

## Getting Autocomplete to work inside WebStorm

1. Open the settings for Tailwindcss:
   `File > Settings > Languages & Frameworks > Style Sheets > Tailwind CSS`
2. Make sure your configuration for looks like below:

```json5
{
  // Rest of the config

  experimental: {
    configFile: {
      'apps/demo/app/globals.css': [
        'features/blog/react-feature-blog/src/**',
        'features/marketing/react-feature-marketing/src/**',
        // Add more features if needed
      ],
    },
  },
}
```
