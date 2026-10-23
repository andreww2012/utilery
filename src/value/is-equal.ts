import {isEqual as isEqualFromEsToolkit, isEqualWith} from 'es-toolkit/predicate';

type IsEqualCustomizer = (
  x: unknown,
  y: unknown,
  property?: PropertyKey,
  xParent?: unknown,
  yParent?: unknown,
  stack?: Map<unknown, unknown>,
) => boolean | undefined;

/**
 * Performs a deep equality comparison between two values.
 * Handles `Date`, `RegExp`, nested objects, arrays, `Map`, `Set`, and circular
 * references.
 *
 * When the third argument is omitted, the values are compared with the default
 * strategy.
 * When a `customizer` is provided, it is invoked for every visited value-pair
 * and may return `true` or `false` to override the default; returning
 * `undefined` falls back to the default strategy.
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param customizer - Optional comparator invoked as
 * `(x, y, property, xParent, yParent, stack)` for each visited value-pair.
 * @returns `true` if the values are deeply equal, otherwise `false`.
 * @example
 * // Basic deep equality
 * isEqual({a: 1, b: [2, 3]}, {a: 1, b: [2, 3]});
 * // true
 * @example
 * // Built-in types
 * isEqual(new Date('2020-01-01'), new Date('2020-01-01'));
 * // true
 * @example
 * // With a customizer: case-insensitive string comparison
 * isEqual('Hello', 'hello', (x, y) => {
 *   if (typeof x === 'string' && typeof y === 'string') {
 *     return x.toLowerCase() === y.toLowerCase();
 *   }
 * });
 * // true
 */
export function isEqual(a: unknown, b: unknown, customizer: IsEqualCustomizer): boolean;
export function isEqual(a: unknown, b: unknown): boolean;
export function isEqual(a: unknown, b: unknown, customizer?: IsEqualCustomizer): boolean {
  return customizer ? isEqualWith(a, b, customizer) : isEqualFromEsToolkit(a, b);
}
