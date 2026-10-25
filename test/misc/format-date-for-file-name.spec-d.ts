import {formatDateForFileName} from '../../src/misc/format-date-for-file-name.ts';

describe('misc/formatDateForFileName', () => {
  it('returns a string', () => {
    expectTypeOf(formatDateForFileName()).toEqualTypeOf<string>();
  });

  it('accepts options with or without a date', () => {
    expectTypeOf(formatDateForFileName).toBeCallableWith({precision: 'day'});
    expectTypeOf(formatDateForFileName).toBeCallableWith(new Date(), {utc: true});
    expectTypeOf(formatDateForFileName).toBeCallableWith(Date.now(), {dateSeparator: ''});
  });

  it('rejects other values', () => {
    // @ts-expect-error -- a date string is not accepted
    formatDateForFileName('2026-10-25');
    // @ts-expect-error -- not a known precision
    formatDateForFileName({precision: 'week'});
    // @ts-expect-error -- the date goes first
    formatDateForFileName({utc: true}, new Date());
  });
});
