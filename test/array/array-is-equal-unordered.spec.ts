import {arrayIsEqualUnordered} from '../../src/array/array-is-equal-unordered.ts';

interface Item {
  id: number;
}

const toKey = (value: number | undefined) => value ?? 'none';
const isSame = (a: number | undefined, b: number | undefined) => a === b;
const isSameId = (a: Item, b: Item) => a.id === b.id;

describe('array/arrayIsEqualUnordered', () => {
  describe('basic equality (no third argument)', () => {
    it('returns true for the same elements in any order', () => {
      expect(arrayIsEqualUnordered([1, 2, 3], [3, 1, 2])).toBe(true);
      expect(arrayIsEqualUnordered([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(arrayIsEqualUnordered(['a', 'b'], ['b', 'a'])).toBe(true);
    });

    it('returns false when an element is missing from either array', () => {
      expect(arrayIsEqualUnordered([1, 2, 3], [1, 2])).toBe(false);
      expect(arrayIsEqualUnordered([1, 2], [1, 2, 3])).toBe(false);
      expect(arrayIsEqualUnordered([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('requires each element to appear the same number of times', () => {
      expect(arrayIsEqualUnordered([1, 1, 2], [1, 2, 2])).toBe(false);
      expect(arrayIsEqualUnordered([1, 1, 2], [2, 1, 1])).toBe(true);
      expect(arrayIsEqualUnordered([1, 1], [1, 2])).toBe(false);
    });

    it('returns true for two empty arrays', () => {
      expect(arrayIsEqualUnordered([], [])).toBe(true);
      expect(arrayIsEqualUnordered([], [undefined])).toBe(false);
    });

    it('uses SameValueZero', () => {
      const item = {id: 1};

      expect(arrayIsEqualUnordered([Number.NaN, 0], [-0, Number.NaN])).toBe(true);
      expect(arrayIsEqualUnordered([item], [item])).toBe(true);
      expect(arrayIsEqualUnordered([{id: 1}], [{id: 1}])).toBe(false);
      expect(arrayIsEqualUnordered([1], ['1'])).toBe(false);
    });

    it('works with arrays of different element types', () => {
      expect(arrayIsEqualUnordered([1, 'a', null], [null, 1, 'a'])).toBe(true);
      expect(arrayIsEqualUnordered([null], [undefined])).toBe(false);
    });

    it('compares multi-byte strings and keys like `__proto__` as any other value', () => {
      expect(arrayIsEqualUnordered(['😀', '日本', '__proto__'], ['__proto__', '😀', '日本'])).toBe(
        true,
      );
      expect(arrayIsEqualUnordered(['__proto__'], ['constructor'])).toBe(false);
    });

    it('counts empty slots as `undefined`', () => {
      // eslint-disable-next-line no-sparse-arrays -- tests empty slots
      const sparse = [, 1];

      expect(arrayIsEqualUnordered(sparse, [1, undefined])).toBe(true);
      expect(arrayIsEqualUnordered([1, undefined], sparse)).toBe(true);
      expect(arrayIsEqualUnordered(sparse, [1, 2])).toBe(false);
      expect(arrayIsEqualUnordered([1, 2], sparse)).toBe(false);
    });

    it('does not mutate the arrays', () => {
      const first = [1, 2, 3];
      const second = [3, 2, 1];
      arrayIsEqualUnordered(first, second);

      expect(first).toStrictEqual([1, 2, 3]);
      expect(second).toStrictEqual([3, 2, 1]);
    });
  });

  describe('with mapper', () => {
    it('compares the keys of the elements', () => {
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [{id: 2}, {id: 1}], (item) => item.id)).toBe(
        true,
      );
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], (item) => item.id)).toBe(
        false,
      );
    });

    it('requires each key to appear the same number of times', () => {
      expect(
        arrayIsEqualUnordered([{id: 1}, {id: 1}, {id: 2}], [{id: 1}, {id: 2}, {id: 2}], (item) => {
          return item.id;
        }),
      ).toBe(false);
    });

    it('supports arrays of different types', () => {
      expect(
        arrayIsEqualUnordered([{id: 1}, {id: 2}], [2, 1], (item: Item | number) =>
          typeof item === 'object' ? item.id : item,
        ),
      ).toBe(true);
    });

    it('counts empty slots as `undefined`', () => {
      // eslint-disable-next-line no-sparse-arrays -- tests empty slots
      const sparse = [, 1];

      expect(arrayIsEqualUnordered(sparse, [1, undefined], toKey)).toBe(true);
      expect(arrayIsEqualUnordered([1, 2], sparse, toKey)).toBe(false);
    });

    it('returns false for arrays of different lengths without calling the mapper', () => {
      const mapper = vi.fn<(item: number) => number>((item) => item);

      expect(arrayIsEqualUnordered([1, 1], [1], mapper)).toBe(false);
      expect(mapper).not.toHaveBeenCalled();
    });
  });

  describe('with comparator', () => {
    it('compares elements with the comparator', () => {
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [{id: 2}, {id: 1}], isSameId)).toBe(true);
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [{id: 2}, {id: 3}], isSameId)).toBe(false);
    });

    it('pairs each element with a different element of the other array', () => {
      expect(arrayIsEqualUnordered([{id: 1}, {id: 1}], [{id: 1}, {id: 2}], isSameId)).toBe(false);
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [{id: 1}, {id: 1}], isSameId)).toBe(false);
      expect(arrayIsEqualUnordered([{id: 1}, {id: 1}], [{id: 1}, {id: 1}], isSameId)).toBe(true);
    });

    it('passes the element of the first array first', () => {
      expect(arrayIsEqualUnordered([{id: 1}, {id: 2}], [2, 1], (a, b) => a.id === b)).toBe(true);
    });

    it('counts empty slots as `undefined`', () => {
      // eslint-disable-next-line no-sparse-arrays -- tests empty slots
      const sparse = [, 1];

      expect(arrayIsEqualUnordered(sparse, [1, undefined], isSame)).toBe(true);
      expect(arrayIsEqualUnordered([1, undefined], sparse, isSame)).toBe(true);
      expect(arrayIsEqualUnordered(sparse, [1, 2], isSame)).toBe(false);
    });

    it('returns true for two empty arrays', () => {
      expect(arrayIsEqualUnordered([], [], isSameId)).toBe(true);
    });
  });
});
