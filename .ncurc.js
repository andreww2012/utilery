// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import {ncuConfig} from '@andreww2012/npm-check-updates-config';

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
    source.matchAll(EXTERNAL_IMPORT_REGEX).forEach(([, specifier]) => {
      if (specifier.startsWith('.') || specifier.startsWith('node:')) {
        return;
      }

      const segments = specifier.split('/');
      packageNames.add(specifier.startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0]);
    });
  };

  const walk = (/** @type {string} */ directory) => {
    fs.readdirSync(directory, {withFileTypes: true}).forEach((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.name.endsWith('.ts')) {
        addPackagesFromSource(fs.readFileSync(entryPath, 'utf8'));
      }
    });
  };

  walk(SRC_DIRECTORY);

  return [...packageNames].toSorted();
};

export default ncuConfig({
  cwd: import.meta.dirname,
  targets: {
    // Their `latest` dist-tag lags behind the prerelease channel we actually follow
    'all-contributors-cli': 'greatest',
    'eslint-config-un': 'greatest',
  },
  groups: {
    'Bundled utilities': {
      packages: collectBundledPackages(),
      icon: '🧩',
      priority: 0,
    },
  },
});
