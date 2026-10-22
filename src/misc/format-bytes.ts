// cspell:ignore kbit
import prettyBytes, {type Options} from 'pretty-bytes';

export type {Options as FormatBytesOptions} from 'pretty-bytes';

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
export const formatBytes: (bytes: number | bigint, options?: Options) => string = prettyBytes;
