import picomatch from 'picomatch';

/**
 * Checks whether a string contains glob syntax (wildcards, character classes,
 * braces or extended globs), so it must be matched as a pattern rather than
 * compared as a plain path. Escaped characters (`\*`) don't count.
 * @param text - The string to check.
 * @returns `true` if the string is a glob pattern, otherwise `false`.
 * @example
 * isGlobPattern('src/**\/*.ts');
 * // true
 * isGlobPattern('src/{a,b}.ts');
 * // true
 * isGlobPattern('src/index.ts');
 * // false
 */
export const isGlobPattern = (text: string) => picomatch.scan(text).isGlob;
