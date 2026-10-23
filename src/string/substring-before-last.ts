/**
 * Gets the part of a string before the last occurrence of a delimiter.
 * When the delimiter is missing, returns `fallback`, which defaults to the
 * whole string.
 * @param text - The string to search.
 * @param delimiter - The substring to search for.
 * @param fallback - What to return when the delimiter is missing (defaults to `text`).
 * @returns The part before the last delimiter, or `fallback`.
 * @example
 * // File name without the extension
 * substringBeforeLast('index.test.ts', '.');
 * // 'index.test'
 * substringBeforeLast('Makefile', '.');
 * // 'Makefile'
 */
export const substringBeforeLast = (text: string, delimiter: string, fallback = text) => {
  const index = text.lastIndexOf(delimiter);
  return index === -1 ? fallback : text.slice(0, index);
};
