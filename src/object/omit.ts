import {omit as omitKeys} from 'es-toolkit/compat';
import {omitBy} from 'es-toolkit/object';
import type {ObjectKeys} from 'es-toolkit/types';
import {isArray} from '../predicate/is-array.ts';
import {isPlainObject} from '../predicate/is-plain-object.ts';
import {toPathSegments} from './to-path-segments.ts';

const WILDCARD = '*';
const DEEP_PATH_REGEX = /[.[]/;

// The rule `es-toolkit/compat` uses, along with the object not having a property with that
// exact name
const isPathString = (key: PropertyKey): key is string =>
  typeof key === 'string' &&
  DEEP_PATH_REGEX.test(key) &&
  !key.startsWith('.') &&
  !key.endsWith('.');

const isContainer = (value: unknown) => isArray(value) || isPlainObject(value);

// Defining the properties instead of assigning them keeps an own `__proto__` key (which
// `JSON.parse` can produce) from replacing the prototype of the copy
const copyContainer = (container: Record<string, unknown> | readonly unknown[]) =>
  isArray(container)
    ? // eslint-disable-next-line unicorn/prefer-spread -- keeps holes, which spreading turns into `undefined`
      container.slice()
    : Object.defineProperties(
        Object.getPrototypeOf(container) === null ? {__proto__: null} : {},
        Object.getOwnPropertyDescriptors(container),
      );

// Mutates `container`, which must be a copy. Only the arrays and plain objects along the path
// get copied, everything else stays shared with the input
const omitPathIn = (
  container: Record<string, unknown> | unknown[],
  [segment, ...restPath]: readonly PropertyKey[],
) => {
  if (segment == null) {
    return;
  }

  const keys =
    segment === WILDCARD
      ? Object.keys(container)
      : [segment].filter((key) => Object.hasOwn(container, key));

  keys.forEach((key) => {
    if (restPath.length === 0) {
      Reflect.deleteProperty(container, key);
      return;
    }

    const child: unknown = Reflect.get(container, key);
    if (!isContainer(child)) {
      return;
    }

    const childCopy = copyContainer(child);
    omitPathIn(childCopy, restPath);
    Object.defineProperty(container, key, {
      value: childCopy,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });
};

/**
 * Creates a new object with the selected properties of `object` removed.
 *
 * The selection can be made in three ways via the second argument:
 *
 * - An array of top-level keys — precisely typed as `Omit<T, K>`.
 * - An array of deep path strings like `'a.b.c'` or `'a[0].b'` — removes nested
 *   properties (typed loosely as `Partial<T>`). A `*` segment (`'a.*.b'` or
 *   `'a[*].b'`) matches every element of an array or every property of an
 *   object, so a property can be removed from all objects in a list at once.
 *   Deep paths only go through arrays and plain objects, and only those get
 *   copied: the rest of the result is shared with `object`. A key named `*`
 *   cannot be addressed in a path.
 * - A `(value, key) => boolean` predicate — removes the properties for which it
 *   returns `true` (delegates to `omitBy`).
 * @param object - The source object. Not mutated.
 * @param keys - The keys/paths to remove, or a `(value, key) => boolean` predicate selecting them.
 * @returns A new object without the selected properties.
 * @example
 * // Top-level keys (precisely typed)
 * omit({a: 1, b: 2, c: 3}, ['b', 'c']);
 * // {a: 1}
 * @example
 * // Deep path strings
 * omit({a: {b: 1, c: 2}}, ['a.b']);
 * // {a: {c: 2}}
 * @example
 * // A property of every array element
 * omit({users: [{name: 'Ada', password: 'x'}, {name: 'Bob', password: 'y'}]}, ['users.*.password']);
 * // {users: [{name: 'Ada'}, {name: 'Bob'}]}
 * @example
 * // With a predicate — remove string-valued properties
 * omit({a: 1, b: 'drop', c: 3}, (value) => typeof value === 'string');
 * // {a: 1, c: 3}
 */
export function omit<T extends object, K extends keyof T>(
  object: T,
  keys: readonly K[],
): Omit<T, K>;
export function omit<T extends object>(
  object: T,
  selector: readonly PropertyKey[] | ((value: T[keyof T], key: ObjectKeys<T>) => boolean),
): Partial<T>;
export function omit<T extends object>(
  object: T,
  selector: readonly PropertyKey[] | ((value: T[keyof T], key: ObjectKeys<T>) => boolean),
): Partial<T> {
  if (typeof selector === 'function') {
    return omitBy(object, selector);
  }

  const isDeepPath = (key: PropertyKey): key is string => isPathString(key) && !(key in object);

  const result = omitKeys(
    object,
    selector.filter((key) => !isDeepPath(key)),
  );

  selector.forEach((key) => {
    if (isDeepPath(key)) {
      omitPathIn(result, toPathSegments(key));
    }
  });

  return result;
}
