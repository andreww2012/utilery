// `m:ss`, `h:mm:ss` or `d:hh:mm:ss`, where the first field may have any number of digits
const COLON_DURATION_REGEX = /^(-?)(\d+(?::\d{2}){1,3})(?:\.(\d+))?$/;

/**
 * Parses a duration written in colon notation, the digital watch format used
 * by media players and race timers, into milliseconds.
 *
 * Accepts `m:ss`, `h:mm:ss` and `d:hh:mm:ss`, optionally with a leading `-` and
 * a fractional part of seconds (`1:35.5`).
 * Every field except the first must have exactly two digits and stay within its
 * range (below 60 for minutes and seconds, below 24 for hours).
 * The first field may be as large as needed, so `90:00` (90 minutes) and
 * `25:00:00` (25 hours) are valid.
 *
 * This is the reverse of `formatDuration` with `{colonNotation: true}`.
 * It doesn't support the year field (format with `hideYear` or
 * `hideYearAndDays` to avoid it) or the output of `hideSeconds`, where the last
 * field is minutes.
 * @param text - The duration to parse.
 * Surrounding whitespace is not allowed.
 * @returns The duration in milliseconds, or `undefined` when `text` is not a valid duration.
 * @example
 * // Minutes and hours
 * parseColonDuration('1:35');
 * // 95_000
 * parseColonDuration('1:02:03');
 * // 3_723_000
 * @example
 * // Fractional seconds and negative durations
 * parseColonDuration('0:01.5');
 * // 1500
 * parseColonDuration('-1:00');
 * // -60_000
 * @example
 * // Invalid input
 * parseColonDuration('1:5');
 * // undefined (seconds need two digits)
 * parseColonDuration('1:60');
 * // undefined (seconds are out of range)
 */
export const parseColonDuration = (text: string): number | undefined => {
  const [, sign, fields, fraction = ''] = COLON_DURATION_REGEX.exec(text) || [];
  const fieldValues = fields?.split(':').map(Number) || [];
  const [seconds = 0, minutes = 0, hours = 0, days = 0] = fieldValues.toReversed();

  // The first field is never range-checked
  const isValid =
    fieldValues.length > 0 &&
    seconds < 60 &&
    (fieldValues.length <= 2 || minutes < 60) &&
    (fieldValues.length <= 3 || hours < 24);

  // Avoids the rounding errors of multiplying a fraction by 1000
  const fractionMilliseconds = Number(
    `${fraction.slice(0, 3).padEnd(3, '0')}.${fraction.slice(3)}`,
  );
  const milliseconds =
    ((days * 24 + hours) * 60 + minutes) * 60_000 + seconds * 1000 + fractionMilliseconds;
  // `|| 0` turns the `-0` of `-0:00` into `0`
  const signedMilliseconds = (sign ? -milliseconds : milliseconds) || 0;

  return isValid ? signedMilliseconds : undefined;
};
