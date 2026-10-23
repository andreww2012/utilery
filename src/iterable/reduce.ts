/**
 * Reduces an iterable to a single accumulated value by applying the reducer
 * function to each element, like `Array.prototype.reduce` without an initial
 * value.
 * The first yielded element is the starting accumulator, and the reducer runs
 * from the second element on.
 * @param iterable - The iterable to reduce.
 * Consumed exactly once.
 * It must yield at least one value.
 * @param reducer - Receives the running accumulator and the current value;
 * returns the next accumulator.
 * @returns The final accumulated value.
 * @throws {TypeError} If the iterable is empty.
 * @example
 * reduce([10, 20, 30], (acc, value) => acc + value);
 * // 60
 * @example
 * // Throws on an empty iterable
 * reduce([] as number[], (acc, value) => acc + value);
 * // Throws TypeError
 */
export function reduce<T>(iterable: Iterable<T>, reducer: (accumulator: T, value: T) => T): T;

/**
 * Reduces an iterable to a single accumulated value by applying the reducer
 * function to each element, starting from `initialValue`.
 * @param iterable - The iterable to reduce.
 * Consumed exactly once.
 * @param reducer - Receives the running accumulator and the current value;
 * returns the next accumulator.
 * @param initialValue - The starting accumulator.
 * @returns The final accumulated value, or `initialValue` for an empty iterable.
 * @example
 * // Sum with an initial value
 * reduce([1, 2, 3], (acc, value) => acc + value, 0);
 * // 6
 * @example
 * // Build a Map from an iterable
 * reduce(
 *   ['a', 'bb', 'ccc'],
 *   (acc, value) => acc.set(value, value.length),
 *   new Map<string, number>(),
 * );
 * // Map { 'a' => 1, 'bb' => 2, 'ccc' => 3 }
 */
export function reduce<T, A>(
  iterable: Iterable<T>,
  reducer: (accumulator: A, value: T) => A,
  initialValue: A,
): A;
export function reduce<T, A>(
  iterable: Iterable<T>,
  reducer: (accumulator: A, value: T) => A,
  initialValue?: A,
): A {
  const iterator = iterable[Symbol.iterator]();
  let accumulator: A;
  const hasInitial = arguments.length >= 3;

  if (hasInitial) {
    accumulator = initialValue as A;
  } else {
    const first = iterator.next();

    if (first.done) {
      throw new TypeError('Reduce of empty iterable with no initial value.');
    }

    accumulator = first.value as unknown as A;
  }

  let step = iterator.next();

  while (!step.done) {
    accumulator = reducer(accumulator, step.value);
    step = iterator.next();
  }

  return accumulator;
}
