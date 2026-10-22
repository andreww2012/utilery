import {promiseTry} from './promise-try.ts';

/**
 * Runs an async function with a time limit: the returned promise rejects with
 * a `DOMException` named `'TimeoutError'` (see `isTimeoutError`) when the
 * function takes longer than `milliseconds`.
 *
 * The function receives an `AbortSignal` that is aborted on timeout, so that
 * it can stop its work, like by passing the signal to `fetch`. Pass your own
 * `signal` to also stop earlier: the promise then rejects with its reason, and
 * the function's signal is aborted too.
 * @param run - The function to run; it receives a signal that is aborted on timeout.
 * @param milliseconds - The time limit.
 * @param options - Options.
 * @param options.signal - Stops the run when aborted, rejecting with its reason.
 * @returns A promise of the function's result.
 * @example
 * const response = await withTimeout((signal) => fetch(url, {signal}), 5000);
 * @example
 * try {
 *   await withTimeout(() => slowOperation(), 1000);
 * } catch (error) {
 *   if (isTimeoutError(error)) {
 *     console.error('Took longer than a second');
 *   }
 * }
 */
export const withTimeout = async <T>(
  run: (signal: AbortSignal) => T | PromiseLike<T>,
  milliseconds: number,
  options: {signal?: AbortSignal} = {},
) => {
  options.signal?.throwIfAborted();

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort(new DOMException(`Timed out after ${milliseconds} ms`, 'TimeoutError'));
  }, milliseconds);
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  return await new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timer);
      // eslint-disable-next-line ts/prefer-promise-reject-errors -- the abort reason, like native APIs do
      reject(signal.reason);
    };
    signal.addEventListener('abort', onAbort, {once: true});

    void promiseTry(run, signal)
      .then(resolve)
      .catch(reject)
      .finally(() => {
        clearTimeout(timer);
        signal.removeEventListener('abort', onAbort);
      });
  });
};
