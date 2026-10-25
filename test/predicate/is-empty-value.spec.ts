import {isEmptyValue} from '../../src/predicate/is-empty-value.ts';

describe('predicate/isEmptyValue', () => {
  it('basic test', () => {
    expect(isEmptyValue(null)).toBe(true);
    expect(isEmptyValue(undefined)).toBe(true);
    // eslint-disable-next-line ts/no-unnecessary-condition
    expect(isEmptyValue('')).toBe(true);
    expect(isEmptyValue([])).toBe(true);
    expect(isEmptyValue({})).toBe(true);
    expect(isEmptyValue(new Map())).toBe(true);
    expect(isEmptyValue(new Set())).toBe(true);

    expect(isEmptyValue('abc')).toBe(false);
    expect(isEmptyValue([1, 2, 3])).toBe(false);
    expect(isEmptyValue({a: 1})).toBe(false);
  });
});
