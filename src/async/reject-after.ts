import {timeout} from 'es-toolkit/promise';

interface RejectAfterOptions {
  /** Cancels the rejection when aborted: the promise then never settles */
  signal?: AbortSignal;
}

/** Returns a promise that rejects after the given number of milliseconds */
export const rejectAfter: {
  /**
   * Returns a promise that rejects after the given number of milliseconds.
   * Race it with an operation to limit how long the operation may take.
   *
   * Aborting the `signal` does **not** reject the promise: it cancels the timer,
   * so the promise never settles and the raced operation can finish on its own.
   * To also stop the operation itself on timeout, use `withTimeout`.
   * @param milliseconds - How long to wait before rejecting.
   * @param options - Options.
   * @param options.signal - Cancels the rejection when aborted: the promise then never settles.
   * @returns A promise that rejects after the given time, or never settles if aborted.
   * @throws {DOMException} After the given time, with the message `'The operation was timed out'`.
   * Its `name` is `'Error'`, so `isTimeoutError` does not detect it.
   * @example
   * const result = await Promise.race([fetchData(), rejectAfter(1000)]);
   * @example
   * // Lift the time limit
   * const controller = new AbortController();
   * const result = Promise.race([doWork(), rejectAfter(1000, {signal: controller.signal})]);
   * controller.abort(); // `rejectAfter` will never reject now
   */
  (milliseconds: number, options?: RejectAfterOptions): Promise<never>;
} = timeout;
