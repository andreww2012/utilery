import {isSemverRangeSubset} from '../../src/semver/is-semver-range-subset.ts';

describe('semver/isSemverRangeSubset', () => {
  it('tells whether one range is fully covered by another', () => {
    expect(isSemverRangeSubset('>=9 <11', '<11')).toBe(true);
    expect(isSemverRangeSubset('^1.2.0', '^1')).toBe(true);
    expect(isSemverRangeSubset('1.2.3', '^1')).toBe(true);
    expect(isSemverRangeSubset('~10 || ^11', '<11')).toBe(false);
    expect(isSemverRangeSubset('^1', '^1.2.0')).toBe(false);
  });

  it('supports unions, hyphen ranges and wildcards', () => {
    expect(isSemverRangeSubset('~1.2 || ~1.4', '1.x')).toBe(true);
    expect(isSemverRangeSubset('1.2.0 - 1.4.0', '^1.2 || ^2')).toBe(true);
    expect(isSemverRangeSubset('1.x || 3.x', '^1 || ^2')).toBe(false);
    expect(isSemverRangeSubset('^1', '*')).toBe(true);
    expect(isSemverRangeSubset('*', '^1')).toBe(false);
  });

  it('treats equal ranges as subsets of each other', () => {
    expect(isSemverRangeSubset('<11', '<11')).toBe(true);
    expect(isSemverRangeSubset('^1.0.0', '>=1.0.0 <2.0.0-0')).toBe(true);
    expect(isSemverRangeSubset('>=1.0.0 <2.0.0-0', '^1.0.0')).toBe(true);
  });

  it('treats a range that no version satisfies as a subset of any range', () => {
    expect(isSemverRangeSubset('>2 <1', '^5')).toBe(true);
    expect(isSemverRangeSubset('^5', '>2 <1')).toBe(false);
  });

  it('follows the npm prerelease rules unless `includePrerelease` is set', () => {
    expect(isSemverRangeSubset('>=1.0.0-rc.1', '>=0.5.0')).toBe(false);
    expect(isSemverRangeSubset('>=1.0.0-rc.1', '>=0.5.0', {includePrerelease: true})).toBe(true);
    expect(isSemverRangeSubset('>=1.0.0-rc.2', '>=1.0.0-rc.1')).toBe(true);
  });

  it('accepts common mistakes with `loose`', () => {
    expect(() => isSemverRangeSubset('=v1.2.3beta', '^1')).toThrow(TypeError);
    expect(isSemverRangeSubset('=v1.2.3beta', '^1.2.3-0', {loose: true})).toBe(true);
  });

  it('throws a `TypeError` for an invalid range, unless both are the same string', () => {
    expect(() => isSemverRangeSubset('not a range', '^1')).toThrow(TypeError);
    expect(() => isSemverRangeSubset('^1', 'not a range')).toThrow(TypeError);
    expect(isSemverRangeSubset('not a range', 'not a range')).toBe(true);
  });
});
