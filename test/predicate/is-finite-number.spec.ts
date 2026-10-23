// `isFiniteNumber` narrows `number` to type-fest's `Finite`, which collapses to
// `number` for any concrete numeric argument, so the linter sees every call as
// redundant even though exercising the runtime check is the point of the test
/* eslint-disable ts/no-unnecessary-condition */
import {isFiniteNumber} from '../../src/predicate/is-finite-number.ts';

describe('predicate/isFiniteNumber', () => {
  it('basic test', () => {
    expect(isFiniteNumber(42)).toBe(true);
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isFiniteNumber(Number.NaN)).toBe(false);
  });
});
