import {isValidSemver} from '../../src/semver/is-valid-semver.ts';

describe('semver/isValidSemver', () => {
  it('accepts valid versions', () => {
    expect(isValidSemver('1.2.3')).toBe(true);
    expect(isValidSemver('1.2.3-rc.1+build')).toBe(true);
    expect(isValidSemver('v1.2.3')).toBe(true);
  });

  it('rejects incomplete versions and ranges', () => {
    expect(isValidSemver('1.2')).toBe(false);
    expect(isValidSemver('^1.2.3')).toBe(false);
    expect(isValidSemver('')).toBe(false);
  });

  it('accepts common mistakes with `loose`', () => {
    expect(isValidSemver('=1.2.3')).toBe(false);
    expect(isValidSemver('=1.2.3', {loose: true})).toBe(true);
  });
});
