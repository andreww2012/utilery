import type {JsonObject as JsonObjectBase} from 'type-fest';

/**
 * A JSON object: an object with string keys and JSON values (see
 * `JsonValue`).
 * Use it as a type to extend from, to make sure that a type only uses JSON
 * values, rather than as a return type, which would need a cast through
 * `unknown`.
 * @example
 * interface UserResponse extends JsonObject {
 *   name: string;
 *   tags: string[];
 * }
 */
export type JsonObject = JsonObjectBase;
