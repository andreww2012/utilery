import {defineConfig} from 'vitest/config';

// Separate config: the published-DTS consumer check needs an already-built
// `dist/` (it packs the tarball), so it must not run in the default `nr t`
// dev loop, only via `nr test:types:consumer`, after `nr build`
export default defineConfig({
  test: {
    include: ['test/published-dts/**/*.test.ts'],
    globals: true,
  },
});
