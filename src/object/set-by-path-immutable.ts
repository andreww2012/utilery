import {type Paths, type ValueAtPath, setPath} from 'remeda';

/**
 * Returns a **new** object equal to `object` but with the value at the given
 * deep `path` replaced by `value`, without mutating the input.
 * This is the immutable, statically-typed counterpart to `setByPath`: `path`
 * must be an array of keys that **already exists** in the object's type
 * (invalid paths are a compile error), and `value` must match the type at that
 * path.
 *
 * Because the path must already exist, this does not build missing containers;
 * use the mutable `setByPath` for dynamic, build-from-scratch writes.
 * @param object - The source object.
 * Not mutated.
 * @param path - An array of keys identifying an existing location, e.g. `['a', 'b']`.
 * @param value - The replacement value; must match the type currently at `path`.
 * @returns A new object with the value at `path` replaced.
 * @example
 * // Replace a nested value immutably
 * setByPathImmutable({a: {b: 1}}, ['a', 'b'], 2);
 * // {a: {b: 2}} (the input is unchanged)
 * @example
 * // The value type is checked against the path
 * setByPathImmutable({user: {age: 30}}, ['user', 'age'], 31);
 * // {user: {age: 31}}
 */
export const setByPathImmutable = <T, Path extends Paths<T>>(
  object: T,
  path: Path,
  value: ValueAtPath<T, Path>,
): T => setPath(object, path, value);
