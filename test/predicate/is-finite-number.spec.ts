import {isFiniteNumber} from '../../src/predicate/is-finite-number.ts';

describe('predicate/isFiniteNumber', () => {
  it('basic test', () => {
    expect(isFiniteNumber(42)).toBe(true);
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isFiniteNumber(Number.NaN)).toBe(false);
  });
});
