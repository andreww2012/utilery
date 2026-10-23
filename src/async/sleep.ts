import {delay} from 'es-toolkit/promise';

interface SleepOptions {
  /** Stops waiting when aborted, rejecting the promise */
  signal?: AbortSignal;
}

/** Waits for the given number of milliseconds */
export const sleep: {
  /**
   * Waits for the given number of milliseconds.
   * For an abort that rejects with the signal's reason, or a sleep that does not
   * keep the Node.js process alive, use `sleepAbortable`.
   * @param milliseconds - How long to wait.
   * @param options - Options.
   * @param options.signal - Stops waiting when aborted, rejecting the promise.
   * @returns A promise that resolves after the given time.
   * @throws {DOMException} When `options.signal` is aborted, with the message
   * `'The operation was aborted'`.
   * Its `name` is `'Error'`, so `isAbortError` does not detect it.
   * @example
   * await sleep(1000);
   * @example
   * const controller = new AbortController();
   * setTimeout(() => controller.abort(), 50);
   * await sleep(100, {signal: controller.signal});
   * // rejects after 50 ms
   */
  (milliseconds: number, options?: SleepOptions): Promise<void>;
} = delay;
