import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'], // ESM only
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  injectStyle: true,
  minify: process.env.NODE_ENV === 'production',
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '// @vyuh/react-extension-content - Content extension for the Vyuh Framework',
    };
  },
});
