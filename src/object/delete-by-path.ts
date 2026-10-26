import {unset} from 'es-toolkit/compat';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

/** **Mutates** an object, deleting the property at the given deep path */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const deleteByPath: {
  /**
   * **Mutates** an object, deleting the property at the given deep path.
   * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
   * an array of segments.
   * @param object - The object to mutate.
   * Nothing happens for `null` and `undefined`.
   * @param path - The path of the property, as a key, a path string, or an array of segments.
   * @returns `true` if the property is gone (including when it did not exist), or `false` if it
   * cannot be deleted, like a non-configurable property or an inherited `__proto__`.
   * A path that steps through an inherited `constructor` or `__proto__`, or into the `prototype`
   * of a function, is refused with `false` too: it leads to a constructor or prototype that other
   * objects share.
   * Own keys with these names are data and work like any other key.
   * A property that holds `undefined` counts as missing and is kept, unless `path` is a string
   * with a single key.
   * @example
   * const object = {a: {b: {c: 42}}};
   * deleteByPath(object, 'a.b.c');
   * // true
   * object;
   * // {a: {b: {}}}
   * @example
   * deleteByPath(object, ['a', 'b']);
   * // true
   */
  (object: unknown, path: MaybeReadonlyArray<PropertyKey>): boolean;
} = unset;
