import {objectKeysUnsafe} from '../../src/object/object-keys-unsafe.ts';

describe('object/objectKeysUnsafe', () => {
  it('basic test', () => {
    expect(objectKeysUnsafe({a: 1, b: 2, c: 3})).toStrictEqual(['a', 'b', 'c']);
  });

  it('gives number keys as strings and skips symbol keys', () => {
    expect(objectKeysUnsafe({1: 'one', [Symbol('key')]: 2})).toStrictEqual(['1']);
  });

  it('gives the index strings and other own keys of arrays', () => {
    expect(objectKeysUnsafe(Object.assign(['a', 'b'], {extra: 1}))).toStrictEqual([
      '0',
      '1',
      'extra',
    ]);
  });

  it('gives only the properties set on maps and sets', () => {
    expect(objectKeysUnsafe(Object.assign(new Map([['a', 1]]), {extra: true}))).toStrictEqual([
      'extra',
    ]);
    expect(objectKeysUnsafe(new Set(['a']))).toStrictEqual([]);
  });
});
