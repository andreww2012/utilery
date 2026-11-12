import {arrayIndexOf as arrayIndexOfBase} from 'ts-extras';

/**
 * Returns the index of the first occurrence of a value in an array, like `Array.prototype.indexOf`,
 * but also accepts a value of a type wider than the element type
 */
export const arrayIndexOf: {
  /**
   * Returns the index of the first occurrence of a value in an array, like
   * `Array.prototype.indexOf`.
   * Values are compared with `===`, so `NaN` is never found.
   * To get the last occurrence, use `arrayLastIndexOf`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the search at.
   * Negative values count from the end of the array.
   * Defaults to `0`.
   * @returns The index of the first occurrence, or `-1` if the array doesn't have the value.
   * @example
   * arrayIndexOf(['a', 'b', 'a'], 'a');
   * // 0
   */
  <Type>(array: readonly Type[], value: NoInfer<Type>, fromIndex?: number): number;

  /**
   * Returns the index of the first occurrence of a value in an array, like
   * `Array.prototype.indexOf`, but also accepts a value of a type wider than the
   * element type, like `unknown` or a `string` for an array of string literals.
   * A value of an unrelated type, like a number for an array of strings, is
   * still rejected.
   * Values are compared with `===`, so `NaN` is never found.
   * To get the last occurrence, use `arrayLastIndexOf`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the search at.
   * Negative values count from the end of the array.
   * Defaults to `0`.
   * @returns The index of the first occurrence, or `-1` if the array doesn't have the value.
   * @example
   * const LEVELS = ['debug', 'info', 'warn'] as const;
   * declare const level: string;
   * arrayIndexOf(LEVELS, level);
   * // 1 for 'info', -1 for 'error'
   */
  // eslint-disable-next-line ts/no-unnecessary-type-parameters -- `Type` is what rejects a value of an unrelated type
  <Type extends SuperType, SuperType = unknown>(
    array: readonly Type[],
    value: SuperType,
    fromIndex?: number,
  ): number;
} = arrayIndexOfBase;
