import {safeCastTo} from 'ts-extras';

/**
 * Types a value as `T`, but only if it is assignable to `T`: unlike `as`, an incompatible type is a
 * compile error
 */
export const castToSafe: {
  /**
   * Types a value as `T`, but only if it is assignable to `T`: unlike `as`, an
   * incompatible type is a compile error.
   * It does nothing at runtime.
   * Handy to widen a value, like an empty object literal, to the type it is meant
   * to have.
   * @param value - The value to type.
   * @returns `value` itself, typed as `T`.
   * @example
   * interface Options {
   *   size?: number;
   * }
   * const options = castToSafe<Options>({});
   * options.size = 10; // with `const options = {}`, this is an error
   * @example
   * // @ts-expect-error: a number is not a string
   * castToSafe<string>(42);
   */
  <T>(value: T): T;
} = safeCastTo;
