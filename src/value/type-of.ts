/**
 * Returns the runtime type of `value` as a string: an enhanced `typeof` that
 * distinguishes object subtypes the operator collapses into `'object'`.
 *
 * Primitives return their lowercase `typeof` result (`'string'`, `'number'`,
 * `'boolean'`, `'bigint'`, `'symbol'`, `'undefined'`, `'function'`), with
 * `null` reported as `'null'`.
 * Everything else returns its internal class tag in its natural casing
 * (`'Array'`, `'Date'`, `'Map'`, `'Promise'`, `'Object'`, ...), honoring a
 * custom `Symbol.toStringTag` when present.
 * @param value - The value to inspect.
 * @returns The runtime type name of `value`.
 * @example
 * // Primitives mirror `typeof` (lowercase)
 * typeOf('hello');
 * // 'string'
 * @example
 * // `null` is reported distinctly, unlike `typeof null === 'object'`
 * typeOf(null);
 * // 'null'
 * @example
 * // Object subtypes the operator hides are distinguished
 * typeOf([]);
 * // 'Array'
 * typeOf(new Map());
 * // 'Map'
 * @example
 * // A custom `Symbol.toStringTag` is honored
 * typeOf({[Symbol.toStringTag]: 'MyThing'});
 * // 'MyThing'
 */
export const typeOf = (value: unknown): string => {
  if (value === null) {
    return 'null';
  }

  return typeof value === 'object'
    ? Object.prototype.toString.call(value).slice(8, -1)
    : typeof value;
};
