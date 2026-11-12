import {arrayLastIndexOf as arrayLastIndexOfBase} from 'ts-extras';

/**
 * Returns the index of the last occurrence of a value in an array, like
 * `Array.prototype.lastIndexOf`, but also accepts a value of a type wider than the element type
 */
export const arrayLastIndexOf: {
  /**
   * Returns the index of the last occurrence of a value in an array, like
   * `Array.prototype.lastIndexOf`.
   * Values are compared with `===`, so `NaN` is never found.
   * To get the first occurrence, use `arrayIndexOf`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the backward search at.
   * Negative values count from the end of the array.
   * Defaults to the last index, but an explicit `undefined` counts as `0`, like
   * in the native method.
   * @returns The index of the last occurrence, or `-1` if the array doesn't have the value.
   * @example
   * arrayLastIndexOf(['a', 'b', 'a'], 'a');
   * // 2
   */
  <Type>(array: readonly Type[], value: NoInfer<Type>, fromIndex?: number): number;

  /**
   * Returns the index of the last occurrence of a value in an array, like
   * `Array.prototype.lastIndexOf`, but also accepts a value of a type wider than
   * the element type, like `unknown` or a `string` for an array of string
   * literals.
   * A value of an unrelated type, like a number for an array of strings, is
   * still rejected.
   * Values are compared with `===`, so `NaN` is never found.
   * To get the first occurrence, use `arrayIndexOf`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the backward search at.
   * Negative values count from the end of the array.
   * Defaults to the last index, but an explicit `undefined` counts as `0`, like
   * in the native method.
   * @returns The index of the last occurrence, or `-1` if the array doesn't have the value.
   * @example
   * const STEPS = ['build', 'test', 'build'] as const;
   * declare const step: string;
   * arrayLastIndexOf(STEPS, step);
   * // 2 for 'build', -1 for 'deploy'
   */
  // eslint-disable-next-line ts/no-unnecessary-type-parameters -- `Type` is what rejects a value of an unrelated type
  <Type extends SuperType, SuperType = unknown>(
    array: readonly Type[],
    value: SuperType,
    fromIndex?: number,
  ): number;
} = arrayLastIndexOfBase;
