import type {Alphanumeric as AlphanumericBase} from 'type-fest';

/**
 * A basic Latin letter or digit: `'a'` to `'z'`, `'A'` to `'Z'`, or `'0'` to
 * `'9'`.
 * @example
 * const valid: Alphanumeric = 'A';
 * // @ts-expect-error: not a letter or digit
 * const invalid: Alphanumeric = '#';
 */
export type Alphanumeric = AlphanumericBase;
