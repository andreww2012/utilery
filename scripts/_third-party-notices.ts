import fs from 'node:fs';
import path from 'node:path';
import packageJson from '../package.json' with {type: 'json'};
import {type MaybeArray, arrayify, jsonParse} from '../src/index.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const PNPM_STORE = path.join(ROOT, 'node_modules', '.pnpm');
export const NOTICES_PATH = path.join(ROOT, 'THIRD_PARTY_NOTICES.md');

// The package name in a license text heading, like `### `name``
const LICENSE_TEXT_PACKAGE_NAME_REGEX = /(?<=^### `)[^`]+(?=`$)/gm;

interface InstalledPackageJson {
  version: string;
  license?: string;
  // The shape is not settled yet (https://github.com/e18e/ecosystem-issues/issues/237): `tsdown`
  // writes a record of versions, with an array when a package is inlined in several versions
  inlinedDependencies?: string[] | Record<string, MaybeArray<string>>;
}

interface BundledPackage {
  name: string;
  version: string;
}

export const collectBundledPackages = () =>
  Object.entries(packageJson.inlinedDependencies).flatMap(([name, versions]) =>
    arrayify(versions).map<BundledPackage>((version) => ({name, version})),
  );

// Unlike the top-level `node_modules`, pnpm's virtual store has every installed version. It names
// their directories like `@scope+name@1.0.0`, with a suffix like `_patch_hash=...` if needed
export const readInstalledPackageJson = ({name, version}: BundledPackage) => {
  const storeEntryName = `${name.replace('/', '+')}@${version}`;
  const storeEntry = fs
    .readdirSync(PNPM_STORE)
    .find((entry) => entry === storeEntryName || entry.startsWith(`${storeEntryName}_`));
  if (storeEntry == null) {
    throw new Error(`Cannot locate the installed package "${name}@${version}".`);
  }

  return jsonParse<InstalledPackageJson>(
    fs.readFileSync(
      path.join(PNPM_STORE, storeEntry, 'node_modules', name, 'package.json'),
      'utf8',
    ),
  );
};

// Bundled packages can bundle packages of their own, which aren't installed for us to read their
// versions, but are listed in their `inlinedDependencies` (`ms-ts` has the types of `ts-arithmetic`
// inlined)
const collectAllBundledPackageNames = () => {
  const bundledPackages = collectBundledPackages();
  return new Set([
    ...bundledPackages.map(({name}) => name),
    ...bundledPackages.flatMap((bundledPackage) => {
      const {inlinedDependencies} = readInstalledPackageJson(bundledPackage);
      return Array.isArray(inlinedDependencies)
        ? inlinedDependencies
        : Object.keys(inlinedDependencies || {});
    }),
  ]);
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
