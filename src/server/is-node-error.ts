// Unlike `instanceof Error`, also true for errors created in another realm
const isErrorObject = (value: unknown): value is Error =>
  Object.prototype.toString.call(value) === '[object Error]';

/**
 * Checks whether a caught value is a Node.js system error, like one thrown by `fs` or
 * `child_process`, which carries a string `code` (`'ENOENT'`, `'EACCES'`, etc.)
 */
export const isNodeError: {
  /**
   * Checks whether an error that is already typed as a Node.js system error has
   * one of `codes`.
   * The type of its code already matches `codes`, so nothing is narrowed: with
   * codes of a wide type, like `string[]`, the code may still be another one.
   * @param error - The error to check.
   * @param codes - Error codes to match; any code matches when none are given.
   * @returns `true` if the error has a string `code` (one of `codes`, if given).
   * @example
   * declare const error: NodeJS.ErrnoException & {code: string};
   * declare const retryableCodes: string[];
   * if (!isNodeError(error, ...retryableCodes)) {
   *   throw error; // `error` keeps its type
   * }
   */
  <Code extends string>(
    error: NodeJS.ErrnoException & {code: NoInfer<Code>},
    ...codes: Code[]
  ): boolean;

  /**
   * Checks whether a caught value is a Node.js system error, like one thrown by
   * `fs` or `child_process`, which carries a string `code` (`'ENOENT'`,
   * `'EACCES'`, etc.).
   * Pass one or more codes to also check that the error has one of them.
   *
   * Narrows the value to `NodeJS.ErrnoException`, so `code`, `errno`, `path` and
   * `syscall` are typed.
   * Errors from another realm (like a `vm` context) count too.
   * When it returns `false`, a union value loses its system errors whose code
   * type `codes` covers, even though their code may be another one: with
   * `(NodeJS.ErrnoException & {code: string}) | undefined` and `string[]` codes, it
   * becomes `undefined`.
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
  <Code extends string>(
    error: unknown,
    ...codes: Code[]
  ): error is NodeJS.ErrnoException & {code: Code};
} = <Code extends string>(
  error: unknown,
  ...codes: Code[]
): error is NodeJS.ErrnoException & {code: Code} =>
  isErrorObject(error) &&
  'code' in error &&
  typeof error.code === 'string' &&
  (codes.length === 0 || codes.some((code) => code === error.code));
