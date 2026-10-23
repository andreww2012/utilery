import {arrayPartition} from '../../src/array/array-partition.ts';

describe('array/arrayPartition', () => {
  describe('single predicate (binary)', () => {
    it('splits into [matched, unmatched]', () => {
      expect(arrayPartition([1, 2, 3, 4], (value) => value % 2 === 0)).toStrictEqual([
        [2, 4],
        [1, 3],
      ]);
    });

    it('passes the index and array to the predicate', () => {
      const calls: {value: number; index: number; array: readonly number[]}[] = [];
      const input = [10, 20];

      arrayPartition(input, (value, index, array) => {
        calls.push({value, index, array});
        return true;
      });

      expect(calls).toStrictEqual([
        {value: 10, index: 0, array: input},
        {value: 20, index: 1, array: input},
      ]);
    });

    it('returns two empty groups for an empty array', () => {
      expect(arrayPartition([], () => true)).toStrictEqual([[], []]);
    });
  });

  describe('multiple predicates (n-way)', () => {
    it('places each element into the first matching group, with a trailing unmatched group', () => {
      expect(
        arrayPartition(
          [1, 2, 3, 4, 5, 6],
          (value) => value % 2 === 0,
          (value) => value % 3 === 0,
        ),
      ).toStrictEqual([[2, 4, 6], [3], [1, 5]]);
    });

    it('assigns an element to the first satisfied predicate only', () => {
      // 6 matches both predicates but lands in the first group only
      expect(
        arrayPartition(
          [6],
          (value) => value % 2 === 0,
          (value) => value % 3 === 0,
        ),
      ).toStrictEqual([[6], [], []]);
    });

    it('collects elements matching no predicate into the trailing group', () => {
      expect(
        arrayPartition(
          [1, 5, 7],
          (value) => value % 2 === 0,
          (value) => value % 3 === 0,
        ),
      ).toStrictEqual([[], [], [1, 5, 7]]);
    });

    it('returns empty groups for an empty array', () => {
      expect(
        arrayPartition(
          [],
          () => true,
          () => false,
        ),
      ).toStrictEqual([[], [], []]);
    });
  });
});
