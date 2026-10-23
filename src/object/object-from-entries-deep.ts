import type {MaybeArray} from '../types/maybe-array.ts';
import {setByPath} from './set-by-path.ts';

/**
 * Builds an object from an iterable of `[path, value]` entries, the deep-path
 * counterpart of `Object.fromEntries`.
 * Each key is interpreted as a deep path (a dot/bracket string like
 * `'a.b[0].c'`, a single key, or an array of segments), so intermediate objects
 * and arrays are created as needed.
 * Numeric segments create arrays; everything else creates plain objects.
 *
 * Entries are applied in order; a later entry writing to the same path
 * overwrites an earlier one.
 * Delegates the per-path writes to `setByPath`.
 * @param entries - An iterable of `[path, value]` pairs.
 * @returns A new object assembled from the entries.
 * @example
 * // Deep paths build nested objects and arrays
 * objectFromEntriesDeep([
 *   ['a.b[0].c', 1],
 *   ['a.b[1].d', 2],
 * ]);
 * // {a: {b: [{c: 1}, {d: 2}]}}
 * @example
 * // Flat keys behave like Object.fromEntries
 * objectFromEntriesDeep([
 *   ['x', 1],
 *   ['y', 2],
 * ]);
 * // {x: 1, y: 2}
 */
export const objectFromEntriesDeep = (
  entries: Iterable<readonly [MaybeArray<PropertyKey>, unknown]>,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  for (const [path, value] of entries) {
    setByPath(result, path, value);
  }

  return result;
};
