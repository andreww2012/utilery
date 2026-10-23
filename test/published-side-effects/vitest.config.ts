import {defineConfig} from 'vitest/config';

// Separate config: the check needs an already-built `dist/`, so it must not run in the default
// `nr t` dev loop, only via `nr test:side-effects`, after `nr build`
export default defineConfig({
  test: {
    include: ['test/published-side-effects/**/*.test.ts'],
    globals: true,
  },
});
