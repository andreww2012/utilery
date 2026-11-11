import {arrayIntersection} from '../../src/array/array-intersection.ts';

describe('array/arrayIntersection', () => {
  describe('basic equality (no third argument)', () => {
    it('returns elements present in both arrays', () => {
      expect(arrayIntersection([1, 2, 3, 4, 5], [2, 4, 6])).toStrictEqual([2, 4]);
    });

    it('returns empty array when second array is empty', () => {
      expect(arrayIntersection([1, 2, 3], [])).toStrictEqual([]);
    });

    it('returns empty array when first array is empty', () => {
      expect(arrayIntersection([], [1, 2, 3])).toStrictEqual([]);
    });

    it('returns empty array when there is no overlap', () => {
      expect(arrayIntersection([1, 2, 3], [4, 5, 6])).toStrictEqual([]);
    });

    it('returns all elements when all are present in second array', () => {
      expect(arrayIntersection([1, 2, 3], [1, 2, 3])).toStrictEqual([1, 2, 3]);
    });

    it('works with strings', () => {
      expect(arrayIntersection(['a', 'b', 'c'], ['b', 'd'])).toStrictEqual(['b']);
    });

    it('preserves order from the first array', () => {
      expect(arrayIntersection([5, 3, 1, 4, 2], [3, 4])).toStrictEqual([3, 4]);
    });

    it('keeps duplicate elements from the first array', () => {
      expect(arrayIntersection([1, 2, 2, 3], [2])).toStrictEqual([2, 2]);
    });
  });

  describe('with mapper (intersectionBy)', () => {
    it('compares by mapped values', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [{id: 2}, {id: 4}];

      expect(arrayIntersection(array1, array2, (item) => item.id)).toStrictEqual([{id: 2}]);
    });

    it('supports heterogeneous arrays via mapper', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [2, 4];

      expect(
        arrayIntersection(array1, array2, (item: {id: number} | number) =>
          typeof item === 'object' ? item.id : item,
        ),
      ).toStrictEqual([{id: 2}]);
    });

    it('returns empty array when no mapped values match', () => {
      expect(arrayIntersection([{id: 1}, {id: 2}], [{id: 5}], (item) => item.id)).toStrictEqual([]);
    });

    it('returns all elements when all mapped values match', () => {
      expect(
        arrayIntersection([{id: 1}, {id: 2}], [{id: 1}, {id: 2}], (item) => item.id),
      ).toStrictEqual([{id: 1}, {id: 2}]);
    });

    it('returns empty array when second array is empty', () => {
      expect(arrayIntersection([{id: 1}], [], (item) => item.id)).toStrictEqual([]);
    });

    it('keeps elements of the first array with the same key', () => {
      expect(
        arrayIntersection([{id: 1, n: 1}, {id: 1, n: 2}, {id: 2}], [{id: 1}], (item) => item.id),
      ).toStrictEqual([
        {id: 1, n: 1},
        {id: 1, n: 2},
      ]);
    });
  });

  describe('with comparator (intersectionWith)', () => {
    it('uses custom equality to compute intersection', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [{id: 2}, {id: 4}];

      expect(arrayIntersection(array1, array2, (a, b) => a.id === b.id)).toStrictEqual([{id: 2}]);
    });

    it('supports heterogeneous arrays via comparator', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [2, 4];

      expect(arrayIntersection(array1, array2, (a, b) => a.id === b)).toStrictEqual([{id: 2}]);
    });

    it('returns empty array when no comparisons match', () => {
      expect(
        arrayIntersection([{id: 1}, {id: 2}], [{id: 5}], (a, b) => a.id === b.id),
      ).toStrictEqual([]);
    });

    it('returns all elements when all elements match', () => {
      expect(
        arrayIntersection([{id: 1}, {id: 2}], [{id: 1}, {id: 2}], (a, b) => a.id === b.id),
      ).toStrictEqual([{id: 1}, {id: 2}]);
    });

    it('returns empty array when second array is empty', () => {
      const empty: {id: number}[] = [];

      expect(arrayIntersection([{id: 1}], empty, (a, b) => a.id === b.id)).toStrictEqual([]);
    });

    it('keeps duplicate elements from the first array', () => {
      expect(
        arrayIntersection(
          [{id: 1, n: 1}, {id: 1, n: 2}, {id: 2}],
          [{id: 1}],
          (a, b) => a.id === b.id,
        ),
      ).toStrictEqual([
        {id: 1, n: 1},
        {id: 1, n: 2},
      ]);
    });

    it('uses a function with one parameter as a key function, which also gets the second array', () => {
      const calls: unknown[] = [];

      expect(
        arrayIntersection([1, 2], ['2'], (value) => {
          calls.push(value);
          return true;
        }),
      ).toStrictEqual([1, 2]);
      expect(calls).toContain('2');
    });
  });
});
