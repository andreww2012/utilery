import {findObjectKey} from '../../src/object/find-object-key.ts';

describe('object/findObjectKey', () => {
  it('returns the first matching key', () => {
    expect(findObjectKey({a: 1, b: 2, c: 3}, (value) => value > 1)).toBe('b');
  });

  it('scans from the end when fromRight is true', () => {
    expect(findObjectKey({a: 1, b: 2, c: 3}, (value) => value > 1, true)).toBe('c');
  });

  it('returns undefined when nothing matches', () => {
    expect(findObjectKey({a: 1}, (value) => value > 5)).toBeUndefined();
  });

  it.each([false, true])(
    'gives numeric keys as strings and skips symbol keys (fromRight: %s)',
    (isFromRight) => {
      const keys: unknown[] = [];
      const symbolKey = Symbol('s');
      const result = findObjectKey(
        {1: 'x', [symbolKey]: 'y', a: 'z'},
        (value, key) => {
          keys.push(key);
          return value === 'x';
        },
        isFromRight,
      );

      expect(result).toBe('1');
      expect(keys).toStrictEqual(isFromRight ? ['a', '1'] : ['1']);
    },
  );
});
