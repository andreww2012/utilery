import {setHas as setHasBase} from 'ts-extras';

/**
 * Checks whether a set has a value, like `Set.prototype.has`, but as a type guard: when it returns
 * `true`, the value is narrowed to the element type of the set
 */
// eslint-disable-next-line unicorn/consistent-boolean-name -- named after `Set.prototype.has`
export const setHas: {
  /**
   * Checks whether a set has a value, like `Set.prototype.has`.
   * The value already has the element type of the set, so nothing is narrowed:
   * a value that is not in the set may still have that type.
   * @param set - The set to check.
   * @param value - The value to look for.
   * @returns `true` if the set has the value, otherwise `false`.
   * @example
   * const seen = new Set<string>();
   * declare const name: string;
   * if (!setHas(seen, name)) {
   *   seen.add(name); // `name` is still a `string`
   * }
   */
  <Type>(set: ReadonlySet<Type>, value: NoInfer<Type>): boolean;

  /**
   * Checks whether a set has a value, like `Set.prototype.has`, but as a type
   * guard: when it returns `true`, the value is narrowed to the element type of
   * the set, including `null` and `undefined`.
   * When it returns `false`, a value of a wider type (like `unknown` or `string`)
   * keeps its type.
   * A union value loses the members that the element type covers, even though
   * the set may not hold every value of that type: with a `Set<string>`, a
   * `string | undefined` value becomes `undefined`.
   * @param set - The set to check.
   * @param value - The value to look for.
   * @returns `true` if the set has the value, otherwise `false`.
   * @example
   * const colors = new Set(['red', 'green'] as const);
   * declare const input: string;
   * if (setHas(colors, input)) {
   *   input; // 'red' | 'green'
   * }
   */
  <Type extends SuperType, SuperType = unknown>(
    set: ReadonlySet<Type>,
    value: SuperType,
  ): value is Type;
} = setHasBase;
