// `isInteger` narrows `number` to type-fest's `Integer`, which collapses to
// `number` for any concrete numeric argument, so the linter sees every call as
// redundant even though exercising the runtime check is the point of the test
/* eslint-disable ts/no-unnecessary-condition */
import {isInteger} from '../../src/predicate/is-integer.ts';

describe('predicate/isInteger', () => {
  it('basic test', () => {
    expect(isInteger(42)).toBe(true);
    expect(isInteger(42.5)).toBe(false);
  });
});
