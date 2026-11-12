import {arrayIncludes as arrayIncludesBase} from 'ts-extras';

/**
 * Checks whether an array has a value, like `Array.prototype.includes`, but as a type guard: when
 * it returns `true`, the value is narrowed to the element type of the array
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `Array.prototype.includes`
export const arrayIncludes: {
  /**
   * Checks whether an array has a value, like `Array.prototype.includes`.
   * The value already has the element type of the array, so nothing is narrowed:
   * a value that is not in the array may still have that type.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param array - The array to search.
   * @param value - The value to look for.
   * @param fromIndex - The index to start the search at.
   * Negative values count from the end of the array.
   * Defaults to `0`.
   * @returns `true` if the array has the value, otherwise `false`.
   * @example
   * const names: string[] = [];
   * declare const name: string;
   * if (!arrayIncludes(names, name)) {
   *   names.push(name); // `name` is still a `string`
   * }
   */
  <Type>(array: readonly Type[], value: NoInfer<Type>, fromIndex?: number): boolean;

  /**
   * Checks whether an array has a value, like `Array.prototype.includes`, but as a
   * type guard: when it returns `true`, the value is narrowed to the element type
   * of the array, including `null` and `undefined`.
   * When it returns `false`, a value of a wider type (like `unknown` or `string`)
   * keeps its type.
   * A union value loses the members that the element type covers, even though
   * the array may not hold every value of that type: with a `string[]`, a
   * `string | undefined` value becomes `undefined`.
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
  ): value is Type;
} = arrayIncludesBase;
