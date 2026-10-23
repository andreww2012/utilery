import type {MultidimensionalReadonlyArray as MultidimensionalReadonlyArrayBase} from 'type-fest';

/**
 * A readonly array of `Dimensions` levels of nesting with `Element` values at
 * the bottom, like `readonly (readonly number[])[]` for 2 dimensions.
 * For mutable arrays, use `MultidimensionalArray`.
 * @example
 * type A = MultidimensionalReadonlyArray<number, 2>;
 * //=> readonly (readonly number[])[]
 */
export type MultidimensionalReadonlyArray<
  Element,
  Dimensions extends number,
> = MultidimensionalReadonlyArrayBase<Element, Dimensions>;
