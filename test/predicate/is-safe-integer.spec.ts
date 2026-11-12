import {isSafeInteger} from '../../src/predicate/is-safe-integer.ts';

describe('predicate/isSafeInteger', () => {
  it('basic test', () => {
    expect(isSafeInteger(42)).toBe(true);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
  });
});
