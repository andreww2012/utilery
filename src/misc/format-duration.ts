import prettyMilliseconds from 'pretty-ms';

export type {Options as FormatDurationOptions} from 'pretty-ms';

/**
 * Formats a duration in milliseconds as a human-readable string, like
 * `'15d 11h 23m 20s'`.
 * Accepts a number or a bigint; negative durations get a leading `-`.
 *
 * Highlights of the options:
 *
 * - `verbose`: full unit names (`'5 hours 1 minute'`).
 * - `compact` / `unitCount`: show only the first one / first N units.
 * - `secondsDecimalDigits`: digits after the decimal point of seconds
 *   (defaults to `1`).
 * - `colonNotation`: digital watch format (`'5:01:45'`), always showing at
 *   least minutes.
 *   It ignores `unitCount`.
 *   Combine it with `hideYearAndDays` to count hours past 24 (`'25:00:00'`)
 *   instead of adding day and year fields.
 *   Parse such strings back with `parseColonDuration`.
 * - `hideYear`, `hideYearAndDays`: leave out the larger units, adding their
 *   values to the smaller ones.
 * - `hideSeconds`: leave out the seconds, unless the duration is under a
 *   minute.
 *   With `colonNotation`, it always shows the hours, so `'0:01'` is one minute.
 * @param milliseconds - The duration in milliseconds.
 * @param options - Formatting options.
 * @returns The formatted duration.
 * @example
 * // Default format
 * formatDuration(1_337_000_000);
 * // '15d 11h 23m 20s'
 * formatDuration(1337);
 * // '1.3s'
 * @example
 * // Full unit names
 * formatDuration(1_335_669_000, {verbose: true});
 * // '15 days 11 hours 1 minute 9 seconds'
 * @example
 * // Only the largest unit
 * formatDuration(1337, {compact: true});
 * // '1s'
 * @example
 * // Colon notation
 * formatDuration(3_723_000, {colonNotation: true});
 * // '1:02:03'
 * formatDuration(95_500, {colonNotation: true, secondsDecimalDigits: 0});
 * // '1:35'
 * formatDuration(90_061_000, {colonNotation: true, hideYearAndDays: true});
 * // '25:01:01'
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const formatDuration = prettyMilliseconds;
