// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import {defineConfig} from 'npm-check-updates';
import {satisfies, tryParse} from 'verkit';
import packageJson from './package.json' with {type: 'json'};

// Like `npm:@types/node@24.0.0`
const NPM_ALIAS_REGEX = /^npm:(@?[^@]+)@/;

const CACHE_DIRECTORY = path.join(import.meta.dirname, 'node_modules/.cache/npm-check-updates');
fs.mkdirSync(CACHE_DIRECTORY, {recursive: true});

/** @type {Set<string>} */
const IGNORED_PACKAGES = new Set();

/**
 * Blocks *updating to* any version matching the given semver range for a package
 * (it does not restrict the version we update *from*).
 * Use to skip a known-broken release until a fix ships.
 * Each entry should document why it is blocked
 * @type {Record<string, string>}
 */
const IGNORED_PACKAGE_RANGES_TO_UPDATE = {
  // Pulls in rolldown-plugin-dts >=0.27, which false-errors on (or silently drops)
  // forward-referenced type exports when bundling DTS
  tsdown: '0.22.5',
};

/** @type {Set<string>} */
const PACKAGES_WITH_PINNED_MAJOR_VERSION = new Set(['@types/node']);

const PACKAGES_ON_PRERELEASE_CHANNEL = new Set([
  // Their `latest` dist-tag lags behind the prerelease channel we actually follow
  'eslint-config-un',
  'all-contributors-cli',
]);

const SRC_DIRECTORY = path.join(import.meta.dirname, 'src');
const EXTERNAL_IMPORT_REGEX = /(?<![\w.])(?:import\s*\(\s*|import\s+|from\s+)["']([^"']+)["']/g;

/**
 * The bundled set is emergent: `tsdown` runs with `unbundle: true` and no explicit bundle list,
 * so every external package `src/` imports ends up bundled.
 * Deriving it here (rather than hand-maintaining a list that drifts) keeps the "Bundled
 * utilities" ncu group correct on its own.
 * Reading `dist/` instead is not an option: ncu runs without a build, and its extra transitive
 * packages are not in `package.json` for ncu to act on anyway
 */
const collectBundledPackages = () => {
  /** @type {Set<string>} */
  const packageNames = new Set();

  const addPackagesFromSource = (/** @type {string} */ source) => {
    for (const [, specifier] of source.matchAll(EXTERNAL_IMPORT_REGEX)) {
      if (specifier.startsWith('.') || specifier.startsWith('node:')) {
        continue;
      }

      const segments = specifier.split('/');
      packageNames.add(specifier.startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0]);
    }
  };

  const walk = (/** @type {string} */ directory) => {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (entry.name.endsWith('.ts')) {
        addPackagesFromSource(fs.readFileSync(entryPath, 'utf8'));
      }
    }
  };

  walk(SRC_DIRECTORY);

  return [...packageNames].toSorted();
};

const bundledPackages = collectBundledPackages();

/**
 * @type {Record<string, {packages: string[]; groupName?: string; icon?: string; priority?: number | null}>}
 */
const PACKAGE_GROUPS = Object.entries({
  'Package manager': {
    packages: ['pnpm'],
    icon: '📦',
    priority: 0,
  },
  '@eslint': {
    packages: ['eslint', 'eslint-config-un'],
    groupName: 'ESLint',
  },
  '@cspell': {
    packages: ['cspell'],
  },
  '@vitest': {
    packages: ['vitest'],
  },
  'Bundled utilities': {
    packages: bundledPackages,
    icon: '🧩',
    priority: 0,
  },
  // '@commitlint': {packages: []},
}).reduce((result, [groupName, {packages: packagesInGroup, ...groupMeta}]) => {
  const isScopedGroup = groupName.startsWith('@');
  const groupInfo = {
    groupName: isScopedGroup ? groupName.slice(1) : groupName,
    ...groupMeta,
  };

  const packagesInCurrentGroup = Object.fromEntries([
    [isScopedGroup ? `${groupName}/*` : groupName, groupInfo],
    ...packagesInGroup.map((packageInGroup) => [packageInGroup, groupInfo]),
  ]);

  return Object.assign(result, packagesInCurrentGroup);
}, {});

export default defineConfig({
  cache: true,
  cacheExpiration: 30,
  cacheFile: path.join(CACHE_DIRECTORY, 'cache.json'),

  // Catalogs in `pnpm-workspace.yaml` are only updated in workspace mode
  workspaces: true,
  root: true,

  target: (packageName) => {
    if (PACKAGES_WITH_PINNED_MAJOR_VERSION.has(packageName)) {
      return 'minor';
    }

    return PACKAGES_ON_PRERELEASE_CHANNEL.has(packageName) ? 'greatest' : 'latest';
  },
  filterResults: (
    packageName,
    {currentVersion: currentVersionRaw, upgradedVersion: upgradedVersionRaw},
  ) => {
    // eslint-disable-next-line sonar/no-empty-collection
    if (IGNORED_PACKAGES.has(packageName)) {
      return false;
    }

    const [currentVersion, upgradedVersion] = [currentVersionRaw, upgradedVersionRaw].map(
      (version) => version.split('@').at(-1),
    );
    // Unlike `target`, this gets alias names (like `@types/node24`) instead of real package names
    const [, aliasedPackageName = packageName] = NPM_ALIAS_REGEX.exec(currentVersionRaw) || [];

    const blockedVersionRange = IGNORED_PACKAGE_RANGES_TO_UPDATE[packageName];
    if (blockedVersionRange && satisfies(upgradedVersion || '', blockedVersionRange)) {
      return false;
    }

    const [currentVersionSemver, upgradedVersionSemver] = [currentVersion, upgradedVersion].map(
      (version = '') => tryParse(version),
    );
    return (
      !PACKAGES_WITH_PINNED_MAJOR_VERSION.has(aliasedPackageName) ||
      currentVersionSemver?.major === upgradedVersionSemver?.major
    );
  },

  format: ['group'],
  interactive: true,
  groupFunction: (fullName) => {
    const [nameScope] = fullName.split('/', 1);
    const knownGroup = PACKAGE_GROUPS[fullName] || PACKAGE_GROUPS[`${nameScope}/*`];

    if (knownGroup) {
      const {groupName, icon = '📁', priority = 3} = knownGroup;
      return `${priority === null ? '' : `${priority}. `}${icon} ${groupName}`;
    }

    return fullName in packageJson.devDependencies
      ? '2. 🧑‍💻 Dev dependencies'
      : '1. 📦 Direct dependencies';
  },
});
