import {type TitleCase, type TitleCaseOptions, toTitleCase as toTitleCaseFromRemeda} from 'remeda';

/**
 * Converts a string to **Title Case** by splitting it into words and capitalizing
 * each one, joined by single spaces (`'fooBar'` → `'Foo Bar'`).
 * For string literal inputs the return type is the precisely-typed title-cased
 * string; a non-literal `string` widens to `string`.
 *
 * This replaces the former `toStartCase`.
 * The difference is acronym handling: by default consecutive capitals are preserved,
 * so `'XMLHttpRequest'` becomes `'XML Http Request'` (a plain start-case conversion
 * produced `'Xml Http Request'`); pass `{preserveConsecutiveUppercase: false}` for
 * the old behavior.
 * @param value - The string to convert.
 * @param options - Optional flags; set `preserveConsecutiveUppercase` to `false` to lowercase runs
 * of capitals.
 * @returns The title-cased string.
 * @example
 * toTitleCase('hello world');
 * // 'Hello World'
 * @example
 * // Consecutive capitals are preserved by default
 * toTitleCase('XMLHttpRequest');
 * // 'XML Http Request'
 * @example
 * toTitleCase('XMLHttpRequest', {preserveConsecutiveUppercase: false});
 * // 'Xml Http Request'
 */
export const toTitleCase = <S extends string, Options extends TitleCaseOptions = TitleCaseOptions>(
  value: S,
  options?: Options,
): TitleCase<S, Options> => toTitleCaseFromRemeda(value, options);
