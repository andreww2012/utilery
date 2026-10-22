import {findClosestString} from '../../src/string/find-closest-string.ts';

describe('string/findClosestString', () => {
  it('finds the closest candidate', () => {
    expect(findClosestString('kitten', ['sitting', 'kitchen', 'mittens'])).toBe('kitchen');
    expect(findClosestString('ab', ['ax', 'ay'])).toBe('ax');
    expect(findClosestString('same', ['other', 'same'])).toBe('same');
  });

  it('accepts any iterable', () => {
    expect(findClosestString('instal', new Set(['install', 'uninstall']))).toBe('install');
  });

  it('respects `maxDistance`', () => {
    expect(findClosestString('hello', ['jello', 'yellow'], {maxDistance: 2})).toBe('jello');
    expect(findClosestString('xyz', ['abc'], {maxDistance: 1})).toBeUndefined();
  });

  it('returns `undefined` without candidates', () => {
    expect(findClosestString('a', [])).toBeUndefined();
  });
});
