import {isInteger} from '../../src/predicate/is-integer.ts';

describe('predicate/isInteger', () => {
  it('basic test', () => {
    expect(isInteger(42)).toBe(true);
    expect(isInteger(42.5)).toBe(false);
  });
});
