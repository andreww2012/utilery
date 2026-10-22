/* eslint-disable unicorn/no-thenable -- thenables are what is being tested */
import {isPromiseLike} from '../../src/predicate/is-promise-like.ts';

describe('predicate/isPromiseLike', () => {
  it('detects promises and thenables', () => {
    expect(isPromiseLike(Promise.resolve(1))).toBe(true);
    expect(isPromiseLike({then: () => undefined})).toBe(true);
    expect(isPromiseLike(Object.assign(() => undefined, {then: () => undefined}))).toBe(true);
  });

  it('rejects other values', () => {
    expect(isPromiseLike({then: 1})).toBe(false);
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike('then')).toBe(false);
  });
});
