import {compact} from 'es-toolkit/array';
import type {Truthy} from '../types/truthy.ts';

/**
 * Returns a new array without the falsy elements: `false`, `null`, `undefined`, `0`, `-0`, `0n`,
 * `''` and `NaN`.
 */
export const arrayWithoutFalsy: {
  /**
   * Returns a new array without the falsy elements: `false`, `null`,
   * `undefined`, `0`, `-0`, `0n`, `''` and `NaN`.
   * The element type is narrowed accordingly, as far as it can be expressed (see
   * `Truthy`).
   * @param array - The array to filter.
   * Not mutated.
   * @returns A new array of the truthy elements.
   * @example
   * arrayWithoutFalsy([0, 1, false, 2, '', 3, null, undefined, NaN]);
   * // [1, 2, 3]
   * @example
   * const names: (string | undefined)[] = ['a', undefined, 'b'];
   * arrayWithoutFalsy(names);
   * // ['a', 'b'] (type: string[])
   */
  <T>(array: readonly T[]): Truthy<T>[];
} = compact;
