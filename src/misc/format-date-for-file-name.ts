import {isValidDate} from '../predicate/is-valid-date.ts';

/** Options of `formatDateForFileName` */
export interface FormatDateForFileNameOptions {
  /**
   * The smallest unit to include: `'day'` gives only the date.
   * Defaults to `'second'`
   */
  precision?: 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

  /**
   * Whether to use UTC instead of the local time.
   * The result doesn't show the time zone either way.
   * Defaults to `false`
   */
  utc?: boolean;

  /**
   * Goes between the year, the month and the day.
   * Defaults to `'-'`
   */
  dateSeparator?: string;

  /**
   * Goes between the hours, the minutes, the seconds and the milliseconds.
   * Defaults to `'-'`
   */
  timeSeparator?: string;

  /**
   * Goes between the date and the time.
   * Defaults to `'_'`
   */
  dateTimeSeparator?: string;
}

type DateParts = [
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds: number,
];

const TIME_PART_COUNTS: Readonly<
  Record<NonNullable<FormatDateForFileNameOptions['precision']>, number>
> = {day: 0, hour: 1, minute: 2, second: 3, millisecond: 4};
const MAX_FOUR_DIGIT_YEAR = 9999;

const pad = (value: number, length = 2) => String(value).padStart(length, '0');

// Like in `Date#toISOString`, other years get a sign and six digits
const formatYear = (year: number) =>
  year >= 0 && year <= MAX_FOUR_DIGIT_YEAR
    ? pad(year, 4)
    : `${year < 0 ? '-' : '+'}${pad(Math.abs(year), 6)}`;

/**
 * Formats the current date and time for a file name, like `2026-10-25_14-30-05`.
 *
 * The result sorts in time order, like ISO 8601, and is valid in file names on every common
 * system: unlike `Date#toISOString`, it has no `:`, which Windows doesn't allow.
 * It uses the local time, as people expect to see their own clock in file names.
 * When the clocks go back, an hour repeats, so its names can repeat and sort out of order: pass
 * `utc: true` where the order matters.
 *
 * Throws a `RangeError` for an invalid date.
 * @param options - `precision` (`'day'` for only the date, defaults to `'second'`); `utc`
 * (defaults to `false`); `dateSeparator` and `timeSeparator` (default to `'-'`);
 * `dateTimeSeparator` (defaults to `'_'`).
 * @returns The formatted date and time.
 * @example
 * downloadFile(csv, `report_${formatDateForFileName()}.csv`);
 * // Saved as 'report_2026-10-25_14-30-05.csv'
 * @example
 * formatDateForFileName({precision: 'day'});
 * // '2026-10-25'
 * formatDateForFileName({precision: 'millisecond'});
 * // '2026-10-25_14-30-05-123'
 * formatDateForFileName({dateSeparator: '', timeSeparator: '', dateTimeSeparator: 'T'});
 * // '20261025T143005'
 */
export function formatDateForFileName(options?: FormatDateForFileNameOptions): string;

/**
 * Formats a date and time for a file name, like `2026-10-25_14-30-05`.
 *
 * The result sorts in time order, like ISO 8601, and is valid in file names on every common
 * system: unlike `Date#toISOString`, it has no `:`, which Windows doesn't allow.
 * It uses the local time, as people expect to see their own clock in file names.
 * When the clocks go back, an hour repeats, so its names can repeat and sort out of order: pass
 * `utc: true` where the order matters.
 *
 * Throws a `RangeError` for an invalid date.
 * @param date - The date to format (a `Date` or a timestamp in milliseconds).
 * @param options - `precision` (`'day'` for only the date, defaults to `'second'`); `utc`
 * (defaults to `false`); `dateSeparator` and `timeSeparator` (default to `'-'`);
 * `dateTimeSeparator` (defaults to `'_'`).
 * @returns The formatted date and time.
 * @example
 * formatDateForFileName(new Date(2026, 9, 25, 14, 30, 5));
 * // '2026-10-25_14-30-05'
 * formatDateForFileName(invoice.createdAt, {precision: 'day'});
 * // '2026-10-25'
 * formatDateForFileName(Date.UTC(2026, 9, 25, 14, 30, 5), {utc: true});
 * // '2026-10-25_14-30-05'
 */
export function formatDateForFileName(
  date: Date | number,
  options?: FormatDateForFileNameOptions,
): string;
export function formatDateForFileName(
  dateOrOptions: Date | number | FormatDateForFileNameOptions = {},
  options: FormatDateForFileNameOptions = {},
): string {
  const isDateGiven = dateOrOptions instanceof Date || typeof dateOrOptions === 'number';
  const {
    precision = 'second',
    utc = false,
    dateSeparator = '-',
    timeSeparator = '-',
    dateTimeSeparator = '_',
  } = isDateGiven ? options : dateOrOptions;
  const date = new Date(isDateGiven ? dateOrOptions : Date.now());
  // eslint-disable-next-line ts/no-unnecessary-condition -- Also rejects an invalid `Date`, which its type can't express
  if (!isValidDate(date)) {
    throw new RangeError('Invalid date');
  }

  const [year, month, day, hours, minutes, seconds, milliseconds]: DateParts = utc
    ? [
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ]
    : [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
      ];
  const datePart = [formatYear(year), pad(month + 1), pad(day)].join(dateSeparator);
  const timeParts = [pad(hours), pad(minutes), pad(seconds), pad(milliseconds, 3)].slice(
    0,
    TIME_PART_COUNTS[precision],
  );

  return timeParts.length > 0
    ? `${datePart}${dateTimeSeparator}${timeParts.join(timeSeparator)}`
    : datePart;
}
