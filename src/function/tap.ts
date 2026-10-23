import {tap as tapBase} from '@antfu/utils';

/** Calls `callback` with `value` and returns `value` */
export const tap: {
  /**
   * Calls `callback` with `value` and returns `value`.
   * Handy to run side effects, like setting up or logging an object, without
   * leaving an expression.
   * @param value - The value to pass to `callback` and return.
   * @param callback - Receives `value`.
   * Its return value is ignored.
   * @returns `value` itself.
   * @example
   * const user = tap(new User(), (newUser) => {
   *   newUser.name = 'Ada';
   * });
   */
  <T>(value: T, callback: (value: T) => void): T;
} = tapBase;
