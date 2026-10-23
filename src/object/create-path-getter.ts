import {property} from 'es-toolkit/compat';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

/** Creates a function that reads the value at the given deep path of an object */
export const createPathGetter: {
  /**
   * Creates a function that reads the value at the given deep path of an object.
   * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
   * an array of segments.
   * For a function that reads different paths of the same object, use
   * `createObjectGetter`.
   * @param path - The path to read.
   * @returns A function that takes an object and returns the value at `path`, or `undefined`.
   * @example
   * const getCity = createPathGetter<User, string>('address.city');
   * users.map(getCity);
   * // ['Paris', 'Tokyo']
   */
  // eslint-disable-next-line ts/no-unnecessary-type-parameters -- the caller states the object and the value types, which a path cannot infer
  <T, R>(path: MaybeReadonlyArray<PropertyKey>): (object: T) => R;
} = property;
