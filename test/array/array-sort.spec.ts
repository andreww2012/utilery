import {arraySort} from '../../src/array/array-sort.ts';

const ascending = (a: number, b: number) => a - b;

describe('array/arraySort', () => {
  it('sorts the elements by the comparator', () => {
    expect(arraySort([4, 2, 7, 5], ascending)).toStrictEqual([2, 4, 5, 7]);
  });

  it('does not mutate the input', () => {
    const source = [3, 1, 2];
    arraySort(source, ascending);

    expect(source).toStrictEqual([3, 1, 2]);
  });

  it('keeps the empty slots of a sparse array at the end', () => {
    const source = [3, 1, 2];
    // Leaves an empty slot at index 3
    source[4] = 0;

    // eslint-disable-next-line no-sparse-arrays -- the test is about them
    expect(arraySort(source, ascending)).toStrictEqual([0, 1, 2, 3, ,]);
  });

  it('returns an instance of the same class for an instance of an `Array` subclass', () => {
    class Stack extends Array<number> {}
    const result = arraySort(Stack.from([3, 1, 2]), ascending);

    expect(result).toBeInstanceOf(Stack);
    expect([...result]).toStrictEqual([1, 2, 3]);
  });
});
