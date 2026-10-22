import htmlEscape from 'htmlescape';

/**
 * Serializes a value as JSON that is safe to embed in an HTML `<script>` tag,
 * like `<script>window.__DATA__ = ${json}</script>` or a
 * `<script type="application/json">` block.
 *
 * Plain `JSON.stringify` is not: a string containing `</script>` would end the
 * tag early and let the rest run as HTML (an XSS hole). Here, `<`, `>` and `&`
 * are written as `\u003c`, `\u003e` and `\u0026`, and the line separators
 * `U+2028` and `U+2029` (invalid in older JavaScript strings) are escaped too.
 * The result is still valid JSON and parses to the same value.
 *
 * Throws a `TypeError` for values that have no JSON form, like `undefined` or
 * a function.
 * @param value - The value to serialize.
 * @returns The escaped JSON.
 * @example
 * jsonStringifyForHtml({comment: '</script><script>alert(1)</script>'});
 * // '{"comment":"\\u003c/script\\u003e\\u003cscript\\u003ealert(1)\\u003c/script\\u003e"}'
 * @example
 * const html = `<script>window.__STATE__ = ${jsonStringifyForHtml(state)}</script>`;
 */
export const jsonStringifyForHtml: (value: unknown) => string = htmlEscape;
