import {findClosestNumber} from '../../src/math/find-closest-number.ts';

describe('math/findClosestNumber', () => {
  it('finds the closest value', () => {
    expect(findClosestNumber([100, 400, 700, 900], 500)).toBe(400);
    expect(findClosestNumber([100, 400, 700, 900], 2000)).toBe(900);
    expect(findClosestNumber([-5, 5], -4)).toBe(-5);
    expect(findClosestNumber(new Set([1, 2, 3]), 2.4)).toBe(2);
  });

  it('prefers the earlier value on a tie', () => {
    expect(findClosestNumber([10, 20], 15)).toBe(10);
    expect(findClosestNumber([20, 10], 15)).toBe(20);
  });

  it('returns `undefined` without values', () => {
    expect(findClosestNumber([], 5)).toBeUndefined();
  });
});
