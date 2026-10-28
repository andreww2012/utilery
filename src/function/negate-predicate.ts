import {not} from 'ts-extras';

/**
 * Turns a type guard into its opposite: the new type guard returns `true` when the original one
 * returns `false`, narrowing the value to the types the original one excludes
 */
export const negatePredicate: {
  /**
   * Turns a type guard into its opposite: the new type guard returns `true` when
   * the original one returns `false`, narrowing the value to the types the
   * original one excludes.
   * For a predicate that is not a type guard, use `negate`.
   *
   * TypeScript may fail to narrow in nested branches, after the variable is
   * reassigned, or when excluding from complex unions.
   * @param predicate - The type guard to turn around.
   * @returns A type guard that narrows the value to `Exclude<Value, T>`.
   * @example
   * const isNullish = (value: unknown): value is null | undefined => value == null;
   * [1, null, 2, undefined].filter(negatePredicate(isNullish));
   * // [1, 2] (type: number[])
   * @example
   * const isString = (value: unknown): value is string => typeof value === 'string';
   * const isNotString = negatePredicate(isString);
   * declare const value: string | number | boolean;
   * if (isNotString(value)) {
   *   value; // number | boolean
   * }
   */
  <T>(
    predicate: (value: unknown) => value is T,
  ): <Value>(value: Value) => value is Exclude<Value, T>;
} = not;
