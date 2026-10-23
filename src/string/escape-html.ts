import {escape} from 'es-toolkit/string';

/**
 * Escapes the characters that have a special meaning in HTML, so that a string can be put into HTML
 * text or a quoted attribute value: `&`, `<`, `>`, `"` and `'` become `&amp;`, `&lt;`, `&gt;`,
 * `&quot;` and `&#39;`.
 */
export const escapeHtml: {
  /**
   * Escapes the characters that have a special meaning in HTML, so that a string
   * can be put into HTML text or a quoted attribute value: `&`, `<`, `>`, `"` and
   * `'` become `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`.
   * To convert them back, use `unescapeHtml`.
   * @param text - The string to escape.
   * @returns The escaped string.
   * @example
   * escapeHtml('<a href="/">Fish & Chips</a>');
   * // '&lt;a href=&quot;/&quot;&gt;Fish &amp; Chips&lt;/a&gt;'
   */
  (text: string): string;
} = escape;
