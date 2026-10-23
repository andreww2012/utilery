import {stringifyAsync} from 'devalue';
import type {StructuredStringifyOptions} from './structured-stringify.ts';

/**
 * Like `structuredStringify`, but also accepts promises anywhere inside the value: each one is
 * awaited, and the value it resolves to is serialized in its place.
 */
// Explicitly typed to narrow the upstream `any`s to `unknown`
export const structuredStringifyAsync: {
  /**
   * Like `structuredStringify`, but also accepts promises anywhere inside the
   * value: each one is awaited, and the value it resolves to is serialized in its
   * place.
   * `structuredParse` therefore revives the resolved values, not promises.
   *
   * Unlike `jsonStringifyAsync`, it does **not** yield to the event loop while
   * serializing: it is asynchronous only because of the promises it awaits.
   * @param value - The value to serialize.
   * May contain promises, rich types and circular references.
   * @param reducers - Optional map, keyed by name, of functions that turn a
   * non-standard value into a serializable intermediate form (paired with a
   * reviver of the same name in `structuredParse`).
   * @param options - Optional settings.
   * @param options.operations - Overrides for how values are inspected; see
   * `StructuredStringifyOperations`.
   * @returns A promise resolving to the serialized string; read it back only with
   * `structuredParse`.
   * @throws {StructuredStringifyError} When the value contains something that
   * cannot be serialized.
   * A rejected promise inside the value rejects the result with its reason.
   * @example
   * // Await promises nested inside the value
   * const serialized = await structuredStringifyAsync({user: fetchUser(), posts: [fetchPost(1)]});
   * structuredParse(serialized);
   * // {user: {...}, posts: [{...}]}
   */
  (
    value: unknown,
    reducers?: Record<string, (value: unknown) => unknown>,
    options?: StructuredStringifyOptions,
  ): Promise<string>;
} = stringifyAsync;
