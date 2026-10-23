// Shared by `generate-third-party-notices.ts` and the published package tests

import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..');
const DIST_NODE_MODULES = path.join(ROOT, 'dist', 'node_modules');
// The actual set of bundled packages is whatever `tsdown` emits here, which includes
// transitively bundled dependencies the declared `BUNDLED_PACKAGES` list does not track
export const DIST_PNPM = path.join(DIST_NODE_MODULES, '.pnpm');
export const NOTICES_PATH = path.join(ROOT, 'THIRD_PARTY_NOTICES.md');

// The package name in a license text heading, like `### `name``
const LICENSE_TEXT_PACKAGE_NAME_REGEX = /(?<=^### `)[^`]+(?=`$)/gm;

// The packages of a pnpm virtual store directory, like `dist/node_modules/.pnpm`
export const collectStorePackageNames = (storePath: string) => {
  const names = new Set<string>();

  fs.readdirSync(storePath).forEach((storeEntry) => {
    const entryNodeModules = path.join(storePath, storeEntry, 'node_modules');
    if (fs.existsSync(entryNodeModules)) {
      fs.readdirSync(entryNodeModules).forEach((scopeOrName) => {
        if (scopeOrName.startsWith('@')) {
          fs.readdirSync(path.join(entryNodeModules, scopeOrName)).forEach((scopedName) => {
            names.add(`${scopeOrName}/${scopedName}`);
          });
        } else {
          names.add(scopeOrName);
        }
      });
    }
  });

  return names;
};

// Bundled packages can ship packages they bundled themselves in a store of their own (`ms-ts`
// includes the types of `ts-arithmetic`), which aren't installed for us to read their versions
const collectAllBundledPackageNames = () =>
  new Set(
    fs
      .readdirSync(DIST_NODE_MODULES, {recursive: true, encoding: 'utf8'})
      .filter((relativePath) => path.basename(relativePath) === '.pnpm')
      .flatMap((relativePath) => [
        ...collectStorePackageNames(path.join(DIST_NODE_MODULES, relativePath)),
      ]),
  );

// The license texts below the table are written by hand, so nothing else notices a missing one or
// one left behind by a package that is no longer bundled
export const findLicenseTextMismatches = (noticesText: string) => {
  const documented = new Set(noticesText.match(LICENSE_TEXT_PACKAGE_NAME_REGEX));
  const bundled = collectAllBundledPackageNames();
  return {
    missing: [...bundled].filter((name) => !documented.has(name)).toSorted(),
    unused: [...documented].filter((name) => !bundled.has(name)).toSorted(),
  };
};
