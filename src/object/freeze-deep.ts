import {deepFreeze} from 'es-toolkit/object';

/**
 * Freezes an object and, recursively, every object and array in its own enumerable properties, so
 * that none of them can be changed.
 */
export const freezeDeep: {
  /**
   * Freezes an object and, recursively, every object and array in its own
   * enumerable properties, so that none of them can be changed.
   * `Object.freeze` only freezes the object itself.
   * Nested values that are already frozen are left as they are, without
   * visiting their properties.
   * The entries of a `Map` or a `Set` are not frozen.
   * @param object - The object to freeze.
   * Primitives are returned as is.
   * @returns The same object, now frozen.
   * @example
   * const config = freezeDeep({server: {port: 80}});
   * config.server.port = 8080; // throws a TypeError in strict mode
   */
  <T>(object: T): T;
} = deepFreeze;
