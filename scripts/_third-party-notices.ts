// Shared by `generate-third-party-notices.ts` and the published package tests

import fs from 'node:fs';
import path from 'node:path';
import {jsonParse} from '../src/json/json-parse.ts';
import type {MaybeArray} from '../src/types/maybe-array.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const PNPM_STORE = path.join(NODE_MODULES, '.pnpm');
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

const resolvePackageJsonPath = (packageName: string) => {
  const directPath = path.join(NODE_MODULES, packageName, 'package.json');
  if (fs.existsSync(directPath)) {
    return directPath;
  }

  // Transitively bundled dependencies live only in pnpm's virtual store, not at the top level
  const storePrefix = `${packageName.replaceAll('/', '+')}@`;
  const storeEntry = fs.readdirSync(PNPM_STORE).find((entry) => entry.startsWith(storePrefix));
  if (storeEntry == null) {
    throw new Error(`Cannot locate the installed package "${packageName}".`);
  }

  return path.join(PNPM_STORE, storeEntry, 'node_modules', packageName, 'package.json');
};

interface InstalledPackageJson {
  version: string;
  license?: string;
  // The shape is not settled yet (https://github.com/e18e/ecosystem-issues/issues/237): `tsdown`
  // writes a record of versions, with an array when a package is inlined in several versions
  inlinedDependencies?: string[] | Record<string, MaybeArray<string>>;
}

export const readInstalledPackageJson = (packageName: string) =>
  jsonParse<InstalledPackageJson>(fs.readFileSync(resolvePackageJsonPath(packageName), 'utf8'));

// Bundled packages can bundle packages of their own, which aren't installed for us to read their
// versions: into their files, listing them in `inlinedDependencies` (`ms-ts` has the types of
// `ts-arithmetic` inlined), or as a store of their own
const collectAllBundledPackageNames = () => {
  const storePackageNames = fs
    .readdirSync(DIST_NODE_MODULES, {recursive: true, encoding: 'utf8'})
    .filter((relativePath) => path.basename(relativePath) === '.pnpm')
    .flatMap((relativePath) => [
      ...collectStorePackageNames(path.join(DIST_NODE_MODULES, relativePath)),
    ]);
  // Only the packages of our own store are installed, so only they have a `package.json` to read
  const inlinedPackageNames = [...collectStorePackageNames(DIST_PNPM)].flatMap((name) => {
    const {inlinedDependencies} = readInstalledPackageJson(name);
    return Array.isArray(inlinedDependencies)
      ? inlinedDependencies
      : Object.keys(inlinedDependencies || {});
  });
  return new Set([...storePackageNames, ...inlinedPackageNames]);
};

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
