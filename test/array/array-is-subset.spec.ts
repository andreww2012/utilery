import {arrayIsSubset} from '../../src/array/array-is-subset.ts';

describe('array/arrayIsSubset', () => {
  describe('basic equality (no third argument)', () => {
    it('returns true when subset is fully contained in superset', () => {
      expect(arrayIsSubset([1, 2, 3, 4, 5], [2, 4])).toBe(true);
    });

    it('returns false when subset contains an element not in superset', () => {
      expect(arrayIsSubset([1, 2, 3], [2, 4])).toBe(false);
    });

    it('returns true when both arrays are equal', () => {
      expect(arrayIsSubset([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('returns true when subset is empty', () => {
      expect(arrayIsSubset([1, 2, 3], [])).toBe(true);
    });

    it('returns true when both arrays are empty', () => {
      expect(arrayIsSubset([], [])).toBe(true);
    });

    it('returns false when superset is empty but subset is not', () => {
      expect(arrayIsSubset([], [1])).toBe(false);
    });

    it('works with strings', () => {
      expect(arrayIsSubset(['a', 'b', 'c'], ['b'])).toBe(true);
      expect(arrayIsSubset(['a', 'b', 'c'], ['d'])).toBe(false);
    });

    it('ignores duplicate elements in subset', () => {
      expect(arrayIsSubset([1, 2, 3], [2, 2, 2])).toBe(true);
    });
  });

  describe('with mapper', () => {
    it('returns true when every mapped subset value is in the mapped superset', () => {
      expect(arrayIsSubset([{id: 1}, {id: 2}, {id: 3}], [{id: 2}], (item) => item.id)).toBe(true);
    });

    it('returns false when a mapped subset value is missing from the superset', () => {
      expect(arrayIsSubset([{id: 1}, {id: 2}], [{id: 5}], (item) => item.id)).toBe(false);
    });

    it('supports heterogeneous arrays via mapper', () => {
      expect(
        arrayIsSubset([{id: 1}, {id: 2}, {id: 3}], [2], (item: {id: number} | number) =>
          typeof item === 'object' ? item.id : item,
        ),
      ).toBe(true);
    });

    it('returns true when subset is empty', () => {
      expect(arrayIsSubset([{id: 1}], [], (item) => item.id)).toBe(true);
    });
  });

  describe('with comparator', () => {
    it('returns true when every subset element matches some superset element', () => {
      expect(arrayIsSubset([{id: 1}, {id: 2}, {id: 3}], [{id: 2}], (a, b) => a.id === b.id)).toBe(
        true,
      );
    });

    it('returns false when a subset element matches no superset element', () => {
      expect(arrayIsSubset([{id: 1}, {id: 2}], [{id: 5}], (a, b) => a.id === b.id)).toBe(false);
    });

    it('supports heterogeneous arrays via comparator', () => {
      expect(arrayIsSubset([{id: 1}, {id: 2}, {id: 3}], [2], (a, b) => a.id === b)).toBe(true);
    });

    it('returns true when subset is empty', () => {
      const empty: {id: number}[] = [];

      expect(arrayIsSubset([{id: 1}], empty, (a, b) => a.id === b.id)).toBe(true);
    });

    it('uses a function with one parameter as a key function, which also gets the second array', () => {
      const calls: unknown[] = [];

      expect(
        arrayIsSubset([1, 2], ['2'], (value) => {
          calls.push(value);
          return true;
        }),
      ).toBe(true);
      expect(calls).toContain('2');
    });
  });
});
