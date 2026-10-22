/**
 * Checks whether a caught value is an error thrown because an operation timed
 * out: an error named `'TimeoutError'`, like the one thrown by `fetch` with
 * `AbortSignal.timeout()` or by `withTimeout`.
 * @param error - The caught value.
 * @returns `true` if the value is a timeout error, otherwise `false`.
 * @example
 * try {
 *   await fetch(url, {signal: AbortSignal.timeout(5000)});
 * } catch (error) {
 *   if (isTimeoutError(error)) {
 *     console.error('The server took too long to respond');
 *   }
 *   throw error;
 * }
 */
export const isTimeoutError = (error: unknown): error is Error =>
  error instanceof Error && error.name === 'TimeoutError';
