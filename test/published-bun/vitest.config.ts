import {defineConfig} from 'vitest/config';

// Separate config: the check needs an already-built `dist/` and Bun, so it must not run in the
// default `nr t` dev loop, only via `nr test:dist:bun`, after `nr build`
export default defineConfig({
  test: {
    include: ['test/published-bun/**/*.test.ts'],
    globals: true,
  },
});
