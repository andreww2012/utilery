import {arrayReverse} from '../../src/array/array-reverse.ts';

describe('array/arrayReverse', () => {
  it('reverses the order of the elements', () => {
    expect(arrayReverse([1, 2, 3])).toStrictEqual([3, 2, 1]);
  });

  it('does not mutate the input', () => {
    const source = [1, 2, 3];
    arrayReverse(source);

    expect(source).toStrictEqual([1, 2, 3]);
  });

  it('keeps the empty slots of a sparse array', () => {
    // eslint-disable-next-line no-sparse-arrays -- the test is about them
    expect(arrayReverse([1, , 3, 4])).toStrictEqual([4, 3, , 1]);
  });

  it('returns an instance of the same class for an instance of an `Array` subclass', () => {
    class Stack extends Array<number> {}
    const result = arrayReverse(Stack.from([1, 2, 3]));

    expect(result).toBeInstanceOf(Stack);
    expect([...result]).toStrictEqual([3, 2, 1]);
  });
});
