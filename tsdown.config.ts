import fs from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'tsdown';

const utilityGroups = fs
  .readdirSync(path.join(import.meta.dirname, 'src'), {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .map((entry) => entry.name);

export default defineConfig({
  entry: [
    'src/index.ts',
    ...utilityGroups.map((groupName) => `src/${groupName}/index.ts`),
    'src/*/*.global.ts', // Side-effect-only global augmentations not imported anywhere
  ],
  format: 'esm',
  unbundle: true,
  dts: true,
  // Without this, problems that attw and publint find don't make the build fail
  failOnWarn: true,
  attw: {
    profile: 'esm-only',
  },
  publint: true,
  // Writes `exports` and `inlinedDependencies`
  // (https://github.com/e18e/ecosystem-issues/issues/237) to `package.json`.
  // It also removes `main` there, so `publishConfig` adds it back when publishing
  exports: true,
});
