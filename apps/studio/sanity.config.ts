import { vyuh } from '@vyuh/sanity-plugin-structure';
import { auth } from '@vyuh/sanity-schema-auth';
import { blog } from '@vyuh/sanity-schema-blog';
import { marketing } from '@vyuh/sanity-schema-marketing';
import { system } from '@vyuh/sanity-schema-system';
import { defineConfig } from 'sanity';
import { misc } from './features/misc';

export default defineConfig({
  name: 'default',
  title: 'Vyuh React',

  projectId: 'm8cqo9kc',
  dataset: 'production',

  plugins: [
    // @ts-ignore
    vyuh({
      features: [system, misc, marketing, blog, auth],
    }),
  ],
});
