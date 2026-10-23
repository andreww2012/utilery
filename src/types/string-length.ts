import type {StringLength as StringLengthBase} from 'type-fest';

/**
 * The length of a string literal type, as a number literal type.
 * A string type with infinitely many values, like `string` or
 * `` `${string}abc` ``, gives `number`.
 * @example
 * type A = StringLength<'abcde'>;
 * //=> 5
 * type B = StringLength<'abcde' | 'fgh'>;
 * //=> 3 | 5
 * type C = StringLength<string>;
 * //=> number
 */
export type StringLength<S extends string> = StringLengthBase<S>;
