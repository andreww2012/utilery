import type {MergeDeep as MergeDeepBase} from 'type-fest';

/** Options of `MergeDeep` */
export interface MergeDeepOptions {
  /**
   * What to do with two arrays or tuples under the same key: `'replace'` keeps
   * the one of `Source`, and `'spread'` joins them.
   * Top-level arrays and tuples are always joined.
   * Defaults to `'replace'`
   */
  arrayMergeMode?: 'replace' | 'spread';

  /**
   * Merges the elements of arrays and tuples one by one: an element only in
   * one of them is kept, and two elements at the same position are merged
   * according to `arrayMergeMode`, or replaced by the one of `Source` when they
   * cannot be merged.
   * Defaults to `false`
   */
  recurseIntoArrays?: boolean;
}

/**
 * Merges two object types, or two array types, at any depth.
 * A property of only one of them is kept, and a property of both is merged
 * when possible, or replaced with the one of `Source`.
 * Nested arrays are replaced and their elements are not merged, unless the
 * options say otherwise.
 * For a shallow merge, use `MergeTypes`.
 * @example
 * type A = MergeDeep<
 *   {life: number; items: string[]; a: {b: string; c: boolean}},
 *   {name: string; items: number[]; a: {b: number}}
 * >;
 * //=> {life: number; name: string; items: number[]; a: {b: number; c: boolean}}
 * @example
 * type B = MergeDeep<{items: string[]}, {items: number[]}, {arrayMergeMode: 'spread'}>;
 * //=> {items: (string | number)[]}
 * type C = MergeDeep<[1, 2], ['a']>;
 * //=> (1 | 2 | 'a')[]
 */
export type MergeDeep<
  Destination,
  Source,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends MergeDeepOptions = {},
> = MergeDeepBase<Destination, Source, Options>;
