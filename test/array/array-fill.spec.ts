import {arrayFill} from '../../src/array/array-fill.ts';

describe('array/arrayFill', () => {
  describe('mutating mode (default)', () => {
    it('fills the entire array when no range is provided', () => {
      expect(arrayFill([1, 2, 3], 'a')).toStrictEqual(['a', 'a', 'a']);
    });

    it('mutates and returns the same array reference', () => {
      const input: (number | string)[] = [1, 2, 3];
      const result = arrayFill(input, 'x');

      expect(result).toBe(input);
      expect(input).toStrictEqual(['x', 'x', 'x']);
    });

    it('fills from a start index to the end of the array', () => {
      expect(arrayFill([1, 2, 3, 4, 5], 0, 2)).toStrictEqual([1, 2, 0, 0, 0]);
    });

    it('fills a slice between start (inclusive) and end (exclusive)', () => {
      expect(arrayFill([4, 6, 8, 10], '*', 1, 3)).toStrictEqual([4, '*', '*', 10]);
    });

    it('treats negative start and end as offsets from the array length', () => {
      expect(arrayFill([1, 2, 3], '*', -2, -1)).toStrictEqual([1, '*', 3]);
    });

    it('clamps an out-of-range end to the array length', () => {
      expect(arrayFill([1, 2, 3], 0, 1, 99)).toStrictEqual([1, 0, 0]);
    });

    it('clamps a negative start that would go before the start to 0', () => {
      expect(arrayFill([1, 2, 3], 0, -99)).toStrictEqual([0, 0, 0]);
    });

    it('is a no-op when start is greater than or equal to end', () => {
      const input = [1, 2, 3];
      const result = arrayFill(input, 9, 2, 2);

      expect(result).toStrictEqual([1, 2, 3]);
      expect(result).toBe(input);
    });

    it('returns the same empty array when called on an empty array', () => {
      const input: number[] = [];
      const result = arrayFill(input, 1);

      expect(result).toBe(input);
      expect(result).toStrictEqual([]);
    });

    it('fills holes in sparse arrays created by `new Array(n)`', () => {
      // eslint-disable-next-line unicorn/no-new-array
      const input = new Array<number>(3);
      const result = arrayFill(input, 7);

      expect(result).toStrictEqual([7, 7, 7]);
      expect(result).toBe(input);
    });

    it('works with object values (same reference is written to every slot)', () => {
      const value = {id: 1};
      const result = arrayFill([0, 0, 0], value);

      expect(result).toStrictEqual([value, value, value]);
      expect(result[0]).toBe(value);
      expect(result[1]).toBe(value);
      expect(result[2]).toBe(value);
    });

    it('treats an explicitly passed `{copy: false}` the same as the default', () => {
      const input: (number | string)[] = [1, 2, 3];
      const result = arrayFill(input, 'x', 0, 3, {copy: false});

      expect(result).toBe(input);
      expect(input).toStrictEqual(['x', 'x', 'x']);
    });
  });

  describe('non-mutating mode (`{copy: true}`)', () => {
    it('returns a new array and leaves the input untouched', () => {
      const input = [1, 2, 3];
      const result = arrayFill(input, 'a', 0, 3, {copy: true});

      expect(result).not.toBe(input);
      expect(result).toStrictEqual(['a', 'a', 'a']);
      expect(input).toStrictEqual([1, 2, 3]);
    });

    it('fills the entire array when no range is provided', () => {
      const input = [1, 2, 3];

      expect(arrayFill(input, 0, undefined, undefined, {copy: true})).toStrictEqual([0, 0, 0]);
      expect(input).toStrictEqual([1, 2, 3]);
    });

    it('fills a slice between start (inclusive) and end (exclusive)', () => {
      const input = [1, 2, 3, 4, 5];
      const result = arrayFill(input, '*', 1, 4, {copy: true});

      expect(result).toStrictEqual([1, '*', '*', '*', 5]);
      expect(input).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('supports negative indexes', () => {
      const input = [1, 2, 3, 4, 5];
      const result = arrayFill(input, '*', -4, -1, {copy: true});

      expect(result).toStrictEqual([1, '*', '*', '*', 5]);
      expect(input).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it('returns a fresh empty array when called on an empty array', () => {
      const input: number[] = [];
      const result = arrayFill(input, 1, undefined, undefined, {copy: true});

      expect(result).not.toBe(input);
      expect(result).toStrictEqual([]);
    });

    it('returns a copy unchanged when start is greater than or equal to end', () => {
      const input = [1, 2, 3];
      const result = arrayFill(input, 9, 2, 2, {copy: true});

      expect(result).not.toBe(input);
      expect(result).toStrictEqual([1, 2, 3]);
    });

    it('writes the same reference into every filled slot', () => {
      const value = {id: 1};
      const input = [0, 0, 0];
      const result = arrayFill(input, value, 0, 3, {copy: true});

      expect(result).toStrictEqual([value, value, value]);
      expect(result[0]).toBe(value);
      expect(result[2]).toBe(value);
    });
  });
});
