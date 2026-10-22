/**
 * Calls a function and always returns a promise of its result: a returned
 * value or promise is resolved, and an error thrown synchronously becomes a
 * rejection instead of escaping. Like `Promise.try`, which is not yet
 * available everywhere.
 *
 * Useful for calling callbacks that may be synchronous or asynchronous, so
 * that one `.catch` handles every failure.
 * @param fn - The function to call.
 * @param args - The arguments to call it with.
 * @returns A promise of the result of the function.
 * @example
 * await promiseTry(() => JSON.parse(text)).catch(() => fallback);
 * @example
 * // A user callback that may throw or return a promise
 * promiseTry(onSave, document).then(showSuccess, showError);
 */
export const promiseTry = async <Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  ...args: Args
): Promise<Awaited<Result>> => await fn(...args);
