import {parseNpmPackageSpecifier} from '../../src/misc/parse-npm-package-specifier.ts';

describe('misc/parseNpmPackageSpecifier', () => {
  it('parses names, versions and paths', () => {
    expect(parseNpmPackageSpecifier('@scope/package@1.2.3/sub/path')).toStrictEqual({
      name: '@scope/package',
      version: '1.2.3',
      path: '/sub/path',
    });
    expect(parseNpmPackageSpecifier('lodash/fp')).toStrictEqual({
      name: 'lodash',
      version: undefined,
      path: '/fp',
    });
    expect(parseNpmPackageSpecifier('@scope/package')).toStrictEqual({
      name: '@scope/package',
      version: undefined,
      path: '',
    });
    expect(parseNpmPackageSpecifier('react@latest')).toStrictEqual({
      name: 'react',
      version: 'latest',
      path: '',
    });
    expect(parseNpmPackageSpecifier('vue@^3.4.0')).toStrictEqual({
      name: 'vue',
      version: '^3.4.0',
      path: '',
    });
  });

  it('returns `undefined` for other specifiers', () => {
    ['./local', '../up', '/absolute', String.raw`C:\path`, 'node:fs', 'file:./x', ''].forEach(
      (specifier) => {
        expect(parseNpmPackageSpecifier(specifier)).toBeUndefined();
      },
    );
  });

  it('returns `undefined` for specifiers missing a part', () => {
    expect(parseNpmPackageSpecifier('@scope')).toBeUndefined();
    expect(parseNpmPackageSpecifier('@scope/')).toBeUndefined();
    expect(parseNpmPackageSpecifier('lodash@')).toBeUndefined();
  });
});
