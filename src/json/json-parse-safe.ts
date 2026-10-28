import {destr} from 'destr';

/**
 * Parses a JSON string into a value, never throwing: the forgiving
 * counterpart of `jsonParse`.
 *
 * Beyond plain `JSON.parse`:
 * - Non-string input is returned untouched (e.g. an already-parsed object).
 * - Standalone tokens are decoded even though `JSON.parse` rejects them:
 *   `true`/`false`/`null`/`nan`/`infinity`/`-infinity` (case-insensitive) and
 *   `undefined`.
 * - Keys that could trigger prototype pollution (`__proto__`,
 *   `constructor.prototype`) are dropped (with a `console.warn`) instead of
 *   polluting the result.
 *
 * Unlike `jsonParse`, malformed or non-JSON strings never throw: the
 * original string is returned unchanged, making this convenient when the input
 * may or may not be JSON.
 * @param value - The value to parse.
 * Strings are parsed; anything else is returned as-is.
 * @returns The parsed value, typed as the `T` type argument (`unknown` by default; a purely
 * type-level assertion), or the original input when it cannot be parsed; assert or validate the
 * shape at the call site.
 * @example
 * // Parsing JSON
 * jsonParseSafe('{"a": 1, "b": [2, 3]}');
 * // {a: 1, b: [2, 3]}
 * @example
 * // Malformed input falls back to the original string
 * jsonParseSafe('{a: 1}');
 * // '{a: 1}'
 * @example
 * // A non-JSON string is returned untouched
 * jsonParseSafe('hello');
 * // 'hello'
 * @example
 * // Standalone tokens that `JSON.parse` would reject
 * jsonParseSafe('NaN');
 * // NaN
 */
// eslint-disable-next-line ts/no-unnecessary-type-parameters -- `T` is a deliberate output-only assertion, mirroring the underlying parser's own signature
export const jsonParseSafe = <T = unknown>(value: unknown): T => destr<T>(value);
