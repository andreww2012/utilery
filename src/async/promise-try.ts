const promiseTryFallback = async <Arguments extends unknown[], Result>(
  fn: (...parameters: Arguments) => Result,
  ...callArguments: Arguments
): Promise<Awaited<Result>> => await fn(...callArguments);

/**
 * Calls a function and always returns a promise of its result: a returned value
 * or promise is resolved, and an error thrown synchronously becomes a rejection
 * instead of escaping.
 * Calls the native `Promise.try` when it is available.
 *
 * Useful for calling callbacks that may be synchronous or asynchronous, so
 * that one `.catch` handles every failure.
 * @param fn - The function to call.
 * @param callArguments - The arguments to call it with.
 * @returns A promise of the result of the function.
 * @example
 * await promiseTry(() => JSON.parse(text)).catch(() => fallback);
 * @example
 * // A user callback that may throw or return a promise
 * promiseTry(onSave, document).then(showSuccess, showError);
 */
export const promiseTry = <Arguments extends unknown[], Result>(
  fn: (...parameters: Arguments) => Result,
  ...callArguments: Arguments
) => {
  // Not every supported environment has it
  const nativePromise: PromiseConstructor & {try?: typeof promiseTryFallback} = Promise;

  return nativePromise.try
    ? nativePromise.try(fn, ...callArguments)
    : promiseTryFallback(fn, ...callArguments);
};
