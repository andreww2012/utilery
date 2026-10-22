// Values of known types are passed on purpose, to check the runtime result
/* eslint-disable ts/no-unnecessary-condition */
import {isValidDate} from '../../src/predicate/is-valid-date.ts';

describe('predicate/isValidDate', () => {
  it('accepts valid dates', () => {
    expect(isValidDate(new Date('2024-01-31'))).toBe(true);
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it('rejects invalid dates and other values', () => {
    expect(isValidDate(new Date('not a date'))).toBe(false);
    expect(isValidDate('2024-01-31')).toBe(false);
    expect(isValidDate(Date.now())).toBe(false);
    expect(isValidDate(null)).toBe(false);
  });
});
