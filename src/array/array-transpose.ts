import {unzip, unzipWith} from 'es-toolkit/array';

type Transpose<K extends unknown[]> = {[I in keyof K]: K[I][]};

/**
 * Transposes a 2D array: treats the input rows as a matrix and returns its
 * columns.
 * The element at position `[i][j]` in the result comes from `[j][i]` in the
 * input.
 * Equivalent to undoing a "zip" of equal-length rows.
 *
 * When the rows have different lengths, the output has as many columns as
 * the longest row; positions with no source value receive `undefined`.
 *
 * A second-argument iteratee can be passed to fold each resulting column
 * into a single value.
 * @param rows - The matrix to transpose.
 * Not mutated.
 * @returns A new matrix where rows and columns have been swapped (or, with
 * an iteratee, an array of folded column values).
 * @example
 * // Basic transpose (the rows become columns)
 * arrayTranspose([['a', true, 1], ['b', false, 2]]);
 * // [['a', 'b'], [true, false], [1, 2]]
 * @example
 * // Jagged rows pad missing positions with `undefined`
 * arrayTranspose([[1, 2, 3], [4]]);
 * // [[1, 4], [2, undefined], [3, undefined]]
 * @example
 * // Fold each column with an iteratee
 * arrayTranspose([[1, 2], [3, 4], [5, 6]], (a, b, c) => a + b + c);
 * // [9, 12]
 * @example
 * // Equivalent to a variadic `zip`: wrap the arrays in an outer array
 * arrayTranspose([[1, 2, 3], ['a', 'b', 'c']]);
 * // [[1, 'a'], [2, 'b'], [3, 'c']]  (i.e. zip([1, 2, 3], ['a', 'b', 'c']))
 */
export function arrayTranspose<T extends unknown[]>(rows: readonly [...T][]): Transpose<T>;
export function arrayTranspose<T, R>(rows: readonly T[][], iteratee: (...values: T[]) => R): R[];
export function arrayTranspose<T>(
  rows: readonly T[][],
  iteratee?: (...values: T[]) => unknown,
): unknown[] {
  if (iteratee) {
    return rows.length === 0 ? [] : unzipWith(rows, iteratee);
  }

  return unzip(rows);
}
