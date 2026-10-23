/**
 * Checks whether a value is promise-like (a "thenable"): an object or a
 * function with a `then` method, which `await` and `Promise.resolve` treat as a
 * promise.
 * Unlike `instanceof Promise`, also detects promises from other realms
 * (iframes, `vm` contexts) and promise libraries.
 * @param value - The value to check.
 * @returns `true` if the value has a `then` method, otherwise `false`.
 * @example
 * isPromiseLike(Promise.resolve(1));
 * // true
 * isPromiseLike({then: (resolve) => resolve(1)});
 * // true
 * isPromiseLike(1);
 * // false
 * @example
 * // Await only when needed, keeping synchronous results synchronous
 * const result = callback();
 * if (isPromiseLike(result)) {
 *   return result.then(finish);
 * }
 * return finish(result);
 */
export const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  (typeof value === 'object' || typeof value === 'function') &&
  value != null &&
  'then' in value &&
  typeof value.then === 'function';
