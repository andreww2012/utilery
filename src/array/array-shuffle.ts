/**
 * Returns a shuffled copy of an array, with every order equally likely (the
 * Fisher-Yates algorithm).
 * The original array is not changed.
 *
 * Uses `Math.random` (not cryptographically secure) unless another generator
 * is passed, like a seeded one from `createSeededRandom` for the same order on
 * every run.
 * @param array - The array to shuffle.
 * @param options - Options.
 * @param options.random - A function returning numbers from `0` to `1`, used instead of
 * `Math.random`.
 * @returns A new array with the same elements in random order.
 * @example
 * arrayShuffle([1, 2, 3, 4, 5]);
 * // e.g. [3, 1, 5, 2, 4]
 * @example
 * // The same order for the same seed
 * arrayShuffle(cards, {random: createSeededRandom('game 42')});
 */
export const arrayShuffle = <T>(
  array: readonly T[],
  options: {random?: () => number} = {},
): T[] => {
  const {random = Math.random} = options;
  const result = [...array];
  for (let index = result.length - 1; index > 0; index--) {
    const otherIndex = Math.floor(random() * (index + 1));
    [result[index], result[otherIndex]] = [result[otherIndex] as T, result[index] as T];
  }

  return result;
};
