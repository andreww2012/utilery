import {type Evolver, evolve} from 'remeda';

/**
 * Returns a new object with each value transformed by the function registered
 * for its key in `evolver`.
 * Unlike `mapValues` (which applies one function to every value), this applies
 * a *different* function per key, and keys absent from `evolver` are carried
 * over unchanged.
 * The `evolver` may be nested to transform values within nested objects.
 *
 * The result type reflects each transformer's return type, so the shape stays
 * precisely typed.
 * @param object - The source object.
 * Not mutated.
 * @param evolver - A (possibly nested) structure mapping keys to transform functions; only the
 * listed keys are changed.
 * @returns A new object with the matching values transformed and the rest preserved.
 * @example
 * // Transform some keys, keep the rest
 * mapObjectValuesByKey({count: 1, label: 'a'}, {count: (value) => value + 1});
 * // {count: 2, label: 'a'}
 * @example
 * // Different function per key, including a type change
 * mapObjectValuesByKey({price: 5, name: 'x'}, {price: (value) => `$${value}`});
 * // {price: '$5', name: 'x'}
 */
export const mapObjectValuesByKey = <T extends object, E extends Evolver<T>>(
  object: T,
  evolver: E,
) => evolve(object, evolver);
