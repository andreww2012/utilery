import type {JsonArray as JsonArrayBase} from 'type-fest';

/**
 * A JSON array: an array of JSON values (see `JsonValue`).
 * @example
 * const tags: JsonArray = ['a', 1, null, {b: true}];
 */
export type JsonArray = JsonArrayBase;
