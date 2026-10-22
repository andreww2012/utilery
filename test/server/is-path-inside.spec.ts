import {isPathInside} from '../../src/server/is-path-inside.ts';

describe('server/isPathInside', () => {
  it('detects nested paths', () => {
    expect(isPathInside('a/b/c', 'a/b')).toBe(true);
    expect(isPathInside('/a/b/c', '/a')).toBe(true);
    expect(isPathInside('a/b/../../c', 'a')).toBe(false);
  });

  it('does not treat a path as inside itself', () => {
    expect(isPathInside('a/b', 'a/b')).toBe(false);
    expect(isPathInside('a/b/', 'a/b')).toBe(false);
  });

  it('handles shared prefixes and names starting with two dots', () => {
    expect(isPathInside('/a/bc', '/a/b')).toBe(false);
    expect(isPathInside('/a/..b', '/a')).toBe(true);
  });
});
