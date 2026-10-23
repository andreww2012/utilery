import type {InvariantOf} from 'type-fest';

/**
 * An invariant version of a type: no narrower or wider type is assignable to
 * it.
 * Handy to prevent mistakes like adding an `Animal` to what is really a `Cat[]`,
 * or to type `Object.keys` precisely, since an object may have more keys than
 * its type says.
 * Create values of it with a cast.
 * @example
 * type Point = {x: number; y: number};
 * const keysOf = (point: InvariantType<Point>) => Object.keys(point) as (keyof Point)[];
 *
 * const point3d = {x: 1, y: 2, z: 3};
 * // @ts-expect-error: a subtype is not assignable
 * keysOf(point3d as InvariantType<typeof point3d>);
 */
export type InvariantType<Type> = InvariantOf<Type>;
