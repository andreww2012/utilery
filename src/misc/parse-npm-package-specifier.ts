import {parse} from 'parse-package-name';

// Relative and absolute paths, and specifiers with a protocol (`node:`, `file:`, etc.)
const NOT_PACKAGE_SPECIFIER_REGEX = /^(?:[./\\]|[a-z][\d+\-.a-z]*:)/i;
// The version marker after the name, possibly scoped
const WITH_VERSION_REGEX = /^(?:@[^/]+\/)?[^/@]+@/;

// The package throws for specifiers missing a part, like `@scope` or `lodash@`
const parseSafe = (specifier: string) => {
  try {
    return parse(specifier);
  } catch {
    return null;
  }
};

/**
 * Splits an npm package specifier, like an import specifier or an argument of
 * `npm install`, into the package name, the version and the path inside the
 * package.
 * Scoped packages are supported.
 *
 * Returns `undefined` for relative and absolute paths, specifiers with a
 * protocol (like `node:fs`), empty strings, and specifiers missing a part
 * (`'@scope'`, `'lodash@'`).
 * Beyond that, the name is not validated.
 * @param specifier - The npm package specifier.
 * @returns The `name`, `version` (`undefined` if none) and `path` (an empty string or starting with
 * `/`), or `undefined` if it is not a package specifier.
 * @example
 * parseNpmPackageSpecifier('@scope/package@1.2.3/sub/path');
 * // {name: '@scope/package', version: '1.2.3', path: '/sub/path'}
 * parseNpmPackageSpecifier('lodash/fp');
 * // {name: 'lodash', version: undefined, path: '/fp'}
 * @example
 * // Not a package
 * parseNpmPackageSpecifier('./local-file');
 * // undefined
 * parseNpmPackageSpecifier('node:fs');
 * // undefined
 */
// Annotated: the package has no types of its own, so the published declarations would say `any`
export const parseNpmPackageSpecifier = (
  specifier: string,
): {name: string; version: string | undefined; path: string} | undefined => {
  const parsed =
    specifier && !NOT_PACKAGE_SPECIFIER_REGEX.test(specifier) ? parseSafe(specifier) : undefined;
  // A missing version is reported as `latest`, which can't be told apart from an explicit one
  return parsed
    ? {
        name: parsed.name,
        version: WITH_VERSION_REGEX.test(specifier) ? parsed.version : undefined,
        path: parsed.path,
      }
    : undefined;
};
