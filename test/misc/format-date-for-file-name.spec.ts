import {
  type FormatDateForFileNameOptions,
  formatDateForFileName,
} from '../../src/misc/format-date-for-file-name.ts';

const date = new Date(2026, 9, 25, 14, 30, 5, 123);

const createUtcDate = (year: number) => {
  const result = new Date(0);
  result.setUTCFullYear(year, 0, 1);
  return result;
};

describe('misc/formatDateForFileName', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it('formats the local date and time to seconds by default', () => {
    expect(formatDateForFileName(date)).toBe('2026-10-25_14-30-05');
  });

  it('formats the current time without a date', () => {
    vi.useFakeTimers({now: date});

    expect(formatDateForFileName()).toBe('2026-10-25_14-30-05');
    expect(formatDateForFileName({precision: 'day'})).toBe('2026-10-25');
  });

  it('accepts a timestamp', () => {
    expect(formatDateForFileName(date.getTime())).toBe('2026-10-25_14-30-05');
  });

  it.each<{precision: NonNullable<FormatDateForFileNameOptions['precision']>; expected: string}>([
    {precision: 'day', expected: '2026-10-25'},
    {precision: 'hour', expected: '2026-10-25_14'},
    {precision: 'minute', expected: '2026-10-25_14-30'},
    {precision: 'second', expected: '2026-10-25_14-30-05'},
    {precision: 'millisecond', expected: '2026-10-25_14-30-05-123'},
  ])('formats down to the $precision', ({precision, expected}) => {
    expect(formatDateForFileName(date, {precision})).toBe(expected);
  });

  it('uses the given separators', () => {
    expect(
      formatDateForFileName(date, {dateSeparator: '', timeSeparator: '', dateTimeSeparator: 'T'}),
    ).toBe('20261025T143005');
    expect(
      formatDateForFileName(date, {
        precision: 'millisecond',
        dateSeparator: '.',
        timeSeparator: '.',
        dateTimeSeparator: ' at ',
      }),
    ).toBe('2026.10.25 at 14.30.05.123');
  });

  it('uses UTC instead of the local time with `utc`', () => {
    // An offset of 5 hours 45 minutes, so that both the hours and the minutes differ
    vi.stubEnv('TZ', 'Asia/Kathmandu');
    const timestamp = Date.UTC(2026, 9, 24, 20, 0, 0);

    expect(formatDateForFileName(timestamp)).toBe('2026-10-25_01-45-00');
    expect(formatDateForFileName(timestamp, {utc: true})).toBe('2026-10-24_20-00-00');
  });

  it('repeats the names of the hour that repeats when the clocks go back, unlike with `utc`', () => {
    // Clocks go back from 03:00 to 02:00 at 01:00 UTC on this day
    vi.stubEnv('TZ', 'Europe/Berlin');
    const beforeChange = Date.UTC(2026, 9, 25, 0, 30);
    const afterChange = Date.UTC(2026, 9, 25, 1, 30);

    expect(formatDateForFileName(beforeChange)).toBe('2026-10-25_02-30-00');
    expect(formatDateForFileName(afterChange)).toBe('2026-10-25_02-30-00');
    expect(formatDateForFileName(beforeChange, {utc: true})).toBe('2026-10-25_00-30-00');
    expect(formatDateForFileName(afterChange, {utc: true})).toBe('2026-10-25_01-30-00');
  });

  it('pads the numbers with zeros', () => {
    const earlyDate = new Date(2026, 0, 2, 3, 4, 5, 6);
    earlyDate.setFullYear(99);

    expect(formatDateForFileName(earlyDate, {precision: 'millisecond'})).toBe(
      '0099-01-02_03-04-05-006',
    );
  });

  it('gives years outside 0-9999 a sign and six digits, like `toISOString`', () => {
    expect(formatDateForFileName(createUtcDate(10_000), {utc: true, precision: 'day'})).toBe(
      '+010000-01-01',
    );
    expect(formatDateForFileName(createUtcDate(-1), {utc: true, precision: 'day'})).toBe(
      '-000001-01-01',
    );
  });

  it.each([new Date(Number.NaN), Number.NaN, Number.POSITIVE_INFINITY])(
    'throws a RangeError for %s',
    (value) => {
      expect(() => formatDateForFileName(value)).toThrow(RangeError);
    },
  );
});
