import {negatePredicate} from '../../src/function/negate-predicate.ts';

const isString = (value: unknown) => typeof value === 'string';

describe('function/negatePredicate', () => {
  it('basic test', () => {
    const isNotString = negatePredicate(isString);
    const numberValue = 1 as string | number;
    const stringValue = 'text' as string | number;

    expect(isNotString(numberValue)).toBe(true);
    expect(isNotString(stringValue)).toBe(false);
  });
});
