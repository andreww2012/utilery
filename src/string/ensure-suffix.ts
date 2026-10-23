import {ensureSuffix as baseEnsureSuffix} from '@antfu/utils';

/**
 * Ensures `value` ends with `suffix`, appending it only when it is not already
 * present.
 * When `value` already ends with `suffix`, it is returned unchanged.
 * The argument order puts the subject string first, mirroring native `String`
 * methods like `endsWith`/`padEnd`.
 * @param value - The string to ensure the suffix on.
 * @param suffix - The suffix that `value` should end with.
 * @returns `value` unchanged when it already ends with `suffix`, otherwise
 * `value + suffix`.
 * @example
 * // Adds the suffix when missing
 * ensureSuffix('file', '.ts');
 * // 'file.ts'
 * @example
 * // Leaves the string untouched when the suffix is already there
 * ensureSuffix('file.ts', '.ts');
 * // 'file.ts'
 */
export const ensureSuffix = (value: string, suffix: string): string =>
  baseEnsureSuffix(suffix, value);
