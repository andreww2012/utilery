import {iterate} from 'es-toolkit/iterator';

/**
 * Creates an infinite lazy iterator that starts with `seed` and repeatedly
 * applies `getNext` to the previous value: `seed`, `getNext(seed)`,
 * `getNext(getNext(seed))`, and so on.
 *
 * As the iterator is infinite, bound it before consuming it fully, for
 * example with `iterableTakeWhile`.
 * @param seed - The first value of the sequence.
 * @param getNext - Computes the next value from the current one.
 * @returns An infinite lazy iterator over the sequence.
 * @example
 * [...iterableTakeWhile(generateSequence(1, (value) => value * 2), (value) => value < 50)];
 * // [1, 2, 4, 8, 16, 32]
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const generateSequence = iterate;
