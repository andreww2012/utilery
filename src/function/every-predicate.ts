import {overEvery} from 'es-toolkit/compat';

type Predicate<T> = (...values: T[]) => boolean;

interface EveryPredicate {
  /**
   * Combines two type guards into one that passes when both pass, narrowing to
   * the intersection of their types.
   * @param predicate1 - The first type guard.
   * @param predicate2 - The second type guard, only called when the first one passes.
   * @returns A type guard that returns `true` when both type guards return `true`.
   * @example
   * declare const isUser: (value: unknown) => value is User;
   * declare const isAdmin: (value: unknown) => value is {role: 'admin'};
   * const isAdminUser = everyPredicate(isUser, isAdmin);
   * // (value: unknown) => value is User & {role: 'admin'}
   */
  <T, U extends T, V extends T>(
    // eslint-disable-next-line unicorn/consistent-boolean-name
    predicate1: (value: T) => value is U,
    // eslint-disable-next-line unicorn/consistent-boolean-name
    predicate2: (value: T) => value is V,
  ): (value: T) => value is U & V;

  /**
   * Combines predicates into one that passes when all of them pass.
   * The predicates are called in order with the same arguments, stopping at the
   * first one that returns a falsy value.
   * With no predicates, the result always returns `true`.
   * @param predicates - The predicates, or arrays of predicates.
   * @returns A predicate that returns `true` when every predicate returns a truthy value.
   * @example
   * const isLongString = everyPredicate(
   *   (value: unknown) => typeof value === 'string',
   *   (value: unknown) => String(value).length > 3,
   * );
   * isLongString('hello');
   * // true
   * isLongString('hi');
   * // false
   */
  <T>(...predicates: (Predicate<T> | readonly Predicate<T>[])[]): Predicate<T>;
}

/**
 * Combines predicates into one that passes when all of them pass.
 * For one that passes when any of them passes, use `somePredicate`.
 */
export const everyPredicate: EveryPredicate = overEvery;
