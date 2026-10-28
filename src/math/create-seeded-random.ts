/** 32-bit FNV-1a hash, to turn a string seed into a number */
const hashString = (text: string) => {
  let hash = 0x81_1c_9d_c5;
  for (const character of text) {
    hash = Math.imul(hash ^ (character.codePointAt(0) || 0), 0x1_00_01_93);
  }

  return hash;
};

/**
 * Creates a seeded pseudo-random number generator: a function that, like
 * `Math.random`, returns numbers from `0` (inclusive) to `1` (exclusive), but
 * always the same sequence for the same seed.
 * Useful for reproducible shuffles, tests, procedural content or a "puzzle of
 * the day".
 *
 * Pass it as the `random` option of `arrayShuffle`, `arraySample`, `random`,
 * `randomIntInclusive` and `randomIntExclusive`.
 * The seed is a number (its integer part is used) or a string.
 * Uses the fast Mulberry32 algorithm: good for simulations and games, but not
 * cryptographically secure.
 * @param seed - The seed: the same seed gives the same sequence.
 * @returns A function returning the next number of the sequence.
 * @example
 * const random = createSeededRandom(42);
 * random();
 * // 0.6011037519201636 (the same on every run)
 * @example
 * // The same shuffle for everyone on the same day
 * const random = createSeededRandom(new Date().toISOString().slice(0, 10));
 * arrayShuffle(words, {random});
 */
export const createSeededRandom = (seed: number | string) => {
  let state = typeof seed === 'string' ? hashString(seed) : Math.trunc(seed);

  return (): number => {
    state = (state + 0x6d_2b_79_f5) >>> 0;
    let mixed = Math.imul(state ^ (state >>> 15), state | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 2 ** 32;
  };
};
