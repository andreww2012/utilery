import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      'test/**/fixtures/**',
      'test/published-bun/**',
      'test/published-dts/**',
      'test/published-side-effects/**',
      '.claude/worktrees/**', // cspell:disable-line
    ],
    globals: true,
    setupFiles: ['./test/setup.ts'],
    snapshotFormat: {
      min: true,
      // `indent` is implicitly set to 2 by default, but `min` cannot be used together with
      // non-falsy `indent` value
      indent: 0,
    },
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['html', 'json'],
      // Avoid "Error: ENOENT: no such file or directory, open 'coverage\.tmp\coverage-8.json'" in
      // watch mode
      clean: false,
      reportsDirectory: 'temp/coverage',
    },
    ui: true,
    open: false,
    typecheck: {
      enabled: true,
      tsconfig: './test/tsconfig.json',
      ignoreSourceErrors: true,
    },
  },
});
