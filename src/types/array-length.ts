import type {ArrayLength as ArrayLengthBase} from 'type-fest';

/**
 * The length of an array type, like `T['length']`: a number literal for a
 * tuple, and `number` for other arrays.
 * Optional elements give a union of the possible lengths.
 * @example
 * type A = ArrayLength<[1, 2, 3]>;
 * //=> 3
 * type B = ArrayLength<[1, 2, number?]>;
 * //=> 2 | 3
 * type C = ArrayLength<string[]>;
 * //=> number
 */
export type ArrayLength<T extends readonly unknown[]> = ArrayLengthBase<T>;
