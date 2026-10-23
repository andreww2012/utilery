import {arrayIncludes as arrayIncludesBase} from 'ts-extras';

/**
 * Checks whether an array has a value, like `Array.prototype.includes`, but as a type guard: when
 * it returns `true`, the value is narrowed to the element type of the array.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const arrayIncludes: {
  /**
   * Checks whether an array has a value, like `Array.prototype.includes`, but as a
   * type guard: when it returns `true`, the value is narrowed to the element type
   * of the array.
   * When it returns `false`, the value keeps its type.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the search at.
   * Negative values count from the end of the array.
   * Defaults to `0`.
   * @returns `true` if the array has the value, otherwise `false`.
   * @example
   * const SIZES = ['s', 'm', 'l'] as const;
   * declare const input: string;
   * if (arrayIncludes(SIZES, input)) {
   *   input; // 's' | 'm' | 'l'
   * }
   */
  <Type extends SuperType, SuperType = unknown>(
    array: readonly Type[],
    value: SuperType,
    fromIndex?: number,
  ): value is Type & {};
} = arrayIncludesBase;
