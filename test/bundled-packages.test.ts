import fs from 'node:fs';
import path from 'node:path';
import packageJson from '../package.json' with {type: 'json'};
import {
  NOTICES_PATH,
  collectBundledPackages,
  findLicenseTextMismatches,
  readInstalledPackageJson,
} from '../scripts/_third-party-notices.ts';

// The bundled packages are the ones in `inlinedDependencies` of `package.json`, which `nr build`
// keeps up to date and CI checks to be committed

const ROOT = path.resolve(import.meta.dirname, '..');
// A link to a package doc, like `./docs/packages/@antfu__utils.md`
const DOC_LINK_REGEX = /(?<=\]\(\.\/docs\/packages\/)[^)]+\.md(?=\))/g;

const {devDependencies} = packageJson;
const catalogPackageNames = Object.entries(devDependencies)
  .filter(([, specifier]) => specifier === 'catalog:bundled')
  .map(([name]) => name);
const docFileNames = fs.readdirSync(path.join(ROOT, 'docs/packages'));

it('has exactly the directly bundled packages in the `bundled` catalog', () => {
  expect(
    new Set(
      collectBundledPackages().flatMap(({name}) =>
        Object.hasOwn(devDependencies, name) ? name : [],
      ),
    ),
  ).toStrictEqual(new Set(catalogPackageNames));
});

it('has a doc for each package in the `bundled` catalog', () => {
  expect(new Set(docFileNames)).toStrictEqual(
    new Set(catalogPackageNames.map((name) => `${name.replace('/', '__')}.md`)),
  );
});

it('links each package doc in README', () => {
  expect(
    new Set(fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8').match(DOC_LINK_REGEX)),
  ).toStrictEqual(new Set(docFileNames));
});

// The notices table shows them, and a package can be installed in other versions too
it('reads the installed packages of the bundled versions', () => {
  const bundledPackages = collectBundledPackages();

  expect(
    bundledPackages.map((bundledPackage) => ({
      name: bundledPackage.name,
      version: readInstalledPackageJson(bundledPackage).version,
    })),
  ).toStrictEqual(bundledPackages);
});

it('has license texts of exactly the bundled packages', () => {
  expect(findLicenseTextMismatches(fs.readFileSync(NOTICES_PATH, 'utf8'))).toStrictEqual({
    missing: [],
    unused: [],
  });
});
