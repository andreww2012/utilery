import {slidingWindow} from '../../src/iterable/sliding-window.ts';

function* naturals(limit: number) {
  for (let index = 0; index < limit; index++) {
    yield index;
  }
}

function* infiniteNaturals() {
  let index = 0;

  while (true) {
    yield index++;
  }
}

describe('iterable/slidingWindow', () => {
  describe('full windows only (default)', () => {
    it('yields overlapping windows with the default step of 1', () => {
      expect([...slidingWindow([1, 2, 3, 4], 2)]).toStrictEqual([
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
    });

    it('respects a custom step that still overlaps (`step < size`)', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2)]).toStrictEqual([
        [1, 2, 3],
        [3, 4, 5],
      ]);
    });

    it('produces non-overlapping windows when `step === size`', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5, 6], 2, 2)]).toStrictEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it('skips elements between windows when `step > size`', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 3)]).toStrictEqual([
        [1, 2],
        [4, 5],
        [7, 8],
      ]);
    });

    it('drops trailing elements that cannot fill a full window', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5], 3, 2)]).toStrictEqual([
        [1, 2, 3],
        [3, 4, 5],
      ]);
    });

    it('returns no windows when the iterable is shorter than `size`', () => {
      expect([...slidingWindow([1, 2], 3)]).toStrictEqual([]);
    });

    it('yields a single window when the iterable length equals `size`', () => {
      expect([...slidingWindow([1, 2, 3], 3)]).toStrictEqual([[1, 2, 3]]);
    });

    it('returns no windows for an empty iterable', () => {
      expect([...slidingWindow([], 3)]).toStrictEqual([]);
    });
  });

  describe('partial windows', () => {
    it('appends a shorter tail window when leftover elements remain', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2, {partialWindows: true})]).toStrictEqual([
        [1, 2, 3],
        [3, 4, 5],
        [5, 6],
      ]);
    });

    it('yields every partial window for `step === 1`', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5], 3, 1, {partialWindows: true})]).toStrictEqual([
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
        [4, 5],
        [5],
      ]);
    });

    it('yields the entire iterable as a single partial when it is shorter than `size`', () => {
      expect([...slidingWindow([1, 2], 5, 1, {partialWindows: true})]).toStrictEqual([[1, 2], [2]]);
    });

    it('includes a partial start when `step > size` lands past the last full window', () => {
      expect([...slidingWindow([1, 2, 3, 4, 5, 6, 7], 2, 3, {partialWindows: true})]).toStrictEqual(
        [[1, 2], [4, 5], [7]],
      );
    });

    it('produces nothing extra when the iterable divides evenly', () => {
      expect([...slidingWindow([1, 2, 3, 4], 2, 2, {partialWindows: true})]).toStrictEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('returns no windows for an empty iterable even with partial windows enabled', () => {
      expect([...slidingWindow([], 3, 1, {partialWindows: true})]).toStrictEqual([]);
    });
  });

  describe('iterable sources', () => {
    it('walks a generator', () => {
      expect([...slidingWindow(naturals(5), 2)]).toStrictEqual([
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
    });

    it('walks a Set', () => {
      expect([...slidingWindow(new Set([10, 20, 30, 40]), 2)]).toStrictEqual([
        [10, 20],
        [20, 30],
        [30, 40],
      ]);
    });

    it('walks a Map (yielded as `[key, value]` pairs)', () => {
      const scores = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);

      expect([...slidingWindow(scores, 2)]).toStrictEqual([
        [
          ['a', 1],
          ['b', 2],
        ],
        [
          ['b', 2],
          ['c', 3],
        ],
      ]);
    });

    it('walks a string (iterated by code points)', () => {
      expect([...slidingWindow('abcd', 2)]).toStrictEqual([
        ['a', 'b'],
        ['b', 'c'],
        ['c', 'd'],
      ]);
      expect([...slidingWindow('😀字😀', 2)]).toStrictEqual([
        ['😀', '字'],
        ['字', '😀'],
      ]);
    });

    it('supports short-circuiting an infinite iterable', () => {
      const iterator = slidingWindow(infiniteNaturals(), 3);

      expect(iterator.next().value).toStrictEqual([0, 1, 2]);
      expect(iterator.next().value).toStrictEqual([1, 2, 3]);
      expect(iterator.next().value).toStrictEqual([2, 3, 4]);
    });

    it('yields independent array copies (mutating one does not affect later windows)', () => {
      const iterator = slidingWindow([1, 2, 3, 4], 2);
      const first = iterator.next().value;

      if (first) {
        first[0] = 999;
      }

      expect(iterator.next().value).toStrictEqual([2, 3]);
    });
  });

  describe('validation', () => {
    it('throws when `size` is zero', () => {
      expect(() => [...slidingWindow([1, 2, 3], 0)]).toThrow('`size` must be a positive integer.');
    });

    it('throws when `size` is negative', () => {
      expect(() => [...slidingWindow([1, 2, 3], -2)]).toThrow('`size` must be a positive integer.');
    });

    it('throws when `size` is not an integer', () => {
      expect(() => [...slidingWindow([1, 2, 3], 1.5)]).toThrow(
        '`size` must be a positive integer.',
      );
    });

    it('throws when `step` is zero', () => {
      expect(() => [...slidingWindow([1, 2, 3], 2, 0)]).toThrow(
        '`step` must be a positive integer.',
      );
    });

    it('throws when `step` is negative', () => {
      expect(() => [...slidingWindow([1, 2, 3], 2, -1)]).toThrow(
        '`step` must be a positive integer.',
      );
    });

    it('throws when `step` is not an integer', () => {
      expect(() => [...slidingWindow([1, 2, 3], 2, 1.5)]).toThrow(
        '`step` must be a positive integer.',
      );
    });
  });
});
