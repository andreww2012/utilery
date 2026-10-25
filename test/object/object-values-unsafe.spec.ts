import {objectValuesUnsafe} from '../../src/object/object-values-unsafe.ts';

describe('object/objectValuesUnsafe', () => {
  it('basic test', () => {
    expect(objectValuesUnsafe({a: 1, b: 2, c: 3})).toStrictEqual([1, 2, 3]);
  });

  it('includes optional properties set to `undefined`', () => {
    const user: {name: string; age?: number | undefined} = {name: 'Ada', age: undefined};

    expect(objectValuesUnsafe(user)).toStrictEqual(['Ada', undefined]);
  });

  it('skips symbol keys and gives the values of other own keys of arrays', () => {
    expect(objectValuesUnsafe({a: 1, [Symbol('key')]: 2})).toStrictEqual([1]);
    expect(objectValuesUnsafe(Object.assign(['a', 'b'], {extra: 1}))).toStrictEqual(['a', 'b', 1]);
  });

  it('gives only the properties set on maps and sets', () => {
    expect(objectValuesUnsafe(Object.assign(new Map([['a', 1]]), {extra: true}))).toStrictEqual([
      true,
    ]);
    expect(objectValuesUnsafe(new Set(['a']))).toStrictEqual([]);
  });
});
