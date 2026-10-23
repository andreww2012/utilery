import type {Ms as MsBase} from 'ms-ts';

/**
 * The number of milliseconds in a duration string literal type, like `'42s'` or `'2 hours'`.
 * The number may be negative or have a fractional part, and the whitespace around it is ignored.
 * The units are `ms`, `s`, `m`, `h`, `d`, `w` and `y` (365.25 days), and their long forms, like
 * `seconds` or `mins`, in lowercase or uppercase.
 * An invalid duration gives `never`.
 * In an expression, `ms<'42m'>(2_520_000)` does the same check.
 * @example
 * const timeout: Ms<'42s'> = 42_000;
 * const config = {retryDelay: 2_520_000 satisfies Ms<'42m'>};
 * @example
 * type A = Ms<'1.5h'>;
 * //=> 5400000
 * type B = Ms<'-3.14d'>;
 * //=> -271296000
 * type C = Ms<'42mss'>;
 * //=> never
 */
export type Ms<T extends string> = MsBase<T>;
