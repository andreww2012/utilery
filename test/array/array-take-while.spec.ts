import {arrayTakeWhile} from '../../src/array/array-take-while.ts';

describe('array/arrayTakeWhile', () => {
  describe('from the start (default)', () => {
    it('takes elements from the start while the predicate returns true', () => {
      expect(arrayTakeWhile([1, 2, 3, 4, 5], (item) => item < 3)).toStrictEqual([1, 2]);
    });

    it('stops taking at the first element for which the predicate returns false', () => {
      expect(arrayTakeWhile([1, 2, 3, 1, 2], (item) => item < 3)).toStrictEqual([1, 2]);
    });

    it('returns an empty array when the predicate is false for the first element', () => {
      expect(arrayTakeWhile([5, 1, 2], (item) => item < 3)).toStrictEqual([]);
    });

    it('returns a copy of the array when the predicate is true for every element', () => {
      const input = [1, 2, 3];
      const result = arrayTakeWhile(input, () => true);

      expect(result).toStrictEqual([1, 2, 3]);
      expect(result).not.toBe(input);
    });

    it('returns an empty array when called on an empty array', () => {
      expect(arrayTakeWhile([], () => true)).toStrictEqual([]);
    });

    it('passes the index and the array to the predicate', () => {
      const calls: {item: number; index: number; array: readonly number[]}[] = [];
      const input = [10, 20, 30];

      arrayTakeWhile(input, (item, index, array) => {
        calls.push({item, index, array});
        return item < 25;
      });

      expect(calls).toStrictEqual([
        {item: 10, index: 0, array: input},
        {item: 20, index: 1, array: input},
        {item: 30, index: 2, array: input},
      ]);
    });

    it('treats a `false` direction flag the same as the default', () => {
      expect(arrayTakeWhile([1, 2, 3, 4, 5], (item) => item < 3, false)).toStrictEqual([1, 2]);
    });

    it('works with objects via predicate', () => {
      const input = [{id: 1}, {id: 2}, {id: 3}];

      expect(arrayTakeWhile(input, (item) => item.id < 3)).toStrictEqual([{id: 1}, {id: 2}]);
    });
  });

  describe('from the end', () => {
    it('takes elements from the end while the predicate returns true', () => {
      expect(arrayTakeWhile([1, 2, 3, 4, 5], (item) => item > 3, true)).toStrictEqual([4, 5]);
    });

    it('stops taking at the first non-matching element from the end', () => {
      expect(arrayTakeWhile([5, 4, 3, 4, 5], (item) => item > 3, true)).toStrictEqual([4, 5]);
    });

    it('returns an empty array when the predicate is false for the last element', () => {
      expect(arrayTakeWhile([4, 5, 6, 1], (item) => item > 3, true)).toStrictEqual([]);
    });

    it('returns a copy of the array when the predicate is true for every element', () => {
      const input = [1, 2, 3];
      const result = arrayTakeWhile(input, () => true, true);

      expect(result).toStrictEqual([1, 2, 3]);
      expect(result).not.toBe(input);
    });

    it('returns an empty array when called on an empty array', () => {
      expect(arrayTakeWhile([], () => true, true)).toStrictEqual([]);
    });

    it('passes the index and the array to the predicate, walking right-to-left', () => {
      const calls: {item: number; index: number; array: readonly number[]}[] = [];
      const input = [10, 20, 30];

      arrayTakeWhile(
        input,
        (item, index, array) => {
          calls.push({item, index, array});
          return item > 15;
        },
        true,
      );

      expect(calls).toStrictEqual([
        {item: 30, index: 2, array: input},
        {item: 20, index: 1, array: input},
        {item: 10, index: 0, array: input},
      ]);
    });

    it('works with objects via predicate', () => {
      const input = [{id: 1}, {id: 2}, {id: 3}];

      expect(arrayTakeWhile(input, (item) => item.id > 1, true)).toStrictEqual([{id: 2}, {id: 3}]);
    });
  });
});
