import {arrayDifference} from '../../src/array/array-difference.ts';

describe('array/arrayDifference', () => {
  describe('basic equality (no third argument)', () => {
    it('returns elements in first array not present in second', () => {
      expect(arrayDifference([1, 2, 3, 4, 5], [2, 4])).toStrictEqual([1, 3, 5]);
    });

    it('returns all elements when second array is empty', () => {
      expect(arrayDifference([1, 2, 3], [])).toStrictEqual([1, 2, 3]);
    });

    it('returns empty array when first array is empty', () => {
      expect(arrayDifference([], [1, 2, 3])).toStrictEqual([]);
    });

    it('returns empty array when all elements are in second array', () => {
      expect(arrayDifference([1, 2, 3], [1, 2, 3])).toStrictEqual([]);
    });

    it('works with strings', () => {
      expect(arrayDifference(['a', 'b', 'c'], ['b'])).toStrictEqual(['a', 'c']);
    });

    it('preserves order', () => {
      expect(arrayDifference([5, 3, 1, 4, 2], [3, 4])).toStrictEqual([5, 1, 2]);
    });

    it('handles duplicate elements in first array', () => {
      expect(arrayDifference([1, 2, 2, 3], [2])).toStrictEqual([1, 3]);
    });
  });

  describe('with mapper (differenceBy)', () => {
    it('compares by mapped values', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [{id: 2}, {id: 4}];

      expect(arrayDifference(array1, array2, (item) => item.id)).toStrictEqual([{id: 1}, {id: 3}]);
    });

    it('supports heterogeneous arrays via mapper', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [2, 4];

      expect(
        arrayDifference(array1, array2, (item: {id: number} | number) =>
          typeof item === 'object' ? item.id : item,
        ),
      ).toStrictEqual([{id: 1}, {id: 3}]);
    });

    it('returns all elements when no mapped values match', () => {
      expect(arrayDifference([{id: 1}, {id: 2}], [{id: 5}], (item) => item.id)).toStrictEqual([
        {id: 1},
        {id: 2},
      ]);
    });

    it('returns empty array when all mapped values match', () => {
      expect(
        arrayDifference([{id: 1}, {id: 2}], [{id: 1}, {id: 2}], (item) => item.id),
      ).toStrictEqual([]);
    });

    it('returns all elements when second array is empty', () => {
      expect(arrayDifference([{id: 1}], [], (item) => item.id)).toStrictEqual([{id: 1}]);
    });
  });

  describe('with comparator (differenceWith)', () => {
    it('uses custom equality to compute difference', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [{id: 2}, {id: 4}];

      expect(arrayDifference(array1, array2, (a, b) => a.id === b.id)).toStrictEqual([
        {id: 1},
        {id: 3},
      ]);
    });

    it('supports heterogeneous arrays via comparator', () => {
      const array1 = [{id: 1}, {id: 2}, {id: 3}];
      const array2 = [2, 4];

      expect(arrayDifference(array1, array2, (a, b) => a.id === b)).toStrictEqual([
        {id: 1},
        {id: 3},
      ]);
    });

    it('returns all elements when no comparisons match', () => {
      expect(arrayDifference([{id: 1}, {id: 2}], [{id: 5}], (a, b) => a.id === b.id)).toStrictEqual(
        [{id: 1}, {id: 2}],
      );
    });

    it('returns empty array when all elements match', () => {
      expect(
        arrayDifference([{id: 1}, {id: 2}], [{id: 1}, {id: 2}], (a, b) => a.id === b.id),
      ).toStrictEqual([]);
    });

    it('returns all elements when second array is empty', () => {
      const empty: {id: number}[] = [];

      expect(arrayDifference([{id: 1}], empty, (a, b) => a.id === b.id)).toStrictEqual([{id: 1}]);
    });

    it('uses a function with one parameter as a key function, which also gets the second array', () => {
      const calls: unknown[] = [];

      expect(
        arrayDifference([1, 2], ['2'], (value) => {
          calls.push(value);
          return true;
        }),
      ).toStrictEqual([]);
      expect(calls).toContain('2');
    });
  });
});
