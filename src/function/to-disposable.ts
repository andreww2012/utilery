import {defer, deferAsync} from 'es-toolkit/util';
import type {MaybePromise} from '../types/maybe-promise.ts';

/**
 * Wraps a cleanup callback into a disposable object, so the callback runs
 * automatically when the enclosing `using` / `await using` block exits, even
 * when it exits by throwing.
 * Similar to `defer` in Go or `finally` blocks, but the cleanup is declared
 * next to the resource it cleans up.
 *
 * A sync callback gives an object usable with both `using` and `await using`.
 * An async callback gives an object usable only with `await using`, so the
 * returned promise is always awaited.
 *
 * Note: the `using` syntax requires a runtime that supports explicit resource
 * management (or a transpiler).
 * @param callback - The cleanup to run on disposal.
 * @returns A `Disposable & AsyncDisposable` for a sync callback, or an
 * `AsyncDisposable` for an async one.
 * @example
 * // Sync cleanup
 * {
 *   const connection = openConnection();
 *   using _ = toDisposable(() => connection.close());
 *   connection.send('hello');
 * } // `connection.close()` is called here
 * @example
 * // Async cleanup
 * {
 *   const directory = await fs.mkdtemp('tmp-');
 *   await using _ = toDisposable(() => fs.rm(directory, {recursive: true}));
 *   await fs.writeFile(`${directory}/file.txt`, 'data');
 * } // the directory is removed (and awaited) here
 */
export function toDisposable(callback: () => PromiseLike<void>): AsyncDisposable;
export function toDisposable(callback: () => void): Disposable & AsyncDisposable;
export function toDisposable(callback: () => MaybePromise<void>): Disposable & AsyncDisposable {
  return {
    ...defer(() => {
      void callback();
    }),
    ...deferAsync(callback),
  };
}
