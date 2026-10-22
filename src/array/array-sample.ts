/**
 * Returns one or more elements drawn uniformly at random from `array`. Without
 * the second argument, a single element is returned directly.
 *
 * When `size` is provided, a new array of that many elements is returned. By
 * default elements are sampled **without replacement** — each can appear at
 * most once, so `size` may not exceed `array.length` (via Floyd's algorithm).
 * Pass `{withReplacement: true}` to sample **with
 * replacement** instead: each draw is independent, elements may repeat, and
 * `size` may exceed `array.length`.
 *
 * Uses `Math.random` (not cryptographically secure) unless another generator
 * is passed as the `random` option, like a seeded one from
 * `createSeededRandom`.
 * @param array - The array to sample from. Not mutated.
 * @param size - Optional number of elements to draw.
 * @param options - Sampling options.
 * @param options.withReplacement - When `true`, the same element may be drawn
 * more than once and `size` may exceed `array.length`. Defaults to `false`.
 * @param options.random - A function returning numbers from `0` to `1`, used
 * instead of `Math.random`.
 * @returns When `size` is omitted, a single random element (or `undefined`
 * if `array` is empty). When `size` is provided, a new array of that many
 * randomly chosen elements (empty when sampling with replacement from an empty
 * array).
 * @throws {Error} Without replacement, when `size` is greater than `array.length`.
 * @example
 * // Single element
 * arraySample([1, 2, 3, 4, 5]);
 * // e.g. 3
 * @example
 * // Multiple distinct elements, sampled without replacement
 * arraySample([1, 2, 3, 4, 5], 2);
 * // e.g. [4, 1]
 * @example
 * // With replacement, elements may repeat and `size` may exceed the length
 * arraySample([1, 2, 3], 4, {withReplacement: true});
 * // e.g. [2, 2, 1, 3]
 * @example
 * // Size 0 always returns an empty array
 * arraySample([1, 2, 3], 0);
 * // []
 * @example
 * // Reproducible
 * arraySample(questions, 10, {random: createSeededRandom('quiz 1')});
 * arraySample(questions, {random: createSeededRandom('quiz 1')});
 */
export function arraySample<T>(
  array: readonly T[],
  size: number,
  options?: {withReplacement?: boolean; random?: () => number},
): T[];
export function arraySample<T>(array: readonly T[], options?: {random?: () => number}): T;
export function arraySample<T>(
  array: readonly T[],
  sizeOrOptions?: number | {random?: () => number},
  options?: {withReplacement?: boolean; random?: () => number},
): T | T[] {
  const [size, {withReplacement = false, random = Math.random} = {}]: [
    number | undefined,
    {withReplacement?: boolean; random?: () => number} | undefined,
  ] = typeof sizeOrOptions === 'number' ? [sizeOrOptions, options] : [undefined, sizeOrOptions];
  // `undefined` for an empty array, which the single-element overload doesn't type, as before
  const pickOne = () => array[Math.floor(random() * array.length)] as T;

  if (size == null) {
    return pickOne();
  }

  if (withReplacement) {
    return array.length === 0 ? [] : Array.from({length: size}, pickOne);
  }

  if (size > array.length) {
    throw new Error('Size must be less than or equal to the length of array.');
  }

  // Floyd's algorithm: picks `size` distinct indexes with `size` random numbers
  const selectedIndexes = new Set<number>();
  return Array.from({length: size}, (_, resultIndex) => {
    const step = array.length - size + resultIndex;
    const randomIndex = Math.floor(random() * (step + 1));
    const index = selectedIndexes.has(randomIndex) ? step : randomIndex;
    selectedIndexes.add(index);
    return array[index] as T;
  });
}
