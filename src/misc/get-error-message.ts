import {isPrimitive} from '../predicate/is-primitive.ts';

const getMessage = (error: unknown, fallback: string) => {
  if (typeof error === 'object' && error != null) {
    return 'message' in error && typeof error.message === 'string' && error.message
      ? error.message
      : fallback;
  }

  return (isPrimitive(error) && error != null && String(error)) || fallback;
};

/**
 * Gets a human-readable message from a caught value, which can be anything,
 * since JavaScript allows throwing any value.
 *
 * - An `Error`, or any other object with a non-empty string `message` property
 *   (like an error from another realm or a parsed error response), gives its
 *   `message`.
 * - A non-empty string is returned as is.
 * - Other primitives (numbers, booleans, etc.) are converted to a string.
 * - Anything else, including `null`, `undefined` and an `Error` with an empty
 *   message, gives the `fallback`.
 *
 * Pass `{includeCode: true}` to append the `code` property of the error (like
 * Node's `'ENOENT'`) in parentheses, unless the message already contains it.
 * @param error - The caught value.
 * @param fallbackOrOptions - The message to use when `error` has no meaningful one (defaults to
 * `'Unknown error'`), or the options: `fallback` and `includeCode` (defaults to `false`).
 * @returns The message.
 * @example
 * // Errors and error-like objects
 * getErrorMessage(new Error('Not found'));
 * // 'Not found'
 * getErrorMessage({message: 'Rate limited', code: 429});
 * // 'Rate limited'
 * @example
 * // Thrown primitives
 * getErrorMessage('Timed out');
 * // 'Timed out'
 * getErrorMessage(404);
 * // '404'
 * @example
 * // No meaningful message
 * getErrorMessage(undefined);
 * // 'Unknown error'
 * getErrorMessage({code: 'E_FAIL'}, 'Request failed');
 * // 'Request failed'
 * @example
 * // With the error code
 * getErrorMessage(Object.assign(new Error('Not found'), {code: 'E404'}), {includeCode: true});
 * // 'Not found (E404)'
 * getErrorMessage({code: 'E_FAIL'}, {includeCode: true});
 * // 'Unknown error (E_FAIL)'
 * @example
 * // Typical usage
 * try {
 *   await saveDraft();
 * } catch (error) {
 *   showToast(`Could not save the draft: ${getErrorMessage(error)}`);
 * }
 */
export const getErrorMessage = (
  error: unknown,
  fallbackOrOptions: string | {fallback?: string; includeCode?: boolean} = {},
): string => {
  const {fallback = 'Unknown error', includeCode = false} =
    typeof fallbackOrOptions === 'string' ? {fallback: fallbackOrOptions} : fallbackOrOptions;
  const message = getMessage(error, fallback);
  const code =
    includeCode && typeof error === 'object' && error != null && 'code' in error
      ? error.code
      : undefined;

  return (typeof code === 'string' || typeof code === 'number') && !message.includes(String(code))
    ? `${message} (${code})`
    : message;
};
