import {setHas as setHasBase} from 'ts-extras';

/**
 * Checks whether a set has a value, like `Set.prototype.has`, but as a type guard: when it returns
 * `true`, the value is narrowed to the element type of the set.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const setHas: {
  /**
   * Checks whether a set has a value, like `Set.prototype.has`, but as a type
   * guard: when it returns `true`, the value is narrowed to the element type of
   * the set.
   * When it returns `false`, the value keeps its type.
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
  ): value is Type & {};
} = setHasBase;
