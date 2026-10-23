import prettyMilliseconds from 'pretty-ms';

/** Options of `formatDuration` */
export interface FormatDurationOptions {
  /**
   * The number of digits after the decimal point of the seconds.
   * The digits are cut, not rounded, so the seconds never round up into the next
   * step: `1999` gives `'1.9s'`, and `'1s'` with `0` digits.
   * Defaults to `1`
   */
  readonly secondsDecimalDigits?: number;

  /**
   * The number of digits after the decimal point of the milliseconds.
   * The milliseconds are rounded, but never up to `1000ms`, and a duration
   * under a second that is not `0` never rounds down to `0ms`: `999.6` gives
   * `'999ms'`, and `0.2` gives `'1ms'`.
   * With `formatSubMilliseconds`, they are cut instead.
   * Defaults to `0`
   */
  readonly millisecondsDecimalDigits?: number;

  /**
   * Keeps the decimals of whole seconds, like `'13.0s'` instead of `'13s'`, so
   * that the width of the output doesn't change.
   * Defaults to `false`
   */
  readonly keepDecimalsOnWholeSeconds?: boolean;

  /**
   * Shows only the first unit, like `'1h'` instead of `'1h 10m'`.
   * It also sets `millisecondsDecimalDigits` and `secondsDecimalDigits` to `0`.
   * Defaults to `false`
   */
  readonly compact?: boolean;

  /**
   * The number of units to show.
   * `compact` overrides it, and `colonNotation` ignores it.
   * Defaults to `Infinity`
   */
  readonly unitCount?: number;

  /**
   * Writes the units in full, like `'5 hours 1 minute 45 seconds'` instead of
   * `'5h 1m 45s'`.
   * Defaults to `false`
   */
  readonly verbose?: boolean;

  /**
   * Shows the milliseconds as a separate unit instead of the decimals of the
   * seconds.
   * Defaults to `false`
   */
  readonly separateMilliseconds?: boolean;

  /**
   * Shows the microseconds and the nanoseconds too.
   * They are cut to whole nanoseconds, so a duration under 1 nanosecond gives
   * `'0ms'`.
   * Defaults to `false`
   */
  readonly formatSubMilliseconds?: boolean;

  /**
   * Writes the duration like a digital clock, like `'5:01:45'` instead of
   * `'5h 1m 45s'`.
   * At least the minutes are shown (`'0:01'` for a second), or the hours with
   * `hideSeconds`.
   * The days after a year are padded to 3 digits to keep the width:
   * `'1:005:00:00:00'`.
   * It turns off `compact`, `formatSubMilliseconds`, `separateMilliseconds` and
   * `verbose`, and ignores `unitCount`, as a missing field would change the
   * meaning of the others.
   * Defaults to `false`
   */
  readonly colonNotation?: boolean;

  /**
   * Shows the years as days (365 per year), like `'368d 5h 1m 45s'` instead of
   * `'1y 3d 5h 1m 45s'`.
   * Defaults to `false`
   */
  readonly hideYear?: boolean;

  /**
   * Shows the years and the days as hours, like `'8837h 1m 45s'` instead of
   * `'1y 3d 5h 1m 45s'`.
   * Defaults to `false`
   */
  readonly hideYearAndDays?: boolean;

  /**
   * Hides the seconds, like `'1y 3d 5h 1m'` instead of `'1y 3d 5h 1m 45s'`.
   * A duration under a minute still shows its seconds.
   * With `colonNotation`, the hours are always shown: `60000` gives `'0:01'`,
   * and `45000` gives `'0:00:45'`.
   * Defaults to `false`
   */
  readonly hideSeconds?: boolean;

  /**
   * Shows a duration under a second as decimal seconds, like `'0.9s'` instead
   * of `'900ms'`, so that the unit doesn't change, like in a progress bar.
   * The seconds are cut, so `999` gives `'0.9s'`.
   * A duration too short for the decimals of the seconds, like `50` with the
   * default `secondsDecimalDigits`, stays in milliseconds, and so does any
   * duration under a second with `compact`.
   * Defaults to `false`
   */
  readonly subSecondsAsDecimals?: boolean;
}

/** Formats a duration in milliseconds as a human-readable string, like `'15d 11h 23m 20s'` */
export const formatDuration: {
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
  (milliseconds: number | bigint, options?: FormatDurationOptions): string;
} = prettyMilliseconds;
