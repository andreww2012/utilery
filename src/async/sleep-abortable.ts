/**
 * Waits for the given number of milliseconds, like `sleep`, but stops
 * properly when aborted and can let the Node.js process exit meanwhile.
 *
 * Pass an `AbortSignal` to stop waiting early: unlike with `sleep`, the promise
 * then rejects with the signal's reason (a `DOMException` named `'AbortError'`
 * by default; see `isAbortError`).
 * In Node.js, pass `{unref: true}` so that a pending sleep does not keep the
 * process alive, like for a background retry loop.
 * @param milliseconds - How long to wait.
 * @param options - Options.
 * @param options.signal - Stops waiting when aborted.
 * @param options.unref - Don't keep the Node.js process alive while waiting (defaults to `false`).
 * @example
 * const controller = new AbortController();
 * setTimeout(() => controller.abort(), 100);
 * await sleepAbortable(1000, {signal: controller.signal});
 * // rejects after 100 ms with an `AbortError`
 * @example
 * // Retry in the background without keeping the process alive
 * await sleepAbortable(60_000, {unref: true});
 */
export const sleepAbortable = (
  milliseconds: number,
  options: {signal?: AbortSignal; unref?: boolean} = {},
): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const {signal, unref = false} = options;
    signal?.throwIfAborted();

    // Aborted once the time has passed, which removes the abort listener
    const listenerController = new AbortController();
    const timer = setTimeout(() => {
      listenerController.abort();
      resolve();
    }, milliseconds);
    if (unref && typeof timer === 'object') {
      timer.unref();
    }

    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        // eslint-disable-next-line ts/prefer-promise-reject-errors -- the abort reason, like native APIs do
        reject(signal.reason);
      },
      {once: true, signal: listenerController.signal},
    );
  });
