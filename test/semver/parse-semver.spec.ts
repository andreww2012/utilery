import {parseSemver} from '../../src/semver/parse-semver.ts';

describe('semver/parseSemver', () => {
  it('parses a version into its parts', () => {
    expect(parseSemver('1.2.3-rc.1+sha.abc')).toMatchObject({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ['rc', 1],
      build: ['sha', 'abc'],
    });
    expect(parseSemver(' v2.0.0 ')).toMatchObject({major: 2, minor: 0, patch: 0});
  });

  it('returns `undefined` for an invalid version', () => {
    expect(parseSemver('1.2')).toBeUndefined();
    expect(parseSemver('=1.2.3')).toBeUndefined();
    expect(parseSemver('foo')).toBeUndefined();
  });

  it('accepts common mistakes with `loose`', () => {
    expect(parseSemver('=1.2.3', {loose: true})).toMatchObject({major: 1, minor: 2, patch: 3});
    expect(parseSemver('1.2.3beta', {loose: true})).toMatchObject({prerelease: ['beta']});
  });
});
