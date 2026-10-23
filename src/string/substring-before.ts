/**
 * Gets the part of a string before the first occurrence of a delimiter.
 * When the delimiter is missing, returns `fallback`, which defaults to the
 * whole string.
 * @param text - The string to search.
 * @param delimiter - The substring to search for.
 * @param fallback - What to return when the delimiter is missing (defaults to `text`).
 * @returns The part before the first delimiter, or `fallback`.
 * @example
 * substringBefore('index.test.ts', '.');
 * // 'index'
 * substringBefore('README', '.');
 * // 'README'
 * @example
 * // A different result for a missing delimiter
 * substringBefore('no-scheme', '://', '');
 * // ''
 */
export const substringBefore = (text: string, delimiter: string, fallback = text) => {
  const index = text.indexOf(delimiter);
  return index === -1 ? fallback : text.slice(0, index);
};
