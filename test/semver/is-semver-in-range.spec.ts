import {isSemverInRange} from '../../src/semver/is-semver-in-range.ts';

describe('semver/isSemverInRange', () => {
  it('supports npm range syntax', () => {
    expect(isSemverInRange('1.5.0', '^1.2.0')).toBe(true);
    expect(isSemverInRange('2.0.0', '^1.2.0')).toBe(false);
    expect(isSemverInRange('1.2.9', '~1.2.0')).toBe(true);
    expect(isSemverInRange('1.4.2', '1.x || >=3')).toBe(true);
    expect(isSemverInRange('1.5.0', '1.0.0 - 2.0.0')).toBe(true);
    expect(isSemverInRange('1.5.0', '>=1.2.0 <1.5.0')).toBe(false);
  });

  it('matches prereleases only when allowed', () => {
    expect(isSemverInRange('3.0.0-rc.1', '>=2')).toBe(false);
    expect(isSemverInRange('3.0.0-rc.2', '>=3.0.0-rc.1')).toBe(true);
    expect(isSemverInRange('3.0.0-rc.1', '>=2', {includePrerelease: true})).toBe(true);
  });

  it('returns `false` for an invalid version or range', () => {
    expect(isSemverInRange('foo', '^1')).toBe(false);
    expect(isSemverInRange('1.2.3', 'not a range')).toBe(false);
  });
});
