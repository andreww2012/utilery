import {has, hasIn} from 'es-toolkit/compat';
import type {MaybeArray} from '../types/maybe-array.ts';

/**
 * Checks whether a value exists at the given deep path of an object.
 * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
 * an array of segments.
 *
 * By default only the object's own (and nested own) properties are considered.
 * Pass `{inherited: true}` to also count properties found on the prototype
 * chain.
 * @param object - The object to query.
 * @param path - The path to check, as a key, a path string, or an array of segments.
 * @param options - Optional behavior flags.
 * @param options.inherited When `true`, inherited (prototype-chain) properties also count.
 * Defaults to `false`.
 * @returns `true` if a value exists at `path`, otherwise `false`.
 * @example
 * // Own nested property
 * hasPath({a: {b: {c: 1}}}, 'a.b.c');
 * // true
 * @example
 * // Array path and a missing segment
 * hasPath({a: [{b: 1}]}, ['a', 0, 'b']);
 * // true
 * hasPath({a: 1}, 'a.b');
 * // false
 * @example
 * // Inherited property is only found with `{inherited: true}`
 * const proto = {inheritedKey: 1};
 * const object = Object.create(proto);
 * hasPath(object, 'inheritedKey');
 * // false
 * hasPath(object, 'inheritedKey', {inherited: true});
 * // true
 */
export const hasPath = (
  object: unknown,
  path: MaybeArray<PropertyKey>,
  options?: {
    /**
     * When `true`, inherited (prototype-chain) properties also count.
     * When `false` (the default), only own properties are considered
     */
    inherited?: boolean;
  },
): boolean => {
  return options?.inherited ? hasIn(object, path) : has(object, path);
};
