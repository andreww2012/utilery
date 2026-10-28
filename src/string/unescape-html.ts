import {unescape} from 'es-toolkit/string';

/**
 * Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` back to `&`, `<`, `>`,
 * `"` and `'`: the opposite of `escapeHtml`
 */
export const unescapeHtml: {
  /**
   * Converts the HTML entities `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` back
   * to `&`, `<`, `>`, `"` and `'`: the opposite of `escapeHtml`.
   * Other entities, like `&nbsp;` or `&#x27;`, are left as they are.
   * @param text - The string to unescape.
   * @returns The unescaped string.
   * @example
   * unescapeHtml('Fish &amp; Chips &lt;3');
   * // 'Fish & Chips <3'
   */
  (text: string): string;
} = unescape;
