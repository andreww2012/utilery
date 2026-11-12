import {arrayConcat} from '../../src/array/array-concat.ts';

describe('array/arrayConcat', () => {
  it('basic test', () => {
    expect(arrayConcat(['a', 'b'], [1, 2])).toStrictEqual(['a', 'b', 1, 2]);
  });

  it('copies a single array', () => {
    const array = ['a', 'b'];
    const copy = arrayConcat(array);

    expect(copy).toStrictEqual(['a', 'b']);
    expect(copy).not.toBe(array);
  });

  it('adds primitives as elements', () => {
    expect(arrayConcat(['a'], 1, [true], null, undefined, '你好')).toStrictEqual([
      'a',
      1,
      true,
      null,
      undefined,
      '你好',
    ]);
  });
});
