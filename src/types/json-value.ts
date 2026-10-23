import type {JsonValue as JsonValueBase} from 'type-fest';

/**
 * A JSON value: a JSON primitive, array or object, at any depth (see
 * `JsonPrimitive`, `JsonArray` and `JsonObject`).
 * To turn a type into one that is assignable to it, use `Jsonify`.
 * @example
 * const data: JsonValue = {name: 'Ada', tags: ['a'], address: null};
 * // @ts-expect-error: functions are not JSON
 * const invalid: JsonValue = {callback: () => {}};
 */
export type JsonValue = JsonValueBase;
