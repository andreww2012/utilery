// Unlike `instanceof Error`, also true for errors created in another realm
const isErrorObject = (value: unknown): value is Error =>
  Object.prototype.toString.call(value) === '[object Error]';

/**
 * Checks whether a caught value is a Node.js system error, like one thrown by
 * `fs` or `child_process`, which carries a string `code` (`'ENOENT'`,
 * `'EACCES'`, etc.).
 * Pass one or more codes to also check that the error has one of them.
 *
 * Narrows the value to `NodeJS.ErrnoException`, so `code`, `errno`, `path` and
 * `syscall` are typed.
 * Errors from another realm (like a `vm` context) count too.
 * @param error - The caught value.
 * @param codes - Error codes to match; any code matches when none are given.
 * @returns `true` if the value is an error with a string `code` (one of `codes`, if given).
 * @example
 * try {
 *   await fs.readFile('config.json', 'utf8');
 * } catch (error) {
 *   if (isNodeError(error, 'ENOENT')) {
 *     // the file does not exist
 *   } else {
 *     throw error;
 *   }
 * }
 * @example
 * // Any system error
 * if (isNodeError(error)) {
 *   console.error(`${error.syscall} failed: ${error.code}`);
 * }
 */
export const isNodeError = <Code extends string>(
  error: unknown,
  ...codes: Code[]
): error is NodeJS.ErrnoException & {code: Code} =>
  isErrorObject(error) &&
  'code' in error &&
  typeof error.code === 'string' &&
  (codes.length === 0 || codes.some((code) => code === error.code));
