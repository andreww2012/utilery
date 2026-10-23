import {isMatch, isMatchWith} from 'es-toolkit/compat';

type IsObjectMatchingCustomizer = (
  value: unknown,
  other: unknown,
  indexOrKey: PropertyKey,
  object: object,
  source: object,
) => boolean | undefined;

/**
 * Performs a deep **partial** match: returns `true` when `object` recursively
 * contains every property of `pattern` with a deeply-equal value.
 * Extra properties on `object` are ignored, which is what distinguishes this
 * from the full-equality `isEqual`.
 *
 * When the third argument is omitted, values are compared with the default
 * strategy.
 * When a `customizer` is provided, it is invoked for every visited value-pair
 * and may return `true` or `false` to override the default; returning
 * `undefined` falls back to the default strategy.
 * @param object - The object to inspect.
 * @param pattern - The partial pattern whose properties must be present in `object`.
 * @param customizer - Optional comparator invoked as
 * `(value, other, indexOrKey, object, source)` for each visited value-pair.
 * @returns `true` if `object` matches `pattern`, otherwise `false`.
 * @example
 * // Partial deep match: extra keys are ignored
 * isObjectMatching({a: 1, b: {c: 2, d: 3}}, {b: {c: 2}});
 * // true
 * @example
 * // A differing value fails the match
 * isObjectMatching({a: 1}, {a: 2});
 * // false
 * @example
 * // With a customizer: case-insensitive string comparison
 * isObjectMatching({name: 'Ann'}, {name: 'ANN'}, (value, other) => {
 *   if (typeof value === 'string' && typeof other === 'string') {
 *     return value.toLowerCase() === other.toLowerCase();
 *   }
 * });
 * // true
 */
export function isObjectMatching(
  object: object,
  pattern: object,
  customizer: IsObjectMatchingCustomizer,
): boolean;
export function isObjectMatching(object: object, pattern: object): boolean;
export function isObjectMatching(
  object: object,
  pattern: object,
  customizer?: IsObjectMatchingCustomizer,
): boolean {
  return customizer ? isMatchWith(object, pattern, customizer) : isMatch(object, pattern);
}
