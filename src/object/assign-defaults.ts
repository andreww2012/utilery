import {defaults, defaultsDeep, toDefaulted} from 'es-toolkit/compat';
import {cloneDeep} from 'es-toolkit/object';
import type {PrettifyObject} from '../_internal/types.ts';
import {arrayify} from '../array/arrayify.ts';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

type IntersectAll<Sources extends readonly unknown[]> = Sources extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head & IntersectAll<Tail>
  : unknown;

interface AssignDefaultsOptions {
  /**
   * When `true`, recurses into nested objects so missing keys are filled at
   * every depth.
   * When `false` (the default), only top-level keys are filled
   */
  deep?: boolean;

  /**
   * When `true`, the target is left untouched and a new object is returned.
   * When `false` (the default), the target is mutated in place
   */
  copy?: boolean;
}

/**
 * Fills in the keys of `target` that are `undefined` (or inherited from
 * `Object.prototype`) using the given `source`, or an array of `sources`
 * applied left to right, where the first defined value for a key wins.
 * Keys already present and defined on `target` are never overwritten.
 *
 * By default the `target` is **mutated** in place.
 * Pass `{deep: true}` to fill missing keys recursively.
 * Pass `{copy: true}` to leave the `target` untouched and get a new object back;
 * the two options compose.
 * @param target - The object receiving defaults.
 * Mutated unless `{copy: true}` is set.
 * @param source - A single defaults object, or an array of them applied left to right.
 * @param options - Optional behavior flags.
 * @param options.deep - When `true`, fills missing keys recursively.
 * @param options.copy - When `true`, returns a new object instead of mutating `target`.
 * @returns The defaulted object: the mutated `target`, or a new object when `{copy: true}`.
 * @example
 * // Fill missing top-level keys (mutating, the default)
 * assignDefaults({a: 1}, {a: 9, b: 2});
 * // {a: 1, b: 2}
 * @example
 * // Multiple sources: earlier sources win
 * assignDefaults({a: 1}, [{b: 2}, {b: 9, c: 3}]);
 * // {a: 1, b: 2, c: 3}
 * @example
 * // Recursive fill with `{deep: true}`
 * assignDefaults({a: {x: 1}}, {a: {x: 9, y: 2}}, {deep: true});
 * // {a: {x: 1, y: 2}}
 * @example
 * // Immutable with `{copy: true}`
 * const config = {a: 1};
 * const result = assignDefaults(config, {b: 2}, {copy: true});
 * // result is {a: 1, b: 2}; config is still {a: 1}
 */
export function assignDefaults<T extends object, const Sources extends readonly object[]>(
  target: T,
  source: Sources,
  options?: AssignDefaultsOptions,
): PrettifyObject<T & IntersectAll<Sources>>;
export function assignDefaults<T extends object, S extends object>(
  target: T,
  source: S,
  options?: AssignDefaultsOptions,
): PrettifyObject<T & S>;
export function assignDefaults(
  target: object,
  source: MaybeReadonlyArray<object>,
  options?: AssignDefaultsOptions,
): object {
  const sources = arrayify(source);
  const {deep, copy} = options || {};

  if (copy) {
    return deep
      ? (defaultsDeep(cloneDeep(target), ...sources) as object)
      : toDefaulted(target, ...sources);
  }

  return deep
    ? (defaultsDeep(target, ...sources) as object)
    : (defaults(target, ...sources) as object);
}
