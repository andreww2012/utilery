import fs from 'node:fs';
import path from 'node:path';
import type {OutputOptions, PreRenderedChunk} from 'rolldown';
import {defineConfig} from 'tsdown';

const utilityGroups = fs
  .readdirSync(path.join(import.meta.dirname, 'src'), {withFileTypes: true})
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .map((entry) => entry.name);

// `<anything>/node_modules/<package>/<file>`, where `<anything>` may hold other `node_modules`,
// like `node_modules/.pnpm/<store directory>/` does
const BUNDLED_FILE_REGEX =
  /^(?<directory>.*\/)?node_modules\/(?<name>(?:@[^/]+\/)?[^/]+)\/(?<file>.+)$/;

// Puts the files of bundled packages in `vendor/<package>/` instead of the long paths they have in
// `node_modules`: other bundles show these paths in their comments, and some Windows tools fail on
// paths longer than 260 characters
const shortenBundledFileNames = (options: OutputOptions): OutputOptions => {
  const packageDirectories = new Map<string, string>();
  const toShortName = (chunkName: string) => {
    // In case Windows separators get here
    const groups = BUNDLED_FILE_REGEX.exec(chunkName.replaceAll('\\', '/'))?.groups;
    if (!groups?.name || !groups.file) {
      return chunkName;
    }

    const {directory = '', name, file} = groups;
    const knownDirectory = packageDirectories.get(name);
    if (knownDirectory != null && knownDirectory !== directory) {
      throw new Error(
        `Two copies of \`${name}\` are bundled (from \`${knownDirectory}\` and \`${directory}\`), but they would share \`vendor/${name}/\`. Make them one with an override in \`pnpm-workspace.yaml\`, or, if the code needs both, change \`tsdown.config.ts\` to give each copy its own directory.`,
      );
    }

    packageDirectories.set(name, directory);
    return `vendor/${name}/${file}`;
  };
  const withShortNames =
    (fileNames: OutputOptions['entryFileNames']) => (chunk: PreRenderedChunk) =>
      (typeof fileNames === 'function' ? fileNames(chunk) : fileNames || '[name].mjs').replaceAll(
        '[name]',
        () => toShortName(chunk.name),
      );

  return {
    ...options,
    entryFileNames: withShortNames(options.entryFileNames),
    chunkFileNames: withShortNames(options.chunkFileNames),
  };
};

export default defineConfig({
  entry: [
    'src/index.ts',
    ...utilityGroups.map((groupName) => `src/${groupName}/index.ts`),
    'src/*/*.global.ts', // Side-effect-only global augmentations not imported anywhere
  ],
  format: 'esm',
  unbundle: true,
  dts: true,
  outputOptions: shortenBundledFileNames,
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
