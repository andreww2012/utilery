/**
 * Lazily yields fixed-size sliding windows over any `Iterable`: arrays, `Map`s,
 * `Set`s, generators, and custom iterators.
 * The window slides by `step` positions between yields, so windows may overlap
 * (`step < size`), butt against each other (`step === size`), or skip elements
 * (`step > size`).
 *
 * By default, only full windows of exactly `size` elements are yielded; any
 * trailing items that can't form a full window are dropped.
 * Setting `partialWindows: true` continues yielding progressively shorter
 * windows until the buffer is exhausted, matching Kotlin's `windowed`
 * semantics.
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
 * @param options.partialWindows - When `true`, also yields shorter trailing
 * windows for every starting position that has at least one element.
 * Defaults to `false`.
 * @throws {Error} If `size` or `step` is not a positive integer.
 * @yields {T[]} Each window as a fresh array of up to `size` elements.
 * @example
 * // Basic overlapping windows
 * [...slidingWindow([1, 2, 3, 4], 2)];
 * // [[1, 2], [2, 3], [3, 4]]
 * @example
 * // Custom step skips elements between starts
 * [...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2)];
 * // [[1, 2, 3], [3, 4, 5]]
 * @example
 * // `partialWindows` keeps the tail
 * [...slidingWindow([1, 2, 3, 4, 5, 6], 3, 2, {partialWindows: true})];
 * // [[1, 2, 3], [3, 4, 5], [5, 6]]
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
export function* slidingWindow<T>(
  iterable: Iterable<T>,
  size: number,
  step = 1,
  {partialWindows = false}: {partialWindows?: boolean} = {},
): Generator<T[], void, unknown> {
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new Error('`size` must be a positive integer.');
  }

  if (!Number.isSafeInteger(step) || step < 1) {
    throw new Error('`step` must be a positive integer.');
  }

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

  if (!partialWindows || buffer.length === 0) {
    return;
  }

  yield buffer.slice();

  while (buffer.length > step) {
    buffer.splice(0, step);
    yield buffer.slice();
  }
}
