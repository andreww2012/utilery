import {slash} from '@antfu/utils';

/**
 * Replaces every backslash in a path with a forward slash, turning a Windows path into the form
 * that URLs, glob patterns and POSIX tools expect
 */
export const toForwardSlashes: {
  /**
   * Replaces every backslash in a path with a forward slash, turning a Windows
   * path into the form that URLs, glob patterns and POSIX tools expect.
   * Nothing else in the path changes, so it stays a Windows path (`C:/Users`) if
   * it was one.
   * @param path - The path to convert.
   * @returns The path with forward slashes only.
   * @example
   * toForwardSlashes('src\\utils\\index.ts');
   * // 'src/utils/index.ts'
   * toForwardSlashes('C:\\Users\\me');
   * // 'C:/Users/me'
   */
  (path: string): string;
} = slash;
