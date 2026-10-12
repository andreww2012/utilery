import {arrayChunks} from '../../src/array/array-chunks.ts';

describe('array/arrayChunks', () => {
  describe('by size', () => {
    it('splits into consecutive fixed-size chunks', () => {
      expect(arrayChunks([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]]);
    });

    it('returns a single chunk when the size covers the whole array', () => {
      expect(arrayChunks([1, 2, 3], 5)).toStrictEqual([[1, 2, 3]]);
    });

    it('returns an empty array for an empty input', () => {
      expect(arrayChunks([], 2)).toStrictEqual([]);
    });

    it('throws for a non-positive-integer size', () => {
      expect(() => arrayChunks([1, 2, 3], 0)).toThrow();
    });
  });

  describe('by sizes', () => {
    it('makes one chunk per size, in order', () => {
      expect(arrayChunks([1, 2, 3, 4, 5, 6], [1, 2, 3])).toStrictEqual([[1], [2, 3], [4, 5, 6]]);
    });

    it('makes an empty chunk for a size of 0', () => {
      expect(arrayChunks([1, 2, 3], [1, 0, 2])).toStrictEqual([[1], [], [2, 3]]);
    });

    it('leaves out the elements past the sum of the sizes', () => {
      expect(arrayChunks([1, 2, 3, 4, 5], [1, 2])).toStrictEqual([[1], [2, 3]]);
    });

    it('makes shorter or empty chunks when the array runs out', () => {
      expect(arrayChunks([1, 2, 3], [2, 2, 2])).toStrictEqual([[1, 2], [3], []]);
    });

    it('collects the rest of the elements for a size of Infinity', () => {
      expect(arrayChunks([1, 2, 3, 4, 5], [2, Number.POSITIVE_INFINITY])).toStrictEqual([
        [1, 2],
        [3, 4, 5],
      ]);
      expect(arrayChunks([1, 2, 3], [Number.POSITIVE_INFINITY, 1])).toStrictEqual([[1, 2, 3], []]);
    });

    it('returns an empty array for no sizes', () => {
      expect(arrayChunks([1, 2, 3], [])).toStrictEqual([]);
    });

    it('throws for an invalid size', () => {
      expect(() => arrayChunks([1, 2, 3], [1, -1])).toThrow(RangeError);
      expect(() => arrayChunks([1, 2, 3], [1.5])).toThrow(RangeError);
      expect(() => arrayChunks([1, 2, 3], [Number.NaN])).toThrow(
        'Expected chunk sizes to be non-negative integers or Infinity, got NaN',
      );
    });

    it('does not mutate the sizes or the array', () => {
      const array = [1, 2, 3];
      const sizes = [1, 2];

      arrayChunks(array, sizes);

      expect(array).toStrictEqual([1, 2, 3]);
      expect(sizes).toStrictEqual([1, 2]);
    });
  });

  describe('by iteratee', () => {
    it('groups runs of consecutive same-key elements', () => {
      expect(arrayChunks([1, 1, 2, 3, 3], (value) => value)).toStrictEqual([[1, 1], [2], [3, 3]]);
    });

    it('starts a new chunk whenever the derived key changes', () => {
      expect(
        arrayChunks([{type: 'a'}, {type: 'a'}, {type: 'b'}, {type: 'a'}], (item) => item.type),
      ).toStrictEqual([[{type: 'a'}, {type: 'a'}], [{type: 'b'}], [{type: 'a'}]]);
    });

    it('returns an empty array for an empty input', () => {
      expect(arrayChunks([], (value) => value)).toStrictEqual([]);
    });
  });
});
