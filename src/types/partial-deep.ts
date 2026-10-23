import type {PartialDeep as PartialDeepBase} from 'type-fest';

/** Options of `PartialDeep` */
export interface PartialDeepOptions {
  /**
   * Also makes the elements of arrays and tuples optional.
   * Defaults to `false`
   */
  readonly recurseIntoArrays?: boolean;

  /**
   * With `recurseIntoArrays`, also allows `undefined` as an element of arrays
   * that are not tuples.
   * Defaults to `false`
   */
  readonly allowUndefinedInNonTupleArrays?: boolean;
}

/**
 * Makes every property of a type optional, at any depth, like a deep
 * `Partial`.
 * Handy for overrides of a default config, or for test data.
 * Arrays and tuples are not changed, unless the options say otherwise.
 * @example
 * const defaults = {editor: {fontSize: 14, fontWeight: 400}, autosave: true};
 * const apply = (overrides: PartialDeep<typeof defaults>) => mergeDeep(defaults, overrides);
 * apply({editor: {fontWeight: 500}});
 * @example
 * type Shape = {dimensions: [number, number]};
 * const shape: PartialDeep<Shape, {recurseIntoArrays: true}> = {dimensions: [15]};
 */
export type PartialDeep<
  T,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends PartialDeepOptions = {},
> = PartialDeepBase<T, Options>;
