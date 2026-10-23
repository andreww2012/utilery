import {overSome} from 'es-toolkit/compat';

type Predicate<T> = (...values: T[]) => boolean;

interface SomePredicate {
  /**
   * Combines two type guards into one that passes when either passes, narrowing
   * to the union of their types.
   * @param predicate1 - The first type guard.
   * @param predicate2 - The second type guard, only called when the first one fails.
   * @returns A type guard that returns `true` when either type guard returns `true`.
   * @example
   * const isStringOrNumber = somePredicate(
   *   (value: unknown): value is string => typeof value === 'string',
   *   (value: unknown): value is number => typeof value === 'number',
   * );
   */
  <T, U extends T, V extends T>(
    // eslint-disable-next-line unicorn/consistent-boolean-name
    predicate1: (value: T) => value is U,
    // eslint-disable-next-line unicorn/consistent-boolean-name
    predicate2: (value: T) => value is V,
  ): (value: T) => value is U | V;

  /**
   * Combines predicates into one that passes when at least one of them passes.
   * The predicates are called in order with the same arguments, stopping at the
   * first one that returns a truthy value.
   * With no predicates, the result always returns `false`.
   * @param predicates - The predicates, or arrays of predicates.
   * @returns A predicate that returns `true` when some predicate returns a truthy value.
   * @example
   * const isEmpty = somePredicate(
   *   (value: unknown) => value == null,
   *   (value: unknown) => value === '',
   * );
   * isEmpty('');
   * // true
   * isEmpty('a');
   * // false
   */
  <T>(...predicates: (Predicate<T> | readonly Predicate<T>[])[]): Predicate<T>;
}

/**
 * Combines predicates into one that passes when at least one of them passes.
 * For one that passes when all of them pass, use `everyPredicate`.
 */
export const somePredicate: SomePredicate = overSome;
