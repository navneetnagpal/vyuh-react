import { FeatureDescriptor } from '@vyuh/sanity-schema-core';
import { APIContentDescriptor } from '@vyuh/sanity-schema-system';
import { dummyJsonApi } from './dummyJsonApi';

export const misc = new FeatureDescriptor({
  name: 'misc',
  title: 'Miscellaneous',
  description:
    'Miscellaneous feature showing all capabilities of the Vyuh Framework.',
  contents: [
    new APIContentDescriptor({
      configurations: [dummyJsonApi],
    }),
  ],
});
