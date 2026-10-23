import {closestMatch} from 'leven';

/**
 * Finds the candidate most similar to a string, by the Levenshtein distance
 * (see `levenshteinDistance`): the base of "did you mean ...?" suggestions for
 * mistyped commands, options or keys.
 * On a tie, the earlier candidate wins.
 *
 * Pass `maxDistance` to only accept close enough candidates; without it, some
 * candidate is always returned, however different.
 * @param target - The string to find a match for.
 * @param candidates - The strings to choose from.
 * @param options - Options.
 * @param options.maxDistance - The largest accepted distance.
 * @returns The closest candidate, or `undefined` if there are no candidates or none is within
 * `maxDistance`.
 * @example
 * findClosestString('kitten', ['sitting', 'kitchen', 'mittens']);
 * // 'kitchen'
 * @example
 * // "Did you mean" for an unknown command
 * const suggestion = findClosestString('instal', commandNames, {maxDistance: 2});
 * if (suggestion) {
 *   console.error(`Unknown command. Did you mean "${suggestion}"?`);
 * }
 */
export const findClosestString = (
  target: string,
  candidates: Iterable<string>,
  options?: {maxDistance?: number},
) => closestMatch(target, Array.isArray(candidates) ? candidates : [...candidates], options);
