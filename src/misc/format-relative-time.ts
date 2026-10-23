// cspell:ignore Monaten
const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

const UNITS: readonly (readonly [Intl.RelativeTimeFormatUnit, number])[] = [
  ['year', 365 * DAY_MS],
  ['month', 30 * DAY_MS],
  ['week', 7 * DAY_MS],
  ['day', DAY_MS],
  ['hour', HOUR_MS],
  ['minute', MINUTE_MS],
  ['second', SECOND_MS],
];

/** Options of `formatRelativeTime` */
export interface FormatRelativeTimeOptions {
  /**
   * The moment to compare against.
   * Defaults to the current time
   */
  now?: Date | number;

  /**
   * A language tag (or a list of them), like `'en'` or `'de'`.
   * Defaults to the runtime locale
   */
  locale?: Intl.LocalesArgument;

  /**
   * `'long'` (`'in 3 months'`), `'short'` (`'in 3 mo.'`) or `'narrow'`.
   * Defaults to `'long'`
   */
  style?: Intl.RelativeTimeFormatStyle;

  /**
   * `'auto'` uses words where the language has them (`'yesterday'`, `'now'`),
   * `'always'` always uses numbers (`'1 day ago'`).
   * Defaults to `'auto'`
   */
  numeric?: Intl.RelativeTimeFormatNumeric;
}

/**
 * Formats a date relative to now, like `'3 days ago'` or `'in 2 hours'`, in any
 * language.
 * The largest fitting unit is used (seconds, minutes, hours, days, weeks,
 * months or years), and the number is rounded to the nearest integer.
 * A month counts as 30 days and a year as 365 days.
 *
 * Throws a `RangeError` for an invalid date.
 * @param date - The date to format (a `Date` or a timestamp in milliseconds).
 * @param options - `now`: the moment to compare against; `locale`; `style` (defaults to `'long'`);
 * `numeric` (defaults to `'auto'`).
 * @returns The relative time.
 * @example
 * formatRelativeTime(Date.now() - 3 * 24 * 60 * 60 * 1000, {locale: 'en'});
 * // '3 days ago'
 * formatRelativeTime(Date.now() + 2 * 60 * 60 * 1000, {locale: 'en'});
 * // 'in 2 hours'
 * formatRelativeTime(Date.now() - 24 * 60 * 60 * 1000, {locale: 'en'});
 * // 'yesterday'
 * @example
 * // Other options
 * formatRelativeTime(new Date('2024-01-01'), {now: new Date('2024-03-01'), locale: 'de'});
 * // 'vor 2 Monaten'
 * formatRelativeTime(Date.now() - 90_000, {locale: 'en', style: 'short', numeric: 'always'});
 * // '2 min. ago'
 */
export const formatRelativeTime = (
  date: Date | number,
  options: FormatRelativeTimeOptions = {},
) => {
  const {now = Date.now(), locale, style, numeric = 'auto'} = options;
  const differenceMs = Number(date) - Number(now);
  const [unit, unitMilliseconds] = UNITS.find(
    ([, milliseconds]) => Math.abs(differenceMs) >= milliseconds,
  ) || ['second', SECOND_MS];

  // Rounded by the absolute value, so that the past and the future are symmetric
  const value = Math.sign(differenceMs) * Math.round(Math.abs(differenceMs) / unitMilliseconds);
  return new Intl.RelativeTimeFormat(locale, {style, numeric}).format(value, unit);
};
