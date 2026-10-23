export function reduce<T>(iterable: Iterable<T>, reducer: (accumulator: T, value: T) => T): T;
export function reduce<T, A>(
  iterable: Iterable<T>,
  reducer: (accumulator: A, value: T) => A,
  initialValue: A,
): A;

/**
 * Reduces an iterable to a single accumulated value by applying the reducer
 * function to each element.
 * When `initialValue` is omitted, the first yielded element is used as the
 * starting accumulator and the reducer runs from the second element onward.
 * @param iterable - The iterable to reduce.
 * Consumed exactly once.
 * @param reducer - Receives the running accumulator and the current value;
 * returns the next accumulator.
 * @param initialValue - Optional starting accumulator.
 * If omitted, the first element of the iterable is used and the iterable must
 * yield at least one value.
 * @returns The final accumulated value.
 * @throws {TypeError} If `initialValue` is omitted and the iterable is empty.
 * @example
 * // Sum with an initial value
 * reduce([1, 2, 3], (acc, value) => acc + value, 0);
 * // 6
 * @example
 * // Sum without an initial value (uses the first element)
 * reduce([10, 20, 30], (acc, value) => acc + value);
 * // 60
 * @example
 * // Build a Map from an iterable
 * reduce(
 *   ['a', 'bb', 'ccc'],
 *   (acc, value) => acc.set(value, value.length),
 *   new Map<string, number>(),
 * );
 * // Map { 'a' => 1, 'bb' => 2, 'ccc' => 3 }
 * @example
 * // Throws on an empty iterable when no initial value is given
 * reduce([] as number[], (acc, value) => acc + value);
 * // Throws TypeError
 */
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
