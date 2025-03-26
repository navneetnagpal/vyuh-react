import { vyuh } from '@vyuh/sanity-plugin-structure';
import { system } from '@vyuh/sanity-schema-system';
import { defineConfig } from 'sanity';
import { marketing } from './features/marketing';

export default defineConfig({
  name: 'default',
  title: 'Vyuh React',

  projectId: 'm8cqo9kc',
  dataset: 'production',

  plugins: [
    vyuh({
      features: [system, marketing],
    }),
  ],
});
