import type {Trim as TrimBase} from 'type-fest';

/**
 * Removes the whitespace at the start and the end of a string literal type, like
 * spaces, tabs and line breaks.
 * @example
 * type A = Trim<'  foo  '>;
 * //=> 'foo'
 * type B = Trim<'\t foo \n'>;
 * //=> 'foo'
 */
export type Trim<V extends string> = TrimBase<V>;
