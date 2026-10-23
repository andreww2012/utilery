import type {Jsonifiable as JsonifiableBase} from 'type-fest';

/**
 * A value that `JSON.stringify` converts to JSON without losing data: a JSON
 * value, or an object with a `toJSON` method, like a `Date`, at any depth.
 * `undefined` is allowed for object properties, even though `JSON.stringify`
 * leaves them out.
 * @example
 * const good: Jsonifiable = {count: 3, date: new Date(), missing: undefined};
 * // @ts-expect-error: a map becomes `{}`
 * const bad: Jsonifiable = {map: new Map([['a', 1]])};
 */
export type Jsonifiable = JsonifiableBase;
