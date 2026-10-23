import {get} from 'es-toolkit/compat';

/**
 * Reads the value at the given deep path of an object.
 * The path may be a single key, a dot/bracket path string like `'a.b[0].c'`, or
 * an array of segments.
 * A missing property along the way, or a `null`/`undefined` object, gives
 * `undefined` (or `defaultValue`) instead of throwing.
 * The result type is inferred from literal paths.
 * To read several paths at once, use `getByPaths`.
 * @param object - The object to read from.
 * @param path - The path to read, as a key, a path string, or an array of segments.
 * @param defaultValue - Returned when the value at `path` is `undefined`.
 * @returns The value at `path`, or `defaultValue` when it is `undefined`.
 * @example
 * getByPath({a: [{b: {c: 3}}]}, 'a[0].b.c');
 * // 3
 * @example
 * getByPath({a: {b: 2}}, ['a', 'b']);
 * // 2
 * @example
 * getByPath({a: 1}, 'x.y', 'fallback');
 * // 'fallback'
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const getByPath = get;
