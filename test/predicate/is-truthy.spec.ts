import {isTruthy} from '../../src/predicate/is-truthy.ts';

describe('predicate/isTruthy', () => {
  it('returns true for truthy values', () => {
    const values: unknown[] = [1, 'a', {}, [], true, Number.POSITIVE_INFINITY];

    values.forEach((value) => {
      expect(isTruthy(value)).toBe(true);
    });
  });

  it('returns false for falsy values', () => {
    const values: unknown[] = [0, 0n, '', false, null, undefined, Number.NaN];

    values.forEach((value) => {
      expect(isTruthy(value)).toBe(false);
    });
  });

  it('removes falsy values when used as a filter predicate', () => {
    const values: (number | null | undefined)[] = [1, null, 2, undefined, 0];

    expect(values.filter(isTruthy)).toStrictEqual([1, 2]);
  });
});
