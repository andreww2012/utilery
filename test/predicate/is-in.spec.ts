import {isIn} from '../../src/predicate/is-in.ts';

describe('predicate/isIn', () => {
  it('basic test', () => {
    const value: unknown = {foo: 1};

    expect(isIn('foo', value)).toBe(true);
    expect(isIn('bar', value)).toBe(false);
    expect(isIn('toString', value)).toBe(true);
  });

  it('returns `false` for `null` and `undefined`', () => {
    expect(isIn('toString', null)).toBe(false);
    expect(isIn('toString', undefined)).toBe(false);
  });

  it('looks up a primitive on its wrapper object', () => {
    expect(isIn('length', 'abc')).toBe(true);
    expect(isIn('toFixed', 1)).toBe(true);
    expect(isIn('length', 1)).toBe(false);
  });
});
