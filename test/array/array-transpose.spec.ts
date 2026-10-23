import {arrayTranspose} from '../../src/array/array-transpose.ts';

describe('array/arrayTranspose', () => {
  describe('basic transpose (no iteratee)', () => {
    it('swaps rows and columns for a rectangular matrix of mixed types', () => {
      const input: [string, boolean, number][] = [
        ['a', true, 1],
        ['b', false, 2],
      ];

      expect(arrayTranspose(input)).toStrictEqual([
        ['a', 'b'],
        [true, false],
        [1, 2],
      ]);
    });

    it('is its own inverse for rectangular matrices', () => {
      const input: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
      ];

      expect(arrayTranspose(arrayTranspose(input))).toStrictEqual(input);
    });

    it('pads missing positions with `undefined` for jagged rows', () => {
      const input: number[][] = [[1, 2, 3], [4]];

      expect(arrayTranspose(input)).toStrictEqual([
        [1, 4],
        [2, undefined],
        [3, undefined],
      ]);
    });

    it('returns an empty array when the input is empty', () => {
      expect(arrayTranspose([])).toStrictEqual([]);
    });

    it('returns an empty array when every row is empty', () => {
      expect(arrayTranspose([[], [], []])).toStrictEqual([]);
    });

    it('produces single-column rows for a one-row input', () => {
      expect(arrayTranspose([[1, 2, 3]])).toStrictEqual([[1], [2], [3]]);
    });

    it('produces a single row for one-element rows', () => {
      expect(arrayTranspose([[1], [2], [3]])).toStrictEqual([[1, 2, 3]]);
    });
  });

  describe('with iteratee', () => {
    it('folds each transposed column through the iteratee', () => {
      expect(
        arrayTranspose(
          [
            [1, 2],
            [3, 4],
            [5, 6],
          ],
          (firstItem, secondItem, thirdItem) => firstItem + secondItem + thirdItem,
        ),
      ).toStrictEqual([9, 12]);
    });

    it('passes one argument per row to the iteratee', () => {
      const calls: number[][] = [];

      arrayTranspose(
        [
          [1, 2],
          [3, 4],
        ],
        (...values: number[]) => {
          calls.push(values);
          return 0;
        },
      );

      expect(calls).toStrictEqual([
        [1, 3],
        [2, 4],
      ]);
    });

    it('passes `undefined` for missing positions in jagged rows', () => {
      const calls: (number | undefined)[][] = [];

      arrayTranspose([[1, 2, 3], [4]], (...values: (number | undefined)[]) => {
        calls.push(values);
        return values;
      });

      expect(calls).toStrictEqual([
        [1, 4],
        [2, undefined],
        [3, undefined],
      ]);
    });

    it('returns an empty array when the input is empty', () => {
      expect(arrayTranspose([] as number[][], (...values: number[]) => values)).toStrictEqual([]);
    });

    it('returns an empty array when every row is empty', () => {
      expect(arrayTranspose([[], []] as number[][], (...values: number[]) => values)).toStrictEqual(
        [],
      );
    });
  });
});
