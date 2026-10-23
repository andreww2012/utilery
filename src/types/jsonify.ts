import type {Jsonify as JsonifyBase} from 'type-fest';

/**
 * The type a value of type `T` becomes after a round trip through JSON, like
 * `JSON.parse(JSON.stringify(value))`: a type assignable to `JsonValue`.
 * A value with a `toJSON` method, like a `Date`, is replaced with what the
 * method returns, and properties that JSON cannot hold, like functions, are
 * left out.
 * It also turns an interface into a type assignable to `JsonValue`, which the
 * interface itself is not, as interfaces can be extended later.
 * @example
 * type A = Jsonify<{date: Date; count: number; callback: () => void}>;
 * //=> {date: string; count: number}
 * @example
 * interface Geometry {
 *   coordinates: [number, number];
 * }
 * declare function send<T>(data: Jsonify<T>): void;
 * declare const point: Geometry;
 * send(point);
 */
export type Jsonify<T> = JsonifyBase<T>;
