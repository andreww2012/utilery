import {objectHasOwn} from '../../src/object/object-has-own.ts';

describe('object/objectHasOwn', () => {
  it('basic test', () => {
    const value: unknown = {a: 1};

    expect(objectHasOwn(value, 'a')).toBe(true);
    expect(objectHasOwn(value, 'toString')).toBe(false);
  });

  it('returns `false` for `null` and `undefined`', () => {
    expect(objectHasOwn(null, 'a')).toBe(false);
    expect(objectHasOwn(undefined, 'a')).toBe(false);
  });
});
