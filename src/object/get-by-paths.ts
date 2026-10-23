import {at} from 'es-toolkit/compat';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

interface GetByPaths {
  /**
   * Reads the values at several deep paths of an object.
   * Each path may be a single key or a dot/bracket path string like
   * `'a.b[0].c'`.
   * An array argument is a list of paths, not the segments of one path.
   * A missing property, or a `null`/`undefined` object, gives `undefined` in
   * its place.
   * To read a single path, use `getByPath`.
   * @param object - The object to read from.
   * @param paths - The paths to read, or arrays of them.
   * @returns A new array of the values, in the order of the paths.
   * @example
   * getByPaths({a: 1, b: {c: 2}}, 'a', 'b.c');
   * // [1, 2]
   * @example
   * getByPaths({a: 1, b: {c: 2}}, ['a', 'b.c']);
   * // [1, 2]
   */
  <T>(
    object: Record<string, T> | Record<number, T> | null | undefined,
    ...paths: MaybeReadonlyArray<PropertyKey>[]
  ): T[];

  /**
   * Reads the values at several top-level keys of an object.
   * An array argument is a list of keys.
   * @param object - The object to read from.
   * @param keys - The keys to read, or arrays of them.
   * @returns A new array of the values, in the order of the keys.
   * @example
   * getByPaths({a: 1, b: 'x', c: true}, 'a', 'c');
   * // [1, true]
   */
  <T extends object>(
    object: T | null | undefined,
    ...keys: MaybeReadonlyArray<keyof T>[]
  ): T[keyof T][];
}

/** Reads the values at several deep paths of an object */
export const getByPaths: GetByPaths = at;
