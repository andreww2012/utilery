import type {UnknownRecord as UnknownRecordBase} from 'type-fest';

/**
 * An object with keys and values of unknown types: `Record<PropertyKey,
 * unknown>`.
 * Prefer it to `{}`, which also accepts any value except `null` and
 * `undefined`, like numbers and strings.
 * @example
 * const isObject = (value: unknown): value is UnknownRecord =>
 *   typeof value === 'object' && value != null;
 */
export type UnknownRecord = UnknownRecordBase;
