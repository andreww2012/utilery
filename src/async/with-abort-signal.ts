/**
 * Makes a promise reject as soon as an `AbortSignal` is aborted, with the
 * signal's reason (a `DOMException` named `'AbortError'` by default), instead
 * of waiting for the promise to settle. Useful to stop waiting for work that
 * cannot be cancelled itself.
 *
 * The work behind the promise is not stopped: only waiting for it is. A signal
 * that is already aborted rejects right away, and without a signal the
 * promise is returned as is.
 * @param promise - The promise to wait for.
 * @param signal - The signal that stops the waiting.
 * @returns A promise that settles like the given one, or rejects when the signal is aborted first.
 * @example
 * const controller = new AbortController();
 * cancelButton.addEventListener('click', () => controller.abort());
 * const result = await withAbortSignal(longComputation(), controller.signal);
 * @example
 * // Pass an optional signal along
 * const loadConfig = (options: {signal?: AbortSignal}) =>
 *   withAbortSignal(readConfigFile(), options.signal);
 */
export const withAbortSignal = async <T>(promise: PromiseLike<T>, signal?: AbortSignal) => {
  if (signal == null) {
    return await promise;
  }

  signal.throwIfAborted();

  return await new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      // eslint-disable-next-line ts/prefer-promise-reject-errors -- the abort reason, like native APIs do
      reject(signal.reason);
    };
    signal.addEventListener('abort', onAbort, {once: true});

    void Promise.resolve(promise)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        signal.removeEventListener('abort', onAbort);
      });
  });
};
