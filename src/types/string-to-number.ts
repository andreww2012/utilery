import type {StringToNumber as StringToNumberBase} from 'type-fest';

/**
 * Converts a string literal type of a number, like `'-12.5'` or `'Infinity'`,
 * to the number literal type.
 * A string that has no matching number literal, like `'1.50'`, `'0x10'` or
 * `'12_345'`, gives `never`.
 * @example
 * type A = StringToNumber<'1234'>;
 * //=> 1234
 * type B = StringToNumber<'-12.5'>;
 * //=> -12.5
 * type C = StringToNumber<'1.50'>;
 * //=> never
 */
export type StringToNumber<S extends string> = StringToNumberBase<S>;
