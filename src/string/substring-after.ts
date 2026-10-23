/**
 * Gets the part of a string after the first occurrence of a delimiter.
 * When the delimiter is missing, returns `fallback`, which defaults to the
 * whole string.
 * @param text - The string to search.
 * @param delimiter - The substring to search for.
 * @param fallback - What to return when the delimiter is missing (defaults to `text`).
 * @returns The part after the first delimiter, or `fallback`.
 * @example
 * substringAfter('index.test.ts', '.');
 * // 'test.ts'
 * substringAfter('https://example.com/a?b=1', '?');
 * // 'b=1'
 * @example
 * // A different result for a missing delimiter
 * substringAfter('https://example.com', '?', '');
 * // ''
 */
export const substringAfter = (text: string, delimiter: string, fallback = text) => {
  const index = text.indexOf(delimiter);
  return index === -1 ? fallback : text.slice(index + delimiter.length);
};
