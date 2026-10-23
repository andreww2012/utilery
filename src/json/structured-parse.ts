// cspell:ignore unflatten
import {type ParseOperations, defaultParseOperations, unflatten} from 'devalue';

/**
 * Options accepted by {@link structuredParse}
 */
export interface StructuredParseOptions {
  /**
   * Overrides of the ways the value is built back up.
   * Omitted members fall back to {@link STRUCTURED_PARSE_DEFAULT_OPERATIONS}
   */
  operations?: Partial<StructuredParseOperations>;
}

/**
 * Every way {@link structuredParse} builds the revived value back up: creating
 * objects, arrays, `Map`s and `Set`s, populating them, constructing dates,
 * regexes and typed arrays.
 * Overriding members via {@link StructuredParseOptions}' `operations` controls
 * exactly how values are constructed, e.g. to revive them into another realm or
 * process
 */
export type StructuredParseOperations = ParseOperations;

/**
 * The native operations {@link structuredParse} uses by default.
 * Spread it to build a custom `operations` table that only overrides a few
 * members
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const STRUCTURED_PARSE_DEFAULT_OPERATIONS = defaultParseOperations;

/**
 * Revives the output of `structuredStringify` back into its original value,
 * restoring rich types (`Date`, `Map`, `Set`, `BigInt`, etc.) and
 * shared/circular references.
 *
 * Accepts either the serialized string or its already-`JSON.parse`d form.
 * The latter is handy when the serialized value is embedded into a larger JSON
 * document: parse the whole document once and pass the embedded part as-is.
 *
 * Only accepts output of `structuredStringify`: it is not a `JSON.parse`
 * replacement for arbitrary JSON.
 * @param serialized - A string produced by `structuredStringify`, or the result of `JSON.parse`-ing
 * it.
 * @param revivers - Optional map, keyed by the same names used during
 * serialization, of functions that reconstruct each custom type from its
 * intermediate form.
 * @param options - Optional settings.
 * @param options.operations - Overrides for how values are constructed; see
 * {@link StructuredParseOperations}.
 * @returns The revived value, typed `unknown`; assert or validate the shape at
 * the call site.
 * @throws {Error} When `serialized` is not a valid output of `structuredStringify`.
 * @example
 * // Round-trip a value with rich types and shared references
 * const source = {when: new Date(0), tags: new Set(['a', 'b'])};
 * structuredParse(structuredStringify(source));
 * // {when: Date(1970-01-01T00:00:00Z), tags: Set(2) {'a', 'b'}}
 * @example
 * // Revive a value embedded into a larger JSON document
 * const message = JSON.parse(`{"type":"data","payload":${structuredStringify(new Set([1]))}}`);
 * structuredParse(message.payload);
 * // Set(1) {1}
 */
export const structuredParse = (
  serialized: unknown,
  revivers?: Record<string, (value: unknown) => unknown>,
  options?: StructuredParseOptions,
): unknown =>
  unflatten(
    // eslint-disable-next-line ts/no-unsafe-argument -- an invalid payload is rejected at runtime
    typeof serialized === 'string' ? JSON.parse(serialized) : serialized,
    revivers,
    options,
  );
