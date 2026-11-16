import {minSemverInRange} from '../../src/semver/min-semver-in-range.ts';

describe('semver/minSemverInRange', () => {
  it('finds the lowest version that satisfies the range', () => {
    expect(minSemverInRange('^1.2')).toMatchObject({major: 1, minor: 2, patch: 0});
    expect(minSemverInRange(' ~1.4.5 ')).toMatchObject({major: 1, minor: 4, patch: 5});
    expect(minSemverInRange('>=1.2.3 <2')).toMatchObject({major: 1, minor: 2, patch: 3});
    expect(minSemverInRange('1.5.0 - 2.0.0')).toMatchObject({major: 1, minor: 5, patch: 0});
    expect(minSemverInRange('^2 || ~1.4')).toMatchObject({major: 1, minor: 4, patch: 0});
  });

  it('gives the next version for an exclusive lower bound', () => {
    expect(minSemverInRange('>1.2.3')).toMatchObject({major: 1, minor: 2, patch: 4});
    expect(minSemverInRange('>1')).toMatchObject({major: 2, minor: 0, patch: 0});
  });

  it('gives `0.0.0` for a range without a lower bound', () => {
    expect(minSemverInRange('*')).toMatchObject({major: 0, minor: 0, patch: 0});
    expect(minSemverInRange('')).toMatchObject({major: 0, minor: 0, patch: 0});
    expect(minSemverInRange('<2')).toMatchObject({major: 0, minor: 0, patch: 0});
  });

  it('gives a prerelease only when the range starts at one or with `includePrerelease`', () => {
    expect(minSemverInRange('>1')?.prerelease).toBeUndefined();
    expect(minSemverInRange('^1.2.3')?.prerelease).toBeUndefined();
    expect(minSemverInRange('>=1.0.0-rc.1')).toMatchObject({
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ['rc', 1],
    });
    expect(minSemverInRange('>1.0.0-rc.1')).toMatchObject({
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ['rc', 1, 0],
    });
    expect(minSemverInRange('>1', {includePrerelease: true})).toMatchObject({
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: [0],
    });
  });

  it('returns `undefined` when no version can satisfy the range', () => {
    expect(minSemverInRange('>2 <1')).toBeUndefined();
  });

  it('accepts common mistakes with `loose`', () => {
    expect(() => minSemverInRange('>=1.2.3beta')).toThrow(TypeError);
    expect(minSemverInRange('>=1.2.3beta', {loose: true})).toMatchObject({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ['beta'],
    });
  });

  it('throws a `TypeError` for an invalid range', () => {
    expect(() => minSemverInRange('not a range')).toThrow(TypeError);
  });
});
