import type {TupleOf} from '../types/tuple-of.ts';

// A separate generator, so that invalid arguments throw on the call, not on the first iteration
function* generateWindows<T>(
  iterable: Iterable<T>,
  size: number,
  step: number,
  shouldYieldPartialWindows: boolean,
): Generator<T[], void, unknown> {
  const buffer: T[] = [];
  let skip = 0;

  for (const item of iterable) {
    if (skip > 0) {
      skip--;
      continue;
    }

    buffer.push(item);

    if (buffer.length !== size) {
      continue;
    }

    yield buffer.slice();

    if (step >= size) {
      buffer.length = 0;
      skip = step - size;
    } else {
      buffer.splice(0, step);
    }
  }

  if (!shouldYieldPartialWindows || buffer.length === 0) {
    return;
  }

  yield buffer.slice();

  while (buffer.length > step) {
    buffer.splice(0, step);
    yield buffer.slice();
  }
}

/**
 * Lazily yields fixed-size sliding windows over any `Iterable`: arrays, `Map`s,
 * `Set`s, generators, and custom iterators.
 * The window slides by `step` positions between yields, so windows may overlap
 * (`step < size`), butt against each other (`step === size`), or skip elements
 * (`step > size`).
 *
 * Only full windows of exactly `size` elements are yielded; any trailing items
 * that can't form a full window are dropped.
 * With a number literal as `size`, each window is typed as a tuple, so
 * destructuring it gives no `undefined` with the `noUncheckedIndexedAccess`
 * compiler option.
 *
 * The result is a lazy generator: callers can short-circuit (e.g. with
 * `break` or `.next()`) without materializing the rest, which makes the
 * function safe to use on very large or infinite iterables.
 * @param iterable - The iterable to walk.
 * Consumed at most once.
 * @param size - The number of elements per window.
 * Must be a positive integer.
 * @param step - How far the window advances between yields.
 * Must be a positive integer.
 * Defaults to `1`.
 * @param options - Optional behavior toggles.
 * @param options.partialWindows - `false` or missing for this signature.
 * With `true`, shorter trailing windows are also yielded, so windows are typed
 * as arrays.
 * @returns A lazy generator of the windows, each a fresh array of `size` elements.
 * @throws {Error} If `size` or `step` is not a positive integer.
 * @example
 * // Basic overlapping windows
 * [...slidingWindow([1, 2, 3, 4], 2)];
 * // [[1, 2], [2, 3], [3, 4]]
 * @example
 * // Pairs of neighbors, typed as `[number, number]`
 * for (const [previous, current] of slidingWindow([1, 4, 9], 2)) {
 *   console.log(current - previous);
 * }
 * // 3, 5
 * @example
 * // Custom step skips elements between starts
 * [...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2)];
 * // [[1, 2, 3], [3, 4, 5]]
 * @example
 * // Works on any iterable: here, a generator of an unknown length
 * function* lines() { yield 'a'; yield 'b'; yield 'c'; yield 'd'; }
 * [...slidingWindow(lines(), 2)];
 * // [['a', 'b'], ['b', 'c'], ['c', 'd']]
 * @example
 * // Short-circuit on infinite sources
 * function* naturals() { let n = 0; while (true) { yield n++; } }
 * const iterator = slidingWindow(naturals(), 3);
 * iterator.next().value; // [0, 1, 2]
 * iterator.next().value; // [1, 2, 3]
 */
export function slidingWindow<T, Size extends number>(
  iterable: Iterable<T>,
  size: Size,
  step?: number,
  options?: {partialWindows?: false | undefined},
): Generator<TupleOf<Size, T>, void, unknown>;

/**
 * Lazily yields fixed-size sliding windows over any `Iterable`, which slide by
 * `step` positions between yields.
 * With `partialWindows: true`, after the full windows, it continues yielding
 * progressively shorter windows until the buffer is exhausted, matching
 * Kotlin's `windowed` semantics, so windows are typed as arrays.
 * @param iterable - The iterable to walk.
 * Consumed at most once.
 * @param size - The number of elements per window.
 * Must be a positive integer.
 * @param step - How far the window advances between yields.
 * Must be a positive integer.
 * Defaults to `1`.
 * @param options - Optional behavior toggles.
 * @param options.partialWindows - When `true`, also yields shorter trailing
 * windows for every starting position that has at least one element.
 * Defaults to `false`.
 * @returns A lazy generator of the windows, each a fresh array of up to `size` elements.
 * @throws {Error} If `size` or `step` is not a positive integer.
 * @example
 * [...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2, {partialWindows: true})];
 * // [[1, 2, 3], [3, 4, 5], [5, 6]]
 */
export function slidingWindow<T>(
  iterable: Iterable<T>,
  size: number,
  step?: number,
  options?: {partialWindows?: boolean | undefined},
): Generator<T[], void, unknown>;
export function slidingWindow<T>(
  iterable: Iterable<T>,
  size: number,
  step = 1,
  {partialWindows = false}: {partialWindows?: boolean | undefined} = {},
): Generator<T[], void, unknown> {
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new Error('`size` must be a positive integer.');
  }

  if (!Number.isSafeInteger(step) || step < 1) {
    throw new Error('`step` must be a positive integer.');
  }

  return generateWindows(iterable, size, step, partialWindows);
}
