import { defineCliConfig } from 'sanity/cli';
import path from 'node:path';

export default defineCliConfig({
  api: {
    projectId: 'm8cqo9kc',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(
          __dirname,
          '../../features/marketing/sanity-schema-marketing/src',
        ),
      },
    },
  },
});
