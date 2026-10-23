import type {MultidimensionalArray as MultidimensionalArrayBase} from 'type-fest';

/**
 * An array of `Dimensions` levels of nesting with `Element` values at the
 * bottom, like `number[][]` for 2 dimensions.
 * For readonly arrays, use `MultidimensionalReadonlyArray`.
 * @example
 * type A = MultidimensionalArray<number, 3>;
 * //=> number[][][]
 * @example
 * declare function createMatrix<D extends number>(dimensions: D): MultidimensionalArray<number, D>;
 * createMatrix(2);
 * //=> number[][]
 */
export type MultidimensionalArray<Element, Dimensions extends number> = MultidimensionalArrayBase<
  Element,
  Dimensions
>;
