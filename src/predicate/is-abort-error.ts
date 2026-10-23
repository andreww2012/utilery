/**
 * Checks whether a caught value is an error thrown because an operation was
 * aborted, like `fetch` with an aborted `AbortSignal` or a Node.js API given
 * one: an error named `'AbortError'`.
 *
 * A signal aborted by `AbortSignal.timeout()` throws a `'TimeoutError'`
 * instead; check it with `isTimeoutError`.
 * @param error - The caught value.
 * @returns `true` if the value is an abort error, otherwise `false`.
 * @example
 * try {
 *   await fetch(url, {signal: controller.signal});
 * } catch (error) {
 *   if (isAbortError(error)) {
 *     return; // canceled by the user
 *   }
 *   throw error;
 * }
 */
export const isAbortError = (error: unknown): error is Error =>
  error instanceof Error && error.name === 'AbortError';
