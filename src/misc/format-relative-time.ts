// cspell:ignore Monaten
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const UNITS: readonly (readonly [Intl.RelativeTimeFormatUnit, number])[] = [
  ['year', 365 * DAY],
  ['month', 30 * DAY],
  ['week', 7 * DAY],
  ['day', DAY],
  ['hour', HOUR],
  ['minute', MINUTE],
  ['second', SECOND],
];

/** Options of `formatRelativeTime` */
export interface FormatRelativeTimeOptions {
  /** The moment to compare against. Defaults to the current time */
  now?: Date | number;
  /** A language tag (or a list of them), like `'en'` or `'de'`. Defaults to the runtime locale */
  locale?: Intl.LocalesArgument;
  /** `'long'` (`'in 3 months'`), `'short'` (`'in 3 mo.'`) or `'narrow'`. Defaults to `'long'` */
  style?: Intl.RelativeTimeFormatStyle;

  /**
   * `'auto'` uses words where the language has them (`'yesterday'`, `'now'`),
   * `'always'` always uses numbers (`'1 day ago'`). Defaults to `'auto'`
   */
  numeric?: Intl.RelativeTimeFormatNumeric;
}

/**
 * Formats a date relative to now, like `'3 days ago'` or `'in 2 hours'`, in
 * any language. The largest fitting unit is used (seconds, minutes, hours,
 * days, weeks, months or years), and the number is rounded to the nearest
 * integer. A month counts as 30 days and a year as 365 days.
 *
 * Throws a `RangeError` for an invalid date.
 * @param date - The date to format (a `Date` or a timestamp in milliseconds).
 * @param options - `now`: the moment to compare against; `locale`; `style` (defaults to `'long'`); `numeric` (defaults to `'auto'`).
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
  const difference = Number(date) - Number(now);
  const [unit, unitMilliseconds] = UNITS.find(
    ([, milliseconds]) => Math.abs(difference) >= milliseconds,
  ) || ['second', SECOND];

  // Rounded by the absolute value, so that the past and the future are symmetric
  const value = Math.sign(difference) * Math.round(Math.abs(difference) / unitMilliseconds);
  return new Intl.RelativeTimeFormat(locale, {style, numeric}).format(value, unit);
};
