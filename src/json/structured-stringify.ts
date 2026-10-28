import {
  DevalueError,
  type StringifyOperations,
  defaultStringifyOperations,
  filterArrayIndices,
  stringify,
} from 'devalue';

/**
 * Options accepted by {@link structuredStringify} and `structuredStringifyAsync`
 */
export interface StructuredStringifyOptions {
  /**
   * Overrides of the ways values are inspected.
   * Omitted members fall back to {@link STRUCTURED_STRINGIFY_DEFAULT_OPERATIONS}
   */
  operations?: Partial<StructuredStringifyOperations>;
}

/**
 * Every way {@link structuredStringify} inspects the value being serialized:
 * property reads, prototype method calls, iteration, type classification.
 * Overriding members via {@link StructuredStringifyOptions}' `operations`
 * controls exactly how values are inspected, e.g. to serialize without running
 * code the value owns (getters, proxy traps, patched prototypes), or to
 * serialize values living in another realm or process through opaque handles
 */
export interface StructuredStringifyOperations extends StringifyOperations {
  /**
   * Converts a thenable into a native promise, whose settled value is then
   * serialized.
   * When the promise rejects, `structuredStringifyAsync` rejects too.
   * Only called by `structuredStringifyAsync`, for values `isThenable` returns
   * `true` for
   */
  toPromise: StringifyOperations['toPromise'];

  /**
   * Returns the indexes of the items of a (sparse) `Array` value as strings, in
   * ascending order, like `Object.keys(array)` filtered to valid array indexes.
   * An implementation that already has the own enumerable string keys of the
   * value should pass them through {@link structuredFilterArrayIndexes} instead
   * of filtering them itself
   */
  indicesOf: StringifyOperations['indicesOf'];

  /**
   * Classifies a value that may be a plain object:
   *
   * - `{kind: 'plain' | 'null-proto', keys}`: a plain object (with an
   *   `Object.prototype` or a `null` prototype) and its own enumerable string
   *   keys;
   * - `{kind: 'not-plain'}`: not a plain object, which makes serialization
   *   throw;
   * - `{kind: 'symbol-keys'}`: a plain object with enumerable symbol keys, which
   *   makes serialization throw
   */
  shapeOf: StringifyOperations['shapeOf'];
}

/**
 * The native operations {@link structuredStringify} uses by default.
 * Spread it to build a custom `operations` table that only overrides a few
 * members
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const STRUCTURED_STRINGIFY_DEFAULT_OPERATIONS = defaultStringifyOperations;

/**
 * Given the own enumerable string keys of an array-like value, in property order (where array
 * indexes always come first), returns the leading run of them that are valid array indexes
 */
export const structuredFilterArrayIndexes: {
  /**
   * Given the own enumerable string keys of an array-like value, in property
   * order (where array indexes always come first), returns the leading run of
   * them that are valid array indexes.
   * Does not modify `keys`.
   *
   * Meant for custom `indicesOf` members of {@link StructuredStringifyOperations},
   * which typically already have the keys in hand.
   * @param keys - The own enumerable string keys of an array-like value, in property order.
   * @returns The leading run of `keys` that are valid array indexes.
   * @example
   * structuredFilterArrayIndexes(Object.keys(Object.assign(['a', 'b'], {label: 'c'})));
   * // ['0', '1']
   */
  (keys: readonly string[]): string[];
} = filterArrayIndices;

/**
 * The error {@link structuredStringify} and `structuredStringifyAsync` throw on
 * a value they cannot serialize, like a function or a class instance without a
 * matching reducer
 */
export interface StructuredStringifyError extends Error {
  /** Where the offending value sits within the serialized value, e.g. `.user.avatar` */
  path: string;
  /** The offending value */
  value: unknown;
  /** The value that was being serialized */
  root: unknown;
}

/**
 * The error {@link structuredStringify} and `structuredStringifyAsync` throw on
 * a value they cannot serialize, like a function or a class instance without a
 * matching reducer.
 * Use it with `instanceof` to tell such failures apart and to read the `path`
 * to the offending value.
 * @example
 * try {
 *   structuredStringify({user: {greet: () => 'hi'}});
 * } catch (error) {
 *   if (error instanceof StructuredStringifyError) {
 *     error.path;
 *     // '.user.greet'
 *   }
 * }
 */
// eslint-disable-next-line ts/no-redeclare -- merged with the interface above so the name works both with `instanceof` and as a type
export const StructuredStringifyError: {
  /**
   * Creates the error {@link structuredStringify} and `structuredStringifyAsync`
   * throw on a value they cannot serialize.
   * @param message - The error message.
   * @param keys - The segments of the path to the offending value, like
   * `['.user', '.avatar']`: they are joined into `path`.
   * @param value - The offending value.
   * @param root - The value that was being serialized
   */
  new (message: string, keys: string[], value?: unknown, root?: unknown): StructuredStringifyError;
} = DevalueError;

/**
 * Serializes a value into a string that round-trips through `structuredParse`, preserving types
 * `JSON.stringify` cannot (`Date`, `Map`, `Set`, `BigInt`, `RegExp`, typed arrays, etc.), as well
 * as circular and repeated references
 */
// Explicitly typed to narrow the upstream `any`s to `unknown`
export const structuredStringify: {
  /**
   * Serializes a value into a string that round-trips through `structuredParse`,
   * preserving types `JSON.stringify` cannot (`Date`, `Map`, `Set`, `BigInt`,
   * `RegExp`, typed arrays, etc.), as well as circular and repeated references.
   *
   * The output is valid JSON text describing the value as a flat list of its
   * parts, so read it back only with `structuredParse`.
   * @param value - The value to serialize.
   * May contain rich types and circular references.
   * @param reducers - Optional map, keyed by name, of functions that turn a
   * non-standard value into a serializable intermediate form (paired with a
   * reviver of the same name in `structuredParse`).
   * @param options - Optional settings.
   * @param options.operations - Overrides for how values are inspected; see
   * {@link StructuredStringifyOperations}.
   * @returns The serialized string; read it back only with `structuredParse`.
   * @throws {StructuredStringifyError} When the value contains something that cannot be serialized.
   * @example
   * // Serialize values that plain JSON cannot represent
   * structuredStringify({when: new Date(0), big: 10n});
   * // a string that `structuredParse` turns back into the original value
   * @example
   * // Serialize a custom class through a reducer
   * structuredStringify(new Vector(1, 2), {
   *   Vector: (value) => value instanceof Vector && [value.x, value.y],
   * });
   */
  (
    value: unknown,
    reducers?: Record<string, (value: unknown) => unknown>,
    options?: StructuredStringifyOptions,
  ): string;
} = stringify;
