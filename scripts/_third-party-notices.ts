import fs from 'node:fs';
import path from 'node:path';
import packageJson from '../package.json' with {type: 'json'};
import {type MaybeArray, arrayify, jsonParse, once} from '../src/index.ts';
import {findUpSync} from '../src/server/find-up.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
export const NOTICES_PATH = path.join(ROOT, 'THIRD_PARTY_NOTICES.md');

// The package name in a license text heading, like `### `name``
const LICENSE_TEXT_PACKAGE_NAME_REGEX = /(?<=^### `)[^`]+(?=`$)/gm;

interface InstalledPackageJson {
  name: string;
  version: string;
  license?: string;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
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

// pnpm cuts long names of its store directories and adds a hash, which can drop the version (on
// Windows, it cuts names longer than 60 characters, which includes every patched package). So
// packages are found the way Node.js finds them: our direct dependencies from the root, and the
// others from the packages that depend on them
const collectInstalledPackages = once(() => {
  // By real directory, as a package is reached from each package that depends on it
  const installedPackages = new Map<string, InstalledPackageJson>();

  const visit = (name: string, cwd: string) => {
    const packageJsonPath = findUpSync(path.join('node_modules', name, 'package.json'), {
      cwd,
      stopAt: ROOT,
    });
    // Not found for optional dependencies that aren't installed, and from the root for indirect ones
    if (packageJsonPath == null) {
      return;
    }

    const directory = fs.realpathSync(path.dirname(packageJsonPath));
    if (installedPackages.has(directory)) {
      return;
    }

    const installedPackageJson = jsonParse<InstalledPackageJson>(
      fs.readFileSync(packageJsonPath, 'utf8'),
    );
    installedPackages.set(directory, installedPackageJson);
    const {dependencies, optionalDependencies, peerDependencies} = installedPackageJson;
    Object.keys({...dependencies, ...optionalDependencies, ...peerDependencies}).forEach(
      (dependencyName) => {
        visit(dependencyName, directory);
      },
    );
  };

  Object.keys(packageJson.inlinedDependencies).forEach((name) => {
    visit(name, ROOT);
  });
  return [...installedPackages.values()];
});

export const readInstalledPackageJson = ({name, version}: BundledPackage) => {
  const installedPackageJson = collectInstalledPackages().find(
    (candidate) => candidate.name === name && candidate.version === version,
  );
  if (installedPackageJson == null) {
    throw new Error(`Cannot locate the installed package "${name}@${version}".`);
  }

  return installedPackageJson;
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
