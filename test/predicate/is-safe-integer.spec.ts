// `isSafeInteger` narrows `number` to type-fest's `Integer`, which collapses to
// `number` for any concrete numeric argument, so the linter sees every call as
// redundant even though exercising the runtime check is the point of the test
/* eslint-disable ts/no-unnecessary-condition */
import {isSafeInteger} from '../../src/predicate/is-safe-integer.ts';

describe('predicate/isSafeInteger', () => {
  it('basic test', () => {
    expect(isSafeInteger(42)).toBe(true);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
  });
});
