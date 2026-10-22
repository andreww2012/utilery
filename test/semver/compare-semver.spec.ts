import {compareSemver} from '../../src/semver/compare-semver.ts';

describe('semver/compareSemver', () => {
  it('compares versions numerically', () => {
    expect(compareSemver('1.2.3', '1.10.0')).toBe(-1);
    expect(compareSemver('2.0.0', '1.99.99')).toBe(1);
    expect(compareSemver('v1.2.3', '1.2.3')).toBe(0);
  });

  it('follows the prerelease rules', () => {
    expect(compareSemver('3.0.0-rc.1', '3.0.0')).toBe(-1);
    expect(compareSemver('1.0.0-rc.2', '1.0.0-rc.10')).toBe(-1);
    expect(compareSemver('1.0.0-alpha', '1.0.0-beta')).toBe(-1);
  });

  it('ignores build metadata', () => {
    expect(compareSemver('1.0.0+a', '1.0.0+b')).toBe(0);
  });

  it('accepts parsed versions', () => {
    expect(compareSemver({major: 1, minor: 2, patch: 3}, '1.2.4')).toBe(-1);
  });

  it('sorts versions', () => {
    expect(['1.10.0', '1.2.0', '1.2.0-beta'].toSorted(compareSemver)).toStrictEqual([
      '1.2.0-beta',
      '1.2.0',
      '1.10.0',
    ]);
  });

  it('throws for an invalid version unless `loose` accepts it', () => {
    expect(() => compareSemver('1.2', '1.2.0')).toThrow(TypeError);
    expect(() => compareSemver('=1.2.3', '1.2.3')).toThrow(TypeError);
    expect(compareSemver('=1.2.3', '1.2.3', {loose: true})).toBe(0);
  });
});
