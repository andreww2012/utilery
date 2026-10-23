// cspell:ignore kbit
import prettyBytes from 'pretty-bytes';

/** Options of `formatBytes` */
export interface FormatBytesOptions {
  /**
   * Adds a `+` to positive values, like for differences.
   * Zero gets a space instead, to keep the alignment.
   * Defaults to `false`
   */
  readonly signed?: boolean;

  /**
   * Localizes the number and the decimal separator, but not the unit: `true`
   * uses the locale of the runtime, and a language tag like `'de'` (or an array
   * of them) uses that locale.
   * Defaults to `false`
   */
  readonly locale?: boolean | string | readonly string[];

  /**
   * Formats the number as bits (`'1.34 kbit'`) instead of bytes, like for a
   * bit rate.
   * Defaults to `false`
   */
  readonly bits?: boolean;

  /**
   * Uses binary units (1 KiB = 1024 bytes), as for memory, instead of decimal
   * ones (1 kB = 1000 bytes), as for file sizes.
   * Defaults to `false`
   */
  readonly binary?: boolean;

  /**
   * The minimum number of decimals, from `0` to `100`.
   * When this or `maximumFractionDigits` is set, the number is cut instead of
   * rounded; otherwise it is rounded to 3 significant digits.
   * It must not be greater than `maximumFractionDigits`
   */
  readonly minimumFractionDigits?: number;

  /**
   * The maximum number of decimals, from `0` to `100`.
   * When this or `minimumFractionDigits` is set, the number is cut instead of
   * rounded; otherwise it is rounded to 3 significant digits.
   * It must not be less than `minimumFractionDigits`
   */
  readonly maximumFractionDigits?: number;

  /**
   * Puts a space between the number and the unit.
   * Defaults to `true`
   */
  readonly space?: boolean;

  /**
   * Uses a non-breaking space between the number and the unit, so that they
   * stay on the same line.
   * Has no effect when `space` is `false`.
   * Defaults to `false`
   */
  readonly nonBreakingSpace?: boolean;

  /**
   * Pads the result with spaces on the left to this width, for aligned
   * columns.
   * A longer result is not cut.
   * It must be a non-negative integer
   */
  readonly fixedWidth?: number;
}

/** Formats a number of bytes as a human-readable size, like `'1.34 kB'` */
export const formatBytes: {
  /**
   * Formats a number of bytes as a human-readable size, like `'1.34 kB'`.
   * Accepts a number or a bigint; negative values get a leading `-`.
   *
   * Uses decimal units (1 kB = 1000 bytes), as file sizes usually are; pass
   * `{binary: true}` for binary ones (1 KiB = 1024 bytes), as for memory.
   *
   * Highlights of the options:
   *
   * - `bits`: format as bits (`'1.34 kbit'`), like for a bit rate.
   * - `signed`: add a `+` to positive values, like for differences.
   * - `locale`: localize the number (`true` for the runtime locale, or a
   *   language tag like `'de'`).
   * - `minimumFractionDigits` / `maximumFractionDigits`: control the number of
   *   decimals (by default, up to 3 significant digits are shown).
   * - `space`: put a space between the number and the unit (defaults to
   *   `true`); `nonBreakingSpace` to use a non-breaking one.
   * - `fixedWidth`: pad the result to a fixed width, for aligned columns.
   * @param bytes - The number of bytes, as a number or a `bigint`.
   * @param options - Formatting options.
   * @returns The formatted size.
   * @throws {TypeError} When `bytes` is not finite, or an option has an invalid value.
   * @throws {RangeError} When `minimumFractionDigits` is greater than `maximumFractionDigits`.
   * @example
   * formatBytes(1337);
   * // '1.34 kB'
   * formatBytes(100);
   * // '100 B'
   * formatBytes(-1_500_000);
   * // '-1.5 MB'
   * @example
   * formatBytes(1024, {binary: true});
   * // '1 KiB'
   * formatBytes(1337, {bits: true});
   * // '1.34 kbit'
   * formatBytes(42, {signed: true});
   * // '+42 B'
   * formatBytes(1337, {locale: 'de'});
   * // '1,34 kB'
   */
  (bytes: number | bigint, options?: FormatBytesOptions): string;
} = prettyBytes;
