import {type Regex, regex} from 'arkregex';

type RegexFlags = NonNullable<Parameters<typeof regex>[1]>;

type RegexContext = Regex extends Regex<string, infer Context> ? Context : never;

/**
 * A `RegExp` whose type knows the strings it matches (`Pattern`) and its
 * flags and captures (`Context`), as returned by `regexTyped`.
 * `.test()` narrows its argument to `Pattern`, and `.exec()` returns typed
 * positional and named captures.
 * @example
 * const ok: RegexTyped<'ok' | 'oK' | 'Ok' | 'OK', {flags: 'i'}> = regexTyped('^ok$', 'i');
 * @example
 * const isHexColor = (pattern: RegexTyped<`#${string}`>, value: string) => pattern.test(value);
 */
export type RegexTyped<
  Pattern extends string = string,
  Context extends RegexContext = RegexContext,
> = Regex<Pattern, Context>;

/* eslint-disable ts/naming-convention, ts/no-namespace, ts/no-redeclare, import/export -- value+namespace declaration merge attaching arkregex's lowercase type-level helpers to `regexTyped` */

/**
 * A typed drop-in for `new RegExp()`.
 * At runtime it is exactly `new RegExp(source, flags)`; all of its value is in
 * the types: the source is parsed at the type level to infer the matched
 * string, positional captures and named captures, and `.test()` narrows its
 * argument to the inferred pattern.
 *
 * Invalid patterns (e.g. referencing a group that does not exist) become type
 * errors instead of failing at runtime.
 *
 * Companion type-level helpers are available on the same symbol:
 * - `regexTyped.infer<Source, Flags>`: the inferred pattern type, without constructing anything.
 * - `regexTyped.validate<Source, Flags>`: the validated source, or an error message type.
 * - `regexTyped.parse<Source, Flags>`: the full parse result.
 *
 * The source must be a string *literal*: inference relies on the literal type,
 * so a dynamically built (widened `string`) source is rejected at the type level.
 * For a pattern too long or complex for TypeScript to infer, manually type it
 * with `regexTyped.as<Pattern, Context>(source, flags)`.
 *
 * Note: with the `g` or `y` flag, the returned `RegExp` is stateful: `.test()`
 * and `.exec()` advance `lastIndex` between calls, exactly like a native `RegExp`.
 * @param src - The pattern, as a string literal.
 * @param flags - The `RegExp` flags, like `'gi'`.
 * @returns A `RegExp` typed as `RegexTyped` with the inferred pattern and captures.
 * @throws {SyntaxError} When the pattern or the flags are invalid at runtime.
 * @example
 * const ok = regexTyped('^ok$', 'i');
 * // RegexTyped<'ok' | 'oK' | 'Ok' | 'OK', {flags: 'i'}>
 * @example
 * const semver = regexTyped('^(\\d+)\\.(\\d+)\\.(\\d+)$');
 * // captures inferred as [`${number}`, `${number}`, `${number}`]
 * @example
 * const email = regexTyped('^(?<name>\\w+)@(?<domain>\\w+\\.\\w+)$');
 * // named captures inferred as {name: string; domain: `${string}.${string}`}
 * @example
 * // Escape hatch for patterns too complex to infer:
 * const complex = regexTyped.as<`id-${string}`, {captures: [string]}>('id-(.+)');
 */
export const regexTyped = regex;

// Re-expose `arkregex`'s type-level namespace helpers under `regexTyped` (a bare
// value alias above does not carry the merged namespace). Names are lowercase to
// mirror arkregex's public API (`regexTyped.infer<...>` etc.)
export declare namespace regexTyped {
  export type infer<Source extends string, Flags extends RegexFlags = ''> = regex.infer<
    Source,
    Flags
  >;
  export type validate<Source extends string, Flags extends RegexFlags = ''> = regex.validate<
    Source,
    Flags
  >;
  export type parse<Source extends string, Flags extends RegexFlags = ''> = regex.parse<
    Source,
    Flags
  >;
}
/* eslint-enable ts/naming-convention, ts/no-namespace, ts/no-redeclare, import/export */
