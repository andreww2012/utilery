import {type UpsertProp, addProp} from 'remeda';

/**
 * Returns a new object equal to `object` but with `key` set to `value`,
 * inserting the property if it is absent or overwriting it if present (an
 * upsert).
 * The original is not mutated.
 *
 * The result type is computed precisely: adding a new literal key widens the
 * type to include it, and overwriting an existing key updates that key's type to
 * `value`'s type.
 * @param object - The source object.
 * Not mutated.
 * @param key - The property key to insert or overwrite.
 * @param value - The value to set at `key`.
 * @returns A new object with `key` set to `value`.
 * @example
 * // Insert a new key
 * objectUpsertProperty({a: 1}, 'b', 2);
 * // {a: 1, b: 2}
 * @example
 * // Overwrite an existing key (its type updates to the new value's type)
 * objectUpsertProperty({a: 1}, 'a', 'now a string');
 * // {a: 'now a string'}
 */
// Annotated explicitly: the inferred return references a remeda-internal branded
// `unique symbol` that cannot be named in the emitted declarations (TS2527/TS4023)
export const objectUpsertProperty = <T, K extends PropertyKey, V>(
  object: T,
  key: K,
  value: V,
): UpsertProp<T, K, V> => addProp(object, key, value);
