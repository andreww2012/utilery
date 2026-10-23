/**
 * Gets the part of a string after the last occurrence of a delimiter.
 * When the delimiter is missing, returns `fallback`, which defaults to the
 * whole string.
 * @param text - The string to search.
 * @param delimiter - The substring to search for.
 * @param fallback - What to return when the delimiter is missing (defaults to `text`).
 * @returns The part after the last delimiter, or `fallback`.
 * @example
 * substringAfterLast('src/utils/index.ts', '/');
 * // 'index.ts'
 * @example
 * // File extension, empty when there is none
 * substringAfterLast('index.test.ts', '.', '');
 * // 'ts'
 * substringAfterLast('Makefile', '.', '');
 * // ''
 */
export const substringAfterLast = (text: string, delimiter: string, fallback = text): string => {
  const index = text.lastIndexOf(delimiter);
  return index === -1 ? fallback : text.slice(index + delimiter.length);
};
