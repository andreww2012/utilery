import {arraySample} from '../../src/array/array-sample.ts';
import {createSeededRandom} from '../../src/math/create-seeded-random.ts';

describe('array/arraySample', () => {
  describe('single element (no size)', () => {
    it('returns an element that belongs to the source array', () => {
      const source = [10, 20, 30, 40, 50];

      for (let attempt = 0; attempt < 50; attempt++) {
        expect(source).toContain(arraySample(source));
      }
    });

    it('returns the only element for a single-element array', () => {
      expect(arraySample(['only'])).toBe('only');
    });

    it('returns undefined for an empty array', () => {
      expect(arraySample([])).toBeUndefined();
    });
  });

  describe('with size', () => {
    it('returns the requested number of distinct elements', () => {
      const source = [1, 2, 3, 4, 5];
      const result = arraySample(source, 3);

      expect(result).toHaveLength(3);
      expect(new Set(result).size).toBe(3);

      result.forEach((item) => {
        expect(source).toContain(item);
      });
    });

    it('returns an empty array when size is 0', () => {
      expect(arraySample([1, 2, 3], 0)).toStrictEqual([]);
    });

    it('returns an empty array when size is 0 on an empty source', () => {
      expect(arraySample([], 0)).toStrictEqual([]);
    });

    it('returns a permutation when size equals the source length', () => {
      const source = [1, 2, 3, 4];
      const result = arraySample(source, source.length);

      expect(result).toHaveLength(source.length);
      expect(new Set(result)).toStrictEqual(new Set(source));
    });

    it('throws when size exceeds the source length', () => {
      expect(() => arraySample([1, 2], 3)).toThrow();
    });

    it('throws when sampling any positive size from an empty array', () => {
      expect(() => arraySample([], 1)).toThrow();
    });
  });

  describe('with replacement', () => {
    it('returns the requested number of elements, all drawn from the source', () => {
      const source = [1, 2, 3];
      const result = arraySample(source, 5, {withReplacement: true});

      expect(result).toHaveLength(5);

      result.forEach((item) => {
        expect(source).toContain(item);
      });
    });

    it('allows the size to exceed the source length', () => {
      expect(arraySample([7], 4, {withReplacement: true})).toStrictEqual([7, 7, 7, 7]);
    });

    it('returns an empty array when size is 0', () => {
      expect(arraySample([1, 2, 3], 0, {withReplacement: true})).toStrictEqual([]);
    });

    it('returns an empty array when sampling from an empty source', () => {
      expect(arraySample([], 3, {withReplacement: true})).toStrictEqual([]);
    });
  });

  it('uses the given generator', () => {
    const array = [10, 20, 30, 40, 50];

    expect(arraySample(array, {random: () => 0.99})).toBe(50);
    expect(arraySample(array, 2, {random: createSeededRandom(1)})).toStrictEqual(
      arraySample(array, 2, {random: createSeededRandom(1)}),
    );
    expect(arraySample(array, 3, {withReplacement: true, random: () => 0})).toStrictEqual([
      10, 10, 10,
    ]);
  });
});
