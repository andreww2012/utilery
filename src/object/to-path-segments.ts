import {type StringToPath, stringToPath} from 'remeda';

/**
 * Parses a deep-path string like `'a.b[0].c'` into its array of segments.
 * A string literal is parsed into a **precisely-typed tuple**
 * (`['a', 'b', 0, 'c']`), with numeric bracket/dot segments narrowed to `number`;
 * an array of segments is returned as a shallow copy unchanged.
 *
 * Note: numeric segments come back as `number`s, e.g. `[0]` → `0`, not `'0'`.
 * @param path - A path string (`'a.b[0].c'`) or an array of segments.
 * @returns The array of path segments, a typed tuple for a literal string input.
 * @example
 * // String input: parsed into a typed tuple (numeric segments are numbers)
 * toPathSegments('a.b[0].c');
 * // ['a', 'b', 0, 'c']
 * @example
 * // Array input: returned as a shallow copy, unchanged
 * toPathSegments(['a', 0, 'b']);
 * // ['a', 0, 'b']
 */
export function toPathSegments<Path extends string>(path: Path): StringToPath<Path>;
export function toPathSegments<const T extends readonly PropertyKey[]>(path: T): T;
export function toPathSegments(path: string | readonly PropertyKey[]): PropertyKey[] {
  return typeof path === 'string' ? stringToPath(path) : [...path];
}
