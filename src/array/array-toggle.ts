import {arrayPurgeValues} from './array-purge-values.ts';

/**
 * Adds `value` to the array when it is missing, and removes every occurrence of
 * it otherwise, like `DOMTokenList.prototype.toggle` does for class names.
 * Items are compared using `SameValueZero` (the same semantics as
 * `Array.prototype.includes`).
 *
 * Pass `shouldInclude` to only ever add (`true`) or only ever remove (`false`)
 * the value, like the `force` argument of `DOMTokenList.prototype.toggle`.
 * This is handy for syncing the array with a condition.
 *
 * By default the array is **mutated** in place.
 * Pass `{copy: true}` to leave it untouched and get a new array back instead.
 * @param array - The array to toggle `value` in.
 * Mutated unless `{copy: true}` is set.
 * @param value - The value to add or remove.
 * @param shouldInclude - When `true`, the value is only added (if missing).
 * When `false`, it is only removed.
 * When omitted, it is toggled.
 * @param options - Optional behavior flags.
 * @param options.copy - When `true`, returns a new array instead of mutating `array`.
 * @returns The mutated `array`, or a new array when `{copy: true}`.
 * @example
 * // Toggle a value (mutating, the default)
 * arrayToggle(['a', 'b'], 'c');
 * // ['a', 'b', 'c']
 * arrayToggle(['a', 'b', 'a'], 'a');
 * // ['b']
 * @example
 * // Sync with a condition
 * arrayToggle(selectedIds, id, isSelected);
 * @example
 * // Immutable with `{copy: true}`
 * const flags = ['a'];
 * const result = arrayToggle(flags, 'b', undefined, {copy: true});
 * // result is ['a', 'b']; flags is still ['a']
 */
export const arrayToggle = <T>(
  array: T[],
  value: T,
  shouldInclude?: boolean,
  options?: {
    /**
     * When `true`, the input array is left untouched and a new array is returned.
     * When `false` (the default), the input array is mutated in place and returned
     */
    copy?: boolean;
  },
): T[] => {
  const result = options?.copy ? [...array] : array;
  const isIncluded = result.includes(value);
  const shouldBeIncluded = shouldInclude ?? !isIncluded;

  if (shouldBeIncluded && !isIncluded) {
    result.push(value);
  } else if (!shouldBeIncluded && isIncluded) {
    arrayPurgeValues(result, [value]);
  }

  return result;
};
