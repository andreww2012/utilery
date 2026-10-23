import {propertyOf} from 'es-toolkit/compat';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

/** Creates a function that reads the value at a deep path of the given object */
export const createObjectGetter: {
  /**
   * Creates a function that reads the value at a deep path of the given object.
   * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
   * an array of segments.
   * For a function that reads the same path of different objects, use
   * `createPathGetter`.
   * @param object - The object to read from.
   * @returns A function that takes a path and returns the value at that path, or `undefined`.
   * @example
   * const getSetting = createObjectGetter({theme: {color: 'dark'}, fontSize: 14});
   * getSetting('theme.color');
   * // 'dark'
   * ['fontSize', 'missing'].map(getSetting);
   * // [14, undefined]
   */
  // eslint-disable-next-line ts/no-empty-object-type, ts/no-explicit-any, ts/no-unnecessary-type-parameters -- the exact upstream type, so that type arguments still work
  <T extends {}>(object: T): (path: MaybeReadonlyArray<PropertyKey>) => any;
} = propertyOf;
