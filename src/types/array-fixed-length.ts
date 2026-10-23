import type {FixedLengthArray} from 'type-fest';

/**
 * A tuple of `Length` elements of type `Element`, without the methods that change
 * the length, like `push` and `pop`.
 * Unlike a plain tuple type, its length can't change, and it is easy to write
 * for long tuples.
 * Reading or writing an index out of bounds is a compile error.
 * It is assignable to a readonly tuple of the same length.
 * @example
 * const color: ArrayFixedLength<number, 3> = [255, 128, 64];
 * color[0] = 0;
 * // @ts-expect-error: there is no index 3
 * color[3] = 1;
 * // @ts-expect-error: `push` does not exist
 * color.push(1);
 */
export type ArrayFixedLength<Element, Length extends number> = FixedLengthArray<Element, Length>;
